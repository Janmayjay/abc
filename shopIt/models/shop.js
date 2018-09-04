class shop{
    constructor(name,link,desc, pno, email, gstin, pincode, city, address,storeImage){
        this.name = name;
        this.link = link;
        this.desc = desc;
        this.pno = pno;
        this.email = email;
        this.gstin = gstin,
        this.pincode = pincode;
        this.city = city;
        this.address = address; 
        this.storeImage = storeImage; 
    }
}
module.exports = shop;