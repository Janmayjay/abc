const mongoose = require("./connection");
var Schema = mongoose.Schema;
var clientSchema = new Schema({
    "name":String,"email":String,"mobile":Number,"addressLine1":String,"addressLine2":String,"city":String,"postCode":Number,"password":String
});
var Client = mongoose.model("clients",clientSchema);
module.exports = Client;