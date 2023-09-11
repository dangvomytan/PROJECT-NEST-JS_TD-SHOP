import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors'
require('dotenv').config();


// console.log('app port: ',process.env.APP_PORT)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Kích hoạt CORS
    const corsOrigin = [
      'http://localhost:3000',
      'http://localhost:4000',
      'http://localhost:8080',
    ];
  
    //middleware
    const corsOptions = {
      origin: corsOrigin,
      credentials: true, // access-control-allow-credentials: true
      optionsSuccessStatus: 200, // Sửa tên thuộc tính thành optionsSuccessStatus
    };
  
    app.enableCors(corsOptions);
    
  const PORT  = process.env.APP_PORT || 8000
  await app.listen(PORT,() => {
    console.log('Server running on http://localhost/'+PORT);
    
  });
}
bootstrap();