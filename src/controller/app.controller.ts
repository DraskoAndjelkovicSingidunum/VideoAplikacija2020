import { Controller, Get } from '@nestjs/common';
import { AdministratorService } from 'src/services/administrator/administrator.service';
import { Administrator } from 'entities/administrator.entity';

@Controller()
export class AppController {
  constructor(private administratorService: AdministratorService){}

  @Get()
  getIndex(): string {
    return 'My VideoApp!!!';
  }

  @Get('api/administrator')
  getAllAdmins(): Promise<Administrator[]>{
    return this.administratorService.getAll();
  }
}
