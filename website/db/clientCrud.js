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
                        object.callback(JSON.stringify({data:{error:"db error"}}));
                    }
                    else{
                        object.callback(JSON.stringify({data:{status:1}}));
                    }
                })
            }
            else if(status == "error"){
                object.callback(JSON.stringify({data:{error:"find error"}}));
            }
            else{
                object.callback(JSON.stringify({data:{error:"A user with this email id already exist"}}));
            }
        }
    },
    findClient(object,obj){
        var status;
        Client.find({"email":object.query.clientData.email},(error,result)=>{
            if(error){
                status = "error";
                obj.temp(status);
            }
            else{
                if(result.length==1){
                    status = "A user with this email id already exist";
                    obj.temp(status);
                }
                else{
                    status = "ok";
                    obj.temp(status);
                }
            }
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