class Client{
    constructor(name, email, mobile, addressLine1, addressLine2, city, postCode, password, shopname){
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.postCode = postCode;
        this.password = password;
        this.shopname = shopname
    }
}
module.exports = Client;