const express = require('express');
const app = express();
const bookRoutes = require('./api/routes/books');
const userRoutes = require('./api/routes/user');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongo "mongodb://cluster0-shard-00-00-65f25.mongodb.net:27017,cluster0-shard-00-01-65f25.mongodb.net:27017,cluster0-shard-00-02-65f25.mongodb.net:27017/test?replicaSet=Cluster0-shard-0" --ssl --authenticationDatabase admin --username mongoadmin --password mongoadmin');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
