
const mongoose = require("./connection");
var Schema = mongoose.Schema;
var bankSchema = new Schema({
    "shopname":String,"panCard":String, "accNo":String, "name":String
});
var bank = mongoose.model("bank",bankSchema);
module.exports = bank;