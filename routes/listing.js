const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const{storage}=require("../cloudConfig.js")
const upload = multer({ storage });


router
.route("/")
//index route
.get(wrapAsync (listingController.index))
//create route
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));

//New route
router.get("/new",isLoggedIn, listingController.renderNewForm) ; 


router
.route("/:id")
//show route
.get(wrapAsync ( listingController.showListings))
//update route
.put(isLoggedIn,isOwner,validateListing,upload.single("listing[image]"),wrapAsync (listingController.updateListing))
//delete route
.delete(isLoggedIn,isOwner,wrapAsync (listingController.deleteListing));


 //Edit route
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync (listingController.editListing));

module.exports=router;

