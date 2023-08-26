export class Menus {
    id: number;
    businessId: number;
    menuName: string;
    menuUrl: string;
    orderBy: number;
    isActive: boolean;

    constructor(
        id: number,
        businessId: number,
        menuName: string,
        menuUrl: string,
        orderBy: number,
        isActive: boolean
    ) {
        this.id = id;
        this.businessId = businessId;
        this.menuName = menuName;
        this.menuUrl = menuUrl;
        this.orderBy = orderBy;
        this.isActive = isActive;
    }
}
