var express     =   require("express"),
    router      =   express.Router(),
    passport    =   require("passport"),
    User        =   require("../models/user");

//root
router.get("/", function(req, res){
    res.render("landing");
});

// register
router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.render("register");
        }else{
            passport.authenticate('local')(req, res, function(){
                req.flash('success', "Successfuly Registered");
                res.redirect('/campground');
            });
        }
    });
});

//login
router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campground',
    failureRedirect: '/login'
}), function(req, res) {
});
//logout
router.get('/logout', function(req, res) {
   req.logout();
   req.flash('success', "Successfuly Logged Out");
   res.redirect('/campground');
});

module.exports = router;
