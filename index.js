import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/send', (req, res) => {
    const {v1, v2, v3, v4, v5} = req.body;
    console.log(req.body)
    res.send(req.body)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});