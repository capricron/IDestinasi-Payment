var express = require('express');
const { paymentHandler, notificationMidtrans } = require('../controllers/paymentController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/payment", paymentHandler)

router.post('/payment/notif', notificationMidtrans)

module.exports = router;
