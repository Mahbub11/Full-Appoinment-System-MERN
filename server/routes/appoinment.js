const router= require('express').Router();
const appoinmentController= require('../controller/appoinmentController');

router.get('/get-appoinment/:date',appoinmentController.getAppoinments);
module.exports= router;