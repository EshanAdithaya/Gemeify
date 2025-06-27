import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  console.log('🔥 Starting Gemify Multivendor Backend...');
  console.log('⚙️  Environment:', process.env.NODE_ENV || 'development');
  console.log('🗄️  Database:', process.env.DB_DATABASE || 'gemify_multivendor');
  console.log('🔐 JWT Secret:', process.env.JWT_SECRET ? 'Configured' : 'Using Default');

  // Add global logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Enable CORS for frontend communication
  const corsOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ];
  
  console.log('🌐 CORS Origins:', corsOrigins);
  
  app.enableCors({
    origin: corsOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('Gemify Multivendor API')
    .setDescription('The Gemify multivendor marketplace API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(process.env.BASE_URL || 'http://localhost:3001', 'Development Server')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log('');
  console.log('🚀 ========================================');
  console.log('🚀 Gemify Backend Successfully Started!');
  console.log('🚀 ========================================');
  console.log(`🌍 Server: ${process.env.BASE_URL || `http://localhost:${port}`}`);
  console.log(`📚 API Docs: ${process.env.BASE_URL || `http://localhost:${port}`}/api`);
  console.log(`🔍 Health Check: ${process.env.BASE_URL || `http://localhost:${port}`}/health`);
  console.log('🚀 ========================================');
  console.log('');

  logger.log('Application is ready to accept connections');
}

bootstrap().catch((error) => {
  console.error('❌ Failed to start application:');
  console.error(error);
  process.exit(1);
});