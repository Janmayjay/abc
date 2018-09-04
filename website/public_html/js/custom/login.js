// var loginButton = document.querySelector("#loginButton");
// loginButton.addEventListener("click",callLogin);
// function callLogin(){
//     console.log("inside callLogin");
//     var email = document.querySelector("#email");
//     var password = document.querySelector("#password");
//     util.connectPage((object)=>{
//         console.log(object);
//     },{name : "/login"},{form:document.querySelector("#login")});
// }
var redirect = window.location.search;
redirect = redirect.substring(9,((redirect.length)-3));
console.log(redirect);
var loginForm = document.querySelector("#loginform");
$('#loginform').validate({
			rules: {
				email: {
					required: true,
					// number: true
					email: true
				},
				password: {
					required: true
					// number: true
				}
			},
			errorElement: 'div',
			errorPlacement: function (error, element) {
				error.appendTo(element.parent().siblings('.input-error'));
			},
			submitHandler: function () {
				console.log("hey");
					util.sendForm((object)=>{
						let a = JSON.parse(object);
						console.log(a,a.data);
						if(a.data.status){
							window.location.assign(redirect);
						}
						else{
							window.alert(a.data.error);
						}
					},loginForm);
				
			}
		});