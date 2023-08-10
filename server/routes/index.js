const router = require("express").Router();
const availablityRoute= require('./availablity')
const bookRoute= require('./book')
const appoinmentRoute= require('./appoinment')


router.use('/api/v1/availablity',availablityRoute);
router.use('/api/v1/book',bookRoute);
router.use('/api/v1/appoinment',appoinmentRoute);


module.exports= router