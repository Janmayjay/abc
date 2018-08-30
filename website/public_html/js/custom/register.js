const util = {
    formData(form) {
		this._form = form;
		return Values(this._form);
		function Values(frm){
			var object = {};
			var formObject = new FormData(frm);
			var nameField = frm.querySelectorAll("input[name]");
			Array.prototype.forEach.apply(nameField,[function(element){
				object[element.name] = formObject.get(element.name);
			}]);
			return object;
		}			
    },
    sendForm(callback, form){
		var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new 	ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				// callback(JSON.parse(this.responseText));
				callback(JSON.parse(this.responseText));
			}

		};
		xhttp.open("POST", form.getAttribute("data-action"), true);
		xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
		// let abc = this.formData(form);
		// abc =JSON.stringify({object:abc});
		// console.log(abc);
		xhttp.send(JSON.stringify({object:this.formData(form)}));
	},
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
            window.localStorage.setItem(this.shopname,JSON.stringify(object));   
            callback(window.localStorage.getItem(this.shopname));
        },{name : "showShop&Cat"},{shopname : this.shopname});  
    },
    shopname : 'new shop',
    productsArray : []
};


// var registerFormButton = document.querySelector("#registerFormButton");
// registerFormButton.addEventListener("click",registerValidation);
// function registerValidation(){
    // event.preventDefault();
    // console.log("inside register");
    // if(document.querySelector("#input-password").value==document.querySelector("#input-confirm").value){
		// document.querySelector("#registerForm").submit();
		// console.log("true");
		
		// util.sendForm((object)=>{
		// 	console.log(object);
		// },registerForm);
        
    // }
    // else{
    //     window.alert("Passwords don't Match");
    //     console.log("Passwords don't Match");
    // }
// }
