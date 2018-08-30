(function(util){
    "use strict";
    const cartStorage = {};
    document.addEventListener("DOMContentLoaded", function(event) {
        cartStorage.items = window.localStorage[document.location.pathname.split("/").filter(Boolean)[1]+"_cart"];
        getCartItems();
        document.querySelector("#checkOut").addEventListener("click",getCartItems);
    });

    function updateBill(){
        var totalQuantity = document.querySelector("table.table.table-bordered.totalPrice>tbody>tr").firstElementChild;
        var totalPrice = totalQuantity.nextElementSibling;
        var items = [];
        Array.from(document.querySelectorAll("table#cartTable [data-price]")).forEach(ele=>items.push(ele.innerText));
        // var t = items.reduce((a,b)=>{
        //     console.log("a");
        //     return a+b}
        // );
        // console.log(items,t);
        totalQuantity.querySelector("span").innerText = items.length;
        totalPrice.innerText = items.reduce((a,b)=>parseFloat(a)+parseFloat(b));

    }
    
    function getCartItems(){
        console.log("from cart.js -0-0-0-0-0-0-0-0-0",cartStorage.items);
        util.sendQuery(object=>{
            generateCartTable(object.data);
        },{name:"cart"},"object="+cartStorage.items);
    }
    function changeQuantity(){
        // console.log(this.parentNode.parentNode.parentNode.getAttribute("data-pid"));
        var tr = this.parentNode.parentNode.parentNode;
        var inputValue = tr.querySelector("input").value;
        var unitPrice = tr.querySelector("td[data-unitprice]").innerText;
        // var object = JSON.parse(window.localStorage[document.location.pathname.split("/").filter(Boolean)[1]+"_cart"]).cart;
        var object = JSON.parse(cartStorage.items).cart;
        var newObject = object.filter(e=>{
            if(e.productId == tr.getAttribute("data-pid")){
                e["quantity"] = inputValue;
                tr.querySelector("td[data-price]").innerText = inputValue*unitPrice;
                console.log(inputValue,unitPrice);
                // console.log(e);
            }
            return true;
        });
        cartStorage.items = JSON.stringify({cart:newObject});
        console.log(cartStorage.items);
        // window.localStorage.setItem(document.location.pathname.split("/").filter(Boolean)[1]+"_cart",JSON.stringify({cart:newObject}));
        updateBill();
        // alert("updated");
    }
    
    function subToatal(node){
        // console.log(node,this,this.n,this.n.querySelector("td input[name='quantity']").value);
        var priceTD = this.n.querySelector("td[data-price]") || false;
        // console.log(priceTD);
        var subToatalPrice = ((this.n.querySelector("td input[name='quantity']").value || node.querySelector("td input[name='quantity']").value) * this.e[this.m["unitPrice"]]);
        if(priceTD){
            priceTD.innerText = subToatalPrice;
            updateBill();
        }
        // updateBill();
        return subToatalPrice;
    }

    function generateCartTable(data){
        // console.log(data);
        var mapItem = {"img":"featuredImage","name":"name","quantity":"quantity","unitPrice":"price","price":subToatal};
        var headers = Array.from(document.querySelectorAll("table#cartTable>thead [data-header]"));
        
        if(!data.error){
            var table = document.querySelector("table#cartTable");
            var tbody = table.querySelector("table#cartTable>tbody");
            tbody.innerHTML = "";
            
            data.items.available.forEach(element => {
                let tr = document.createElement("TR");
                tr.setAttribute("data-pid",element["_id"]);
                headers.forEach((e,index)=>{
                    let td = document.createElement("TD");
                    switch(e.getAttribute("data-header")){
                        case "img":
                            td.classList = "text-center";
                            let a = document.createElement("A");
                            let img = document.createElement("IMG");
                            a.href = "#";
                            img.classList = "img-thumbnail";
                            img.src = element[mapItem[e.getAttribute("data-header")]];
                            img.alt = "preview";
                            img.title = "images";
                            a.appendChild(img);
                            td.appendChild(a);
                        break;
                        case "name":
                            td.classList = "text-left";
                            let a1 = document.createElement("A");
                            let small = document.createElement("SMALL");
                            a1.innerText = element[mapItem[e.getAttribute("data-header")]];
                            a1.href = "#";
                            td.appendChild(a1);
                            td.appendChild(small);
                        break;
                        case "quantity":
                            td.classList = "text-left";
                            let div = document.createElement("DIV");
                            let input = document.createElement("INPUT");
                            let span = document.createElement("SPAN");
                            let button = document.createElement("BUTTON");
                            div.classList = "input-group btn-block quantity";
                            input.type = "number";
                            input.name = "quantity";
                            input.size = "1";
                            input.value = element[mapItem[e.getAttribute("data-header")]];
                            input.classList = "form-control";
                            span.classList = "input-group-btn";
                            button.setAttribute("data-toggle","tooltip");
                            button.setAttribute("data-original-title","Update");
                            button.classList = "btn btn-primary";
                            button.innerText = "Update";
                            button.innerHTML += "<i class='fa fa-refresh'></i>";
                            button.addEventListener("click",changeQuantity);
                            // div.innerHTML = "<button type='button' data-toggle='tooltip' title='' class='btn btn-danger' data-original-title='Remove'><i class='fa fa-times-circle'></i></button></span>";
                            div.appendChild(input);
                            div.appendChild(button);
                            td.appendChild(div);
                        break;
                        case "unitPrice":
                            td.innerText = element[mapItem[e.getAttribute("data-header")]];
                            td.setAttribute("data-unitPrice","unitprice");
                        break;
                        case "price":
                            // alert(element[mapItem["unitPrice"]]);
                            // mapItem[e.getAttribute("data-header")] = mapItem[e.getAttribute("data-header")].bind({n:tr,e:element,m:mapItem});
                            // td.innerText = mapItem[e.getAttribute("data-header")](tr);
                            td.innerText = mapItem[e.getAttribute("data-header")].apply({n:tr,e:element,m:mapItem})
                            td.setAttribute("data-price","price");
                        break;
                        default:
                            td.innerText = null;
                    }
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
                // console.log(tr.querySelector("td input[ name='quantity']"));
                // tr.querySelector("td input[name='quantity']").addEventListener("keyup", function(){mapItem["price"](this)});

                // tr.querySelector("td input[name='quantity']").addEventListener("keyup", changeSubToatal);
            });
        }
        updateBill();
    }
}(util));