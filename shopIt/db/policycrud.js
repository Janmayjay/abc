const Policy = require("./policyschema");
const policyOperations = {
    viewPolicy(userObject,response){
        function fn(obj){
            response.send(JSON.stringify(obj));
        }
        console.log(userObject.query);
        
        Policy.find(userObject.query,(error, docs)=>{
            console.log("this",this);
            if(error){
                userObject.callback({"message" : error});
            } 
            else {
                if(docs && docs.length>0){
                    var data = {'returnPol' : docs[0].returnPol, "shipTime" : docs[0].shipTime, "region" : docs[0].region};
                    userObject.callback({"message" : "success" , "data" : data});
                }
                else{
                    userObject.callback({"message" : "no records found"});
                    console.log('not found');
                }
            }
        });
    },
    addPolicy(policyObject,response){
        console.log("in crud", policyObject);
        Policy.create(policyObject,(error)=>{
            response.send(JSON.stringify(policyObject));
        });
    },
    editPolicy(policyObject,response){
        function status(obj){
            response.send(JSON.stringify(obj));
        }
        var obj = {"query" : policyObject, "callback" : status};
        
        var keyObject = {"shopname" : obj.query.shopname};

        Policy.update(
            keyObject,
            {$set: obj.query},            
            (error)=>{
                if(error){
                    obj.callback({"message" : error, "flag":"0"});                 
                }
                else{
                    obj.callback({"message" : "Store Policy updated","flag":"1"}); 
                }
            }
        );
    }
    
}
module.exports = policyOperations;