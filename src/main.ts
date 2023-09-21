import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from "@nestjs/swagger";
import {INestApplication} from "@nestjs/common";


async function start(){
    const PORT: number = +process.env.PORT || 5000;
    const application: INestApplication = await NestFactory.create(AppModule);

    const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
                    .setTitle('Stock')
                    .setDescription('Документация по API с наименование Stock')
                    .setVersion('1.0.0')
                    .addTag('Betrayal')
                    .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(application, config);

    SwaggerModule.setup('/api/swagger', application, document);

    await application.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start().then();