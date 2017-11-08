var middlewareObj = {},
    Campground  =   require("../models/campground"),
    Comment     =   require("../models/comment");

middlewareObj.checkUserOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCamp) {
            if(err){
                // A flash eror can be inserted
                res.redirect('back');
            } else {
                if(foundCamp.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('error', "You do not have permision to do that...");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', "Login First!");
        res.redirect('back');
    }
}

middlewareObj.checkUserCommentOwnership = function checkUserCommentOwnership (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.cid, function(err, foundComment) {
            if(err){
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('error', "You do not have permision to do that...");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', "Login First!");
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', "Please login First!");
    res.redirect('/login');
}


module.exports = middlewareObj;