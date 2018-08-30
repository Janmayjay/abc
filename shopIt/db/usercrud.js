const User = require("./userschema");
const UserOperations = {
    // addUser(userObject,request,response){
    //     this.find(userObject,request,response)
    //     User.create(userObject,(error)=>{
    //         if(error){
    //             response.send("Something Wrong in DB",error);    
    //         }
    //         else{
    //             response.send("login to your account"+' <a href="/">login</a>');    
    //         }
    //     });
    // },
    findLogin(userObject,request,response){
        var obj = {"phone":userObject.query.mobile};
        User.find(obj,(error, docs)=>{
            if(error){
                response.send(JSON.stringify({data:{"authenticate":0,"error":"Some Error in DB"}}));
            } 
            else {
                // if(docs && docs.length>0){
                //     console.log("record found",docs);
                //     var dbPassword = docs[0].gstin;
                //     var reqPassword = userObject.password;
                //     console.log("dbpass :",dbPassword,"user pass:", reqPassword);
                //     if(dbPassword == reqPassword) {
                //         request.session.userid = docs[0].shopname;
                //         console.log("======== setting parameters in request =========");
                //         console.log(request.session,", cookie :",request.signedCookies,", sessionID :",request.sessionID,", active-sessions :",request.sessions);
                //         console.log("======== parameters set successfully =========");
                //         // request.cookies.id = dbPassword;
                //         response.send(JSON.stringify({data:{"authenticate":1,"page":"index.html"}}));
                //     } 
                //     else {
                //         response.send(JSON.stringify({data:{"authenticate":0,"error":"wrong credentials"}}));
                //     } 
                // }
                // else{
                //     response.send(JSON.stringify({data:{"authenticate":0,"error":"Invalid userid or password"}}));
                // }
                userObject.callback(docs);
            }
        });
    },
    addUser(userObject,response){
        console.log("inside addShop", userObject)
        function status(status){
            if(status == "ok"){
                console.log("inside findcat :",status);
                User.create(userObject,(error)=>{
                    if(error){
                        response.send(JSON.stringify({"message" : error}));    
                    }
                    else{
                        response.send(JSON.stringify({"message" : "account created","flag":"1"}));    
                        
                    }
                });
            }
            else{
                response.send(JSON.stringify({"message" : status}));                    
            }
        }
        userObject.fn = status;
        this.find(userObject,response);       
    },
    find(userObject,response){
        var callback = userObject.fn;
        var obj = {"phone":userObject.mobile,"fn":callback};
        
            User.find({},(error, docs)=>{
                console.log("inside find");
                if(error){
                    console.log("db error");
                    obj.fn(error);
                } 
                else {
                    console.log("else");
                    if(docs && docs.length>0){
                            // obj.fn("shop name already exists");
                            docs = docs.filter(record=>(record.phone == userObject.phone || record.shopname == userObject.shopname)?1:0); 
                            console.log(docs);
                            if(docs.length>0){
                                obj.fn("phone no. OR shop name already exists");
                            }
                            else
                               obj.fn("ok");
                                
                    }
                    else{
                        console.log("else else");
                        obj.fn("ok");
                    }
                }
            });
        },
        updateRequiredPages(pageObject){
            User.update({ shopname: pageObject.query.shopname },
                { $set: {requiredPages:pageObject.query.pages} },error =>{
                    if (error) {
                        // response.send(
                        //     JSON.stringify({ message: "unable to update user info", flag: 0 })
                        // );
                        console.log("from usercrud udateRequiredPages (error)",error);
                    } else {
                        // response.send(
                        // JSON.stringify({ message: "updated info", flag: 1 })
                        // );
                        console.log("from usercrud udateRequiredPages (updated successfully)");
                    }
                });
        },
    
    viewSeller(keyObject,request,response){
        function status(obj){
            response.send(JSON.stringify(obj));
        }
        User.find(keyObject,(error, docs)=>{
            console.log("inside find");
            if(error){
                console.log("db error");
                status({"message" : error});
            } 
            else {
                console.log("else");
                if(docs && docs.length>0){
                   
                        status({"message" : "","data" : docs[0]});
                    
                    
                }
                else{
                    console.log("else else");
                    
                    status({"message" : "no details found"});
                }
            }
        });
    },
    editSeller(userObject,request,response){
        function status(obj){
            response.send(JSON.stringify(obj));
        }

        function callback(report){
            if(report.message != ""){
                console.log("already exists no flag detected");
                status(report);
            }
            else{
                console.log("flag exists ok status");                
                var keyObject = {"shopname" : userObject.shopname};
                var updatedObject = {"name" : userObject.name, "gstin" : userObject.gstin, "phone" : userObject.pno};
                console.log(keyObject,updatedObject);
                User.update(
                    keyObject,
                    {$set: updatedObject},            
                    (error)=>{
                        if(error){
                            status({"message" : error});                 
                        }
                        else{
                            status({"message" : "Profile Updated", "flag" : 1}); 
                        }
                    }
                );
            }
       
        }
        userObject.fn = callback;
        var keyObject = {"phone" : userObject.pno}
        console.log("key and user object : ", keyObject, userObject);
        User.find(keyObject,(error, docs)=>{
            console.log("inside find");
            if(error){
                console.log("db error");
                userObject.fn({"message" : error});
            } 
            else {
                console.log("something found");
                if(docs && docs.length>0){
                    docs = docs.filter(record=>record.phone==userObject.pno);
                    docs = docs.filter(record=>record.shopname!=userObject.shopname);
                    console.log(docs);
                    var len = docs.length; 
                    if(len == 0){
                        console.log("skipped itself in search");
                        userObject.fn({"message" : "", "flag" : 0});
                    }                        
                    else{
                        console.log("found another one after skipping itself");
                        userObject.fn({"message" : "Phone no. already exists"});                            
                    }                    
                }
                else{
                    console.log("nothing found means new phone no.");
                    userObject.fn({"message" : "", "flag" : "0"});
                }
            }
        });
    },
    emailFind(email,request,response){
        User.find({"email":email},(err,docs)=>{
            if(err){
                response.send("some error");
            }            
            else{
                if(docs && docs.length>0){
                    console.log("email record found",docs);
                    response.send("true");
                }
                else{
                    response.send("Invalid userid or Password");
                }
            }
        });
    },
    updatePassword(email,password,request,response){
        User.findOneAndUpdate({"email":email},{$set:{"gstin":password}},{returnNewDocument : true},(error,docs)=>{
            if(error){
                response.send("some error");
            }
            else{
                if(docs && docs.length>0){
                    console.log("password updated",result);
                    response.send("true");
                }
                else{
                    response.send("Invalid ");
                }
            }
        });
    }

}
module.exports = UserOperations;