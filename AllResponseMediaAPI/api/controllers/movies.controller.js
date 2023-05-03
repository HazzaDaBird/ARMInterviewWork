const AppError = require("../helpers/appError");
const con = require("../services/db.service");

exports.getAllMovies = (req, res, next) => {
    con.query("SELECT * FROM MovieTable", function (err, data, fields) {
      if(err) return next(new AppError(err))
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
   };

   exports.getMoviesFromCriteria = (req, res, next) => {
    if(!req.query) return next(new AppError("Invalid, No Criteria Given", 400))

    const searchCriteria = Object.keys(req.query)[0];
    const searchValue = req.query[searchCriteria];

    con.query(`SELECT * FROM MovieTable WHERE ${searchCriteria} LIKE '${searchValue}%';`, function (err, data, fields) {
      if(err) return next(new AppError('No movies found from the criteria', 404));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
   };


   exports.getTopFiveRatedMovies = (req, res, next) => {
    con.query(`SELECT * FROM MovieTable ORDER BY averageRating DESC LIMIT 5;`, function (err, data, fields) {
      if(err) return next(new AppError('No movies found from the criteria', 404));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
   };

   