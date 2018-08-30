class User{
    constructor(name, phone, email, url, gstin, shopname, pages){
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.url = url;
        this.gstin = gstin;
        this.shopname = shopname;
        this.requiredPages = pages
    }
}
module.exports = User;