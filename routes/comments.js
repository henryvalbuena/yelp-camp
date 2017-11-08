var express     =   require("express"),
    router      =   express.Router({mergeParams:true}),
    Campground  =   require("../models/campground"),
    middleware  =   require("../middleware"),
    Comment     =   require("../models/comment");

// comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        }else{
        res.render("comments/new", {campground});
        }
    });
});

// comments show
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campground")
        }else{
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else{
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash('success', "Successfuly added Comment...");
                   res.redirect("/campground/"+campground._id);
               }
            });
        }
    });
    
});

router.get('/:cid/edit', middleware.checkUserCommentOwnership, function(req, res){
    Comment.findById(req.params.cid, function(err, commentFound) {
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', "Successfuly edited Comment...");
           res.render('comments/edit', {campground_id: req.params.id, comment: commentFound}); 
        }
    });
    
});

router.put('/:cid', middleware.checkUserCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.cid, req.body.comment, function(err, comment) {
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campground/'+req.params.id);
        }
    });
});

router.delete('/:cid', middleware.checkUserCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.cid, function(err){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campground/'+req.params.id);
        }
    });
});

module.exports = router;