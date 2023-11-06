export class InternalUser {
  id: Number;
  businessId: Number;
  fullName: string;
  username: string;
  email: string;
  password: string;
  mobileNumber: string;
  accountType: Number;
  role: Number;
  creationDate: Date;
  updateDate: Date;
  isDeleted: boolean;
  active: boolean;
  token: string;
  constructor() {
    this.businessId = Number(localStorage.getItem("businessId"));
    this.active = true;
  }
}
