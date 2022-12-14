import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const getAnswer = (num1, num2, opera) => {
    switch (opera) {
        case '+':
            if (num1 === 6 && num2 === 9) {
                return "69 ;p"
            }
            else {
                return num1 + num2;
            }
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return 0
    }
}

const notifyDelay = 5

export const sendPushNotification = async (registrationToken) => {
    var data = JSON.stringify({
        "priority": "HIGH",
        "data": {},
        "notification": {
            "body": `its a ${notifyDelay}s dilated notification`,
            "title": "🎉 you are hired !!",
            "vibrate": 1,
            "sound": 1,
            "show_in_foreground": true
        },
        "to": registrationToken
    });

    var config = {
        method: 'post',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAAHy8xf3E:APA91bFQcYo1x8tzqnR8etmmP-XSjSs1hIpRw0r5j1274AbMwQnvQbf1gPNtLvDji56IyYrsSAPltPKgZNXe5EqHdYHrDYQCcXcb0UGht-X93hYqkxp37xn9CjnqfcNeP0FCj7paS8fW'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}


app.get('/', (req, res) => {
    res.send('Hello Nordstone');
});

app.post('/calc', (req, res) => {
    const { num1, num2, opera } = req.body;
    console.log("req", req.body);
    console.log(`Calculating ${num1} ${opera} ${num2} :`);
    const ans = getAnswer(parseInt(num1), parseInt(num2), opera)
    console.log(ans);

    res.end(String(ans));
});

app.post('/notify', async (req, res) => {
    const { token } = req.body;
    console.log("req", req.body);
    setTimeout(() => {

        sendPushNotification(token)
    }, notifyDelay * 1000);
    res.end();
});

app.listen(process.env.PORT || 3000,
    () => console.log(`Server is running at ${process.env.PORT ? process.env.PORT : 3000}`));