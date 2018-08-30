const Payment = require("./paymentschema");
const paymentOperations = {
    viewPayment(userObject,response){
        function fn(obj){
            response.send(JSON.stringify(obj));
        }
        console.log(userObject.query);
        
        Payment.find(userObject.query,(error, docs)=>{
            console.log("this",this);
            if(error){
                userObject.callback({"message" : error});
            } 
            else {
                if(docs && docs.length>0){
                    userObject.callback({"message" : "success" , "data" : docs});
                }
                else{
                    userObject.callback({"message" : "no records found"});
                    console.log('not found');
                }
            }
        });
    },
    addPayment(paymentObject,response){
        console.log("in crud", paymentObject);
        Payment.create(paymentObject,(error)=>{
            response.send(JSON.stringify(paymentObject));
        });
    }
}
module.exports = paymentOperations;