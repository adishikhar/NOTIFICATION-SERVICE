
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const routes = require('./Routes/routes');
const {RabbitMQ }= require('./setup/rabbitMQ');
const {startWorker }= require('./workers/notificationWorker');


dotenv.config();

const app = express();
app.use(bodyparser.json());
app.use('/', routes);


const main = async () => {
    try {
        await mongoose.connect(process.env.URL);

        await RabbitMQ();

        await startWorker();
        
        PORT = process.env.PORT;
        app.listen('/', (req,res) => {
           res.send('Notification Service is running ✅');
        });
    } catch (err) {
        console.error("Startup Error:", err.message);
        process.exit(1);
    }
};

main();