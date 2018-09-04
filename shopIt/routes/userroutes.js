const express = require("express");
const route = express.Router();
const multer = require("multer");
const fs = require("fs");
var tempUserName;
const util = {
  combineResult(arrayOfObject, resultVar) {
    var clen = arrayOfObject.length - 1;
    arrayOfObject.forEach((element, index, arrayOfObject) => {
      if (!index) {
        let lastElement = arrayOfObject[clen];
        lastElement.params.callback = {
          callback: this.sendResponse.bind({
            callback: lastElement.params.callback,
            result: resultVar
          })
        };
      }
      element.function.call(element.params.callback, element.params.query);
    });
  },
  sendResponse(object) {
    this.callback(object);
    console.log("from sendStatus, status ready to send ", this.result);
  }
};
const isSubmit = (request, response, next) => {
  console.log("from isSubmit",request.path)
  var currentPages = request.session.requiredPages;
  // if(currentPages && currentPages[0] == request.path){
  if(currentPages){
    next();
  }else{
    response.send(JSON.stringify({ redirect:1, page: currentPages?request.session.requiredPages[0]:"walkthrough.html" }));
  }
}
const sessionChecker = (request, response, next) => {
  if (request.session.userid) {
    console.log(
      "sessionChecker if, session already initialized (",
      request.session.userid,
      "page status",
      request.session.requiredPages,
      ")"
    );
    if(!request.session.requiredPages.length){
      next();
    }else{
      response.send(JSON.stringify({ redirect:1, page: request.session.requiredPages[0] }));
    }
    // return next();
  } else {
    console.log("sessionChecker else, no session found.");
    response.send(JSON.stringify({ redirect: 1, page: "walkthrough.html" }));
    // response.redirect(302,"walkthrough.html");
    return false;
  }
};

route.get("/splash-screen", sessionChecker, (req, res) => {
  console.log("splash-screen requested");
  res.send(JSON.stringify({ page: "home.html" }));
});

route.post("/signup", (request, response) => {
  var params = request.body;
  const requiredPages = ["custom/add-store.html", "custom/addBank.html"];
  const userCRUD = require("../db/usercrud");
  const User = require("../models/User");
  const userObject = new User(
    params.name,
    params.phone,
    params.email,
    params.url,
    params.gstin,
    params.shopname,
    requiredPages
  );
  console.log(userObject);
  userCRUD.addUser(userObject, response);
});

route.post("/login", (request, response) => {
  var params = request.body;
  const userCRUD = require("../db/usercrud");
  const UserLogin = require("../models/UserLogin");
  const signupStatus = require("../db/signupStatus");
  const userObject = new UserLogin(params.mobile, params.password);
  console.log("server object : ", userObject, " client params : ", params);

  function authenticate(object) {
    var docs = object;
    if (docs && docs.length > 0) {
      console.log("record found", docs);
      var dbPassword = docs[0].gstin;
      var reqPassword = userObject.password;
      console.log("dbpass :", dbPassword, "user pass:", reqPassword);
      if (dbPassword == reqPassword) {
        request.session.userid = docs[0].shopname;
        request.session.requiredPages = docs[0].requiredPages;
        console.log("======== setting parameters in request =========");
        console.log(
          request.session,
          ", cookie :",
          request.signedCookies,
          ", sessionID :",
          request.sessionID,
          ", active-sessions :",
          request.sessions,
          ", my variable",
          request.anyyhing
        );
        console.log("======== parameters set successfully =========");
        // request.cookies.id = dbPassword;
        response.send(
          JSON.stringify({ data: { authenticate: 1, page: "index.html" } })
        );
      } else {
        response.send(
          JSON.stringify({
            data: { authenticate: 0, error: "wrong credentials" }
          })
        );
      }
    } else {
      response.send(
        JSON.stringify({
          data: { authenticate: 0, error: "Invalid userid or password" }
        })
      );
    }
  }

  const query = userObject;
  var myQuery = { callback: authenticate, query };
  console.log("this is from login route", myQuery);
  // userCRUD.findLogin(userObject, request, response);
  userCRUD.findLogin(myQuery, request, response);
});

route.get("/test", sessionChecker, (request, response) => {
  console.log(
    "headers.cookie :",
    request.headers.cookie,
    ", session.uerid :",
    request.session.userid
  );
  response.send(JSON.stringify(request.session));
});
route.get("/getcat", sessionChecker, (request, response) => {
  console.log("from getcat");
  console.log("getcat--------------------------", request.session.userid);
  var clientData = { data: {} };
  var clientSide = {
    sendResponse(data) {
      response.send(JSON.stringify(data));
    }
  };

  function sellersCategory(dbData) {
    console.log("90", dbData);
    clientData.data.sellerCategory = dbData;
    clientSide.sendResponse(clientData);
  }

  const data = require("../db/data.js");

  data.categoryData(sellersCategory, request.session.userid);

  console.log("my json requested cat data");
});
route.get("/addProducts", sessionChecker, (request, response) => {
  console.log("--------------------------", request.session.userid);
  var clientData = { data: {} };
  var clientSide = {
    sendResponse(data) {
      response.send(JSON.stringify(data));
    }
  };

  // function sellersCategory(dbData) {
  //   console.log("90",dbData);
  //   clientData.data.sellerCategory = dbData;
  // }

  function sellerProducts(dbData) {
    var productName = new Array();
    var productJson = new Array();
    var status = dbData ? 1 : 0;
    var error = status ? "" : "some error";

    var my = {
      status: status,
      tabId: ["tab-1"],
      "tab-1": {
        fields: {
          name: "Name",
          quantity: "Quantity",
          price: "Price",
          category: "Category",
          subCategories: "SubCategory",
          tax: "Tax",
          Discount: "Discount",
          description: "Description",
          dimensions: "Dimensions",
          COD: "COD",
          featuredImage: "Featured Image",
          otherImages: "Other Images"
        }
      },
      error: error
    };

    for (let o in dbData) {
      productName.push(dbData[o]._id);
      my["tab-1"][dbData[o]._id] = dbData[o];
    }

    my["tab-1"].products = productName;
    clientData.data.sellerProduct = my;
    clientSide.sendResponse(dbData);
  }

  const data = require("../db/data.js");

  // data.categoryData(sellersCategory,request.session.userid);
  data.productData(sellerProducts, request.session.userid);

  // var paramsCategoryData = { query: {}, callback: sellersCategory };
  // var paramsSellerProducts = { query: {}, callback: sellerProducts };

  // var callbacks = [
  //   { function: data.categoryData, params: paramsCategoryData },
  //   { function: data.productData, params: paramsSellerProducts }
  // ];

  // util.combineResult(callbacks, clientData);

  console.log("my json requested");
});
route.post("/addProducts", sessionChecker, (request, response) => {
  console.log("I'm Here", request.body, request.files);
  const settings = {
    CoreDir: "AllSellerAssests/" + request.session.userid + "/",
    userProfile: {
      fieldname: "imgUpload",
      fieldname1:"otherImgUpload",
      limits: {
        fields: 13,
        files: 6,
        fieldNameSize: 15,
        fileSize: 1 * 1000000
      }
    }
  };
  var featuredImageUrl = new Array();
  var temp;

  var acceptedFile = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/tiff",
    "image/gif"
  ];

  var handleFile = multer.diskStorage({
    destination: function(request, file, callback) {
      var uploadDir = settings.CoreDir;
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      callback(null, uploadDir);
    },
    filename: function(request, file, callback) {
      temp =
        settings.userProfile.fieldname +
        "-" +
        Date.now() +
        "-" +
        file.originalname;
        featuredImageUrl.push(temp);
      callback(null, temp);
    }
  });

  var upload = multer({
    storage: handleFile,
    limits: settings.userProfile.limits,
    fileFilter: function(request, file, callback) {
      if (acceptedFile.find(name => file.mimetype == name)) {
        callback(null, true);
      } else {
        Error.message = "file not supported";
        callback(Error, false);
      }
    }
  }).array(settings.userProfile.fieldname);
  // console.log("upload",upload);
  upload(request, response, function(err) {
    console.log("upload", request.body); // give object
    console.log("url",featuredImageUrl);

    var params = request.body;
    const productsCRUD = require("../db/productsCrud");
    const Products = require("../models/products");

    var cod;
    if (params.COD) cod = params.COD;
    else cod = "off";
    var dimensions = [
      {
        length: params.length,
        breadth: params.breadth,
        height: params.height,
        weight: params.weight
      }
    ];
    var imgUrl = settings.CoreDir + featuredImageUrl[0];
    var otherImageUrl = new Array();
    for(let z=0;z<featuredImageUrl.length;z++){
      featuredImageUrl[z] = settings.CoreDir + featuredImageUrl[z];
      featuredImageUrl[z] = featuredImageUrl[z].substr(12, featuredImageUrl[z].length);
      if(z>0){
        otherImageUrl.push(featuredImageUrl[z]);
      }
    }
    const productsObject = new Products(
      request.session.userid,
      params.name,
      params.quantity,
      params.price,
      params.category,
      params.subCategory,
      dimensions,
      params.description,
      params.tax,
      cod,
      featuredImageUrl[0],
      otherImageUrl,
      params.discount
    );
    console.log(productsObject);
    productsCRUD.addUser(productsObject, response);

    console.log(request.files); // give array of object
    if (err) {
      console.log(err.message);
    }
  });
});

route.get("/showCat", sessionChecker, (request, response) => {
  // var params = request.body;
  var userObject = { url: request.session.userid };
  const categoryCRUD = require("../db/categorycrud");
  categoryCRUD.showCategory(userObject, response);
});

route.post("/add-categories", sessionChecker, (request, response) => {
  var params = request.body;
  console.log("*****************************362",params);
  // response.send(params);
  var categoryName = params.name;
  var subCategories = [];
  for (let key in params) {
    if (key.includes("subcat") && params[key] != "")
      subCategories.push(params[key]);
    // console.log(params[key]);
  }
  subCategories = subCategories.join();
  var obj = {
    url: request.session.userid,
    name: categoryName,
    subCategories: subCategories
  };
  console.log(obj);
  const categoryCRUD = require("../db/categorycrud");
  const category = require("../models/category");
  const categoryObject = new category(obj.url, obj.name, obj.subCategories);
  categoryCRUD.addCategory(categoryObject, response);
});

route.post("/edit-categories", sessionChecker, (request, response) => {
  var params = request.body;
  console.log(params);

  var categoryName = params.name;
  var subCategories = [];
  for (let key in params) {
    if (key.includes("subcat") && params[key] != "")
      subCategories.push(params[key]);
    // console.log(params[key]);
  }
  subCategories = subCategories.join();
  var obj = {
    url: request.session.userid,
    name: categoryName,
    subCategories: subCategories,
    keyData: params.keyData
  };

  const categoryCRUD = require("../db/categorycrud");
  categoryCRUD.modifyCategory(obj, response);
});

route.post("/delete-categories", sessionChecker, (request, response) => {
  var params = request.body;
  var categoryObject = { url: request.session.userid, name: params.catName };
  const categoryCRUD = require("../db/categorycrud");
  categoryCRUD.deleteCategory(categoryObject, response);
});

route.post("/shopdetails", (request, response) => {
  var params = request.body;
  const shopCRUD = require("../db/shopcrud");
  const shop = require("../models/shop");
  const shopObject = new shop(
    params.name,
    params.link,
    params.pno,
    params.email,
    params.pincode,
    params.city,
    params.address
  );
  shopCRUD.modifyshop(shopObject, response);
});

route.post("/modifyshop", (request, response) => {
  var params = request.body;
  const shopCRUD = require("../db/shopcrud");
  const shop = require("../models/shop");
  const shopObject = new shop(
    params.name,
    params.link,
    params.pno,
    params.email,
    params.pincode,
    params.city,
    params.address
  );
  shopCRUD.modifyshop(shopObject, response);
});

route.post("/addshop", isSubmit, (request, response) => {
  const settings = {
    CoreDir: "AllSellerAssests/" + request.session.userid + "/",
    userProfile: {
      fieldname: "editStoreImage",
      limits: {
        fields: 7,
        files: 1,
        fieldNameSize: 15,
        fileSize: 1 * 1000000
      }
    }
  };
  var featuredImageUrl;

  var acceptedFile = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/tiff",
    "image/gif"
  ];

  var handleFile = multer.diskStorage({
    destination: function(request, file, callback) {
      var uploadDir = settings.CoreDir;
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      callback(null, uploadDir);
    },
    filename: function(request, file, callback) {
      featuredImageUrl =
        settings.userProfile.fieldname +
        "-" +
        Date.now() +
        "-" +
        file.originalname;
      callback(null, featuredImageUrl);
    }
  });

  var upload = multer({
    storage: handleFile,
    limits: settings.userProfile.limits,
    fileFilter: function(request, file, callback) {
      if (acceptedFile.find(name => file.mimetype == name)) {
        callback(null, true);
      } else {
        Error.message = "file not supported";
        callback(Error, false);
      }
    }
  }).array(settings.userProfile.fieldname);

  upload(request, response, function(err) {
    console.log("uploadBank", request.body); // give object

    var imgUrl = settings.CoreDir + featuredImageUrl;

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
    imgUrl.substr(12, imgUrl.length)
  );
    
    
    console.log("Bank", shopObject);
    shopCRUD.addshop(shopObject, request, response);
    console.log(request.files); // give array of object
    if (err) {
      console.log(err.message);
    }
  });
  
  
});

route.get("/viewshop", sessionChecker, (request, response) => {
  var params = request.body;

  const shopCRUD = require("../db/shopcrud");
  var shopObject = { link: request.session.userid };
  shopCRUD.viewShop(shopObject, response);
});

route.post("/editshop", sessionChecker, (request, response) => {
  const settings = {
    CoreDir: "AllSellerAssests/" + request.session.userid + "/",
    userProfile: {
      fieldname: "editStoreImage",
      limits: {
        fields: 9,
        files: 1,
        fieldNameSize: 20,
        fileSize: 1 * 1000000
      }
    }
  };
  var featuredImageUrl;

  var acceptedFile = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/tiff",
    "image/gif"
  ];

  var handleFile = multer.diskStorage({
    destination: function(request, file, callback) {
      var uploadDir = settings.CoreDir;
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      callback(null, uploadDir);
    },
    filename: function(request, file, callback) {
      featuredImageUrl =
        settings.userProfile.fieldname +
        "-" +
        Date.now() +
        "-" +
        file.originalname;
      callback(null, featuredImageUrl);
    }
  });

  var upload = multer({
    storage: handleFile,
    limits: settings.userProfile.limits,
    fileFilter: function(request, file, callback) {
      if (acceptedFile.find(name => file.mimetype == name)) {
        callback(null, true);
      } else {
        Error.message = "file not supported";
        callback(Error, false);
      }
    }
  }).array(settings.userProfile.fieldname);
  // console.log("upload",upload);
  upload(request, response, function(err) {
    console.log("uploadstore", request.body); // give object

    var imgUrl = settings.CoreDir + featuredImageUrl;
    imgUrl = imgUrl.substr(12, imgUrl.length);
    var params = request.body;
    var shopObject;
    const shopCRUD = require("../db/shopcrud");
    const shop = require("../models/shop");
    if (!featuredImageUrl) {
      shopObject = {
        name: request.session.userid,
        link: request.session.userid,
        desc: params.desc,
        pno: params.pno,
        email: params.email,
        gstin: params.gstin,
        pincode: params.pincode,
        city: params.city,
        address: params.address
      };
    } else {
      shopObject = new shop(
        request.session.userid,
        request.session.userid,
        params.desc,
        params.pno,
        params.email,
        params.gstin,
        params.pincode,
        params.city,
        params.address,
        imgUrl
      );
    }

    shopCRUD.editShop(shopObject, response);

    console.log(request.files); // give array of object
    if (err) {
      console.log(err.message);
      // return response.send(err.message);
    }
    // response.send("File is uploaded");
    // response.end();
  });
});

route.post("/forgot-password", (request, response) => {
  console.log(request.body);
  var params = request.body;
  var userCRUD = require("../db/usercrud");
  // var abc =
  userCRUD.emailFind(params.email, request, response);
  // console.log("abc",abc);
});

route.post("/forgot-password-check-token", (request, response) => {
  console.log("hidden", request.body);
  var params = request.body;
  // if(params.token == "123"){
  //   response.send("true");
  // }
  // else{
  //   response.send("false");
  // }
  var tokenCRUD = require("../db/tokenCrud");
  tokenCRUD.find(params.emailId, params.token);
});

route.post("/sendtoken", (request, response) => {
  console.log("204", request.body);
  var params = request.body;
  var tokenCRUD = require("../db/tokenCrud");
  tokenCRUD.addToken(params.email, response);
});

route.post("/resetPassword", (request, response) => {
  console.log("at reset password");
  var params = request.body;
  var userCRUD = require("../db/usercrud");
  userCRUD.updatePassword(
    params.emailId,
    params.confirm_password,
    request,
    response
  );
});

route.get("/deleteProducts", sessionChecker, (request, response, next) => {
  var id = request.query.id;
  console.log("query is :", request.query);
  const productsCRUD = require("../db/productsCrud");
  productsCRUD.deleteProducts({ name: id }, response);
});
route.get("/productDetails", sessionChecker, (request, response) => {
  // var params = request.body;
  var userObject = { url: request.session.userid };
  const categoryCRUD = require("../db/categorycrud");
  categoryCRUD.showCategory(userObject, response);
});
route.post("/updateProducts", sessionChecker, (request, response, next) => {
  var params = request.body;
  console.log("query is :", request.body);

  const productsCRUD = require("../db/productsCrud");
  const Products = require("../models/productsUpdate");

  const productsObject = new Products(
    params.name,
    params.quantity,
    params.price,
    params.category,
    params.subCategory,
    params.description,
    params.tax,
    params.COD,
    params.Discount,
    params.pid
  );
  console.log(productsObject);
  productsCRUD.updateProducts(productsObject, response);
});
route.post("/updateProducts2", sessionChecker, (request, response) => {
  const settings = {
    CoreDir: "AllSellerAssests/" + request.session.userid + "/",
    userProfile: {
      fieldname: "editFeaturedImage",
      limits: {
        fields: 16,
        files: 6,
        fieldNameSize: 30,
        fileSize: 1 * 1000000
      }
    }
  };
  var featuredImageUrl = new Array();
  var temp;

  var acceptedFile = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/tiff",
    "image/gif"
  ];

  var handleFile = multer.diskStorage({
    destination: function(request, file, callback) {
      var uploadDir = settings.CoreDir;
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      callback(null, uploadDir);
    },
    filename: function(request, file, callback) {
      temp =
        settings.userProfile.fieldname +
        "-" +
        Date.now() +
        "-" +
        file.originalname;
        featuredImageUrl.push(temp);
      callback(null, temp);
    }
  });

  var upload = multer({
    storage: handleFile,
    limits: settings.userProfile.limits,
    fileFilter: function(request, file, callback) {
      if (acceptedFile.find(name => file.mimetype == name)) {
        callback(null, true);
      } else {
        Error.message = "file not supported";
        callback(Error, false);
      }
    }
  }).array(settings.userProfile.fieldname);
  // console.log("upload",upload);
  upload(request, response, function(err) {
    console.log("uploadUpdateProducts", request.body); // give object

    var params = request.body;
    const productsCRUD = require("../db/productsCrud");
    const Products = require("../models/products");
    // console.log("@712",(params.otherStatus).split(","));
    var tempOther = (params.otherStatus).replace(/['"]+/g,'');
    var otherImageData1 = tempOther.split(",");
    var otherImageData = new Array();
    otherImageData1.forEach(e => {
      otherImageData.push(e);
    });
    otherImageData.forEach(e=>{
      if(e == "" || e == ''){
        otherImageData.pop();
      }
    })
    // otherImageData.forEach(e=>{
    //   if(e == "''"){
    //     e = otherImageData[((otherImageData).length)-1];
    //     otherImageData.pop();
    //   }
    // });
    if(params.featureStatus == 1){
      
    }
    else{
      
    }
    console.log("@720",otherImageData);
    var cod;
    if (params.COD) cod = params.COD;
    else cod = "off";
    var dimensions = [
      {
        length: params.length,
        breadth: params.breadth,
        height: params.height,
        weight: params.weight
      }
    ];
    // var imgUrl = settings.CoreDir + featuredImageUrl[0];
    // var otherImageUrl = new Array();
    for(let z=0;z<featuredImageUrl.length;z++){
      featuredImageUrl[z] = settings.CoreDir + featuredImageUrl[z];
      featuredImageUrl[z] = featuredImageUrl[z].substr(12, featuredImageUrl[z].length);
      // if(z>0){
      //   otherImageUrl.push(featuredImageUrl[z]);
      // }
    }
    
    var productsObject;
    if (params.featureStatus == 0) {
      if(featuredImageUrl.length > 0){
        // console.log("imgUrl", featuredImageUrl);
        for(let z=0;z<featuredImageUrl.length;z++){
          // var tempc = settings.CoreDir + featuredImageUrl[z];
          // console.log(tempc);
          otherImageData.push(featuredImageUrl[z]);
        }
      }
      productsObject = {
        shopName: request.session.userid,
        name: params.name,
        quantity: params.quantity,
        price: params.price,
        category: params.category1,
        subCategories: params.subCategory1,
        dimensions: dimensions,
        description: params.description,
        tax: params.tax,
        COD: cod,
        otherImages:otherImageData,
        Discount: params.Discount
      };
    } else {
      if(featuredImageUrl.length > 1){
        for(let z=1;z<featuredImageUrl.length;z++){
          // var tempc = settings.CoreDir + featuredImageUrl[z];
          otherImageData.push(featuredImageUrl[z]);
        }
      }
      productsObject = new Products(
        request.session.userid,
        params.name,
        params.quantity,
        params.price,
        params.category1,
        params.subCategory1,
        dimensions,
        params.description,
        params.tax,
        cod,
        featuredImageUrl[0],
        otherImageData,
        params.Discount
      );
    }
    // console.log("@userRoutes", imgUrl);

    // productsObject.id = params.pid;
    console.log("@", productsObject);
    productsCRUD.updateProducts(productsObject, params.pid, response);

    console.log(request.files); // give array of object
    if (err) {
      console.log(err.message);
      // return response.send(err.message);
    }
    // response.send("File is uploaded");
    // response.end();
  });
});
route.get("/viewseller", sessionChecker, (request, response) => {
  const userCRUD = require("../db/usercrud");
  var keyObject = { shopname: request.session.userid };
  userCRUD.viewSeller(keyObject, request, response);
});

route.post("/editSeller", sessionChecker, (request, response) => {
  var params = request.body;
  const userCRUD = require("../db/usercrud");
  var userObject = params;
  userObject.shopname = request.session.userid;
  userCRUD.editSeller(userObject, request, response);
});

route.get("/addpayment", sessionChecker, (request, response) => {
  var params = request.body;
  // console.log(params);
  // response.send(params);
  const payment = require("../models/payment");
  var paymentObject = new payment("1121", "23", 112, "new shop", "OK");
  console.log(paymentObject);
  const paymentCRUD = require("../db/paymentcrud");
  paymentCRUD.addPayment(paymentObject, response);
});

route.get("/viewpayment", sessionChecker, (request, response) => {
  var keyObject = { sellerid: request.session.userid.trim() };
  const paymentCRUD = require("../db/paymentcrud");
  function fn(obj) {
    response.send(JSON.stringify(obj));
  }
  var userObject = { query: keyObject, callback: fn };
  paymentCRUD.viewPayment(userObject, response);
});

route.post("/addorder", sessionChecker, (request, response) => {
  // const product = require("../models/product");
  const productCRUD = require("../db/productsCrud");
  
  var params = request.body;
  var params = params.objectOrderCustomer;
  console.log("*****",params);
  var productArray = [];
  for(let key in params.orderObject){
    var product = {};
    product.id = key;
    product.quantity = params.orderObject[key];

    // productCRUD.find1({fn : (arr)=>{
    //   console.log('inside find 1 OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', product);
    //   product.name = arr[0].name;
      
    // }},{"shopName" : request.session.userid, "_id" : key});
    // product.name = "sss"; 
    productArray.push(product);
    
  }
  // response.send(params);
  const order = require("../models/order");

  var obj = new order(
    params.customerObject.name,
    params.customerObject._id,
    params.customerObject.addressLine1 + " " + params.customerObject.addressLine2,
    productArray,
    request.session.userid
  );
  console.log("product array",productArray);
  const orderCRUD = require("../db/ordercrud");
  orderCRUD.addOrder(obj, response);
  productCRUD.updateProduct(params.orderObject,request.session.userid);
});

route.get("/vieworder", sessionChecker, (request, response) => {
  var keyObject = { sellerId: request.session.userid.trim() };
  const orderCRUD = require("../db/ordercrud");
  function fn(obj) {
    response.send(JSON.stringify(obj));
  }
  var userObject = { query: keyObject, callback: fn };
  orderCRUD.viewOrder(userObject, response);
});

route.get("/viewbank", sessionChecker, (request, response) => {
  var keyObject = { shopname: request.session.userid.trim() };
  const bankCRUD = require("../db/bankcrud");
  function fn(obj) {
    response.send(JSON.stringify(obj));
  }
  var userObject = { query: keyObject, callback: fn };
  bankCRUD.viewBank(userObject, response);
});

route.post("/addBank", isSubmit, (request, response, next) => {
  console.log("from route addBank")
  const settings = {
    CoreDir: "AllSellerAssests/" + request.session.userid + "/",
    userProfile: {
      fieldname: "editPanCard",
      limits: {
        fields: 3,
        files: 1,
        fieldNameSize: 15,
        fileSize: 1 * 1000000
      }
    }
  };
  var featuredImageUrl;

  var acceptedFile = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/tiff",
    "image/gif"
  ];

  var handleFile = multer.diskStorage({
    destination: function(request, file, callback) {
      var uploadDir = settings.CoreDir;
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      callback(null, uploadDir);
    },
    filename: function(request, file, callback) {
      featuredImageUrl =
        settings.userProfile.fieldname +
        "-" +
        Date.now() +
        "-" +
        file.originalname;
      callback(null, featuredImageUrl);
    }
  });

  var upload = multer({
    storage: handleFile,
    limits: settings.userProfile.limits,
    fileFilter: function(request, file, callback) {
      if (acceptedFile.find(name => file.mimetype == name)) {
        callback(null, true);
      } else {
        Error.message = "file not supported";
        callback(Error, false);
      }
    }
  }).array(settings.userProfile.fieldname);

  upload(request, response, function(err) {
    console.log("uploadBank", request.body); // give object

    var imgUrl = settings.CoreDir + featuredImageUrl;

    var params = request.body;
    const bankCRUD = require("../db/bankcrud");
    const bank = require("../models/bank");
    var bankObject = new bank(
      request.session.userid,
      imgUrl.substr(12, imgUrl.length),
      params.accNo,
      params.name
    );

    function fn(obj) {
      if (obj.flag) {
        const updateRequiredPages = require("../db/usercrud");
        request.session.requiredPages.splice(0, 1);
        updateRequiredPages.updateRequiredPages({
          query: {
            shopname: request.session.userid,
            pages: request.session.requiredPages
          }
        });
      }
      response.send(JSON.stringify(obj));
    }
    var userObject = {
      query: bankObject,
      callback: fn
    };
    console.log("Bank", bankObject);
    bankCRUD.addBank(userObject, response);
    console.log(request.files); // give array of object
    if (err) {
      console.log(err.message);
    }
  });
});

route.post("/editbank", sessionChecker, (request, response) => {
  const settings = {
    CoreDir: "AllSellerAssests/" + request.session.userid + "/",
    userProfile: {
      fieldname: "editPanCard",
      limits: {
        fields: 3,
        files: 1,
        fieldNameSize: 15,
        fileSize: 1 * 1000000
      }
    }
  };
  var featuredImageUrl;

  var acceptedFile = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/tiff",
    "image/gif"
  ];

  var handleFile = multer.diskStorage({
    destination: function(request, file, callback) {
      var uploadDir = settings.CoreDir;
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      callback(null, uploadDir);
    },
    filename: function(request, file, callback) {
      featuredImageUrl =
        settings.userProfile.fieldname +
        "-" +
        Date.now() +
        "-" +
        file.originalname;
      callback(null, featuredImageUrl);
    }
  });

  var upload = multer({
    storage: handleFile,
    limits: settings.userProfile.limits,
    fileFilter: function(request, file, callback) {
      if (acceptedFile.find(name => file.mimetype == name)) {
        callback(null, true);
      } else {
        Error.message = "file not supported";
        callback(Error, false);
      }
    }
  }).array(settings.userProfile.fieldname);
  // console.log("upload",upload);
  upload(request, response, function(err) {
    console.log("uploadBank", request.body); // give object

    var imgUrl = settings.CoreDir + featuredImageUrl;
    imgUrl = imgUrl.substr(12, imgUrl.length);
    console.log("imgUrl", featuredImageUrl);

    var params = request.body;
    const bankCRUD = require("../db/bankcrud");
    const bank = require("../models/bank");
    var bankObject;
    if (!featuredImageUrl) {
      bankObject = {
        shopname: request.session.userid,
        accNo: params.accNo,
        name: params.name
      };
    } else {
      bankObject = new bank(
        request.session.userid,
        imgUrl,
        params.accNo,
        params.name
      );
    }

    console.log("Bank", bankObject);
    bankCRUD.editBank(bankObject, response);

    console.log(request.files); // give array of object
    if (err) {
      console.log(err.message);
      // return response.send(err.message);
    }
    // response.send("File is uploaded");
    // response.end();
  });
});

route.get("/viewpolicy", sessionChecker, (request, response) => {
  var keyObject = { shopname: request.session.userid.trim() };
  const policyCRUD = require("../db/policycrud");
  function fn(obj) {
    response.send(JSON.stringify(obj));
  }
  var userObject = { query: keyObject, callback: fn };
  policyCRUD.viewPolicy(userObject, response);
});

route.get("/addpolicy", sessionChecker, (request, response) => {
  // console.log(request.body);
  // var params = request.body;
  const policyCRUD = require("../db/policycrud");
  const policy = require("../models/policy");
  var policyObject = new policy(request.session.userid, "", "", "");
  policyCRUD.addPolicy(policyObject, response);
});
route.post("/editpolicy", sessionChecker, (request, response) => {
  var params = request.body;
  const policyCRUD = require("../db/policycrud");
  // var shopObject = params;
  // shopObject["name"] = request.session.userid;
  // shopObject["link"] = request.session.userid;
  var policy = require("../models/policy");
  var policyObject = new policy(
    request.session.userid,
    params.returnPol,
    params.shipTime,
    params.region
  );
  policyCRUD.editPolicy(policyObject, response);
});

route.get("/logout", sessionChecker, (request, response) => {
  console.log("from logout route");
  request.session.destroy(error=>{
    if(error){
      response.send(JSON.stringify({"unable to logout":request.session.userid}));
    }else{
      response.send(JSON.stringify({"user logout":"user logout successfully"}));
    }
  });
});

route.post("/add-customer", sessionChecker, (request, response) => {
  console.log(request.body);
  var params = request.body;
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
  var clientObject = {"query":{"clientData":new Client(params.name,params.email,params.mobile,params.addressLine1,params.addressLine2,params.city,params.postCode,params.password,request.session.userid)},"callback":callback};
  console.log("@userroutes",clientObject);
  clientCrud.addClient(clientObject,request,response);
});


route.get("/showCustomers", sessionChecker, (request, response) => {
  const clientCRUD = require("../db/clientcrud");

  function callback(obj){
    console.log(obj);
    response.send(JSON.stringify(obj));
  }


  var clientObject = { query : {shopname: request.session.userid}, callback : callback };
  clientCRUD.viewClient(clientObject, request, response);
});

module.exports = route;
