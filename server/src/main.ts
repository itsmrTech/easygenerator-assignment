import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './core/config';
import { ConfigService } from '@nestjs/config';
import * as basicAuth from 'express-basic-auth';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService=app.get(ConfigService);
    AppConfig.setConfigService(configService);


    app.enableCors();

    const serverConfig=AppConfig.getServerConfig();
    // set global prefix for backend
    app.setGlobalPrefix(serverConfig.apiPrefix);

    // set login for swagger patch
    app.use(
        `${serverConfig.swagger.path}`,
        basicAuth({
            challenge: true,
            users: {
                [serverConfig.swagger.username]: serverConfig.swagger.password,
            },
        })
    );

    // enable versioning
    app.enableVersioning({
        type: VersioningType.URI,
    });

    // Use Validation Pipe
    app.useGlobalPipes(new ValidationPipe());
    console.log(serverConfig.swagger.enabled, typeof serverConfig.swagger.enabled)

    // setup swagger documents
    if (serverConfig.swagger.enabled === true) {
        const config = new DocumentBuilder()
            .setTitle(serverConfig.swagger.title)
            .setDescription(serverConfig.swagger.description)
            .setContact(
                serverConfig.swagger.title,
                serverConfig.swagger.site,
                serverConfig.swagger.email
            )
            .setVersion(serverConfig.version)
            .addBearerAuth({
                type: 'http',
                in: 'docs',
                name: 'Authorization',
                bearerFormat: 'jwt',
            })
            .build();
        const document = SwaggerModule.createDocument(app, config, {
            
        });
        console.log(serverConfig.swagger.path)
        SwaggerModule.setup(serverConfig.swagger.path, app, document);
    }

    await app.listen(serverConfig.serverPort);
}
bootstrap();
