var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id:1 , username:'respond_with_a_resource'},
    {id:2 , username:'respond_with_a_resources'},
    {id:3 , username:'respond_with_a_resourceses'}
  ])
});

module.exports = router;
