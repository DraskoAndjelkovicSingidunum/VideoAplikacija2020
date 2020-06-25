export class LoginInfoDto {
    id: number;
    identity: string;
    isActive: number;
    token: string;

    constructor(id: number, identity: string, ia: number, jwt: string) {
        this.id = id;
        this.identity = identity;
        this.isActive = ia;
        this.token = jwt;
    }
}