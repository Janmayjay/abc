
const mongoose = require("./connection");
var Schema = mongoose.Schema;
var orderSchema = new Schema({
    "itemId":String,"orderId":String,"name":String,"customerId":String,"customerOrderAddress":String,"productId":String,"sellerId":String
});
var order = mongoose.model("order",orderSchema);
module.exports = order;