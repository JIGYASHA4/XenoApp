const mongoose = require("mongoose");

const XenoSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const XenoModel = mongoose.model("customers", XenoSchema);
module.exports = XenoModel;
