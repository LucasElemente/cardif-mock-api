import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidateCustomerType } from './types/validateCustomer.type';
import { GetCustomerDataType } from './types/getCustomerData.type';

@ApiTags('API Endpoints')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
