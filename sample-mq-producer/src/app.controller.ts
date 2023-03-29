import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async sendMessage(): Promise<string[]> {
    const ids = [];

    for (let i = 0; i < 10; i++) {
      const id = uuidv4();
      ids.push(id);
      const response = await this.appService.sendMessage(id);
      console.log(response);
    }
    return ids;
  }
}
