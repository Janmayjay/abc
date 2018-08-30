class Order{
    constructor(name,customerId,customerOrderAddress,productId,sellerId){
        // this.itemId=itemId,
        // this.orderId=orderId,
        this.name=name,
        this.customerId=customerId,
        this.customerOrderAddress=customerOrderAddress,
        this.productId=productId,
        this.sellerId=sellerId
    }
}
module.exports = Order;