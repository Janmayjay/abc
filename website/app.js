const express = require("express");
const app = express();

const loadMiddleWares= require("./middlewares");
loadMiddleWares(app,express);
require("./error")(app);

app.listen(4444,()=>{
    console.log("server started \n url :- http://localhost:4444/myDomain/");
})
