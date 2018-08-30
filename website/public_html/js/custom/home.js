document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    init();
});

function init(){

    util.init("All Products");
    
    
    bringAndPrintProducts("All Products");

}