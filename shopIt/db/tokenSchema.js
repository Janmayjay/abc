const mongoose = require("./connection");
var Schema = mongoose.Schema;
var tokenSchema = new Schema({
    "email":String,"token":String
})
var Tokens = mongoose.model("tokens",tokenSchema);
module.exports = Tokens;