## Movie-Search-App

Movie search project based on OMDB Api.

Dependencies : 
- NodeJs
- Express
- MongoDB & Mongoose
- Jest.Js
- Angular
- Docker-Compose
## Docker Databases & API

If you don't want to install mongodb, dependecies and create all database or API service manually, you can create docker container with all you need already installed.

1. Install [docker](https://www.docker.com/get-started)
2. Linux users must install [docker-compose](https://docs.docker.com/compose/install/) as well. For MacOS and Windows, docker-compose is included into **Docker for Desktop**.
3. Execute `npm run dc:start` [ MongoDB and Movie-API should be up with this step. skip steps and follow ***Frontend App*** section now]
- Execute `npm run dc:build` to only build.

### Docker DB & API Commands/Scripts

- `npm run dc:start` starts DB containerized database; MongoDB And API services
- `npm run dc:start-bg` starts DB & API in the background if you don't want to see logs
- `npm run dc:stop` stops containers
- `npm run dc:clean` removes database & API
- `npm run dc:cli:mongo` connect to MongoDB CLI

#### Docker Logs

This command can be useful if you start your environment in the background with `npm run dc:start-bg`. You can follow the log stream for any service with the following command:

- `npm run logs:mongo` Connect to MongoDB log stream
- `npm run logs:api` Connect to movie-api log stream

## Frontend App
Install [Angular-cli](https://angular.io/cli#installing-angular-cli)

To prepare and start the front-end movie app use below command.
- `npm run start:app`

[Angular-app](http://localhost:4200) & [Node-app](http://localhost:3000/movies)

## Jest unit-tests
Execute `npm run dc:start` to start mongoDB.
- `npm run test` to run unit tests with coverage
- `npm run test:watch` to run unit tests in watch mode.

Made with `:heart:`