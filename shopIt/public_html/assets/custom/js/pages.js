'use strict';

/*
|-----------------------------------------------------------------------------
| OUR CODE UTIL START
|-----------------------------------------------------------------------------
*/

const util = {
	visitedProduct: {},
	customerRecord :  {},
	createTable(headerArr,recordArr,tableName, tableContainer, dataJSON, editClick, deleteClick, extraFunction) {		
		console.log(dataJSON);
		console.log(tableContainer, dataJSON);

		var div = document.createElement('div');
		div.classList.add('data-table', 'data-table-init', 'card');
		div.style.height = "100vh";
		div.style.margin = "0px";
		tableContainer.appendChild(div);

		var card_header = document.createElement('div');
		card_header.classList.add('card-header');
		div.appendChild(card_header);

		var data_table_header = document.createElement('div');
		data_table_header.classList.add("data-table-header");
		card_header.appendChild(data_table_header);

		var data_table_title = document.createElement("div");
		data_table_title.classList.add("data-table-title");
		data_table_header.appendChild(data_table_title);
		data_table_title.innerText = tableName;

		var card_content = document.createElement('div');
		card_content.classList.add("card-content");
		div.appendChild(card_content);

		var table = document.createElement('table');
		card_content.appendChild(table);

		var thead = document.createElement('thead');
		table.appendChild(thead);

		var tr = document.createElement('tr');
		thead.appendChild(tr);

		// for (let header in dataJSON[0]) {
		// 	if (header != "_id") {
		// 		var th = document.createElement('th');
		// 		th.classList.add('numeric-cell');
		// 		th.innerText = header;
		// 		tr.appendChild(th);
		// 	}
		// }

		// var headerArr = ['Name'];
		// for(let header in headerArr){
		// 	var th = document.createElement('th');
		// 	th.classList.add('numeric-cell');
		// 	th.innerText = headerArr[header];
		// 	th.style.textTransform = "uppercase";			
		// 	tr.appendChild(th);
		// }

		var th = document.createElement('th');
		th.classList.add('numeric-cell');
		th.innerText = headerArr[0];
		th.style.textAlign = "left";					
		th.style.textTransform = "uppercase";			
		tr.appendChild(th);
		
		



		var tbody = document.createElement('tbody');
		table.appendChild(tbody);
		console.log(dataJSON);
		for (let record of dataJSON) {
			var tr = document.createElement('tr');
			tbody.appendChild(tr);
			console.log(record);
			// for (let data in record) {
			// 	if (data != "_id") {
			// 		var td = document.createElement('td');
			// 		td.setAttribute("data-collapsible-title", data);
			// 		td.classList.add('numeric-cell');
			// 		td.innerText = record[data];
			// 		tr.appendChild(td);
			// 	}
				// var recordArr = ['name'];
				// for(let header in headerArr){
				// 	var td = document.createElement('td');
				// 	// td.setAttribute("data-collapsible-title", data);
				// 	td.classList.add('numeric-cell');
				// 	td.innerText = record[recordArr[header]];
				// 	tr.appendChild(td);
				// 	console.log('printing row data');
				// }

				var td = document.createElement('td');
				td.classList.add('numeric-cell');
				td.innerText = record[recordArr[0]];
				td.style.textAlign = "left";			
				tr.appendChild(td);

				
				console.log('printing row data');



			// }
			// if (editClick) {
			// 	var td1 = document.createElement('td');
			// 	td1.classList.add("actions-cell");
			// 	tr.appendChild(td1);
			// 	td1.setAttribute('dataid', record.name);
			// 	td1.addEventListener('click', () => {
			// 		editClick(dataJSON, record.name);
			// 	});
			// 	td1.innerHTML = '<i class="material-icons">edit</i>';

			// 	var td2 = document.createElement('td');
			// 	td2.classList.add("actions-cell");
			// 	tr.appendChild(td2);
			// 	td2.setAttribute('dataid', record.name);
			// 	td2.addEventListener('click', () => {
			// 		deleteClick(record.name);
			// 	});
			// 	td2.innerHTML = '<i class="material-icons">delete</i>';
			// }
			var viewMore = document.createElement('td');
			viewMore.classList.add("actions-cell");
			viewMore.style.color = "purple";
			viewMore.style.textAlign = "left";
			viewMore.innerText = "View";
			tr.appendChild(viewMore);
			// viewMore.setAttribute('dataid', record.name);
			viewMore.addEventListener('click', () => {
				this.viewRecord(tableName,dataJSON,headerArr,recordArr,record,editClick,deleteClick,extraFunction);
			});
			
		}






	},
	viewRecord(tableName,dataJSON,headerArr,recordArr,record,editClick,deleteClick,extraFunction){
		console.log(record);	
		var modalContent = document.querySelector('#viewModal .modal-content');		
		if(modalContent.querySelector('.buttons-row')){
			modalContent.removeChild(modalContent.querySelector('.buttons-row'));
		}			
		var viewModal = document.querySelector('#viewModal');
		viewModal.style.display = "block";
		// viewModal.querySelector('.item-inner').innerText = record.name;
		var ul = viewModal.querySelector('ul');
		ul.innerHTML = "";
		console.log(ul);
		var li = document.createElement('li');
		ul.appendChild(li);

		var itemContent = document.createElement('div');
		itemContent.classList.add('item-content');
		li.appendChild(itemContent);

		var itemInner = document.createElement('div');
		itemInner.classList.add('item-inner');
		itemContent.appendChild(itemInner);

		for(let header in headerArr){
			console.log(headerArr[header],record[recordArr[header]]);
			var key = document.createElement('p');
			key.style.color = "purple";
			key.textTransform = "upppercase";
			key.innerText = headerArr[header];
			itemInner.appendChild(key); 

			var value = document.createElement('p');
			// key.value.color = "purple";
			// key.textTransform = "upppercase";
			value.innerText = "";

			if(typeof(record[recordArr[header]]) == "object" && tableName=="Orders"){
				value.innerHTML = "";
				record[recordArr[header]].forEach(product=>{
					console.log(product)
					value.innerHTML += product.id + " X " + product.quantity + "<br>";
				});
			}
			else{
				value.innerText = record[recordArr[header]];				
			}
			itemInner.appendChild(value); 
		}


		var viewModal = document.querySelector('#viewModal .modal-content');
		
		var modalContent = document.querySelector('#viewModal .modal-content');
			var buttonRow = document.createElement("p");
			buttonRow.classList.add('buttons-row');
			modalContent.appendChild(buttonRow);
			
			buttonRow.innerHTML = "";
			buttonRow.style.margin = "20px";
		
		if(editClick){

			

			var editButton = document.createElement('button');
			editButton.type = "button";
			editButton.classList.add("button", "button-fill");
			editButton.innerText = "EDIT";
			buttonRow.appendChild(editButton);
			editButton.addEventListener('click',()=>{
				editClick(dataJSON, record._id);				
			});
		}
		if(deleteClick)
		{
			var deleteButton = document.createElement('button');
			deleteButton.type = "button";
			deleteButton.classList.add("button", "button-fill");
			deleteButton.innerText = "DELETE";
			buttonRow.appendChild(deleteButton);
			deleteButton.addEventListener('click',()=>{
				deleteClick(record._id);				
			});
			
			console.log('edit click exist');
		}

		if(extraFunction){
			var extraButton = document.createElement('button');
			extraButton.type = "button";
			extraButton.classList.add("button", "button-fill");
			extraButton.innerText = "PLACE ORDER";
			buttonRow.appendChild(extraButton);
			extraButton.addEventListener('click',()=>{
				extraFunction(record);		
				console.log(record._id);		
			});
		}
		// console.log(record.name);
	},
	handOverObject(callback, object) {
		console.log(object);
		if (!object.redirect)
			callback(object);
		else {
			setTimeout(function () {
				mainView.router.loadPage(object.page)
			}, 500);

			console.log("from handOverObject inside else", object.page);
		}
	},
	sendForm(callback, form) {
		var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				// callback(JSON.parse(this.responseText));
				util.handOverObject(callback, JSON.parse(this.responseText));
			}

		};
		xhttp.open("POST", window.document.baseURI + form.getAttribute("action").replace(/\//, ""), true);
		xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
		xhttp.send(JSON.stringify(this.formData(form)));
	},
	sendForm2(callback, form) {
		event.preventDefault();
		var xhttp = window.XMLHttpRequest ?
			new XMLHttpRequest() :
			new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				// callback(JSON.parse(this.responseText));
				util.handOverObject(callback, JSON.parse(this.responseText));
			}
		};
		xhttp.open(
			"POST",
			window.document.baseURI + form.getAttribute("action").replace(/\//, ""),
			true
		);
		// xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
		xhttp.send(new FormData(form));
		// return false;
	},
	sendForm3(callback, form, something) {
		event.preventDefault();
		var xhttp = window.XMLHttpRequest ?
			new XMLHttpRequest() :
			new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				callback(JSON.parse(this.responseText));
			}
		};
		xhttp.open(
			"POST",
			something,
			true
		);
		// xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
		xhttp.send(new FormData(form));
	},
	formData(form) {
		this._form = form;
		return Values(this._form);

		function Values(frm) {
			var object = {};
			var formObject = new FormData(frm);
			var nameField = frm.querySelectorAll("input[name]");
			Array.prototype.forEach.apply(nameField, [function (element) {
				object[element.name] = formObject.get(element.name);
			}]);
			return object;
		}
	},
	connectPage(callback, page, method = "get") {
		var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let response = JSON.parse(this.responseText);
				console.log("from connectPage, sending data to", page.name, response);
				console.log(page.name);
				// if(!response.redirect)
				// 	callback(response);
				// else{
				// 	mainView.router.loadPage(response.page);
				// 	console.log("inside else",response.page);
				// }
				util.handOverObject(callback, JSON.parse(this.responseText));
			}
		};
		xhttp.open(method, window.document.baseURI + page.name, true);
		xhttp.send();
	},
	sendQuery(callback, page, query, method = "get") {
		var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let response = JSON.parse(this.responseText);
				console.log("from sendQuery, sending data to", page.name, response);
				console.log(page.name);
				// callback(response);
				util.handOverObject(callback, JSON.parse(this.responseText));
			}
		};
		

		if(method == "get"){
			xhttp.open(method, window.document.baseURI + page.name + "?" + query, true);
			xhttp.send();
		}
		else{
			xhttp.open(method, window.document.baseURI + page.name, true);
			xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");		
			xhttp.send(JSON.stringify({objectOrderCustomer : query}));
		}
	},
	filter(searchBox, table) {
		var filter, table, tr, td, i;
		filter = document.querySelector(searchBox).value.toLowerCase();
		table = document.querySelector(table);
		tr = table.querySelector("tbody").querySelectorAll("tr");

		Array.prototype.forEach.apply(tr, [
			element => {
				td = element.querySelectorAll("td")[this.searchIndex];
				if (td) {
					if (td.innerText.toLowerCase().indexOf(filter) > -1) {
						// console.log(td.innerHTML.charAt(td.innerText.indexOf(filter)));
						element.style.display = "";
					} else {
						element.style.display = "none";
					}
				}
			}
		]);
	}
}

/*
|-----------------------------------------------------------------------------
| OUR CODE UTIL END
|-----------------------------------------------------------------------------
*/


/*
|-----------------------------------------------------------------------------
| OUR HTML FILE RELATED CODE START
|-----------------------------------------------------------------------------
*/


/*
|------------------------------------------------------------------------------
| Splash Screen 
|------------------------------------------------------------------------------
*/
myApp.onPageInit('splash-screen', function (page) {

	new Vivus('logo', {
			duration: 125,
			onReady: function (obj) {
				obj.el.classList.add('animation-begin');
			}
		},
		function (obj) {
			obj.el.classList.add('animation-finish');
			/* 3 seconds after logo animation is completed, open walkthrough screen. */
			setTimeout(function () {
				util.connectPage((object) => {
					mainView.router.loadPage(object.page);
				}, page);
				// util.connectPage(mainView.loadPage, page);
			}, 1500);
		});

	/* 1 second after page is loaded, show preloader. */
	setTimeout(function () {
		$$('.page[data-page=splash-screen] .splash-preloader').css('opacity', 1);
	}, 1000);

});

/*
|------------------------------------------------------------------------------
| Walkthrough
|------------------------------------------------------------------------------
*/
myApp.onPageInit('walkthrough', function (page) {
	/* Initialize Slider */
	myApp.swiper('.page[data-page=walkthrough] .walkthrough-container', {
		pagination: '.page[data-page=walkthrough] .walkthrough-pagination',
		paginationClickable: true
	});

	function mycallback(object) {
		console.log("from walkthrough :", object);
		if (object.data.authenticate) {
			mainView.loadPage(object.data.page);
		} else {
			console.log(object.data.error);
		}
	}

	$('form[name=login]').validate({
		rules: {
			mobile: {
				required: true,
				number: true
			},
			password: {
				required: true,
				number: true
			}
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			// form.submit();
			util.sendForm(mycallback, form);
			myApp.addNotification({
				message: 'Verifying please wait...',
				hold: 1500,
				button: {
					text: 'Ok'
				}
			});
		}
	});

});

/*
|------------------------------------------------------------------------------
| Home
|------------------------------------------------------------------------------
*/
myApp.onPageInit('home', function (page) {
	(function () {
		document.querySelector("[data-action='userLogout'].logout").parentNode.addEventListener("click", function () {
			util.connectPage(object => {
				console.log("user logout successfully", object);
			}, {
				name: "logout"
			})
		})
	}());

	function callback(obj) {
		console.log(obj);
		if (obj.data) {
			// document.querySelector('.user-photo').src = obj.data.gstin;			
			document.querySelector('.sellerName').innerText = obj.data.name;
		}
	}
	util.connectPage(callback, {
		name: "viewseller"
	});
	$$('[data-action=mytest]').on('click', function (e) {
		console.log("click");
	});

	/* Hero Slider */
	myApp.swiper('.page[data-page=home] .slider-hero .swiper-container', {
		autoplay: 10000,
		loop: true,
		pagination: '.swiper-pagination',
		paginationClickable: true
	});

	/* Theme Color */
	if (sessionStorage.getItem('nectarMaterialThemeColor')) {
		$$('input[name=theme-color][value=' + sessionStorage.getItem('nectarMaterialThemeColor') + ']').prop('checked', true);
	}

	$$('input[name=theme-color]').on('change', function () {
		if (this.checked) {
			$$('body').removeClass('theme-red theme-pink theme-purple theme-deeppurple theme-indigo theme-blue theme-lightblue theme-cyan theme-teal theme-green theme-lightgreen theme-lime theme-yellow theme-amber theme-orange theme-deeporange theme-brown theme-gray theme-bluegray theme-white theme-black');
			$$('body').addClass('theme-' + $$(this).val());
			sessionStorage.setItem('nectarMaterialThemeColor', $$(this).val());
		}
	});

	/* Theme Mode */
	if (sessionStorage.getItem('nectarMaterialThemeLayout')) {
		$$('input[name=theme-layout][value=' + sessionStorage.getItem('nectarMaterialThemeLayout') + ']').prop('checked', true);
	}

	$$('input[name=theme-layout]').on('change', function () {
		if (this.checked) {
			switch ($$(this).val()) {
				case 'dark':
					$$('body').removeClass('layout-dark');
					$$('body').addClass('layout-' + $$(this).val());
					break;
				default:
					$$('body').removeClass('layout-dark');
					break;
			}
			sessionStorage.setItem('nectarMaterialThemeLayout', $$(this).val());
		}
	});

	/* Share App */
	$$('[data-action=share-app]').on('click', function (e) {
		e.preventDefault();
		var buttons = [{
				text: 'Share Nectar',
				label: true
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-envelope-o color-red"></i>&emsp;<span>Email</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-facebook color-facebook"></i>&emsp;<span>Facebook</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-google-plus color-googleplus"></i>&emsp;<span>Google+</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-linkedin color-linkedin"></i>&emsp;<span>LinkedIn</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-twitter color-twitter"></i>&emsp;<span>Twitter</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-whatsapp color-whatsapp"></i>&emsp;<span>WhatsApp</span>'
			}
		];
		myApp.actions(buttons);
	});

});
/*
|------------------------------------------------------------------------------
| storePolicy
|------------------------------------------------------------------------------
*/

myApp.onPageInit("storePolicy", function (page) {
	util.connectPage(fn, {
		name: "viewpolicy"
	});


	var form = document.querySelector('form[name="policyForm"]');
	

	document.querySelector('#setValueBtn').addEventListener('click', () => {
		event.preventDefault();
		event.stopPropagation();
		setValue();
		document.querySelector('#submitBtn').click();
	});

	function setValue() {
		var input = form.querySelectorAll("input[type='radio']");
		input.forEach((element) => {
			// console.log(element.parentNode.parentNode.lastElementChild.innerHTML);
			var tr = element.parentNode.parentNode;
			var val = tr.lastElementChild.innerText;
			var subStrings = val.split("  ");
			var innerInput = tr.lastElementChild.querySelector('input[type="text"]');
			console.log("*****************", subStrings);

			// console.log(innerInput,innerInput.value);

			var leftSubStr = [];
			leftSubStr[0] = subStrings[0];
			var innerInputValue = ((innerInput)?(innerInput.value || innerInput.getAttribute("data-defaultValue")):"");
			leftSubStr.push(innerInputValue);

			// leftSubStr.push(innerInput.value);
			var rightSubStr = subStrings.slice(1);
			console.log(";dk;lkgfd;lkdf", rightSubStr);

			leftSubStr = leftSubStr.concat(rightSubStr);
			console.log("final : ", leftSubStr.join(" "));

			var finalStr = leftSubStr.join(" ");

			element.value = finalStr;



			// left[0] = subStrings[0];
			// console.log('lr',left,right);

		});

		setName('returnPol');
		setName('shipTime');
		setName('region');
	}

	function setName(sectionClass) {
		var radioId = document.querySelector('.' + sectionClass + ' input[type="radio"]:checked').getAttribute('data-radioId');


		document.querySelectorAll('.' + sectionClass + ' input[type="radio"]').forEach((element) => {
			var innerInput = element.parentNode.parentNode.lastElementChild.querySelector('input[type="text"]');
			var val = (innerInput) ? innerInput.value : "";

			element.value = element.value + "*" + radioId + "#" + val;
		});
	}


	$('form[name=policyForm]').validate({
		rules: {
			returnPol: {
				required: true
			},
			shipTime: {
				required: true
			},
			region: {
				required: true
			}			
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			// setValue();
			util.sendForm(fn, form);

			function fn(obj){
				myApp.addNotification({
					message: obj.message,
					hold: 800,
					button: {
						text: 'ok'
					}
				});
				if (obj.flag == "1") {
					setTimeout(() => {
						mainView.loadPage("home.html");
					}, 1000);
				}	
			}


		},
		
	});

	function fn(obj) {
		console.log(obj);
		console.log("inside callback");

		if (obj.data) {
			var object = obj.data;
			for (let key in object) {
				console.log(object[key]);
				var splittedValues = object[key].split('*');
				var temp = splittedValues[1];
				if (temp) {
					var selInputnValue = temp.split('#');
					var attr = selInputnValue[0];
					var val = selInputnValue[1];
				} else {
					temp = splittedValues[0];
					var selInputnValue = temp.split('#');
					var attr = selInputnValue[0];
					var val = ""
				}
				document.querySelectorAll('.' + key + ' input[type="radio"]').forEach((element) => {
					if (element.getAttribute('data-radioId') == attr) {
						element.checked = true;
						console.log("inside setter");
						var innerInput = element.parentNode.parentNode.lastElementChild.querySelector('input[type="text"]');

						if (innerInput) {
							innerInput.value = val;
						}
					}
				});


			}
		}
	}



});





/*
|------------------------------------------------------------------------------
| addProducts
|------------------------------------------------------------------------------
*/
myApp.onPageInit("addProducts", function (page) {
	// const opertion = { edit: edit, delProduct: delProduct };
	var settings = {
		searchIndex: "0"
	};

	function openViewModal(){
		document.querySelector('#viewModal').style.display = "block";
	}
	function closeViewModal(){
		document.querySelector('#viewModal').style.display = "none";
	}

	function showCategories(object) {
		console.log("category object", object);
		var x = document.getElementById("categories");
		for (let i in object) {
			let option = document.createElement("option");
			option.text = object[i].name;
			x.add(option, x[i + 1]);
		}

		x.addEventListener("change", function () {
			console.log("this is add event", object);
			removeSelect(object);
		});
	}

	function showSubCategories(object) {
		console.log("category object", object);
		var x = document.getElementById("categories");
		var z = document.querySelector("#categories").value;
		var y = document.getElementById("subcategories");
		var subId, subData;
		for (let i in object) {
			if (z == object[i].name) {
				subId = i;
				subData = object[subId].subCategories;
				console.log("subData1", subData, object[subId], subId);
			}
		}
		console.log("subData", subData, subData.length);
		if (subData.length == 0)
			y.style.display = "none";
		var temp = new Array();
		temp = subData.split(",");
		console.log(temp);
		var subCatLength = y.options.length;
		for (let j in temp) {
			let option = document.createElement("option");
			option.text = temp[j];
			y.add(option, x[j + 1]);
		}
	}

	function removeSelect(object) {
		var parentDiv = document.querySelector("#subCategoryDiv");
		parentDiv.innerHTML = "";
		console.log("changed", object);
		var selectElement = document.createElement("select");
		selectElement.id = "subcategories";
		selectElement.name = "subCategory";
		parentDiv.appendChild(selectElement);
		// changeSubCategory();
		showSubCategories(object);
	}

	function addFields(serverObject) {
		serverObject.fields.edit = "edit opertion";
		serverObject.fields.delete = "delete operation";

		for (let product of serverObject.products) {
			serverObject[product].edit = "<button data-action='edit'>edit</button>";
			serverObject[product].delete = "<button data-action='delProduct'>delete</button>";
			// addEvents();
		}
	}

	function GenerateTable(object, tab) {
		// addFields(object);
		tab = document.querySelector("#" + tab);
		var div = document.createElement("div");
		div.setAttribute("class", "card-content");
		var table = document.createElement("TABLE");
		table.innerText = "";
		var thead = document.createElement("THEAD");
		var tbody = document.createElement("TBODY");

		var thRow = table.appendChild(thead).insertRow(-1);
		var column = Object.keys(object.fields);
		var columnLength = column.length;
		columnLength = 3;
		for (let i = 0; i < columnLength; i++) {
			let headerCell = document.createElement("TH");
			headerCell.innerText = object.fields[column[i]];
			thRow.appendChild(headerCell);
		}

		for (let i = 0; i < object.products.length; i++) {
			var row = table.appendChild(tbody).insertRow(-1);
			row.setAttribute("data-id", object.products[i]);
			row.addEventListener("click", openTr);
			for (let j = 0; j < columnLength; j++) {
				let td = row.insertCell(-1);
				td.setAttribute("class", !j ? "label-cell" : "");
				td.setAttribute("data-collapsible-title", column[j]);
				td.innerHTML = object[object.products[i]][column[j]];
			}
		}
		div.appendChild(table);
		tab.appendChild(div);

		Array.prototype.forEach.apply(table.querySelectorAll("tbody tr"), [function (e) {
			e.lastChild.innerHTML += '<i class="fa fa-pencil" style="text-align: right;padding-left: 0px;position:  absolute;right: 21px; top: 11px; font-size: 23px;"></i>';
		}])

		function openTr() {
			mainView.loadPage("custom/productDetails.html");
			util.visitedProduct = object[this.getAttribute("data-id")];
		}
	}

	function closeModal() {
		document.querySelector('#modal').style.display = 'none';
	}

	function fn1(obj2) {
		console.log("callback", obj2);
		showCategories(obj2.data.sellerCategory);
	}

	function openModal() {
		


		document.querySelector('#modal').style.display = 'block';
		util.connectPage(fn1, {
			name: "getcat"
		});
	}



	$('form[name=validation]').validate({
		rules: {
			name: {
				required: true
			},
			quantity: {
				required: true,
				number: true
			},
			price: {
				required: true,
				number: true
			},
			tax: {
				required: true,
				number: true
			},
			discount: {
				required: false,
				number: true
			},
			length: {
				required: false,
				number: true
			},
			breadth: {
				required: false,
				number: true
			},
			height: {
				required: false,
				number: true
			},
			weight: {
				required: false,
				number: true
			},
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			util.sendForm2(handleForm, form);
			// form.submit();
			// util.sendForm(handleForm, form);
			// var form = document.forms.namedItem("validation");
			// form.addEventListener('submit', function(ev) {
			// var oData = new FormData(form);
			// var oReq = new XMLHttpRequest();
			// oReq.open("POST", "/addProducts", true);
			// oReq.onload = function(oEvent) {
			// if (oReq.status == 200) {
			//   console.log("Uploaded!");
			//   mainView.refreshPage();
			// } else {
			//   console.log("Error " + oReq.status + " occurred when trying to upload your file.<br \/>");
			// }
			// };

			// oReq.send(oData);
			// ev.preventDefault();
			// }, false);
			myApp.addNotification({
				message: "Product added",
				hold: 5000,
				button: {
					text: 'ok'
				}
			});
			console.log(form);
			mainView.refreshPage();
		}
	});

	$('form[name=updateProducts]').validate({
		rules: {
			name: {
				required: true
			},
			quantity: {
				required: true
			},
			price: {
				required: true
			},
			age: {
				required: false,
				range: [1, 100]
			},
			email: {
				required: false,
				email: false
			},
			url: {
				required: false,
				url: false
			},
			number: {
				required: false,
				number: false
			},
			digits: {
				required: false,
				digits: false
			},
			in_phone: {
				required: false,
				phoneUS: false
			},
			credit_card: {
				required: false,
				creditcard: false
			}
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			// form.submit();
			util.sendForm(handleUpdateProducts, form);
			myApp.addNotification({
				message: "Product Updated",
				hold: 5000,
				button: {
					text: 'ok'
				}
			});
			console.log("form", form);
		}
	});

	function handleForm(object) {
		console.log(object);
		mainView.refreshPage();
	}

	function handleUpdateProducts(object) {
		console.log(object);
	}

	function showPreview() {
		document.querySelector("#featuredImageInputDiv").classList.remove("'not-empty-state','focus-state'");
		var previewDiv = document.querySelector("#featuredImagePreviewAddProducts");
		var image = document.createElement("img");
		image.setAttribute("height", "100px");
		image.setAttribute("width", "100px");
		var a = document.querySelector("#imgUpload").files;
		for (let i = 0; i < a.length; i++) {
			image.src = window.URL.createObjectURL(a[i]);
			previewDiv.appendChild(image);
		}
	}

	function showPreview1() {
		document.querySelector("#otherImageInputDiv").classList.remove("'not-empty-state','focus-state'");
		var previewDiv = document.querySelector("#otherImagePreviewAddProducts");
		previewDiv.innerHTML = "";

		var a = document.querySelector("#otherImgUpload").files;
		console.log(a.length);
		if (a.length <= 5) {
			for (let i = 0; i < a.length; i++) {
				console.log(i);
				var image = document.createElement("img");
				image.setAttribute("height", "100px");
				image.setAttribute("width", "100px");
				image.src = window.URL.createObjectURL(a[i]);
				previewDiv.appendChild(image);
			}
		} else {
			window.alert("Other Images should be less than 5 images.");
			document.querySelector("#otherImgUpload").value = "";
		}
	}
	// function removeClasses(){}
	function init() {
		// document.querySelector("#featuredImageInputDiv").addEventListener("click",removeClasses);
		document.querySelector("#imgUpload").addEventListener("change", showPreview);
		document.querySelector("#otherImgUpload").addEventListener("change", showPreview1);
		document.querySelector("#closeModal").addEventListener("click", closeModal);
		document.querySelector("#floating-button").addEventListener("click", openModal);
		document.querySelector("#closeViewModal").addEventListener("click", closeViewModal);		
		
		// document.querySelector("#search").addEventListener("keyup", function () {
		// 	util.filter.apply(settings, ["#" + this.id, "#tab-1 table"]);
		// });
		// document.querySelector("#searchBy").addEventListener("change", function () {
		// 	settings.searchIndex = this.value;
		// });
	}

	function fn(obj2) {
		console.log(obj2);
		// console.log("callback", obj2, obj2.data.sellerCategory);
		// showCategories(obj2.data.sellerCategory);
		showProducts(obj2	);

	}

	function showProducts(object) {
		console.log(object);
		// for (let tab of object.tabId) {
		// 	var tabElement = document.querySelector("#" + tab);
		// 	tabElement.innerHTML = "";
		// 	let products = Object.keys(object[tab]);
		// 	console.log(products);
		// 	GenerateTable(object[tab], tab);
		// }
		var tableContainer = document.querySelector('.productTable');
		util.createTable(['Name','Category Name','Quantity', 'Sub Categories', 'Description', 'Tax', 'COD', 'Price'],['name','category','quantity','subCategories','description','tax','COD','price'],"Products", tableContainer, object, editClick);
	}

	function editClick(object,dataId){
		console.log(object);
		object = object.filter(element => element._id == dataId);
		mainView.loadPage("custom/productDetails.html");
		util.visitedProduct = object[0];
	}

	(function () {
		util.connectPage(fn, page);
		init();
		// var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
		// xhttp.onreadystatechange = function () {
		// 	if (this.readyState == 4 && this.status == 200) {
		// 		var response = JSON.parse(this.responseText).data;
		// 		console.log("my response", response);
		// 		for (let tab of response.tabId) {

		// 			var tabElement = document.querySelector("#" + tab);
		// 			tabElement.innerHTML = "";
		// 			let products = Object.keys(response[tab]);
		// 			console.log(products);
		// 			GenerateTable(response[tab], tab);
		// 		}
		// 	}
		// };
		// xhttp.open("GET", "../../../json/productsjson.json", true);
		// xhttp.send();
	}());
});


/*
|------------------------------------------------------------------------------
| productsDetails
|------------------------------------------------------------------------------
*/
myApp.onPageInit("productDetails", function(page){
	var tempVar = 0;
	var currentProduct = util.visitedProduct;
	console.log("current",currentProduct);
	var otherImageDiv = document.querySelector("#otherImageDiv");
	var otherData = "";
	console.log((currentProduct.otherImages).length);
	if((currentProduct.otherImages).length<5){
		console.log((currentProduct.otherImages).length);
		var parentImageDiv = document.createElement("div");
		parentImageDiv.classList.add("imageContainer");
		var otherImageUpload = document.createElement("input");
		otherImageUpload.type = "file";
		otherImageUpload.id = "editOtherImage";
		otherImageUpload.multiple = "multiple";
		otherImageUpload.required = "required";
		otherImageUpload.classList.add("hidden");
		otherImageUpload.addEventListener("change",showOtherPreview);
		var deleteButton = document.createElement("button");
		deleteButton.classList.add("addButton");
		// deleteButton.setAttribute("za",z);
		var some1 = document.createTextNode("Add more Images");
		deleteButton.addEventListener("click",addOtherImageEditModal);
		deleteButton.appendChild(some1);
		parentImageDiv.appendChild(deleteButton);
		parentImageDiv.appendChild(otherImageUpload);
		otherImageDiv.appendChild(parentImageDiv);
	}
	function showOther(){
		otherImageDiv.innerHTML = "";
		for(let z=0; z<(currentProduct.otherImages).length;z++){
			otherData += currentProduct.otherImages[z]+",";
			var parentImageDiv = document.createElement("div");
			parentImageDiv.classList.add("imageContainer");
			var image = document.createElement("img");
			image.src = currentProduct.otherImages[z];
			image.setAttribute("height","20%");
			image.setAttribute("width","20%");
			// image.setAttribute("z",z);
			// var editButton = document.createElement("button");
			// editButton.classList.add("editButton");
			// editButton.setAttribute("z",z);
			// var some = document.createTextNode("Edit");
			// editButton.appendChild(some);
			// editButton.addEventListener("click",openOtherImageEditModal);
			var deleteButton = document.createElement("button");
			deleteButton.classList.add("deleteButton");
			deleteButton.setAttribute("za",z);
			deleteButton.id = z;
			var some1 = document.createTextNode("Delete");
			deleteButton.appendChild(some1);
			deleteButton.addEventListener("click",closeOtherImageEditModal.bind(null,deleteButton.id));
			parentImageDiv.appendChild(image);
			// parentImageDiv.appendChild(editButton);
			parentImageDiv.appendChild(deleteButton);
			otherImageDiv.appendChild(parentImageDiv);
		}
		if((currentProduct.otherImages).length<5){
			console.log((currentProduct.otherImages).length);
			var parentImageDiv = document.createElement("div");
			parentImageDiv.classList.add("imageContainer");
			var otherImageUpload = document.createElement("input");
			otherImageUpload.type = "file";
			otherImageUpload.id = "editOtherImage";
			otherImageUpload.multiple = "multiple";
			otherImageUpload.required = "required";
			otherImageUpload.classList.add("hidden");
			otherImageUpload.addEventListener("change",showOtherPreview);
			var deleteButton = document.createElement("button");
			deleteButton.classList.add("addButton");
			// deleteButton.setAttribute("za",z);
			var some1 = document.createTextNode("Add more Images");
			deleteButton.addEventListener("click",addOtherImageEditModal);
			deleteButton.appendChild(some1);
			parentImageDiv.appendChild(deleteButton);
			parentImageDiv.appendChild(otherImageUpload);
			otherImageDiv.appendChild(parentImageDiv);
		}
	}
	function showOtherPreview(){
		// var previewDiv = document.querySelector("#otherImagePreviewAddProducts");
		// previewDiv.innerHTML="";
		
		var a = document.querySelector("#editOtherImage").files;
		var b= a.length + (currentProduct.otherImages).length;
		var z = (currentProduct.otherImages).length;
		console.log(a.length);
		if(b <= 5){
			for(let i=0;i<a.length;i++,z++){
				console.log(i);
				var parentImageDiv = document.createElement("div");
			parentImageDiv.classList.add("imageContainer");
			var image = document.createElement("img");
			image.src = currentProduct.otherImages[z];
			image.setAttribute("height","20%");
			image.setAttribute("width","20%");
			// image.setAttribute("z",z);
			image.src = window.URL.createObjectURL(a[i]);
			// var editButton = document.createElement("button");
			// editButton.classList.add("editButton");
			// editButton.setAttribute("z",z);
			// var some = document.createTextNode("Edit");
			// editButton.appendChild(some);
			// editButton.addEventListener("click",openOtherImageEditModal);
			var deleteButton = document.createElement("button");
			deleteButton.classList.add("deleteButton");
			deleteButton.setAttribute("za",z);
			var some1 = document.createTextNode("Delete");
			deleteButton.appendChild(some1);
			deleteButton.id = z;
			deleteButton.addEventListener("click",closeOtherImageEditModal.bind(null,this.id));
			parentImageDiv.appendChild(image);
			// parentImageDiv.appendChild(editButton);
			parentImageDiv.appendChild(deleteButton);
			otherImageDiv.appendChild(parentImageDiv);
				// var image = document.createElement("img");
				// image.setAttribute("height","100px");
				// image.setAttribute("width","100px");
				// image.src = window.URL.createObjectURL(a[i]);
				// previewDiv.appendChild(image);
			}
		}
		else{
			window.alert("Other Images should be less than 5 images.");
			document.querySelector("#otherImgUpload").value = "";
		}
	}
	function addOtherImageEditModal(){
		event.preventDefault();
		document.querySelector("#editOtherImage").name = "editFeaturedImage";
		document.querySelector("#editOtherImage").click();
	}
	function setValues(){
		console.log(otherData,document.querySelector("#otherStatus12"));
		// event.preventDefault();
		document.querySelector("#otherStatus12").setAttribute("abc",otherData);
	}
	function openOtherImageEditModal(){
		console.log("clicked");
		// console.log(z);
		// document.querySelector('#otherImageEditModal').style.display = 'block';
		// document.querySelector('#editProductDiv').style.display = 'none';
		// document.querySelector("#otherImageEditModalContent").innerText = abc;
	}
	function closeOtherImageEditModal(z){
		console.log((currentProduct.otherImages).length);
		console.log(z);
		event.preventDefault();
		var tempa = document.querySelector("#otherStatus12").getAttribute("abc");
		tempa = tempa.substr(0,(tempa.length)-1);
		var tempb = tempa.split(currentProduct.otherImages[z]);
		if(z != (currentProduct.otherImages).length){
			if(tempb[1]){
				tempb[1] = tempb[1].substr(1,tempb[1].length);
				if(tempb[0])
				document.querySelector("#otherStatus12").setAttribute("abc",tempb[0].concat(tempb[1]));
				else
				document.querySelector("#otherStatus12").setAttribute("abc",tempb[1]);
			}
			else{
				if(tempb[0])
				document.querySelector("#otherStatus12").setAttribute("abc",tempb[0]);
				else
				document.querySelector("#otherStatus12").setAttribute("abc","");
			}
			
		}
		
		for(let x = 0;x<(currentProduct.otherImages).length;x++){
			if(x>=z){
				if(x == (currentProduct.otherImages).length-1){
					var a = (currentProduct.otherImages).pop();
					console.log(a,"popped");
				}
				else{
					currentProduct.otherImages[x] = currentProduct.otherImages[x+1];
				}
			}
		}
		var sampleTemp = document.querySelectorAll(".deleteButton");
		let jk = 0;
		sampleTemp.forEach(e=>{
			e.id = jk;
			jk++;
		});
		// document.querySelector('#otherImageEditModal').style.display = 'none';
		// document.querySelector('#editProductDiv').style.display = 'block';
		showOther();
		console.log(currentProduct.otherImages,tempb);
	}
	document.querySelector("#featuredImageEdit").src = currentProduct.featuredImage;
	// document.querySelector("#editFeaturedImageInput").value = currentProduct.featuredImage;
	function showCategories(object) {
		console.log("category object", object);
		document.querySelector("#featureStatus12").value = 0;
		var x = document.getElementById("categories1");
		for (let i in object) {
			console.log(i);
			let option = document.createElement("option");
			option.text = object[i].name;
			x.add(option, x[i + 1]);
		}

		x.addEventListener("change", function() {
			console.log("this is add event", object);
			removeSelect(object);
		});
		console.log(x.options.length);
		for(let i=0;i<= x.options.length;i++){
			console.log(i,x.options[i].value);
			if(x.options[i].value == currentProduct.category){
				
				x.selectedIndex = i;
				var event = new Event('change');
				x.dispatchEvent(event);
				// x.onchange();
				break;
			}
		}
	}
	function showSubCategories(object) {
		console.log("category object", object);
		var x = document.getElementById("categories1");
		var z = document.querySelector("#categories1").value;
		var y = document.getElementById("subcategories1"); var subId, subData;
		for (let i in object) {
			if (z == object[i].name) {
				subId = i;
				subData = object[subId].subCategories;
				console.log("subData1", subData, object[subId], subId);
			}
		}
		console.log("subData", subData,subData.length);
		if(subData.length == 0)
			y.style.display = "none";
		var temp = new Array();
		temp = subData.split(",");
		console.log(temp);
		// var subCatLength = y.options.length;
		for (let j in temp) {
			let option = document.createElement("option");
			option.text = temp[j];
			y.add(option, x[j + 1]);
		}
		for(let i=0;i<= y.options.length;i++){
			if(y.options[i].value == currentProduct.subCategories[0]){
				
				y.selectedIndex = i;
				// var event = new Event('change');
				// x.dispatchEvent(event);
				// x.onchange();
				break;
			}
		}
	}
	function removeSelect(object) {
		var parentDiv = document.querySelector("#subCategoryDiv1");
		parentDiv.innerHTML = "";
		console.log("changed", object);
		var selectElement = document.createElement("select");
		selectElement.id = "subcategories1";
		selectElement.name = "subCategory1";
		parentDiv.appendChild(selectElement);
		// changeSubCategory();
		showSubCategories(object);
	}
	function fn1(obj2) {
		console.log("callback", obj2);
		showCategories(obj2.data.sellerCategory);
	}
	util.connectPage(fn1,{name:"getcat"});

	const opertion = { edit: edit, delProduct: delProduct };
	
	function edit() {
	  console.log("edit");
	  var form = document.querySelector("form[name=updateProducts]");
	  var input = document.createElement("input");
		  input.setAttribute("name","pid");
		  input.setAttribute("type","hidden");
		  input.value = util.visitedProduct._id;
	  form.appendChild(input);
	  document.querySelector("#submitUdatedProduct").click();
	}
	
  
	function delProduct() {
	  console.log(
		"this is delete",
		util.visitedProduct._id
	  );
	  // mainView.back();
	  util.sendQuery(
		obj => {
		  console.log(obj);
		  myApp.addNotification({
			message: "Product Updated",
			hold: 900,
			button: {
				text: 'ok'
			}
		});
		//   mainView.loadPage("custom/addProducts.html");
		},
		{ name: "deleteProducts" },
		"id=" + util.visitedProduct._id
	  );
	}
  
	function handleUpdateProducts(object) {
	  // mainView.loadPage("custom/addProducts.html");
	  if(object.flag){      
		  setTimeout(function() {
			// mainView.loadPage("custom/addProducts.html");
		  }, 1000);
	  }
	  console.log("from update product ",object);
	}
  
	$('form[name=updateProducts]').validate({
		  rules: {
			  name: {
				  required: true
			  },
			  quantity: {
				  required: true
			  },
			  price: {
				  required: true
			  },
			  age: {
				  required: false,
				  range: [1, 100]
			  },
			  email: {
				  required: false,
				  email: false
			  },
			  url: {
				  required: false,
				  url: false
			  },
			  number: {
				  required: false,
				  number: false
			  },
			  digits: {
				  required: false,
				  digits: false
			  },
			  in_phone: {
				  required: false,
				  phoneUS: false
			  },
			  credit_card: {
				  required: false,
				  creditcard: false
			  }
		  },
		  errorElement: 'div',
		  errorPlacement: function (error, element) {
			  error.appendTo(element.parent().siblings('.input-error'));
		  },
		  submitHandler: function (form) {
			  // form.submit();
			//   if(tempVar == 1){
				console.log(document.querySelector("#otherStatus12").getAttribute("abc"));
				var otherImageData;
				if(document.querySelector("#otherStatus12").getAttribute("abc")){
					otherImageData = document.querySelector("#otherStatus12").getAttribute("abc");
				}
				else{
					otherImageData = "";
				}
				document.querySelector("#otherStatus12").value = otherImageData;
				util.sendForm3(handleUpdateProducts, form,"/updateProducts2");
			// 	tempVar = 0;
			//   }
			//   else{
			// 	util.sendForm(handleUpdateProducts, form);
			//   }
			  myApp.addNotification({
				  message: "Product Updated",
				  hold: 900,
				  button: {
					  text: 'ok'
				  }
			  });
			  console.log(form,tempVar);
			  mainView.refreshPage();
		  }
	  });
	function changeSource(){
		// document.querySelector("#editFeaturedImageInput").name = "";
		document.querySelector("#editFeaturedImage").name = "editFeaturedImage";
		document.querySelector("#editFeaturedImage").click();
		tempVar = 1;
		document.querySelector("#featureStatus12").value = 1;
	}
	function showPreview(){
		console.log("show Preview");
		var a = document.querySelector("#editFeaturedImage").files;
		for(let i=0;i<a.length;i++){
			document.querySelector("#featuredImageEdit").src = window.URL.createObjectURL(a[i]);
		}
	}
	function init(){
		showOther();
	setValues();
		// setValues();
	document.querySelector("#editFeaturedImage").name = "";
	document.querySelector("#editFeaturedImage").addEventListener("change",showPreview);
	document.querySelector("#editLabel").addEventListener("click",changeSource);
	// document.querySelector("#closeOtherImageEditModal").addEventListener("click", closeOtherImageEditModal);
	  var form = document.querySelectorAll("form[name='updateProducts'] input[type='text']");
	  var formArray = Array.from(form);
	  formArray.forEach(e=>{
		// e.click();
		// e.parentNode.previousElementSibling.focus();
		e.value = util.visitedProduct[e.name];
		console.log(e.name);
	  });
	  var dimension = Array.from(document.querySelectorAll("form[name='updateProducts'] #dimension input"));
	  console.log("dimensions",dimension)
	  dimension.forEach(e=>{
		e.value = util.visitedProduct.dimensions[0][e.name];
	  });
	  document.querySelector("form[name='updateProducts'] input[type='checkbox']").checked = (util.visitedProduct["COD"] == "on"?true:false);
	}
	(function (){
	  console.log("called ocpsdmpcmspdmc");
	  init();
	  Array.prototype.forEach.apply(document.querySelectorAll("#productAction button"),[function(e){
		e.addEventListener("click",opertion[e.getAttribute("data-action")]);
	  }]);
	}());
  
});
/*
|------------------------------------------------------------------------------
| addSeller
|------------------------------------------------------------------------------
*/
myApp.onPageInit("addSeller", function (page) {
	$('form[name=signup]').validate({
		rules: {
			name: {
				required: true
			},
			age: {
				required: true,
				range: [1, 100]
			},
			email: {
				required: true,
				email: true
			},
			url: {
				required: true,
				url: true
			},
			phone: {
				required: true,
				phoneUS: false
				// range: [0, 9]
			},
			GSTIN: {
				required: true,
			}
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			// form.submit();
			util.sendForm(callback, form);
			myApp.addNotification({
				message: 'Please wait...',
				hold: 1500,
				button: {
					text: 'Ok'
				}
			});
		},

	});

	function callback(obj) {
		console.log(obj);
		document.querySelector('.message').innerText = obj.message;
		if (obj.flag) {
			mainView.loadPage("index.html");
		}
	}
});

/*
|------------------------------------------------------------------------------
| product-list
|------------------------------------------------------------------------------
*/


/*
|------------------------------------------------------------------------------
| edit-store
|------------------------------------------------------------------------------
*/
myApp.onPageInit('edit-store', function (page) {
	document.querySelector("#editStoreImage").addEventListener("change", showPreview);

	function showPreview() {
		console.log("show Preview");
		var a = document.querySelector("#editStoreImage").files;
		for (let i = 0; i < a.length; i++) {
			document.querySelector("#storeImageEdit").src = window.URL.createObjectURL(a[i]);
		}
	}

	function initializeFormValues(object) {
		console.log(object);
		document.querySelector("#storeImageEdit").src = object.data.storeImage;

		function changeSource() {
			console.log("changed");
			// document.querySelector("#editStoreImageInput").name = "";
			document.querySelector("#editStoreImage").name = "editStoreImage";
			document.querySelector("#editStoreImage").click();
			// tempVar = 1;
		}
		document.querySelector("#editStoreImage").name = "";
		document.querySelector("#editLabel").addEventListener("click", changeSource);
		// document.querySelector(".message").innerText = object.message;
		
		if (object.data) {
			var obj = {};
			obj.desc = object.data.desc;
			obj.pno = object.data.pno;
			obj.email = object.data.email;
			obj.gstin = object.data.gstin;
			obj.pincode = object.data.pincode;
			obj.city = object.data.city;
			obj.address = object.data.address;




			var inputs = document.querySelectorAll('form input[type=text],form input[type=number],form input[type=email]');
			inputs.forEach((input) => {
				input.focus();
				input.value = obj[input.name];

			});
		}
	}
	var route = {
		"name": "viewshop"
	};
	util.connectPage(initializeFormValues, route);

	$('form[name=editStore]').validate({
		rules: {
			editStoreImage: {
				required: true
			},
			desc: {
				required: true,
			},
			pno: {
				required: true,
				maxlength : 10,
				minlength : 10
			},
			email: {
				required: true,
				email:true
			},
			gstin: {
				required: true,
			},
			pincode: {
				required: true,
			},
			city: {
				required: true,
			},
			address: {
				required: true,
			}
		},
		messages : {
			pno :{
				maxlength : "Phone no. must be of 10 digits",
				minlength : "Phone no. must be of 10 digits"
			}
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			util.sendForm2(fn, form);
			// myApp.addNotification({
			// 	message: "Product added",
			// 	hold: 5000,
			// 	button: {
			// 		text: 'ok'
			// 	}
			// });
			console.log(form);
		}
	});

	function fn(object) {
		console.log(object);
		myApp.addNotification({
			message: object.message,
			hold: 1000
		});
		if (object.flag == 1) {
			console.log(object.flag);

	

			setTimeout(
				mainView.loadPage("home.html")
			,1000);
			
		}
		// document.querySelector(".message").innerText = object.message;
		
		// if(object.flag=="1"){
		// 	setTimeout(()=>{
		// 		mainView.loadPage("home.html");
		// 	},1000)
		// }
	}



});


/*
|------------------------------------------------------------------------------
| add-bank
|------------------------------------------------------------------------------
*/

myApp.onPageInit('addBank', function (page) {
	document.querySelector("#editPanCard1").addEventListener("change", showPreview);

	function showPreview() {
		console.log("show Preview");
		var a = document.querySelector("#editPanCard1").files;
		for (let i = 0; i < a.length; i++) {
			document.querySelector("#panCardEdit1").src = window.URL.createObjectURL(a[i]);
		}
	}
	document.querySelector("#editPanCard1").name = "";
	// document.querySelector("#editPanCardInput").name = "editPanCard";
	document.querySelector("#editLabel1").addEventListener("click", changeSource);

	function changeSource() {
		console.log("changed");
		// document.querySelector("#editPanCardInput").name = "";
		document.querySelector("#editPanCard1").name = "editPanCard";
		document.querySelector("#editPanCard1").click();
		// tempVar = 1;
	}
	$('form[name=addBank]').validate({
		rules: {
			name: {
				required: true
			},
			pno: {
				required: true,
			},
			email: {
				required: true,
				email: true
			},
			gstin: {
				required: true,
			},
			pincode: {
				required: true,
			},
			city: {
				required: true,
			},
			address: {
				required: true,
			}
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			util.sendForm2(fn, form);
			// myApp.addNotification({
			// 	message: "Product added",
			// 	hold: 5000,
			// 	button: {
			// 		text: 'ok'
			// 	}
			// });
			console.log(form);
		}
	});

	function fn(object) {
		console.log(object);
		// document.querySelector(".message").innerText = object.message;
		myApp.addNotification({
			message: object.message,
			hold: 800,
			button: {
				text: 'ok'
			}
		});
		if (object.flag) {
			setTimeout(() => {
				util.connectPage(clbk, {
					name: "addpolicy"
				});

				function clbk(obj) {
					console.log("########################", obj);
				};
				mainView.loadPage("home.html");
				// console.log('ok');
			}, 1000)
		}
	}

});






/*
|------------------------------------------------------------------------------
| edit-bank
|------------------------------------------------------------------------------
*/

myApp.onPageInit('editBank', function (page) {
	// document.querySelector("#panCardEdit").src = currentProduct.featuredImage;
	// document.querySelector("#editPanCardInput").value = currentProduct.featuredImage;
	document.querySelector("#editPanCard").addEventListener("change", showPreview);

	function showPreview() {
		console.log("show Preview");
		var a = document.querySelector("#editPanCard").files;
		for (let i = 0; i < a.length; i++) {
			document.querySelector("#panCardEdit").src = window.URL.createObjectURL(a[i]);
		}
	}

	function initializeFormValues(object) {
		console.log(object);

		document.querySelector("#editPanCard").name = "";
		// document.querySelector("#editPanCardInput").name = "editPanCard";
		document.querySelector("#editLabel").addEventListener("click", changeSource);

		function changeSource() {
			console.log("changed");
			// document.querySelector("#editPanCardInput").name = "";
			document.querySelector("#editPanCard").name = "editPanCard";
			document.querySelector("#editPanCard").click();
			// tempVar = 1;
		}
		// document.querySelector(".message").innerText = object.message;
		// myApp.addNotification({
		// 	message: object.message,
		// 	hold: 800,
		// 	button: {
		// 		text: 'ok'
		// 	}
		// });
		if (object.data) {
			var inputs = document.querySelectorAll('form input');
			console.log(inputs);
			// inputs.forEach((input)=>{
			// 	console.log(input.type);
			// });
			document.querySelector("#panCardEdit").src = object.data[0].panCard;
			// document.querySelector("#editPanCardInput").value = object.data[0].panCard;
			var obj = object.data[0];
			inputs.forEach((input) => {
				if (input.type != "file") {
					input.focus();
					input.value = obj[input.name];
				}
			});
		}
	}

	var route = {
		"name": "viewbank"
	};
	util.connectPage(initializeFormValues, route);

	$('form[name=editBank]').validate({
		rules: {
			editPanCard:{
				required:true
			},
			accNo: {
				required: true
			},
			name: {
				required: true,
			}
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			util.sendForm2(fn, form);
			// myApp.addNotification({
			// 	message: "Product added",
			// 	hold: 5000,
			// 	button: {
			// 		text: 'ok'
			// 	}
			// });
			console.log(form);
		}
	});

	function fn(object) {
		console.log(object);
		// document.querySelector(".message").innerText = object.message;
		myApp.addNotification({
			message: object.message,
			hold: 800,
			button: {
				text: 'ok'
			}
		});
		if (object.flag == "1") {
			setTimeout(() => {
				mainView.loadPage("home.html");
			}, 1000)
		}
	}
});


/*
|------------------------------------------------------------------------------
| add-store
|------------------------------------------------------------------------------
*/
myApp.onPageInit('add-store', function (page) {
	document.querySelector("#editStoreImage1").addEventListener("change", showPreview);

	function showPreview() {
		console.log("show Preview");
		var a = document.querySelector("#editStoreImage1").files;
		for (let i = 0; i < a.length; i++) {
			document.querySelector("#storeImageEdit1").src = window.URL.createObjectURL(a[i]);
		}
	}
	document.querySelector("#editStoreImage1").name = "";
	document.querySelector("#editLabel2").addEventListener("click", changeSource);

	function changeSource() {
		console.log("changed");
		document.querySelector("#editStoreImage1").name = "editStoreImage";
		document.querySelector("#editStoreImage1").click();

	}
	$('form[name=addStore]').validate({
		rules: {
			name: {
				required: true
			},
			pno: {
				required: true,
			},
			email: {
				required: true,
				email: true
			},
			gstin: {
				required: true,
			},
			pincode: {
				required: true,
			},
			city: {
				required: true,
			},
			address: {
				required: true,
			}
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			util.sendForm2(fn, form);
			// myApp.addNotification({
			// 	message: "Product added",
			// 	hold: 5000,
			// 	button: {
			// 		text: 'ok'
			// 	}
			// });
			console.log(form);
		}
	});

	function fn(object) {
		console.log(object);
		// document.querySelector(".message").innerText = object.message;
		myApp.addNotification({
			message: object.message,
			hold: 800,
			button: {
				text: 'ok'
			}
		});
		if (object.flag == "1") {
			setTimeout(() => {
				mainView.loadPage("home.html");
			}, 1000)
		}
	}
});


/*
|------------------------------------------------------------------------------
| manage-categories
|------------------------------------------------------------------------------
*/
myApp.onPageInit("manageCategories", function (page) {
	var i = 0;

	var dataJson = "";
	var currentRecord = [];

	function closeModal() {
		console.log("close modal requested'");
		document.querySelector('#modal').style.display = 'none';
	}

	function openModal() {
		i = 0;
		var form = document.querySelector("#modal form");
		form.reset();
		document.querySelector(".SubCat").innerHTML = "";
		document.querySelector("#addSubCat").click();
		console.log(document.querySelector("#addSubCat"));
		document.querySelector("#addSubCat").click();		
		document.querySelector("#addSubCat").disabled = false;
		document.querySelector('#modal').style.display = 'block';
	}

	function openViewModal(){
		document.querySelector('#viewModal').style.display = "block";
	}
	function closeViewModal(){
		document.querySelector('#viewModal').style.display = "none";
	}
	function init() {
		getData();
		// closeModal();
		console.log('init called');
		document.querySelector("#addSubCat").addEventListener("click", addSubCat);
		document.querySelector("#addSubCat").click();
		document.querySelector("#closeModal").addEventListener("click", closeModal);
		document.querySelector("#closeViewModal").addEventListener("click", closeViewModal);		
		document.querySelector("#floating-button").addEventListener("click", () => {
			var form = document.querySelector("#modal form");
			renderForm(form, "/add-categories", "add-categories", "Add Category");
			openModal();
		});
	}

	function editClick(dataJson, dataID) {
		closeViewModal();
		console.log("td clicked", dataID);
			
		var currentRecord = dataJson.filter(element => element._id == dataID);
		console.log(currentRecord);
		openModal();

		var form = document.querySelector("#modal form");
		renderForm(form, "/edit-categories", "edit-categories", "Edit Category");
		initializeFormValues(currentRecord, form);
	}

	function deleteClick(dataID) {
		var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let response = JSON.parse(this.responseText);
				console.log(response);
				// mainView.loadPage(response.page);
				document.querySelector('.error').innerHTML = response.message;
				myApp.addNotification({
					message: response	.message,
					hold: 1000
				});
				if (response.flag == "1") {
					setTimeout(function () {
						mainView.refreshPage()
					}, 2000);
				}
			}
		};
		xhttp.open("POST", "/delete-categories", true);
		xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
		xhttp.send(JSON.stringify({
			"catName": dataID
		}));
	}

	function renderForm(form, action, fname, buttonText) {
		form.action = action;
		form.name = fname;
		var button = form.querySelector('#modalSubmit');
		button.innerText = buttonText;
	}

	function initializeFormValues(currentRecord, form) {
		var catNamePlaceholder = form.querySelector(".item-title");
		catNamePlaceholder.style = "transform: scale(1) translateY(0)";
		var categoryName = document.querySelector('#categoryName');
		categoryName.value = currentRecord[0]._id;

		var keyData = document.querySelector("#keyData");
		keyData.value = currentRecord[0].name;
		keyData.style = "height : 0px";

		var subCategories = currentRecord[0].subCategories.split(',');

		var addCatButton = document.querySelector("#addSubCat");
		console.log('clicked');
		addCatButton.click();
		// addCatButton.click();
		console.log("subcategories : ", subCategories);
		for (let value of subCategories) {
			if (value == "")
				continue;
			else {
				console.log(value);	
				addSubCat();

				
				var subCatContainer = document.querySelector(".SubCat");
				console.log(subCatContainer);
				var lastChild = subCatContainer.lastChild.querySelector('input');

				console.log(lastChild);
				lastChild.value = value;
				addCatButton.disabled = false;
				addCatButton.click();
			}
		}

	}

	function getData() {
		var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let response = JSON.parse(this.responseText);
				console.log(response);
				// mainView.loadPage(response.page);

				if ("data" in response) {
					// console.log(response.data);
					var dataJson = response.data;
					// createTable(dataJson);
					var tableContainer = document.querySelector('.catTable');
					util.createTable(['Category Name','Sub Categories'],['name','subCategories'],"Categories", tableContainer, dataJson, editClick, deleteClick)
				} else {
					document.querySelector('.error').innerHTML = response.message;
					console.log(response.message);
				}
			}
		};
		xhttp.open("GET", "/showCat", true);
		// xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
		// xhttp.send(JSON.stringify({ "url": "seesion id" }));
		xhttp.send();
	}

	function createTable(dataJson) {
		console.log(dataJson);
		var table = document.querySelector('#catTable');
		table.border = "2";

		var thead = document.createElement('thead');
		table.appendChild(thead);

		var tr = document.createElement('tr');
		thead.appendChild(tr);

		for (let header in dataJson[0]) {
			var th = document.createElement('th');
			th.innerText = header;
			tr.appendChild(th);
		}

		var tbody = document.createElement('tbody');
		table.appendChild(tbody);

		var row = "";

		for (let record of dataJson) {
			console.log("name", record.name);
			row = document.createElement('tr');
			tbody.appendChild(row);
			for (let value in record) {
				var td = document.createElement('td');
				row.appendChild(td);
				td.innerText = record[value];
				console.log(record[value]);
			}
			var td = document.createElement('td');
			td.innerText = "edit";
			row.appendChild(td);
			td.setAttribute('dataid', record.name);
			td.addEventListener('click', () => {
				editClick(record.name);
			});

			var td = document.createElement('td');
			td.innerText = "delete";
			row.appendChild(td);
			td.setAttribute('dataid', record.name);
			td.addEventListener('click', () => {
				deleteClick(record.name);
			});
		}
	}

	function addSubCat() {
		i = i + 1;
		console.log(i);
		document.querySelector('#addSubCat').disabled = true;
		console.log("+ clciked");
		$('.latest-input').removeClass('latest-input');

		var itemContent = document.createElement('div');
		itemContent.classList.add('item-content');
		var SubCat = document.querySelector('.SubCat');
		SubCat.appendChild(itemContent);

		var itemInner = document.createElement('div');
		itemInner.classList.add('item-inner');
		itemContent.appendChild(itemInner);

		var input = document.createElement('input');
		input.type = "text";
		input.placeholder = "New Sub-Category";
		input.classList.add("latest-input");
		input.name = "subcat" + i;
		itemInner.appendChild(input);

		input.focus();

		input.addEventListener("keyup", function () {
			console.log(this.value.length);
			var length = this.value.length;
			if (length > 0) {
				console.log("greater than 0");
				document.querySelector('#addSubCat').disabled = false;
			} else {
				console.log("smaller than 0");
				document.querySelector('#addSubCat').disabled = true;
			}
		});

		input.addEventListener("blur", function () {
			if (this.value.length == 0) {
				$(this.parentNode.parentNode).remove();
				document.querySelector("#addSubCat").disabled = false;
			}
		});

		var button = document.createElement('div');
		button.classList.add("button", "button-small", "button-block", "button-fill", "custom-center");
		button.innerHTML = "-";
		itemContent.appendChild(button);

		button.addEventListener("click", function () {
			$(this.parentNode).remove();
			document.querySelector('#addSubCat').disabled = false;
			i = i - 1;
			console.log(i);
		});
	}

	init();

	function callback(object) {
		// document.querySelector('.error-message').innerHTML = object.message;
		myApp.addNotification({
			message: object.message,
			hold: 1000
		});
		if (object.flag == "1") {
			setTimeout(function () {
				mainView.refreshPage()
			}, 1000);
		}
	}

	$('#form').validate({
		rules: {
			name: {
				required: true
			}
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			// form.submit();
			util.sendForm(callback, form);
			// myApp.addNotification({
			// 	// message: 'Verifying please wait...',
			// 	// hold: 1500,
			// 	// button: {
			// 		// text: 'Ok'
			// 	// }
			// });
		}
	});

});

/*
|------------------------------------------------------------------------------
| editSeller
|------------------------------------------------------------------------------
*/
myApp.onPageInit("editSeller", function (page) {
	function initializeFormValues(object) {
		console.log(object);
		// document.querySelector(".message").innerText = object.message;
		// myApp.addNotification({
		// 	message: object.message,
		// 	hold: 800,
		// 	button: {
		// 		text: 'ok'
		// 	}
		// });
		var details = {
			'name': object.data.name,
			'pno': object.data.phone,
			"gstin": object.data.gstin
		};
		if (object.data) {
			var inputs = document.querySelectorAll('form input[type=text],form input[type=number],form input[type=email]');
			inputs.forEach((input) => {
				input.focus();
				input.value = details[input.name];

			});
			console.log("seller details : ", object.data);
		}
	}
	var route = {
		"name": "viewseller"
	};
	util.connectPage(initializeFormValues, route);
	// document.querySelector('form .item-title').style = "transform: scale(1) translateY(0)";
	$('form[name=editSeller]').validate({
		rules: {
			name: {
				required: true
			},
			pno: {
				required: true,
				minlength:10,
				maxlength:10				
			},
			gstin: {
				required: true,
			}
		},
		messages:{
			pno:{
				minlength: 'Password must be 10 characters long.',
				maxlength: 'Password must be 10 characters long.'				
			}
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			util.sendForm(fn, form);
			// myApp.addNotification({
			// 	message: "Product added",
			// 	hold: 5000,
			// 	button: {
			// 		text: 'ok'
			// 	}
			// });
			console.log(form);
		}
	});

	function fn(object) {
		console.log(object);
		// document.querySelector(".message").innerText = object.message;
		myApp.addNotification({
			message: object.message,
			hold: 800,
			button: {
				text: 'ok'
			}
		});
		// if(object.flag=="1"){
			setTimeout(()=>{
		mainView.loadPage("home.html");
			},1000)
		// }
	}


});


/*
|------------------------------------------------------------------------------
| add-categories
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| orders
|------------------------------------------------------------------------------
*/

myApp.onPageInit("order", function (page) {

	
	function getData() {
		var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let response = JSON.parse(this.responseText);
				console.log(response);
				// mainView.loadPage(response.page);

				if ("data" in response) {
					// console.log(response.data);
					var dataJson = response.data;
					// createTable(dataJson);
					var tableContainer = document.querySelector('.orderTable');
					util.createTable(['Order ID','Customer ID', 'Customer Name','Customer Address','Products Ordered'],['_id','customerId','name','customerOrderAddress','productId'],"Orders", tableContainer, response.data);
				} else {
					// document.querySelector('.error').innerHTML = response.message;
					console.log(response.message);
				}
			}
		};
		xhttp.open("GET", "/vieworder", true);
		// xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
		// xhttp.send(JSON.stringify({ "url": "seesion id" }));
		xhttp.send();
	}
 
	init();

	function init(){
		getData();
		console.log("order init");
		document.querySelector("#closeViewModal").addEventListener("click", closeViewModal);				
	}
	

	function openViewModal(){
		document.querySelector('#viewModal').style.display = "block";
	}
	function closeViewModal(){
		document.querySelector('#viewModal').style.display = "none";
	}


	// console.log(page);



});

/*
|------------------------------------------------------------------------------
| placeOrder
|------------------------------------------------------------------------------
*/
myApp.onPageInit("placeOrder", function (page) {
	
	var  productArray = [];
	var orderObject = {};
	(function(){

		

		document.querySelector('#placeOrder').addEventListener('click',()=>{
			

				var orderCustomerObject = {orderObject : orderObject, customerObject : util.customerRecord}; 
				util.sendQuery(callback,{name : "addOrder"},orderCustomerObject,"post");
	
				function callback(obj){
					console.log(obj);
					myApp.addNotification({
						message: obj.message,
						hold: 1000
					});
					// mainView.loadPage('custom/customers.html');
				}
			
		});


		
		console.log("run ###################");
		util.connectPage(object=>{
			console.log("products here #######",object);
			productArray = object;
			
			
			var selectContainer = document.querySelector('#products');
			selectContainer.innerHTML = "";
			document.querySelector('#quantity').innerText = "__";

			selectContainer.addEventListener('click',()=>{
				var quantity = (selectContainer.value == 0)?0:productArray.filter(product=>(product._id == selectContainer.value))[0].quantity;
				console.log("46546545465",quantity);
				document.querySelector('#quantity').innerText = quantity;
			});
			var option = document.createElement('option');
			option.value = 0;
			option.innerText = "Select Product";
			option.addEventListener('click',()=>{
				document.querySelector('#quantityShow').style.display = 'none';
			});
			selectContainer.appendChild(option);
			productArray.forEach(product=>{
				if(product.quantity > 0){
					var option = document.createElement('option');
					option.value = product._id;
					option.innerText = product.name;
					// option.classList.add = ('productSelectOption');	
					option.setAttribute('data-selectProduct','yes');
					selectContainer.appendChild(option);
				}
			});
			var productSelectOption = document.querySelectorAll('option[data-selectProduct="yes"]');
			console.log(productSelectOption);
			
			Array.prototype.forEach.apply(productSelectOption, [function (element) {
				console.log(element);
				element.addEventListener('click',()=>{
					// var quantity = productArray.filter(product=>(product._id == element.value))[0].quantity;
					// console.log(quantity);
					console.log('LOL');
				});
			}]);


			




		},{name : "addProducts"});
		document.querySelector('#addOrder').addEventListener('click',addProducts);

		// document.querySelector('#addOrder').click();


		



		console.log("$$$$$$$$$$$$$$$$$$$$$",document.querySelector('#addOrder'));		
	}());

	function addProducts(){
		console.log(orderObject);

		console.log("ok");


		var form = document.querySelector('form[name="placeOrder"]');
		var productID = form.querySelector("ul > li [name='products']").value;

		if(productID == 0 || document.querySelector('#quantityInput').value=="" || document.querySelector('#quantityInput').value=="0"){
			console.log("Please select a product and a non zero quantiy");
			myApp.addNotification({
				message: "Please select a product and a non zero quantity",
				hold: 1000
			});
			
		}
		else{
			var quantity = form.querySelector("ul > li [name='quantity']").value;
			// console.log(form.querySelector("ul > li [name='products']").value);

			// document.querySelector('#addedProducts').innerText += productID + quantity ;
			
			
			var selectContainer = document.querySelector('#products');	
			selectContainer.innerHTML = "";
			document.querySelector('#quantity').innerText = "__";
			
			selectContainer.addEventListener('click',()=>{
				var quantity = (selectContainer.value == 0)?0:productArray.filter(product=>(product._id == selectContainer.value))[0].quantity;
				console.log("46546545465",quantity);
				document.querySelector('#quantity').innerText = quantity;
			});
				
			var option = document.createElement('option');
			option.value = 0;
			option.innerText = "Select Product";
			selectContainer.appendChild(option);

			productArray.forEach(product=>{
				if(product._id == productID){
					if((product.quantity - quantity)<0){
						console.log("max available : ",product.quantity);
						myApp.addNotification({
							message: "Max Available : " + product.quantity,
							hold: 1000
						});
					}
					else{

						

						// orderObject.quantity.push(quantity);
						// orderObject.productID.push(productID);
						orderObject[productID] = quantity;
						showOrderProducts(selectContainer);
						product.quantity = product.quantity - quantity;
						console.log("left : ", product.quantity);

						
							
					} 
					
			}
		});
		productArray.forEach(product=>{
			if(product.quantity > 0 && !orderObject.hasOwnProperty(product._id)){
				var option = document.createElement('option');
				option.value = product._id;
				option.innerText = product.name;
				option.setAttribute('data-selectProduct','yes');
				console.log('helle');
				selectContainer.appendChild(option);
			}
		});
		// var productSelectOption = document.querySelectorAll('option[data-selectProduct="yes"]');
		// 	console.log(productSelectOption);
			
		// 	Array.prototype.forEach.apply(productSelectOption, [function (element) {
		// 		console.log(element);
		// 		element.addEventListener('click',()=>{
		// 			// var quantity = productArray.filter(product=>(product._id == element.value))[0].quantity;
		// 			// console.log(quantity);
		// 			console.log('LOL');
		// 		});
		// 	}]);
		
		}


		

		
	}

	function showOrderProducts(selectContainer){
		console.log(orderObject);
		// selectContainer.innerHTML = "";
		var tbody = document.querySelector('#addedProducts > table > tbody');
		tbody.innerHTML = "";
		for(let key in orderObject){
									
			
			console.log(tbody);

			var productName = productArray.filter(product=>product._id==key)[0].name;
			// tbody.innerHTML += "<tr><td>"+productName+"</td><td>"+quantity+"</td><td></td></tr>";
			var tr = document.createElement('tr');
			tbody.appendChild(tr);

			var td1 = document.createElement('td');
			td1.innerText = productName;
			tr.appendChild(td1);

			var td2 = document.createElement('td');
			td2.innerText = orderObject[key];
			tr.appendChild(td2);

			var td3 = document.createElement('td');
			tr.appendChild(td3);

			var button = document.createElement('button');
			button.innerText = "remove";
			button.setAttribute("data-productID",key);
			button.addEventListener('click',()=>{
				// // console.log(this);
				var productID = button.getAttribute('data-productID');
				// productArray = productArray.filter(product=>product._id!=orderObject.productID[index]);
				// var quantity = productArray.filter(product=>product._id = orderObject.productID[index])[0];
				// console.log(quantity);
				// // button.parentElement.parentElement.remove();
				// orderObject.productID = orderObject.productID.filter(product=>{product != productID});
				// orderObject.quantity = orderObject.quantity.filter(quantity=>{quantity != quantity});
				console.log(productID);
				// var position;
				// for(let index in orderObject.productID){
				// 	if(orderObject.productID[index] == productID){
				// 		position = index;
				// 		break;
				// 	}
				// }
				console.log(orderObject);
				// console.log(position);
				// orderObject.productID = orderObject.productID.filter(id=>{
				// 	id!=productID
				// });

				// orderObject.quantity = orderObject.quantity.filter(quantity=>{
				// 	quantity != orderObject.quantity[position];
				// });

				var tempArray = [];
				productArray.forEach(product=>{
					if(product._id == key){
						product.quantity = product.quantity + parseInt(orderObject[key],10);
						console.log(product.quantity,orderObject[key]);
					}
					tempArray.push(product);

				});
				delete orderObject[key];

				

				productArray = tempArray;
				console.log(key);

				// selectContainer = document.querySelector('#products');
				// document.querySelector("#products > option").selected=true;
				selectContainer.innerHTML = "";

				var option = document.createElement('option');
				option.value = 0;
				option.innerText = "Select Product";
				selectContainer.appendChild(option);

				productArray.forEach(product=>{
					if(product.quantity > 0){
						var flag = 1;
						for(let key in orderObject){
							if(product._id == key){
								flag = 0;
								console.log(flag, "found" );
								break;
							}
						}
						if(flag == 1){

							var option = document.createElement('option');
							option.value = product._id;
							option.innerText = product.name;
							option.setAttribute('data-selectProduct','yes');
							console.log('helle');
							selectContainer.appendChild(option);
						}
					}
				});

				document.querySelector('#quantity').innerText = "__";
				showOrderProducts(selectContainer);
				
				
			});
			td3.appendChild(button);

		}
	}
});
/*
|------------------------------------------------------------------------------
| manageCustomers
|------------------------------------------------------------------------------
*/
myApp.onPageInit("manageCustomers", function (page) {
	
	function closeModal() {
		console.log("close modal requested'");
		document.querySelector('#modal').style.display = 'none';
	}

	function openModal() {
		var form = document.querySelector("#modal form");
		form.reset();
		console.log('open modal');
		document.querySelector('#modal').style.display = 'block';
	}

	function openViewModal(){
		document.querySelector('#viewModal').style.display = "block";
	}
	function closeViewModal(){
		document.querySelector('#viewModal').style.display = "none";
	}
	function init() {
		getData();
		closeModal();
		console.log('init called');
		document.querySelector("#closeModal").addEventListener("click", closeModal);
		document.querySelector("#closeViewModal").addEventListener("click", closeViewModal);		
		document.querySelector("#floating-button").addEventListener("click", () => {
			var form = document.querySelector("#modal form");
			renderForm(form, "/add-customer", "add-customer", "Add Customer");
			openModal();
		});
	}

	function editClick(dataJson, dataID) {
		closeViewModal();
		console.log("td clicked", dataID);
			
		var currentRecord = dataJson.filter(element => element._id == dataID);
		console.log(currentRecord);
		openModal();

		var form = document.querySelector("#modal form");
		renderForm(form, "/edit-categories", "edit-categories", "Edit Category");
		initializeFormValues(currentRecord, form);
	}

	function deleteClick(dataID) {
		var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let response = JSON.parse(this.responseText);
				console.log(response);
				// mainView.loadPage(response.page);
				document.querySelector('.error').innerHTML = response.message;
				myApp.addNotification({
					message: response	.message,
					hold: 1000
				});
				if (response.flag == "1") {
					setTimeout(function () {
						mainView.refreshPage()
					}, 2000);
				}
			}
		};
		xhttp.open("POST", "/delete-categories", true);
		xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
		xhttp.send(JSON.stringify({
			"catName": dataID
		}));
	}

	function extraFunction(record){
		console.log(record);
		closeViewModal();
		util.customerRecord = record;
		mainView.loadPage("custom/placeOrder.html");
		
		
	}
	function renderForm(form, action, fname, buttonText) {
		form.action = action;
		form.name = fname;
		var button = form.querySelector('#modalSubmit');
		button.innerText = buttonText;
	}

	function initializeFormValues(currentRecord, form) {
		console.log(currentRecord,form);
		for(let key in currentRecord){
			console.log(form.querySelector("input[name='" + key + "']"));
			console.log(key);
		}
	}


	function getData() {
		var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let response = JSON.parse(this.responseText);
				console.log(response);
				// mainView.loadPage(response.page);

				if ("data" in response) {
					// console.log(response.data);
					var dataJson = response.data;
					// createTable(dataJson);
					var tableContainer = document.querySelector('.cusTable');
					util.createTable(['Customer Name','Email ID','Mobile','Address Line 1','Address line2','City','Post Code'],['name','email','mobile','addressLine1','addressLine2','city','postCode'],"Customers", tableContainer, dataJson,"","",extraFunction);
				} else {
					// document.querySelector('.error').innerHTML = response.message;
					console.log(response.message);
				}
			}
		};
		xhttp.open("GET", "/showCustomers", true);
		// xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
		// xhttp.send(JSON.stringify({ "url": "seesion id" }));
		xhttp.send();
	}


	


	init();

	function callback(object) {
		// document.querySelector('.error-message').innerHTML = object.message;
		object = JSON.parse(object);
		myApp.addNotification({
			message: object.message,
			hold: 1000
		});
		if (object.flag == "1") {
			setTimeout(function () {
				mainView.refreshPage()
			}, 1000);
		}
	}

	$('form[name = add-customer]').validate({
		rules: {
			name: {
				required: true
			}
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			// form.submit();
			console.log("add clicked");
			util.sendForm(callback, form);
			// myApp.addNotification({
			// 	// message: 'Verifying please wait...',
			// 	// hold: 1500,
			// 	// button: {
			// 		// text: 'Ok'
			// 	// }
			// });
		}
	});
});

/*
|------------------------------------------------------------------------------
| payment
|------------------------------------------------------------------------------
*/

myApp.onPageInit("payment", function (page) {

	function getData() {
		var xhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let response = JSON.parse(this.responseText);
				console.log(response);
				// mainView.loadPage(response.page);

				if ("data" in response) {
					// console.log(response.data);
					var dataJson = response.data;
					// createTable(dataJson);
					var tableContainer = document.querySelector('.paymentTable');
					util.createTable(['Order ID','Customer ID', 'Date','Seller ID', 'Status'],['order_id','customer_id','date','sellerid','status'],"Payments", tableContainer, response.data);
				} else {
					// document.querySelector('.error').innerHTML = response.message;
					console.log(response.message);
				}
			}
		};
		xhttp.open("GET", "/viewpayment", true);
		// xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
		// xhttp.send(JSON.stringify({ "url": "seesion id" }));
		xhttp.send();
	}
 
	init();

	function init(){
		getData();
		console.log("order init");
		document.querySelector("#closeViewModal").addEventListener("click", closeViewModal);				
	}
	

	function openViewModal(){
		document.querySelector('#viewModal').style.display = "block";
	}
	function closeViewModal(){
		document.querySelector('#viewModal').style.display = "none";
	}



});

/*
|------------------------------------------------------------------------------
| addSeller
|------------------------------------------------------------------------------
*/
// 	myApp.onPageInit("addSeller", function(page){
// 		$('form[name=signup]').validate({
// 			rules: {
// 				name: {
// 					required: true
// 				},
// 				age: {
// 					required: true,
// 					range: [1, 100]
// 				},
// 				email: {
// 					required: true,
// 					email: true
// 				},
// 				url: {
// 					required: true,
// 					url: true
// 				},
// 				phone: {
// 					required: true,
// 					phoneUS: false
// 					// range: [0, 9]
// 				},
// 				GSTIN: {
// 					required: true,
// 				}
// 			},
// 		errorElement : 'div',
// 			errorPlacement: function(error, element) {
// 				error.appendTo(element.parent().siblings('.input-error'));
// 			},
// 			submitHandler: function(form) {
// 				form.submit();
// 				myApp.addNotification({
// 					message: 'Please wait...',
// 					hold: 1500,
// 					button: {
// 						text: 'Ok'
// 					}
// 				});
// 			}
// 		});



// });

/*
|-----------------------------------------------------------------------------
| OUR HTML FILE RELATED CODE END
|-----------------------------------------------------------------------------
*/


/*
|------------------------------------------------------------------------------
| User Profile
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Sign Up
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Log In
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Forgot Password
|------------------------------------------------------------------------------

*/
myApp.onPageInit('forgot-password', function (page) {

	function myfn2() {
		console.log("atmyfn2");
	}

	function myfn(object) {
		console.log("forgot", object);
		// mainView.loadPage("addProducts.html");
		// mainView.refreshPage();
		if (object) {
			var xhttp = new XMLHttpRequest();
			var forgotEmail = document.querySelector("#forgotEmail").value;
			xhttp.open("POST", "/sendtoken", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("email=" + forgotEmail);
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					//   document.getElementById("demo").innerHTML =
					//   this.responseText;
					console.log("response", this.responseText);
					if (this.responseText == "Mail Send SuccessFully.....") {
						myApp.popup('.popup-password-reset-token');
					}
				}
			};
			// console.log("response",xhttp.responseText);
			document.querySelector("#hiddenEmail").value = forgotEmail;
			document.querySelector("#hiddenEmail2").value = forgotEmail;

		} else {
			myApp.addNotification({
				message: "Wrong email",
				hold: 5000,
				button: {
					text: 'ok'
				}
			});
			mainView.refreshPage();
		}
	}

	function myfn1(object) {
		console.log("forgot", object);
		// mainView.loadPage("addProducts.html");
		// mainView.refreshPage();
		if (object) {
			myApp.closeModal('.popup-password-reset-token');
			myApp.popup('.popup-reset-password');
		} else {
			myApp.addNotification({
				message: "Wrong token",
				hold: 5000,
				button: {
					text: 'ok'
				}
			});
			mainView.refreshPage();
		}
	}

	$('.page[data-page=forgot-password] form[name=forgot-password]').validate({
		rules: {
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			email: {
				required: 'Please enter email address.',
				email: 'Please enter a valid email address.'
			}
		},
		onkeyup: false,
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		// submitHandler: function(form) {
		// 	myApp.popup('.popup-password-reset-token');
		// },
		submitHandler: function (form) {
			// form.submit();
			util.sendForm(myfn, form);
			myApp.addNotification({
				message: "Verifying email",
				hold: 5000,
				button: {
					text: 'ok'
				}
			});
			console.log("token", form);
		}
	});


	$('.popup-password-reset-token form[name=password-reset-token]').validate({
		rules: {
			token: {
				required: true
			}
		},
		messages: {
			token: {
				required: 'Please enter token.'
			}
		},
		onkeyup: false,
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		// submitHandler: function(form) {
		// 	myApp.closeModal('.popup-password-reset-token');
		// 	myApp.popup('.popup-reset-password');
		// }
		submitHandler: function (form) {
			// form.submit();
			util.sendForm(myfn1, form);
			myApp.addNotification({
				message: "Checking token",
				hold: 3000,
				button: {
					text: 'ok'
				}
			});
			console.log(form);
			myApp.closeModal('.popup-password-reset-token');
			myApp.popup('.popup-reset-password');
		}
	});

	$('.popup-reset-password form[name=reset-password]').validate({
		rules: {
			new_password: {
				required: true,
				minlength: 8
			},
			confirm_password: {
				required: true,
				equalTo: '.popup-reset-password form[name=reset-password] input[name=new_password]'
			}
		},
		messages: {
			new_password: {
				required: 'Please enter new password.',
				minlength: 'New password must be at least 8 characters long.'
			},
			confirm_password: {
				required: 'Password confirmation is required.',
				equalTo: 'Both the passwords must match.'
			}
		},
		onkeyup: false,
		errorElement: 'div',
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function (form) {
			myApp.closeModal('.popup-reset-password');
			myApp.addNotification({
				message: 'Your password has been reset successfully.',
				hold: 1500,
				button: {
					text: ''
				}
			});
			util.sendForm(myfn2, form);
			mainView.router.load({
				url: 'login.html'
			});
		}
	});

});

/*
|------------------------------------------------------------------------------
| Notifications
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Careers
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Cart
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Chat
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Checkout
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Coming Soon
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Contact Us
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Contacts List
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Feedback
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| OTP Verification
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Pattern Lock
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Products List
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Product Details
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Recipe
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Settings
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| News Article
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Testimonials
|------------------------------------------------------------------------------
*/