const express = require('express');
const router  = express.Router(); 
const movieController = require('../controllers/movies.controller'); 

router.route("/").get(movieController.getAllMovies);
router.route("/from").get(movieController.getMoviesFromCriteria);
router.route("/ratings").get(movieController.getTopFiveRatedMovies);

module.exports = router;