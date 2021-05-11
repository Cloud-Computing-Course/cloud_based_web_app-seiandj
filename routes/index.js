var express = require('express');
var router = express.Router();

/* GET home page. Passing in title variable*/
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Deliverable 2' });
});

module.exports = router;
