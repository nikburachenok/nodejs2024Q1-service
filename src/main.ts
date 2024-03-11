import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup(
    'swagger',
    app,
    parse(await readFile(resolve(__dirname, '../doc/api.yaml'), 'utf-8')),
  );

  await app.listen(PORT);
}
bootstrap();
