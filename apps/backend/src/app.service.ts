import { Injectable } from '@nestjs/common';
import type { ApiStatus } from './api-status.interface.js';

@Injectable()
export class AppService {
  getStatus(): ApiStatus {
    return {
      name: 'SecureBank API',
      status: 'ok',
    };
  }
}
