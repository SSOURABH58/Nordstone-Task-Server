import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const getAnswer = (num1, num2, opera) => {
    switch (opera) {
        case '+':
            return num1 + num2;
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


app.get('/', (req, res) => {
    res.send('Hello Nordstone');
});

app.post('/calc', (req, res) => {
    const { num1, num2, opera } = req.body;
    console.log("req", req.body);
    console.log(`Calculating ${num1} ${opera} ${num2} :`);
    const ans = getAnswer(num1, num2, opera)
    console.log(ans);

    res.end(String(ans));
});

app.listen(process.env.PORT || 3000,
    () => console.log(`Server is running at ${process.env.PORT ? process.env.PORT : 3000}`));