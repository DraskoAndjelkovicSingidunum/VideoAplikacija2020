import { Controller, Post, Body, Req } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';
import { LoginInfoDto } from "src/dtos/auth/login.info.dto";
import { LoginAdministratorDto } from "src/dtos/administrator/login.administrator.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { Request } from "express";
import { jwtSecret } from "config/jwt.secret";


@Controller('auth')
export class AuthController {
    constructor ( 
        public administratorService: AdministratorService 
        ) {}

    @Post('administrator/login') //http://localhost:3000/auth/administrator/login/
    async doAdministratorLogin(@Body() data: LoginAdministratorDto, @Req() req: Request): Promise< LoginInfoDto | ApiResponse> {
        const administrator = await this.administratorService.getByUsername(data.username);

        if (!administrator) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3001)));
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if (administrator.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
        }

        const jwtData = new JwtDataDto();
        jwtData.role = "administrator";
        jwtData.id = administrator.administratorId;
        jwtData.identity = administrator.username;
        
        const sada = new Date();
        sada.setDate(sada.getDate() + 14);
        const istekTimestamp = sada.getTime() / 1000;
        jwtData.exp = istekTimestamp;

        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];

        const token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responseObject = new LoginInfoDto(
            administrator.administratorId,
            administrator.username,
            administrator.isActive,
            token
        );
        return new Promise(resolve => resolve(responseObject));
    }
}