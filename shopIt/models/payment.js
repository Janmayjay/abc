class Payment{
    constructor(order_id,customer_id,date,sellerid,status){
        this.order_id=order_id,
        this.customer_id=customer_id,
        this.date=date,
        this.sellerid=sellerid,
        this.status=status
    }
}
module.exports = Payment;