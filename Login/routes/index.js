const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/' , (req, res) => res.render('welcome'));

// router.route('/searchUser')
//  	.get(function (req, res) {
// 		res.sendFile(path + '/searchUser.ejs');
// 	});
		  
module.exports = router;