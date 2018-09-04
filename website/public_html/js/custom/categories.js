document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    init();
});

function init(){
    var url = new URL(window.location.href);
    var catName = url.searchParams.get("catName");

    util.init(catName);
    bringAndPrintProducts(catName);

}