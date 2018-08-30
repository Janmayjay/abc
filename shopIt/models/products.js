class Products{
    constructor(shopName,name,quantity,price,category,subCategories,dimensions,description,tax,COD,featuredImage,otherImages,Discount){
        this.shopName = shopName;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.category = category;
        this.subCategories = subCategories;
        this.dimensions = dimensions;
        this.description = description;
        this.tax = tax;
        this.COD = COD;
        this.featuredImage = featuredImage;
        this.otherImages = otherImages;
        this.Discount = Discount;
    }
}
module.exports = Products;