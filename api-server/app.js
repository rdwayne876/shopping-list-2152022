const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require( 'cors')
const categoryRouter = require( './routes/category')
const itemRouter = require( './routes/item')

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

//Morgan
app.use((req, res, next) =>{
  switch (req.method){
    case 'DELETE':
        console.log(`\x1b[43m\x1b[1m[SHOPPING-LIST API V1]\x1b[0m - \x1b[31m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'PUT':
        console.log(`\x1b[44m\x1b[4m[SHOPPING-LIST API V1]\x1b[0m - \x1b[32m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'PATCH':
      console.log(`\x1b[43m\x1b[1m[SHOPPING-LIST API V1]\x1b[0m - \x1b[34m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'POST':
      console.log(`\x1b[43m\x1b[1m[SHOPPING-LIST API V1]\x1b[0m - \x1b[33m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'GET':
      console.log(`\x1b[43m\x1b[1m[SHOPPING-LIST API V1]\x1b[0m - \x1b[35m${req.method}\x1b[0m - ${req.path}`);
      break;
    default:
      console.log(`\x1b[43m\x1b[1m[SHOPPING-LIST API V1]\x1b[0m - \x1b[35m${req.method}\x1b[0m - ${req.path}`);
  }
  next();
})

//routes
app.use( '/api/v1/item', itemRouter)
app.use( '/api/v1/category', categoryRouter)

module.exports = app;