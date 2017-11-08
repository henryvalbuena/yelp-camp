var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
        {name:"Pt1",
        image: "https://farm5.staticflickr.com/4420/37403014592_c5f5d37906.jpg",
        detail: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
        {name:"Pt2",
        image: "https://farm1.staticflickr.com/756/21043112059_788cbc12ed.jpg",
        detail: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
        {name:"Pt3",
        image: "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg",
        detail: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."}
    ];

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("All campgrounds removed");
            data.forEach(function(seed) {
                console.log("Campground created");
                Campground.create(seed, function(err, campgroud){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added new comment");
                        Comment.create({
                            text: "This is a greate place, whooohooooo!!!!!!",
                            author: "roy"
                        }, function(err, comment){
                            if(err){
                              console.log(err); 
                            }else{
                                campgroud.comments.push(comment);
                                campgroud.save();
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;