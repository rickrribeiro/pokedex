import { NestFactory } from "@nestjs/core";
import { PokedexApiModule } from "./pokedex-api.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(PokedexApiModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors({
    origin: "http://127.0.0.1:4200",
    methods: "GET",
  });
  await app.listen(3000);
}

bootstrap();
