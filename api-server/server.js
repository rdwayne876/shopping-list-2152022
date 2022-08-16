const mongoose = require('mongoose')

const dotenv = require('dotenv')
const app = require('./app')

dotenv.config()

const DB_CONN = process.env.NODE_ENV === 'production' ?
                process.env.DATABASE_PRODUCTION.replace('<PWD>', process.env.DATABASE_PASSWORD) :
                process.env.DATABASE;

mongoose.connect(DB_CONN)
    .then( conn => {
        console.log( 'Successfully connected to MongoDB!')
})

const port =  process.env.port

app.listen( port, () => {
    console.log(`Server listening on Port ${port}...`);
})