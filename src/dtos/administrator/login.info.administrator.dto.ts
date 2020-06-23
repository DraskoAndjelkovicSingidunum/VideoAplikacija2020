export class LoginInfoAdministratorDto {
    administratorId: number;
    username: string;
    isActive: number;
    token: string;

    constructor(id: number, un: string, ia: number, jwt: string) {
        this.administratorId = id;
        this.username = un;
        this.isActive = ia;
        this.token = jwt;
    }
}