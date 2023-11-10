# Runnig NestJs in a Docker Container

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Makefile

```sh
# Running all containers
$ make init
```

## Using Docker Compose

```sh
# Build the docker image
$ docker-compose build

# Start and login to the container
$ docker-compose up -d
$ docker-compose exec app sh
```

- Need to be added to rabbitmq
- Virtual Hosts = test
- queue = rabbit-mq-nest-js
- Rabbitmq is available at [http://localhost:15672](http://localhost:15672)
- The application is available at [http://localhost:8080](http://localhost:8080)
