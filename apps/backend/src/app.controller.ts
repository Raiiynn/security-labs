import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import type { ApiStatus } from './api-status.interface.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): ApiStatus {
    return this.appService.getStatus();
  }
}
