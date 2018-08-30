const mongoose = require("./connection");
var Schema = mongoose.Schema;
var productsSchema = new Schema({
    "shopName":String,"name":String,"quantity":String,"price":String,"category":String,"subCategories":Array,"dimensions":Array,"description":String,"tax":String,"COD":String,"featuredImage":String,"otherImages":Array,"Discount":String
});
var Products = mongoose.model("products",productsSchema);
module.exports = Products;