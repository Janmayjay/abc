const Shop = require("./shopschema");
const ShopOperations = {
    viewShop(shopObject,response){
        
        Shop.find(shopObject.query,(error, docs)=>{
            console.log("inside find");
            if(error){
                console.log("db error");
                shopObject.callback({"message" : error});
            } 
            else {
                console.log("else");
                if(docs && docs.length>0){
                    shopObject.callback({"message" : "shop details found","data" : docs[0]});
                }
                else{
                    console.log("else else");
                    shopObject.callback({"message" : "no details found"});
                }
            }
        });
    }
    
}
module.exports = ShopOperations;