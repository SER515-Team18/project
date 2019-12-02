const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/' , (req, res) => res.render('login'));

// router.route('/searchUser')
//  	.get(function (req, res) {
// 		res.sendFile(path + '/searchUser.ejs');
// 	});
		  
module.exports = router;