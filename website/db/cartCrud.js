var mongo = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
const Products = require("./productSchema");
const productsOperations = {
    find(userObject){
        Products.find(userObject.query,(error,docs)=>{
            if(error){
                userObject.callback({'message' : error, found: 0});
            }
            else{
                userObject.callback({'message' : "products found", "data" : docs, found: 1});                
            }
        });
    }
}
module.exports = productsOperations;