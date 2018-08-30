const Category = require("./categoryschema");
const CategoryOperations = {
    // addCategory(categoryObject,response){
    //         function status(status){
    //             if(status == "ok"){
    //                 console.log("inside findcat :",status);
    //                 Category.create(categoryObject,(error)=>{
    //                     if(error){
    //                         response.send(JSON.stringify({"message" : error, "flag":"0"}));    
    //                     }
    //                     else{
    //                         response.send(JSON.stringify({"message" : "category created","flag":"1"}));    
    //                     }
    //                 });
    //             }
    //             else{
    //                 response.send(JSON.stringify({"message" : status}));                    
    //             }
    //         }
    //         this.findCategory(status,categoryObject,response);
    // },
    // findCategory(callback,categoryObject,response){
    //     console.log("findcaterogy");
    //     var obj = {"url" : categoryObject.url, "name" : categoryObject.name,"fn":callback};
    //         Category.find(obj,(error, docs)=>{
    //             console.log("inside find");
    //             if(error){
    //                 console.log("db error");
    //                 obj.fn(error);
    //             } 
    //             else {
    //                 console.log("else");
    //                 if(docs && docs.length>0){
    //                     console.log("else of docs");
    //                     if(categoryObject.keyData && categoryObject.keyData == categoryObject.name){
    //                         obj.fn("ok");
    //                     }
    //                     else{
    //                         obj.fn("Category already exists");                            
    //                     }
    //                 }
    //                 else{
    //                     console.log("else else");
    //                     obj.fn("ok");
    //                 }
    //             }
    //         });
    //     },  
        
        
    showCategory(userObject,response){
        console.log("***", userObject);
        // function status(obj){
        //     console.log(obj);
        //     response.send(JSON.stringify(obj));
        // }

        // userObject = {"url":userObject.url,"fn":status};


        Category.find(userObject.query,(error,docs)=>{
            if(error){
                console.log(error);
                userObject.callback({"message" : error});
            }
            else{
                if(docs.length<=0)
                    userObject.callback({"message" : "no categories added"});                    
                else
                    userObject.callback({'message' : "categories found", "data" : docs});                       
            }

        });
    },

    // modifyCategory(categoryObject,response){
    //     function status(status){
    //         if(status == "ok"){
    //             var newObject = {"url" : categoryObject.url,"name" : categoryObject.name, "subCategories" : categoryObject.subCategories};
    //             console.log(categoryObject,newObject);
    //             Category.update(
    //                 {name : categoryObject.keyData},
    //                 {$set: newObject},            
    //                 (error)=>{
    //                     if(error){
    //                         response.send(JSON.stringify({"message" : error, "flag":"0"}));                      
    //                     }
    //                     else{
    //                         response.send(JSON.stringify({"message" : "category edited","flag":"1"}));                    
                                
    //                     }
    //                 }
    //             );
    //         }
    //         else{
    //             response.send(JSON.stringify({"message" : status}));                    
    //         }              
    //     }

        

    //     this.findCategory(status,categoryObject,response);
    // },
    // deleteCategory(category,response){
    //     Category.deleteOne({ "name": category.name, "url":category.url  }, function (err) {
    //         if (err) 
    //             response.send(JSON.stringify({"message" : error, "flag":"0"}));
    //         else    
    //             response.send(JSON.stringify({"message" : "Categoory Deleted", "flag":"1"}));                       
    //         });
    // },
    // find(obj,shopObject) {
    //     var text = Category.find({"url":shopObject},(error, docs) => {
    //         if (error) {
    //         obj.fn(error);
    //         }
    //         else {
    //         obj.fn(docs);
    //         }
    //     });
    //     }
}

module.exports = CategoryOperations;