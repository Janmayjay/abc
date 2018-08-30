var mongo = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
const Products = require("./productSchema");
const productsOperations = {
    addUser(userObject,response){
        Products.create(userObject,(error)=>{
            if(error){
                response.send("Something Wrong in DB",error);    
            }
            else{
                response.send({"response":"Product Added"});    
            }
        });
    },
    find(obj,shopObject){
        var text=Products.find({"shopName":shopObject},(error,docs)=>{
            if(error){
                obj.fn(error);
            }
            else
            obj.fn(docs);
        });
    },
    deleteProducts(productObject, response) {
        console.log("from crud", productObject.name);
        Products.deleteOne({ _id: objectId(productObject.name) }, function(err) {
          if (err) response.send(JSON.stringify({ message: error }));
          else response.send(JSON.stringify({ message: "Product Deleted" }));
        });
    },
    updateProducts(productObject,id, response) {
        
        Products.update(
          { _id: id },
          { $set: productObject },
          error => {
            if (error) {
            //   response.send(JSON.stringify({ message: error, flag: "0" }));
            console.log(error);
            } else {
              response.send(
                JSON.stringify({ message: "product edited", flag: "1" })
              );
            }
          }
        );
    },
    find1(obj,shopObject){
        Products.find(shopObject,(error,docs)=>{
            if(error){
                obj.fn(error);
                console.log("reached find1");
            }
            else
            obj.fn(docs);
        });
    },
    updateProduct(obj,shopname){
        this.find({fn : callback},shopname);
        function callback(docs){
            var q;
        for(let key in obj){
            var availableQuantity = docs.filter(product=>product._id == key)[0].quantity;
            q = availableQuantity- obj[key];
            Products.update(
                {_id: key},
                {$set : {quantity : q}},
                (error)=>{
                    var message = (error)?error:"ok";
                    console.log(message);
                }
            );
        }

        }
        
        

    },

}
module.exports = productsOperations;