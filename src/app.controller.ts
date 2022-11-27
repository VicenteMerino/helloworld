import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HealthCheckResponse } from './generic-dto/health-chech.dto';

@ApiTags('health-check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    description: 'Health check',
    type: HealthCheckResponse,
  })
  @Get()
  getHello(): { status: string } {
    return this.appService.healthCheck();
  }
}
