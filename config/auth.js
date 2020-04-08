module.exports = {
    ensureAuthenticated: function (req, res, next) {
        req.session.returnTo = req.originalUrl;
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view this resource');
        res.redirect('/users/login');
    }
}