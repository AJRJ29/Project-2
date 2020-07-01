module.exports = function(req, res, next) {
    console.log("------------------------------------------")
    console.log(req.user)
    if(!req.user) {
        req.flash('error', 'You must be logged in to view this page.');
        res.redirect('/auth/login')
    } else {
        next();
    }
}
// async issiue wont redirect me to profile after logging in
