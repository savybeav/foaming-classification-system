const AWS = require('aws-sdk');
// S3 access credentials
const region = 'us-west-2';
const bucket = 'take-home-foam-challenge';
const accessKeyId = 'AKIA6AE547J2U2ODHJVO';
const secretAccessKey = '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';

const db = require('./reactorModels.js')

const reactorController = {};

reactorController.getURLs = async (req, res, next) => {
  try{AWS.config.update({ 
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
  
  next()
  }
  catch (err) {
    next({
      log: `reactorController.getURLs: ERROR: ${err}`,
      message: { err: 'Error occured in reactorController.getURLs middleware.'}
    })
  }
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

  next();
  
}

reactorController.getReactors = async (req, res, next) => {
  const status = [req.params.status];
  
  try{
    let queryString;

    if(status[0] === 'all') {
      queryString = 'SELECT * FROM Reactors'
      const result = await db.query(queryString)
      res.locals.allReactors = result.rows;
    
    } else {
      queryString = `SELECT * FROM Reactors WHERE status=$1`
      const result = await db.query(queryString, status)
      res.locals.allReactors = result.rows;
    }
    // send source urls and status back to the front end
    
    
    next();
  }
  catch (err) {
    next({
      log: `reactorController.getReactors: ERROR: ${err}`,
      message: { err: 'Error occured in reactorController.getReactors middleware.'}
    })
  }
}

reactorController.updateReactor = async (req, res, next) => {
  const queryParams = [req.body.id, req.body.status];

  try{
    const queryString = 'UPDATE Reactors SET status=$2 WHERE id=$1 RETURNING *';

    const result = await db.query(queryString, queryParams)
    
    res.locals.updatedReactor = result.rows;
    
    console.log('result from update query: ',result)

    next();
  }
  catch (err) {
    next({
      log: `reactorController.updateReactor: ERROR: ${err}`,
      message: { err: 'Error occured in reactorController.updateReactor middleware.'}
    })
  }
 }
  
module.exports = reactorController;
