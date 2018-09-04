
const mongoose = require("./connection");
var Schema = mongoose.Schema;
var policySchema = new Schema({
    "shopname":String,"returnPol":String, "shipTime":String, "region":String
});
var policy = mongoose.model("policy",policySchema);
module.exports = policy;