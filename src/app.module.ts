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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/xmlToJsonService'),
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    FetchParseService,
    DataTransformService,
    DataService,
    DataResolver,
  ],
})
export class AppModule {}
