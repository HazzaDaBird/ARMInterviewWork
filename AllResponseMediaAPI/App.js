const express = require("express");
const cors = require("cors");
const AppError = require("./api/helpers/appError");
const errorHandler = require("./api/helpers/errorHandler");
const movieRoutes = require('./api/routes/movies.routes');
const userRoutes = require('./api/routes/users.routes');

const app = express();

//ROUTING
app.use('/movies', movieRoutes)
app.use('/users', userRoutes)
app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exist`, 404));
   });
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Your app is listening on port 3000')
})

module.exports = app;