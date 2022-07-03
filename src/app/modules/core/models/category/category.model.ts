export class Category{
    categoryId:number;
    businessId:number;
    categoryName:String;
    categoryImage:string;
    categoryDetails:string;
    categorySortBy:number;
    active:boolean;
    isDeleted:boolean;
    constructor(category?){
        debugger
        this.businessId = category.businessId;
        this.categoryName = category.categoryName;
        this.categoryImage = category.categoryImage || "logo";
        this.categoryDetails = category.categoryDetails;
        this.categorySortBy = category.categorySortBy || 1;
        this.active = !!category.active;
        this.isDeleted = !!category.isDeleted;
    }
}