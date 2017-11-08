var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    LocalStrategy   = require("passport-local"),
    passport        = require("passport"),
    commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index"),
    flash           = require("connect-flash"),
    methodOverride  = require("method-override");
    
// seedDB();
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});
// mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
// mongoose.connect("mongodb://roy:yelpcamp_roy@ds149905.mlab.com:49905/yelpcamp_roy", {useMongoClient: true});
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
    secret: '12345qwert',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});
app.use(indexRoutes);
app.use("/campground/:id/comments", commentRoutes);
app.use("/campground", campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started...");
});