const router= require('express').Router();
const availablityController= require('../controller/availablityController');

router.post('/add-availablity',availablityController.addAvailablity);
router.get('/get-availablity',availablityController.getAvailablity);
router.get('/get-availablity/:day',availablityController.getTimeSlotsInday);
router.delete('/delete-availablity/:id',availablityController.deleteAvailablity);


module.exports= router;