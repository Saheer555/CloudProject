module.exports = {
    ensureAuthenticated: function (req, res, next) {
        req.session.returnTo = req.originalUrl;
        var returnUrl = req.session.returnTo.toString();

        if (returnUrl.substring(1,5) === 'rent') {
            returnUrl = returnUrl.replace(/rent/, "car");
            req.session.returnTo = returnUrl;
        }

        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view this resource');
        res.redirect('/users/login');
    }
}