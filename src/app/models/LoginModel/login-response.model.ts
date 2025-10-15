export interface LoginResponseModel {
    userName: string;
    token: string;
    roles: string[];
    branchId: number;
}