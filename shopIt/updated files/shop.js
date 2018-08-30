class shop{
    constructor(name,link,desc, pno, email, gstin, pincode, city, address, panCard, accNo, bname){
        this.name = name;
        this.link = link;
        this.desc = desc;
        this.pno = pno;
        this.email = email;
        this.gstin = gstin,
        this.pincode = pincode;
        this.city = city;
        this.address = address;  
        this.bank = {panCard : panCard, accNo : accNo, name : bname};    
    }
}
module.exports = shop;