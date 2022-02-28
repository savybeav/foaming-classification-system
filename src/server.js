const express = require('express');
const PORT = 8080;
const path = require('path');
const app = express();

const reactorController = require('./reactorController');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

// route to get all or filtered reactors
app.get('/reactors/:status', reactorController.getReactors, (req, res) => {
 return res.status(200).json(res.locals.allReactors);
});

// route to update reactor entry in postgresql
app.patch('/reactors', reactorController.updateReactor, (req, res) => {
  return res.status(200).json(res.locals.updatedReactor);
})

// route to get all reactors from S3 bucket and add to postgresql 
// app.get('/addReactors', reactorController.getURLs, reactorController.addReactors, (req, res) => {
//   return res.json(res.locals.urls)
// })

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// Express global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
