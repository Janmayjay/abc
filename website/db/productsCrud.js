var mongo = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
const Products = require("./productSchema");
const productsOperations = {
    // addUser(userObject,response){
    //     Products.create(userObject,(error)=>{
    //         if(error){
    //             response.send("Something Wrong in DB",error);    
    //         }
    //         else{
    //             response.send({"response":"Product Added"});    
    //         }
    //     });
    // },
    find(userObject){
        Products.find(userObject.query,(error,docs)=>{
            if(error){
                userObject.callback({'message' : error});
            }
            else{
                console.log(docs);
                userObject.callback({'message' : "products found", "data" : docs});                
            }
        });
    },
    // deleteProducts(productObject, response) {
    //     console.log("from crud", productObject.name);
    //     Products.deleteOne({ _id: objectId(productObject.name) }, function(err) {
    //       if (err) response.send(JSON.stringify({ message: error }));
    //       else response.send(JSON.stringify({ message: "Product Deleted" }));
    //     });
    // },
    // updateProducts(productObject, response) {
    //     var newObject = {
    //       name: productObject.name,
    //       quantity: productObject.quantity,
    //       price: productObject.price,
    //       category: productObject.category,
    //       subCategory: productObject.subCategory,
    //       description: productObject.description,
    //       tax: productObject.tax,
    //       cod: productObject.cod,
    //       discount: productObject.discount
    //     };
    //     console.log(productObject, newObject);
    //     Products.update(
    //       { _id: productObject.id },
    //       { $set: newObject },
    //       error => {
    //         if (error) {
    //           response.send(JSON.stringify({ message: error, flag: "0" }));
    //         } else {
    //           response.send(
    //             JSON.stringify({ message: "product edited", flag: "1" })
    //           );
    //         }
    //       }
    //     );
    // }
}
module.exports = productsOperations;