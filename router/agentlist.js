var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/agentlist', function(req, res) {
  res.render('agent', { title: 'Agents' });
  //res.send('Test')
});

module.exports = router;