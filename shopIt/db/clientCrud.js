var Client = require("./clientSchema");
const clientOperations={
    addClient(object,request,response){
        console.log("@clientCrud",object);
        var status = "";
        this.findClient(object,{"temp":callback});
        // console.log("7",status);
        function callback(tempObj){
            status = tempObj;
            console.log(status);
            if(status == "ok"){
                // object.callback("ok");
                Client.create(object.query.clientData,(error,result)=>{
                    if(error){
                        object.callback(JSON.stringify({"message" : "DB error"}));
                    }
                    else{
                        object.callback(JSON.stringify({"message" : "Customer created", "flag" : 1}));
                    }
                })
            }
            // else if(status == "error"){
            //     object.callback(JSON.stringify({"message" : status}));
            // }
            else{
                object.callback(JSON.stringify({"message" : status}));
            }
        }
    },
    findClient(object,obj){
        var status;
        Client.find({},(error,docs)=>{
            if(error){
                status = "error";
                obj.temp(status);
            }
            else{
                if(docs && docs.length>0){
                    

                    docs = docs.filter(record=>(record.mobile == object.query.clientData.mobile || record.email == object.query.clientData.email)?1:0); 
                    console.log(docs);
                    if(docs.length>0){
                        obj.temp("phone no. OR email id already exists");
                    }
                    else
                        obj.temp("ok");


                }
                else{
                    status = "ok";
                    obj.temp(status);
                }
            }
        })
    },
    viewClient(clientObject,request,response){
        var obj = {};
        var data = [];
        Client.find(clientObject.query,(error,result)=>{
            if(error){
                obj.message = error;
            }
            else{
                if(result.length > 0){
                   result.forEach(index=>{
                    data.push({_id : index._id,name : index.name, email : index.email, mobile : index.mobile, addressLine1 : index.addressLine1, addressLine2:index.addressLine2, city:index.city,postCode : index.postCode}); 
                   });
                }
                else{
                    obj.message = "No records found";
                }
            }
            obj.data = data;
            clientObject.callback(obj);

        })
    },
    login(object,request,response){
        Client.find(object.query,(error,result)=>{
            if(error){
                object.callback("error");
            }
            else{
                if(result.length == 1){
                    object.callback(JSON.stringify({data:{status:1}}));
                }
                else{
                    object.callback(JSON.stringify({data:{error:"Wrong credentials"}}));
                }
            }
        })
    }
}
module.exports = clientOperations;