# NodeJS Microservice example

[![Workflow status badge](https://github.com/adriandantas/nodejs-microservice-example/actions/workflows/film-microservice-example.yml/badge.svg)](https://github.com/adriandantas/nodejs-microservice-example/actions)
[![codecov](https://codecov.io/gh/adriandantas/nodejs-microservice-example/branch/main/graph/badge.svg?token=V65OB1ARTK)](https://codecov.io/gh/adriandantas/nodejs-microservice-example)
[![Maintainability](https://api.codeclimate.com/v1/badges/8af129acb784bc0d19ab/maintainability)](https://codeclimate.com/github/adriandantas/nodejs-microservice-example/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/adriandantas/nodejs-microservice-example/badge.svg)](https://snyk.io/test/github/adriandantas/nodejs-microservice-example)
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

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Clone the repository: `git clone https://github.com/adriandantas/nodejs-microservice-example.git`
2. Install the dependencies: `npm install`
3. Start the Node.js server: `npm start`

# Deploy instantly

## Google Cloud

[![Run on Google
Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run/?git_repo=https://github.com/adriandantas/nodejs-microservice-example.git)

# API Endpoints

The following routes are available for the film resource:

| Route        | HTTP Method | Description             |
| ------------ | ----------- | ----------------------- |
| `/films`     | `GET`       | Get all films           |
| `/films/:id` | `GET`       | Get a film by ID        |
| `/films`     | `POST`      | Add a new film          |
| `/films/:id` | `PUT`       | Update an existing film |
| `/films/:id` | `DELETE`    | Delete a film           |


# Local Deployment

To build the Docker image, run the following command in the project directory:

```shell
docker build -t nodejs-microservice-example .
```
To run the Docker container, use the following command:

```shell
docker run -p 3000:3000 nodejs-microservice-example
```

Alternatively, you can pull the latest version of the image from Docker Hub with the following command:
```shell
docker pull adriandantas/nodejs-microservice-example:latest
```

Once you have pulled the image, you can run it with the following command:
```shell
docker run -p 3000:3000 adriandantas/nodejs-microservice-example:latest
```

Replace 3000 with the desired host port.

Or use Docker Compose to run the MongoDB and Node.js containers:
```shell
docker-compose up
```

# Built With

- [Docker](https://www.docker.com)
- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Winston](https://github.com/winstonjs/winston)
- [Jest](https://jestjs.io/)

# Author

- [Adrian Dantas](https://github.com/adriandantas)
