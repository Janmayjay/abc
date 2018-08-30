class Products{
    constructor(name,quantity,price,category,subCategories,description,tax,COD,Discount,pid){
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.category = category;
        this.subCategories = subCategories;
        //this.dimensions = dimensions;
        this.description = description;
        this.tax = tax;
        this.COD = COD;
        //this.featuredImage = featuredImage;
        //this.otherImages = otherImages;
        this.Discount = Discount;
        this.id = pid;
    }
}
module.exports = Products;