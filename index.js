/* eslint-disable no-undef */
const express = require('express');
const passport = require('passport');
require('dotenv').config();
const logger = require('./logger');

require('./utils/passportHelper')(passport)


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(passport.initialize());


app.all('*',(req,res,next)=>{
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    logger.log({
        level: 'info',
        label:'API Handler',
        message: `Method: ${req.method}, URL: ${req.url} IP: ${ip},`
    })
    next()
})

app.use('/api/v1',require('./api/routes'))

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    logger.log({
        level:'info',
        message:`Server is listening on the port ${port}`,
        label:"Init"
    })
})

