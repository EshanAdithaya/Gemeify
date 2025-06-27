import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  getHealth() {
    console.log('💓 Health check requested');
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Gemify Multivendor Backend',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Root endpoint' })
  getRoot() {
    console.log('🏠 Root endpoint accessed');
    return {
      message: 'Welcome to Gemify Multivendor API',
      documentation: `${process.env.BASE_URL || 'http://localhost:3001'}/api`,
      health: `${process.env.BASE_URL || 'http://localhost:3001'}/health`,
      version: '1.0.0',
    };
  }
}