const Tokens = require("./tokenSchema");
const tokenModel = require("../models/tokens");
var randomstring = require("randomstring");
const tokensOperations = {
    addToken(email,response){
        console.log("creating token");
        var token = randomstring.generate(10);
        var tokenObject = new tokenModel(email,token);
        console.log(tokenObject);
        const mailUtility = require("../utils/mail");
        Tokens.create(tokenObject,(error)=>{
            if(error){
                response.send("Something Wrong in DB",error);    
            }
            else{
                mailUtility(tokenObject,response);
                // response.send({"response":"Product Added"});    
            }
        });
    },
    find(email,token,request,response){
        var text=Tokens.find({"email":email,"token":token},(error,docs)=>{
            if(error){
                console.log(error);
                // obj.fn(error);
            }
            else{
                // response.send(JSON.stringify(docs));
                console.log("find",docs);
            }
            // obj.fn(docs);
        });}
}
module.exports = tokensOperations;