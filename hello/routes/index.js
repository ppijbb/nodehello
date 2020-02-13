const express = require('express');
const member = require('./member');
const survey = require('./survey');
const dbtest = require('./dbtest');

const router = express.Router();

router.use('/member',member);
router.use('/survey',survey);
router.use('/dbtest',dbtest)
module.exports = router;
