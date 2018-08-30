document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    init();
});

function init(){

    util.init("");
    var url = new URL(window.location.href);
    var productId = url.searchParams.get("productId");

    util.connectPage((object)=>{
        console.log(object);
        if(object.data){
            showDetailedProduct(object.data[0]);
            var addCartBtn = document.querySelector('#button-cart');
            addCartBtn.setAttribute('data-productId',productId);
            addCartBtn.classList.add('addCartBtn');
            console.log("disable");
            var quantity = document.querySelector('#input-quantity');
            console.log(quantity);

            clickDisableCartBtn('addCartBtn','productPage');
            quantity.disabled = true;
         }
    },{name : "showProducts"},{shopname : util.shopname, productid : productId}); 
}

function showDetailedProduct(product){
    setHeading(product.name);    
    var category = document.querySelector("#category");
    var availability = document.querySelector("#availability");
    var price = document.querySelector("#price");
    var description = document.querySelector("#description");
    var image = document.querySelector("#zoom_01");

    category.innerText = product.category;

    var availStatus = (product.quantity == "0")?"Out of Stock":"In Stock";  
    
    availability.innerText = availStatus;  
    price.innerText = "₹" + product.price;  
    description.innerText = product.description; 
    image.src = product.featuredImage;
    image.alt = product.name;
    image.classList.add('productImage');
    image.title = product.name;


    var moreImageContainer = document.querySelector('.image-additional');

    var moreImagesArray = ["/AllSellerAssests/new shop/editFeaturedImage-1533890178758-shirt.png",product.featuredImage,"/AllSellerAssests/new shop/editFeaturedImage-1533890161588-jeans.png"];

    for(index in moreImagesArray){
        var a = document.createElement('a');
        a.classList.add('thumbnail');
        moreImageContainer.appendChild(a);
    
        var img = document.createElement('img');
        img.src = moreImagesArray[index];
        img.alt = product.name;
        img.title = product.name;
        img.classList.add('additionalImage');
        a.appendChild(img);
    }

    // var additionalImages = document.querySelectorAll('.additionalImage');

    var allListItems = moreImageContainer.querySelectorAll('img');
    Array.prototype.forEach.apply(allListItems,[function(e){
        console.log(e);
        e.addEventListener('click',()=>{
            image.src = e.src;
        });
    }]);

   

    
}