import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

class HealthCheckResponse {
  @ApiProperty({ example: 'ok' })
  status: string;
}

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
