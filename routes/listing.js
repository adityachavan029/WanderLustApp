const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const { validateReview } = require("../middleware.js");


//Index Route
router.get("/",wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
  
}));

//New Route
router.get("/new", isLoggedIn, (req, res) => {
   
    res.render("listings/new.ejs");
});


//show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews", populate: {
        path: "author",
    },
}).populate("owner");
    if(!listing) {
        req.flash("error", "Listing Does Not Exists!");
        return res.redirect("/listings");
    }
    
    res.render("listings/show.ejs", {listing});
}));

//create route
router.post(
    "/",
    isLoggedIn, 
    
    wrapAsync(async(req, res, next) => {
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
    })
);

//edit route
router.get("/:id/edit",
     isLoggedIn,
     isOwner, 
     wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing Does Not Exists!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

//update Route
router.put("/:id", 
    isLoggedIn,
    isOwner,
    wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id",
     isLoggedIn,
     isOwner, 
     wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
}
));

module.exports = router;