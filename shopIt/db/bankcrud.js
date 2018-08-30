const Bank = require("./bankschema");
const bankOperations = {
    viewBank(userObject,response){
        function fn(obj){
            response.send(JSON.stringify(obj));
        }
        console.log(userObject.query);
        
        Bank.find(userObject.query,(error, docs)=>{
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
    addBank(bankObject,response){
        console.log("in crud", bankObject);
        Bank.create(bankObject.query,(error)=>{
            bankObject.callback({"message" : "Bank details added", "flag" : 1});
            // response.send(JSON.stringify(bankObject));
        });
    },
    editBank(bankObject,response){
        function status(obj){
            response.send(JSON.stringify(obj));
        }
        var obj = {"query" : bankObject, "callback" : status};
        
        // bankObject.fn = status;
        var keyObject = {"shopname" : obj.query.shopname};

        Bank.update(
            keyObject,
            {$set: obj.query},            
            (error)=>{
                if(error){
                    obj.callback({"message" : error, "flag":"0"});                 
                }
                else{
                    obj.callback({"message" : "Bank updated","flag":"1"}); 
                }
            }
        );
    }
    
}
module.exports = bankOperations;