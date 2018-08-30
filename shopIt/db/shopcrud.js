const Shop = require("./shopschema");
const ShopOperations = {
    modifyshop(shopObject,response){
   
        Shop.update(
            {link: shopObject.link},
            {$set: shopObject},            
            (error)=>{
                if(error){
                    response.send("Something Wrong in DB",error);    
                }
                else{
                    response.send("info added");    
                }
            }
        );
    },

    addshop(shopObject,request,response){
        console.log("inside addShop", shopObject)
        function status(status){
            if(status == "ok"){
                console.log("inside findcat :",status);
                Shop.create(shopObject,(error)=>{
                    if(error){
                        response.send(JSON.stringify({"message" : error, "flag":"0"}));    
                    }
                    else{
                        const updateRequiredPages = require("./usercrud");
                        request.session.requiredPages.splice(0,1);
                        updateRequiredPages.updateRequiredPages(
                            {query:{shopname:request.session.userid,pages:request.session.requiredPages}}
                        );

                        response.send(JSON.stringify({"message" : "shop created","flag":"1"}));    
                        
                    }
                });
            }
            else{
                response.send(JSON.stringify({"message" : status}));                    
            }
        }
        shopObject.fn = status;
        this.findShop(shopObject,response);       
    },
    findShop(shopObject,response){
        var callback = shopObject.fn;
        var obj = {"name" : shopObject.name,"fn":callback};
            Shop.find(obj,(error, docs)=>{
                console.log("inside find");
                if(error){
                    console.log("db error");
                    obj.fn(error);
                } 
                else {
                    console.log("else");
                    if(docs && docs.length>0){
                        obj.fn("shop name already exists");                            
                    }
                    else{
                        console.log("else else");
                        obj.fn("ok");
                    }
                }
            });
        },

    viewShop(shopObject,response){
        function status(obj){
            response.send(JSON.stringify(obj));
            
        }
        Shop.find(shopObject,(error, docs)=>{
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
    editShop(shopObject, response){
        function status(obj){
            response.send(JSON.stringify(obj));
        }
        var obj = {"query" : shopObject, "callback" : status};
        // shopObject.fn = status;
        var keyObject = {"link" : obj.query.link};
        console.log(shopObject);

        Shop.update(
            keyObject,
            {$set: obj.query},            
            (error)=>{
                if(error){
                    obj.callback({"message" : error, "flag":"0"});                 
                }
                else{
                    obj.callback({"message" : "Shop Updated","flag":"1"}); 
                }
            }
        );
    }
}
module.exports = ShopOperations;