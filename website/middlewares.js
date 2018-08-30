const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userroutes");
const settings = {
  name : "shahid",
  secret : "random value",
  cookie : { maxAge: 24*60*60*1000, sameSite: true, secure: "auto", httpOnly: true },
  domain:"/myDomain/:shopname"
}

function loadMiddleWares(app, express) {
  app.use(settings.domain, express.static("public_html"));
  app.use(settings.domain+"/:shop", express.static("./../shopIt/AllSellerAssests"));
  app.use(cookieParser(settings.secret));
  app.use(session({
    name:settings.name,
    secret: settings.secret,
    resave: false,
    saveUninitialized: true,
    cookie: settings.cookie
  }));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(settings.domain, userRoutes);
  // app.use(settings.domain, express.Router())
  app.use((request, response, next) => {
    // console.log(request);
    if (request.session.userid) {
      console.log("middleware if");
      response.send("logged in");
    }else{
      console.log("middleware else");
    }
    next();
  });
  
}
module.exports = loadMiddleWares;
