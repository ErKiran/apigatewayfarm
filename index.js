/* eslint-disable no-undef */
const express = require('express')
require('dotenv').config();
const logger = require('./logger');


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.all('*',(req,res,next)=>{
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    logger.log({
        level: 'info',
        message: `Method: ${req.method}, URL: ${req.url} IP: ${ip}, User: ${req.user.userId}`
    })
    next()
})

app.use('/',require('./api/routes'))

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    logger.log({
        level:'info',
        message:`Server is listening on the port ${port}`,
        label:"Init"
    })
})

