const AWS = require('aws-sdk');

const region = 'us-west-2';
const bucket = 'take-home-foam-challenge';
const accessKeyId = 'AKIA6AE547J2U2ODHJVO';
const secretAccessKey = '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';

const db = require('./reactorModels.js')

const reactorController = {};

reactorController.getURLs = async (req, res, next) => {
  AWS.config.update({ 
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  })
  
  const s3 = new AWS.S3();

  let sourceURLs = [];
  
  const response = await s3.listObjectsV2({
    Bucket: bucket
  }).promise()

  for (let i = 0; i < response.Contents.length; i++) {
    sourceURLs.push(response.Contents[i].Key)
  }
  
  res.locals.urls = sourceURLs;
  
  return next()

}

reactorController.addReactors = (req, res, next) => {
  // const status = 'unclassified';
  // const values = [];

  // for(let i = 0; i < 10; i++) {
  //   values.push([res.locals.urls[i], 'unclassified'])
  // }

  // const sourceURLs = [res.locals.urls[i]];
  // const queryString = `INSERT INTO Reactors (source, status) VALUES ($1, $2, $3, $4,$5)`
  // console.log(values)
  // db.query(queryString, values)

  return next();
  
}

reactorController.getReactors = (req, res, next) => {
  // query db for all reactors
  const queryString = 'SELECT * FROM Reactors'
  // send source urls and status back to the front end
  db.query(queryString)
    .then(data => res.locals.allReactors = data.rows)
    .then(() => next())
  // return next
}
  
module.exports = reactorController;
