## Description

This application fetches vehicle makes and their corresponding types from an external API, transforms the data into JSON format, stores it in a MongoDB database, and exposes it via a GraphQL endpoint.

## Using Docker

```bash
$ docker-compose build
```

```bash
$ docker-compose up
```

## Access GraphQL Playground

Open your browser and go to http://localhost:3000/graphql to access the GraphQL Playground.

## Example Query

```graphql
# Fetch all vehicle makes with their types
query {
  makes {
    makeId
    makeName
    vehicleTypes {
      vehicleTypeId
      vehicleTypeName
    }
  }
}
```

## Test

```bash
# unit tests
$ npm run test
```

## Support

- The application is built using NestJS framework, TypeScript, MongoDB, and GraphQL.
- Ensure MongoDB is properly configured and running before starting the application.

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
