
const mongoose = require("./connection");
var Schema = mongoose.Schema;
var paymentSchema = new Schema({
    "order_id":String,"customer_id":String,"date":Number,"sellerid":String,"status":String
});
var payment = mongoose.model("payment",paymentSchema);
module.exports = payment