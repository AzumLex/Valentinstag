const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/addRule', (req, res) => {
    const rulesJson = fs.readFileSync('rules.json');
    const rules = JSON.parse(rulesJson);

    const newRule = req.body.rule;
    rules.push(newRule);

    fs.writeFileSync('rules.json', JSON.stringify(rules));

    res.json(rules);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
