

const util = {
    connectPage(callback, page, object, method="post") {
		var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new 	ActiveXObject("Microsoft.XMLHTTP");
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					let response = JSON.parse(this.responseText);
					callback(response);
				}
			};
            xhttp.open(method,page.name, true);
            xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
			xhttp.send(JSON.stringify(object));
    },   
    updateLocalStorage(callback){
        this.connectPage((object)=>{
            window.localStorage.setItem(object.shopname,JSON.stringify(object.data));   
            this.shopname = object.shopname;    
            callback(window.localStorage.getItem(object.shopname));
        },{name : "showShop&Cat"},{});  
    },
    shopname : '',
    productsArray : [],
    init(pageHeading,callback){
        setHeading(pageHeading);
        var shopname = util.shopname;
        var lcStrg = window.localStorage.getItem(shopname);

        if(lcStrg){
            if(JSON.parse(lcStrg).data.categories.data){
                console.log("lc found"); 
                setCatShop(lcStrg);
                if(callback){
                    callback(lcStrg);
                }           
            }
            else{
                console.log("required local storage not found"); 
                util.updateLocalStorage(setCatShop);           
            }
        }
        else{
            console.log("local storage not found");
            util.updateLocalStorage(setCatShop);
        }
    },
    sendQuery(callback, page, query, method="get"){
		var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new 	ActiveXObject("Microsoft.XMLHTTP");
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					let response = JSON.parse(this.responseText);
					console.log("from sendQuery, sending data to",page.name,response);
					console.log(page.name);
					// callback(response);
					callback(JSON.parse(this.responseText));
				}
			};
			xhttp.open(method, page.name+"?"+query,true);
			xhttp.send();
	}
};

function setCatShop(obj){
    obj = JSON.parse(obj);
    console.log("_____________________",obj);
    

    var policyObj = obj.policy.data;
    console.log(typeof(policyObj));
    var catArr = obj.categories.data;
    var shopObj = obj.shop.data;

    console.log("c",catArr);
    console.log("s",shopObj);
    console.log("r",policyObj);

    setHeaderElements(shopObj);
    printCategories(catArr);

    
    // console.log(policyObj);
    setFooterElements(policyObj);
}

function setHeaderElements(shopObj){
    var mobile = document.querySelector('#headerMobile');
    var email = document.querySelector('#headerEmail');

    mobile.innerText = shopObj.pno;
    email.innerText = shopObj.email;   
}

function setFooterElements(policyObject){
    var policy = document.querySelector('.policy');
    var shipTime = policyObject.shipTime.split('*');
    console.log(shipTime);

    var shipTime = shipTime[0].split(" ");
    // policy.querySelector('p').innerHTML = policyObject.returnPol.split('*')[0] + "<br>" + shipTime[1] + " " + shipTime[0] + " shipping time." + "<br>" + "Within selected localities";
}

function printCategories(catArr){
    var container = document.querySelector('.categoryMenu>ul');    
    for(let cat in catArr){
        console.log(catArr[cat].name);
        var catName = catArr[cat].name;
        console.log(catName);
        var li = document.createElement('li');
        li.setAttribute('data-id',catName);
        
        container.appendChild(li); 
       
        


        var a = document.createElement('a');
        a.innerText = catName;        
        li.appendChild(a);
        
    }
    var allListItems = container.querySelectorAll('li');
    Array.prototype.forEach.apply(allListItems,[function(e){
        console.log(e);
        e.addEventListener('click',()=>{
            var catName = e.getAttribute('data-id');
            window.location.assign("categories.html?catName=" + catName);
        });
    }]);
    
}

function setHeading(pageName){
    console.log('heading setters');
    var breadCrum = document.querySelector('#breadCrum');
    var pageHeading= document.querySelector('#pageHeading');
    pageHeading.innerText = breadCrum.innerText = pageName;
}

function printProduct(pId, pImg, pName, pDesc, pPrice){
    

    var productsContainer = document.querySelector('.main-content');
    var div1 = document.createElement('div');
    div1.classList.add('product-container','product-layout', 'product-grid','col-lg-3' ,'col-md-3', 'col-sm-4' ,'col-xs-12');
    div1.setAttribute('data-id',pId);
    productsContainer.appendChild(div1);

    var div2 = document.createElement('div');
    div2.classList.add('product-thumb');
    div1.appendChild(div2);

    var div3 = document.createElement('div');
    div3.classList.add('image');
    div2.appendChild(div3);

    var a = document.createElement('a');
    // a.href = "product.html"
    div3.appendChild(a);

    var img = document.createElement('img');
    img.src = pImg;
    img.alt = "Product";
    img.classList.add('img-responsive', 'productImage');
    a.appendChild(img);

    var div4 = document.createElement('div');
    div2.appendChild(div4);

    var div5 = document.createElement('div');
    div5.classList.add('caption');
    div4.appendChild(div5);

    var h4 = document.createElement('h4');
    div5.appendChild(h4);

    var a1 = document.createElement('a');
    // a1.href = "product.html";
    a1.innerText = pName;
    h4.appendChild(a1);

    var p = document.createElement('p');
    p.classList.add('description');
    p.innerText = pDesc;
    div5.appendChild(p);

    var p1 = document.createElement('p');
    p1.classList.add('price');
    div5.appendChild(p1);

    var span = document.createElement('span');
    span.classList.add('price-new');
    span.innerText = pPrice;
    p1.appendChild(span);

    var div6 = document.createElement('div');
    div6.classList.add('button-group');
    div4.appendChild(div6);

    var button = document.createElement('button');
    button.classList.add('btn-primary','addCartBtn');
    button.type = 'button';
    button.setAttribute("data-productId",pId);
    div6.appendChild(button);

    var span1 = document.createElement('span');
    span1.innerText = "Add to Cart";
    button.appendChild(span1);    
    
}

function bringAndPrintProducts(catName){
    console.log("category",catName);
    util.connectPage((object)=>{
        var productsContainer = document.querySelector('.main-content');
        productsContainer.innerHTML = ""; 
        if(object.data){
            console.log("products found", object.data);
            util.productsArray = object.data;
            for(let product in object.data){
                var pid = object.data[product]._id;                                  
                var img = object.data[product].featuredImage;                    
                var name = object.data[product].name;
                var desc = object.data[product].description;
                var price = object.data[product].price;
                setHeading(catName);              
                printProduct(pid,img,name,desc,price);
            }
            
            clickDisableCartBtn('addCartBtn','homePage');

            var allListItems = container.querySelectorAll('.product-container');
            console.log("*******", allListItems);
            Array.prototype.forEach.apply(allListItems,[function(e){
                // console.log(e);
                e.addEventListener('click',()=>{
                    var productId = e.getAttribute('data-id');
                    window.location.assign("product.html?productId=" + productId);
                },false );
            }]);
            // var cartProductArray = window.localStorage.getItem(util.shopname + "***cart");
            // if(cartProductArray){
            //     cartProductArray = JSON.parse(cartProductArray);
            //     cartProductArray = cartProductArray.cart;
            // }
            // else{
            //     cartProductArray = [];                
            // }
            // var addCartBtn = document.querySelectorAll('.addCartBtn');
            // Array.prototype.forEach.apply(addCartBtn,[function(e){
            //         e.addEventListener('click',()=>{
            //             console.log(cartProductArray);
            //             var productId = e.getAttribute('data-productId');
            //             console.log("add to cart clicked",productId);
                        
            //             // var temp = cartProductArray.filter(product => product.productId == productId);

            //             // if(temp.length == 0){
            //                 cartProductArray.push({"productId" : productId, "quantity" : 1});
            //                 window.localStorage.setItem(util.shopname + "***cart",JSON.stringify({"cart" : cartProductArray})); 
            //                 e.querySelector('span').innerText = "ADDED TO CART";
            //                 e.style = "background : green";  
            //                 e.disabled = true;                           
            //             // }
            //             // else{
            //                 // console.log("already in cart")
            //             // }
                    
            //         });
            // }]);


        }
        },{name : "showProducts"},{catname : catName, shopname : util.shopname});
}

function addToCart(productId){
    console.log(productId);
}

function clickDisableCartBtn(btnClass,page){
    console.log("fn called");
    var cartProductArray = window.localStorage.getItem(util.shopname + "***cart");
    if(cartProductArray){
        cartProductArray = JSON.parse(cartProductArray);
        cartProductArray = cartProductArray.cart;
        console.log(cartProductArray);
        var addCartBtn = document.querySelectorAll('.' + btnClass);
        addCartBtn.forEach((btn)=>{
                console.log("btn");
                var productId = btn.getAttribute('data-productId');
                var temp = cartProductArray.filter(product => product.productId == productId);
                if(temp.length !== 0){
                    console.log("##");
                    btn.querySelector('span').innerText = "ADDED TO CART";
                    btn.style = "background : green";
                    console.log(btn.innerText);
                    btn.disabled = true;                             
                }
            });
    }
    else{
        cartProductArray = [];                
    }

    var addCartBtn = document.querySelectorAll('.' + btnClass);
    Array.prototype.forEach.apply(addCartBtn,[function(e){
    e.addEventListener('click',()=>{
        console.log("###",cartProductArray);
        var productId = e.getAttribute('data-productId');
        console.log("add to cart clicked",productId);
        var quantity = (page!=="productPage")?1:document.querySelector('#input-quantity').value;

        if(page == "productPage"){
            document.querySelector('#input-quantity').disabled = true;            
            console.log("quantity found");
        };
        
        cartProductArray.push({"productId" : productId, "quantity" : quantity});
        window.localStorage.setItem(util.shopname + "***cart",JSON.stringify({"cart" : cartProductArray})); 
        e.querySelector('span').innerText = "ADDED TO CART";
        e.style = "background : green";  
        e.disabled = true;                                  
    },true);
    }]);

   

}


