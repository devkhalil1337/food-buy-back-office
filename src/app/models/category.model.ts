import { BusinessId } from '@shared';
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
        this.categoryId = category.categoryId || null;
        this.businessId = category.businessId || BusinessId;
        this.categoryName = category.categoryName || "";
        this.categoryImage = category.categoryImage || "";
        this.categoryDetails = category.categoryDetails;
        this.categorySortBy = category.categorySortBy || 1;
        this.active = !!category.active;
        this.isDeleted = !!category.isDeleted;
    }
}