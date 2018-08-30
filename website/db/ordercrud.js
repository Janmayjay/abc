const Order = require("./orderschema");
const orderOperations = {
    viewOrder(userObject,response){
        function fn(obj){
            response.send(JSON.stringify(obj));
        }
        console.log(userObject.query);
        
        Order.find(userObject.query,(error, docs)=>{
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
    addOrder(orderObject,response){
        console.log("in crud", orderObject);
        Order.create(orderObject,(error)=>{
            response.send(JSON.stringify(orderObject));
        });
    }
}
module.exports = orderOperations;