
const mongoose = require("./connection");
var Schema = mongoose.Schema;
var signupStatusschema = new Schema({
    "shopname":String,"pages":Array
});
var signupStatus = mongoose.model("signupStatusschema",signupStatusschema);
module.exports = signupStatus;