const express = require('express');
const PORT = 8080;
const path = require('path');
const app = express();

const AWS = require('aws-sdk');

const region = 'us-west-2';
const bucket = 'take-home-foam-challenge';
const accessKeyId = 'AKIA6AE547J2U2ODHJVO';
const secretAccessKey = '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';

const reactorController = require('./reactorController');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/reactors', reactorController.getReactors, (req, res) => {
 return res.json(res.locals.allReactors);
});

// app.get('/addReactors', reactorController.getURLs, reactorController.addReactors, (req, res) => {

//   return res.json(res.locals.urls)
// })


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
