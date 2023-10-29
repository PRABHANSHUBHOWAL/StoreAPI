require('dotenv').config()
//async errors

const express=require('express');
const app=express();


const connectDB = require('./db/connect');


// Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')


// Routes
app.use('api/v1/products',);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();
