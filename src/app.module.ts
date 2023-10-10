import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRoleModule } from './user-role/user-role.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import * as Validation from '@hapi/joi';
@Module({
  imports: [
     ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: Validation.object({
        SALT: Validation.string().required(),
        PORT: Validation.number().port().required(),
        // GraphQL
        // DB
        POSTGRES_HOST: Validation.string().required(),
        POSTGRES_PORT: Validation.number().port().required(),
        POSTGRES_DB: Validation.string().required(),
        POSTGRES_USERNAME: Validation.string().required(),
        POSTGRES_PASSWORD: Validation.string().required(),
       
      }),
    }),
    UserRoleModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'sonali_pagal',
      autoLoadModels: true,
      // synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
