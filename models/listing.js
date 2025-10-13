const mongoose = require("mongoose");
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
});

const Listing = mongoose.model("Listing", listningSchema);
module.exports = Listing;