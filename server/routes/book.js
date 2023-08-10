const router= require('express').Router();
const bookSessionController= require('../controller/bookSessionController');

router.post('/book-session',bookSessionController.bookSession);


module.exports= router;