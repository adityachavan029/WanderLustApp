const mongoose = require("mongoose");
const { data } = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connection successful to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const updatedData = data.map((obj) => ({
    ...obj,
    owner: "68f760e953540a0e9c77b97b",
  }));

  await Listing.insertMany(updatedData);
  console.log("Data was initialized");
};

initDB();