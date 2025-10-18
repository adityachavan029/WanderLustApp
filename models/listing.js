const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;



const listningSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    description: String,
     image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
    }
},
    price: Number,
    location: String,
    country: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ], 
});

listningSchema.post("findOneAndDelete", async (listing) => {
  if(listing ) {
    await review.deleteMany({_id: {$in: listing.reviews}});
  }
  
});

const Listing = mongoose.model("Listing", listningSchema);
module.exports = Listing;