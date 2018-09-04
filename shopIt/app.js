const express = require("express");
const app = express();

const loadMiddleWares= require("./middlewares");
loadMiddleWares(app,express);
require("./error")(app);
const port = 4442;
app.listen(port,()=>{
    console.log("server started \n url :- http://localhost:" + port);
})
