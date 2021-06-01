var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/agents', function(req, res) {
  res.render('agent', { title: 'Agents' });
});

module.exports = router;