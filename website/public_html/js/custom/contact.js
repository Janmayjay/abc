document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    init();
});

function init(){
    util.init("Contact Us",showContact);
}

function showContact(obj){
    obj = JSON.parse(obj);
    var shopObj = obj.shop.data;

    var address = document.querySelector('#address');
    var city = document.querySelector('#city');
    var pincode = document.querySelector('#pincode');
    var phone = document.querySelector('#phone');
    var email = document.querySelector('#email');
    
    address.innerText = shopObj.address;
    city.innerText = shopObj.city;
    pincode.innerText = shopObj.pincode;
    phone.innerText = shopObj.pno;
    email.innerText = shopObj.email;
    
}