const createError = require('http-errors');

const handleErrors = function (app) {
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // generic error handler
    // app.use(function (err, req, res, ignoreNext) {
    //     // set locals, only providing error in development
    //     res.locals.message = err.message;
    //     res.locals.error = req.app.get('env') === 'development' ? err : {};
    //     // render the error page
    //     res.status(err.status || 500);
    //     res.setHeader('Content-Type', 'text/html');
    //     res.render('error');
    // });
};

module.exports = handleErrors;