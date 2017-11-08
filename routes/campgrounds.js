var express     =   require("express"),
    router      =   express.Router(),
    middleware  =   require("../middleware"),
    Campground  =   require("../models/campground");

// show campgroud
router.get("/", function(req, res){
    Campground.find({}, function(err, camp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:camp});
        }
    });
        
});
// create a new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});
// show campground by id
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campgrounds: foundCamp});
        }
    });
    
});

router.post("/", middleware.isLoggedIn,function(req, res){
    var name = req.body.name;
    var image = req.body.image,
        price = req.body.price;
    var detail = req.body.detail;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name: name, image: image, price: price, detail: detail, author: author};
   
    Campground.create(newCamp, function(err,newCamp){
        if(err){
            console.log(err);
        }else{
            console.log(newCamp);
            res.redirect("/campground");
        }
    });
    
});

router.get("/:id/edit", middleware.checkUserOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp){
            res.render("campgrounds/edit", {campground: foundCamp});
    });
    
});

router.put("/:id", middleware.checkUserOwnership, function(req, res){
    console.log('inside put route');
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){
            res.redirect('/campground');
        } else {
            res.redirect('/campground/'+req.params.id);
        }
    });
});

router.delete('/:id', middleware.checkUserOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
        res.redirect('/campground');
        } else {
           res.redirect('/campground'); 
        }
    });
});


module.exports = router;