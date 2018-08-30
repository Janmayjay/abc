
const mongoose = require("./connection");
var Schema = mongoose.Schema;
var categorySchema = new Schema({
    "url":String,"name":String, "subCategories":String,    
});
var Category = mongoose.model("category",categorySchema);
module.exports = Category;