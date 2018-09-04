const dbConfig = require("./config");
const mongoose = require("mongoose");
const connection = mongoose.connect(dbConfig.url,{poolSize:20});
module.exports = mongoose;
// const MongoClient = require('mongodb').MongoClient;

// // replace the uri string with your connection string.
// const uri = "mongodb+srv://admin:<admin>@clusterseller-uwikz.mongodb.net/test?retryWrites=true"
// MongoClient.connect(uri, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });
// module.exports = MongoClient;