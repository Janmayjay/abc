const catData = require("./categorycrud");
const productData = require("./productsCrud");

const abc ={
    categoryData(fn,a){
        var object = {"fn":fn};
        catData.find(object,a);
    },
    productData(fn,a){
        var object = {"fn":fn};
        productData.find(object,a);
    }
}
module.exports = abc;
