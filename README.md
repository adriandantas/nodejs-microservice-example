# NodeJS Microservice example

[![Workflow status badge](https://github.com/adriandantas/nodejs-microservice-example/actions/workflows/film-microservice-example.yml/badge.svg)](https://github.com/adriandantas/nodejs-microservice-example/actions)
[![codecov](https://codecov.io/gh/adriandantas/nodejs-microservice-example/branch/main/graph/badge.svg?token=V65OB1ARTK)](https://codecov.io/gh/adriandantas/nodejs-microservice-example)
[![Maintainability](https://api.codeclimate.com/v1/badges/8af129acb784bc0d19ab/maintainability)](https://codeclimate.com/github/adriandantas/nodejs-microservice-example/maintainability)
![Made with love in Brazil](https://madewithlove.now.sh/br?heart=true&colorB=%232db936)

A comprehensive **Node.js microservice template** that provides a solid foundation for building and deploying **production-ready** microservices.

Speed up your development process with a ready-to-deploy microservice codebase.

# Features

- **Containerization** with Docker (multi-stage and secure)
- **Health check endpoint** for container monitoring and management
- **Structured logging** with JSON using Winston
- **Graceful server shutdown** handlers in Express
- **Continuous Integration** with Github Actions Workflows
- **RESTful API** for a sample resource
- **Request payload validation** using middleware
- **Data persistence** with MongoDB
- **Unit testing** with Jest and Supertest
- **Dependencies vulnerabilities scan** with Snyk
- **Test coverage** with CodeCov

# Prerequisites

- Node.js
- Docker

# Getting Started

## Installation

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Clone the repository: `git clone https://github.com/adriandantas/nodejs-microservice-example.git`
2. Install the dependencies: `npm install`

## Configuration

The following environment variables can be used to configure the microservice:

- `PORT`: the port number to run the microservice on. If this variable is not set, the microservice will run on port 3000 by default.
- `MONGO_URI`: the URI of the MongoDB database to connect to. This variable is required for the microservice to run correctly.
- `NODE_ENV`: the environment in which the microservice is running. This variable can be set to `production`, `staging`, or `development`.

# API

## Endpoints

The following routes are available for the example REST resource:

```text
GET     /api/healthcheck    # Container healthcheck endpoint
GET     /api/films          # List all resource
GET     /api/films/:id      # Find resource by id
POST    /api/films          # Create new resource
PUT     /api/films/:id      # Update an existing resource
DELETE  /api/films/:id      # Delete a resource
```

## API testing with Postman and Newman

This project contains a Postman collection configured to http://localhost:3000/ that can be used test the API using Newman.

```shell
  npm run newman
```

You can create your own sandbox for testing simply by importing the [collection](./test/postman_collection.json) into Postman.

## Swagger documentation

In order generate an updated openapi.yaml file just execute the following npm task:

```shell
  npm run swagger
```

The updated documentation can be found in [./doc/api](./doc/api)

# Deployment

## Cloud instant deployment

### Google Cloud

[![Run on Google
Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run/?git_repo=https://github.com/adriandantas/nodejs-microservice-example.git)

## Local Deployment

To build the Docker image, run the following command in the project directory:

```shell
docker build -t nodejs-microservice-example .
```

To run the Docker container, use the following command:

```shell
docker run -p 3000:3000 nodejs-microservice-example
```

Replace 3000 with the desired host port.

# Built With

- [Docker](https://www.docker.com)
- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Winston](https://github.com/winstonjs/winston)
- [Jest](https://jestjs.io/)

# Author

- [Adrian Dantas](https://github.com/adriandantas)
