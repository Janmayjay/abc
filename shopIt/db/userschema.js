const mongoose = require("./connection");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    "name":String,"phone":Number,"email":String,"url":String,"gstin":Number,"shopname":String,"requiredPages":Array
});
var User = mongoose.model("users",userSchema);
module.exports = User;