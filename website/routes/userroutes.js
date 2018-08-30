const express = require("express");
const route = express.Router();
route.use(function stamp(request, response, next){
  request.shopVisiting = request.originalUrl.split("/").filter(Boolean)[1];
  next();
});
route.get("/testing", (req, res)=>{
  console.log("this is first route");
  res.send("ok "+req.shopVisiting);
});
route.get("/startApp",(req,res)=>{
  console.log("this is main",req.originalUrl);
  res.send("set shopname ("+req.shopVisiting+")");
});

route.post("/showShop&Cat", (request, response) => {
  // var params = request.body;
  console.log("###",request.shopVisiting);
  var userObject = {"callback" : category,"query" : {"url" : request.shopVisiting}};
  const categoryCRUD = require("../db/categorycrud");
  categoryCRUD.showCategory(userObject, response);
  var catObj = {};
  var shopObj = {};
  
  function category(obj){
    // console.log(catObj);
    catObj = obj;
    var userObject = {"callback" : shop,"query" : {"link" : request.shopVisiting}};
    const shopCRUD = require("../db/shopcrud");
    shopCRUD.viewShop(userObject, response);
  }

  function shop(obj){
    shopObj = obj;
    var userObject = {"callback" : policy,"query" : {"shopname" : request.shopVisiting}};
    const policyCRUD = require("../db/policycrud");
    policyCRUD.viewPolicy(userObject, response);
     
  };

  function policy(obj){
    var data = {'categories' : catObj, 'shop' : shopObj, 'policy' : obj};
    var combinedObj = {'shopname' : request.shopVisiting, "data" : data};
    console.log(request.shopVisiting,"%%%%%%%%%%%%%%%%%%%%%%5");
    response.send(JSON.stringify(combinedObj)); 
  }


});

route.post("/showProducts",(request,response)=>{
  console.log(request.body,"4654564654654654654654654df5fs465dfs465dfs4654dfs");
  const productCRUD = require("../db/productsCrud");

  function callback(obj){
    response.send(JSON.stringify(obj));
    console.log(obj);
  }

  var query = {};
  if(request.body.catname){
    query = (request.body.catname!="All Products")?{"category" : request.body.catname,"shopName" : request.shopVisiting}:{"shopName" : request.shopVisiting};
  }
  else if(request.body.productid){
    query = {"_id" : request.body.productid,"shopName" : request.shopVisiting};
    console.log("#####", request.body.productid);
  }
  var userObject = {query, "callback" : callback};
  console.log("8888888",userObject.query);
  productCRUD.find(userObject);  
});
route.post("/:any/addClient",(request,response)=>{
  console.log(request.body.object);
  var params = request.body.object;
  const clientCrud = require("../db/clientCrud");
  const Client = require("../models/client");
  function callback(newObj){
    // response.send(JSON.stringify(newObj));
    console.log("addClient",newObj);
    response.send(JSON.stringify(newObj));
    // if(newObj == "ok"){
    //   window.alert("You Successfully registered");
    // }
    // else{
    //   window.alert(newObj);
    // }
  }
  var clientObject = {"query":{"clientData":new Client(params.name,params.email,params.mobile,params.addressLine1,params.addressLine2,params.city,params.postcode,params.password)},"callback":callback};
  console.log("@userroutes",clientObject);
  clientCrud.addClient(clientObject,request,response);
});
route.post("/:any/login",(request,response)=>{
  console.log(request.query.any,request.body.any,request.url);
  console.log(request.body.object);
  var params = request.body.object;
  const clientCrud = require("../db/clientCrud");
  const Client = require("../models/client");
  function callback(tempObj){
    console.log("login",tempObj);
    response.send(JSON.stringify(tempObj));
    let a = JSON.parse(tempObj);
    if(a.data.status){
      request.session.client = params.email;
    }
    console.log(request.session.client);
  }
  clientCrud.login({"query":{"email":params.email,"password":params.password},"callback":callback},request,response);
});


route.get("/cart", (request, response)=>{
  const params = request.query;
  const cartCrud = require("../db/cartCrud");
  var serverResponse;
  var clientProductID = {};
  (JSON.parse(params["object"] || JSON.stringify({"cart":[]}))).cart.forEach(element => {
    clientProductID[(element["productId"]).toString()] = parseInt((element["quantity"])) || 0;
  });
  console.log("from clientddddddd",clientProductID);
  function dbDocs(object){
    console.log("from dbDocs ",object.found);
    
    if(object.found){
      var filteredProducts = object.data.filter(
        function(e){
          let index = this.indexOf(e["_id"].toString());
          // return index >= 0 && e["quantity"] >= clientProductID[this[index]];
          return index >= 0 && (function checkQuantity(pids){
            console.log("############ this",pids,e["quantity"],clientProductID[pids[index]]);
            if(e["quantity"] >= clientProductID[pids[index]]){
              e["quantity"] = clientProductID[pids[index]];
              return true;
            }else{
              // e["quantity"] = clientProductID[pids[index]];
              return true;
            }
          }(this));
        }, Object.keys(clientProductID)
      );
      filteredProducts.forEach(e=>{
        delete clientProductID[e["_id"]];
      });
      response.send(JSON.stringify({data:{error:0, items:{available:filteredProducts, not_available:{"products":clientProductID}}}}));
    }else{
      response.send(JSON.stringify({data:{error:1,message:"no record found"}}));
    }
  }
  const cartObject = {query:{shopName:request.shopVisiting}, callback:dbDocs};
  cartCrud.find(cartObject);
});
     
module.exports = route;