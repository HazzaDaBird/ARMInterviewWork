const AppError = require("../helpers/appError");
const con = require("../services/db.service");

exports.getTopMoviesByUser = (req, res, next) => {
    if(!req.query) return next(new AppError("Invalid, No User Criteria Given", 400))
    if(!req.query.name) return next(new AppError("Invalid, Users Name Not Given", 400))

    con.query(`SELECT * FROM MovieTable m INNER JOIN UserTable u WHERE name='${req.query.name}' ORDER BY rating LIMIT 5;`, function (err, data, fields) {
        console.log(data)
      if(err) return next(new AppError(err))
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
   };


exports.addOrUpdateUserAndRating = async (req, res, next) => {
    if(!req.query) return next(new AppError("Invalid, No User Criteria Given", 400))
    if(!req.query.name) return next(new AppError("Invalid, Users Name Not Given", 400))
    if(!req.query.movieId) return next(new AppError("Invalid, No Movie Id Given", 400))
    if(!req.query.rating || (req.query.rating <= 0 || req.query.rating > 5)) return next(new AppError("Invalid Rating, must be between 1 and 5", 400))
    

    const movieIdCheck = await checkMovieLibrary();
    if(req.query.movieId <= 0 || req.query.movieId >= movieIdCheck[0].id + 1)
    {
        return next(new AppError("Invalid MovieId this movie doesnt exist", 400))
    }

    const response = await checkIfExists(req.query.name, req.query.movieId);
    if(response == '') {
        con.query(`INSERT INTO UserTable (name, movieId, rating) VALUES ('${req.query.name}',${req.query.movieId},${req.query.rating});`, function (err, data, fields) {
            if(err) return next(new AppError(err, 404));
            res.status(200).json({
              status: "success",
              message: "New User Rating Added!"
            });
          });
    } else {
        con.query(`UPDATE UserTable SET rating='${req.query.rating}' WHERE name='${req.query.name}' AND movieId=${req.query.movieId};`, function (err, data, fields) {
            if(err) return next(new AppError(err, 404));
            res.status(200).json({
              status: "success",
              message: "New User Rating Updated!"
            });
          });
    }
   };

   function checkIfExists(name, movieId) {
    return new Promise(function(resolve, reject) {
        con.query(`SELECT * FROM UserTable WHERE name='${name}' AND movieId='${movieId}';`, function (err, data, fields) {
            if(err) return next(new AppError(err, 404));
            resolve(data)
          });
    })
   }
   function checkMovieLibrary(){
    return new Promise(function(resolve, reject) {
        con.query(`SELECT id FROM MovieTable ORDER BY id DESC`, function (err, data, fields) {
            if(err) return next(new AppError(err, 404));
            resolve(data)
          });
    })
   }