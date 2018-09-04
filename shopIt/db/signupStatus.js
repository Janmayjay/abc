const signup = require("./signupStatusschema");
const signupOperations = {    
    find(obj, response){
        signup.find(obj.query,(error,docs)=>{
            if(error){
                // obj.callback(error);
                return false;
            }
            else{
                // obj.callback(docs);

                // if(docs[0].pages.length){
                //     response.send(JSON.stringify({redirect:1, page: docs[0].pages[0] }));
                //   }else{
                //     next();
                //   }

                return docs;
            }
        });
    },
    pushData(PageObject){
        signup.create(PageObject.query,(error, docs)=>{
            if(error){
                PageObject.callback(error);
            }else{
                PageObject.callback(docs);
            }
        })
    }
}
module.exports = signupOperations;