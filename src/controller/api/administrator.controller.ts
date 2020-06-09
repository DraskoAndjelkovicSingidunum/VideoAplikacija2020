import { Controller, Get, Param } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { Administrator } from "src/entities/administrator.entity";

@Controller('api/administrator')
export class AdministratorController {
    constructor(
        private administratorService: AdministratorService
    ) { }

    @Get() //GET http://localhost:3000/api/administrator/
    getAll(): Promise<Administrator[]> {
        return this.administratorService.getAll();
    }

    @Get(':id') //GET http://localhost:3000/api/administrator/2
    getById(@Param('id') administratorId: number): Promise<Administrator>{
        return this.administratorService.getById(administratorId);
    }
}