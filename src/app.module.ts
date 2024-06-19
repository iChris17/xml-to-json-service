import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { VehiclesService } from './fetch-parse.service';
import { VehiclesResolver } from './graphql.resolver';
import { Make, MakeSchema } from './schemas/data.schema';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/xmlToJsonService'),
    MongooseModule.forFeature([{ name: Make.name, schema: MakeSchema }]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [VehiclesService, VehiclesResolver, AppService],
})
export class AppModule {}
