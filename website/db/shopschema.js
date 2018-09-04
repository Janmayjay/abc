
const mongoose = require("./connection");
var Schema = mongoose.Schema;
var shopSchema = new Schema({
    "name":String, "link":String, "desc":String, "pno":Number, "email":String, "gstin":String,"pincode":Number, "city":String, "address":String
});
var Shop = mongoose.model("shop",shopSchema);
module.exports = Shop;