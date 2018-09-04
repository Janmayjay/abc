class shop{
    constructor(name,link,desc, pno, email, gstin, pincode, city, address){
        this.name = name;
        this.link = link;
        this.desc = desc;
        this.pno = pno;
        this.email = email;
        this.gstin = gstin,
        this.pincode = pincode;
        this.city = city;
        this.address = address;  
    }
}
module.exports = shop;