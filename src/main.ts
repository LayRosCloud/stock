import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from "@nestjs/swagger";
import {INestApplication} from "@nestjs/common";
import { ValidationPipe } from "./pipes/validation.pipe";


async function start(){
    const PORT: number = +process.env.PORT || 5000;
    const application: INestApplication = await NestFactory.create(AppModule);

    const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
                    .setTitle('sewprod api')
                    .setDescription('Документация по API с наименование sewprod api')
                    .setVersion('1.0.0')
                    .addTag('Betrayal')
                    .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(application, config);

    SwaggerModule.setup('/api/docs', application, document);
    application.useGlobalPipes(new ValidationPipe());
    await application.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start().then();