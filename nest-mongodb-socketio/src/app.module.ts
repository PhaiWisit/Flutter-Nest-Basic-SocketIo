import { ConfigModule, ConfigType } from '@nestjs/config';
import {
  RMessageModule,
  RUserModule,
} from '@src/interfaces/http/rest/api_v1/routeModules';

import { AppController } from './app.controller';
import { AppGatewayModule } from '@src/interfaces/app/app.module';
import { AppService } from './app.service';
import DBConfig from '@src/config/database.config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DBConfig],
      isGlobal: true,
    }),

    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/message'
    ),

    // MongooseModule.forRootAsync({
    //   useFactory: async (dbConfig: ConfigType<typeof DBConfig>) => ({
    //     useUnifiedTopology: true,
    //     uri: `${dbConfig.type}://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.db_name}`,
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //     ssl: dbConfig.ssl,
    //     authSource: dbConfig.auth_source,
    //   }),
    //   inject: [DBConfig.KEY],
    // }),

    AppGatewayModule,
    RMessageModule,
    RUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
