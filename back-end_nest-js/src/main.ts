import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();


// console.log('app port: ',process.env.APP_PORT)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Kích hoạt CORS
    app.enableCors();
    
  const PORT  = process.env.APP_PORT || 8000
  await app.listen(PORT,() => {
    console.log('Server running on http://localhost/'+PORT);
    
  });
}
bootstrap();
