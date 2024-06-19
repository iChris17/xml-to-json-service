import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { FetchParseService } from './fetch-parse.service';
import { DataTransformService } from './data-transform.service';
import { DataService } from './data.service';
import { DataResolver } from './graphql.resolver';
import { Data, DataSchema } from './schemas/data.schema';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/xmlToJsonService'),
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [
    FetchParseService,
    DataTransformService,
    DataService,
    DataResolver,
    AppService,
  ],
})
export class AppModule {}
