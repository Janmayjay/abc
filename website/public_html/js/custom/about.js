document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    init();
});

function init(){
    util.init('About Us',showAbout);
}

function showAbout(obj){
    obj = JSON.parse(obj);
    var shopObj = obj.shop.data;

    var container = document.querySelector('.main-content > .col-sm-12 > p');
    console.log("**************", shopObj.desc);
    container.innerText = shopObj.desc;
}