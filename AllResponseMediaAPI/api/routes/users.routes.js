const express = require('express');
const router  = express.Router(); 
const userController = require('../controllers/users.controller'); 

router.route("/").post(userController.addOrUpdateUserAndRating);
router.route("/ratings").post(userController.getTopMoviesByUser);
module.exports = router;