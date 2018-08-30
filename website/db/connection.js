const dbConfig = require("./config");
const mongoose = require("mongoose");
const connection = mongoose.connect(dbConfig.url,{poolSize:20});
module.exports = mongoose;