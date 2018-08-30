function error(app){
    app.use((request,response,next)=>{
        console.log("from error.js url is :",request.path);
        //response.send("You Lost In Dark");
        next();
    })
}
module.exports = error;