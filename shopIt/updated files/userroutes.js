route.post("/addshop", (request, response) => {
  console.log(request.body);
  var params = request.body;
  const shopCRUD = require("../db/shopcrud");
  const shop = require("../models/shop");
  var shopObject = new shop(
    request.session.userid,
    request.session.userid,
    params.desc,
    params.pno,
    params.email,
    params.gstin,
    params.pincode,
    params.city,
    params.address,
    params.panCard,
    params.accNo,
    params.bname
  );
  // shopObject["name"] = request.session.userid;
  // shopObject["link"] = request.session.userid;
  
  // shopObject.url = "session id";
  // console.log(shopObject);
  // var obj = {'bank' : bank, 'name' : shopObject.name, 'link' : shopObject.link, "desc"};
  shopCRUD.addshop(shopObject, response);
  // response.send(JSON.stringify({"fuddi" : "ok"}));
});

route.get("/viewshop", sessionChecker, (request, response) => {
  var params = request.body;

  const shopCRUD = require("../db/shopcrud");
  var shopObject = {'link' : request.session.userid};
  shopCRUD.viewShop(shopObject,response);
});

route.post("/editshop", sessionChecker, (request, response) => {
  var params = request.body;
  const shopCRUD = require("../db/shopcrud");
  // var shopObject = params;
  // shopObject["name"] = request.session.userid;
  // shopObject["link"] = request.session.userid;
  const shop = require("../models/shop");
  var shopObject = new shop(
    request.session.userid,
    request.session.userid,
    params.desc,
    params.pno,
    params.email,
    params.gstin,
    params.pincode,
    params.city,
    params.address,
    params.panCard,
    params.accNo,
    params.bname
  );
  shopCRUD.editShop(shopObject, response);
});