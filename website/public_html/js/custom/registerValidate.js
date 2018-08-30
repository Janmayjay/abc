var registerForm = document.querySelector("#registerForm");
$('#registerForm').validate({
			rules: {
				name: {
					required: true
					// number: true
				},
				email: {
					required: true,
					// number: true
					email: true
				},
				mobile: {
					required: true,
					number: true
				},
				addressLine1: {
					required: true
					// number: true
				},
				addressLine2: {
					required: true
					// number: true
				},
				city: {
					required: true
					// number: true
				},
				postcode: {
					required: true
					// number: true
				},
				password: {
					required: true
					// number: true
				},
				confirm: {
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
				// form.submit();
				if(document.querySelector("#input-password").value == document.querySelector("#input-confirm").value){
					util.sendForm((object)=>{
						let a = JSON.parse(object);
						console.log(a,a.data);
						if(a.data.status){
							window.location.assign("../index.html");
						}
						else{
							window.alert(a.data.error);
						}
					},registerForm);
				}
				else{
					window.alert("Passwords don't match...");
				}
				
			}
		});