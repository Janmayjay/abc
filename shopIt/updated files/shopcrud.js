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

    addshop(shopObject,response){
        console.log("inside addShop", shopObject)
        function status(status){
            if(status == "ok"){
                console.log("inside findcat :",status);
                Shop.create(shopObject,(error)=>{
                    if(error){
                        response.send(JSON.stringify({"message" : error, "flag":"0"}));    
                    }
                    else{
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
        console.log("received Object",shopObject);
        
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
        shopObject.fn = status;
        var keyObject = {"link" : shopObject.link};

        Shop.update(
            keyObject,
            {$set: shopObject},            
            (error)=>{
                if(error){
                    shopObject.fn({"message" : error, "flag":"0"});                 
                }
                else{
                    shopObject.fn({"message" : "shop edited","flag":"1"}); 
                }
            }
        );
    }
}
module.exports = ShopOperations;