const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
const cors = require('cors'); 
config();

const productCoffe = require('./routes/Productcoffe.routes');
const productSale = require('./routes/saleProduct.routes');

const app = express();
app.use(bodyParser.json());

app.use(cors());

mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME});
const db = mongoose.connection;

app.use('/product', productCoffe);
app.use('/sale', productSale );

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`iniciado en el puerto ${port}`)
});