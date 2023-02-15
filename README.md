# NodeJS Microservice example

[![Workflow status badge](https://github.com/adriandantas/nodejs-microservice-example/actions/workflows/film-microservice-example.yml/badge.svg)](https://github.com/adriandantas/nodejs-microservice-example/actions)
[![codecov](https://codecov.io/gh/adriandantas/nodejs-microservice-example/branch/main/graph/badge.svg?token=V65OB1ARTK)](https://codecov.io/gh/adriandantas/nodejs-microservice-example)
[![Maintainability](https://api.codeclimate.com/v1/badges/8af129acb784bc0d19ab/maintainability)](https://codeclimate.com/github/adriandantas/nodejs-microservice-example/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/adriandantas/nodejs-microservice-example/badge.svg)](https://snyk.io/test/github/adriandantas/nodejs-microservice-example)
![Made with love in Brazil](https://madewithlove.now.sh/br?heart=true&colorB=%232db936)

An educational example on how to build a NodeJS microservice including real world best practices.
The project is built with Node.js, Express, MongoDB and Docker.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Running the microservice](#running-the-microservice)
- [Project structure](#project-structure)
- [API](#api)
  - [Reference](#reference)
- [Deployment](#deployment)
  - [Run everything with Docker Compose](#run-everything--with-docker-compose)
  - [Build the microservice container image](#build-the-microservice-container-image)
  - [Run microservice container](#run-microservice-container)
- [Built With](#built-with)
- [Author](#author)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Docker
- Docker Compose

### Installing

1. Clone the repository:

```shell
git clone https://github.com/adriandantas/nodejs-microservice-example.git
```

2. Install the dependencies:

```shell
   cd node-sample-microservice
   npm install
```

The app will now be running on [http://localhost:3000](http://localhost:3000).

## Running the microservice

1. Start a MongoDB container:
   This is required for all execution modes with exception to running the microservice using docker compose.
   Start the MongoDB with docker.

   ```shell
   docker run -d -p 27017:27017 --name mongodb mongo
   ```

   Set the `MONGO_URI` environment variable to the connection string for your MongoDB instance:

   ```shell
   export MONGO_URI=mongodb://localhost:27017/film-microservice
   ```

2. Start the app in development mode:

   ```shell
   npm run dev
   ```

   The app will now be running on [http://localhost:3000](http://localhost:3000).

3. Start the app:

   ```shell
   npm start
   ```

   The app will now be running on [http://localhost:3000](http://localhost:3000).

# Project Structure

This microservice has a somewhat simple directory structure. Since it only hanldes a single REST resource the amount of
components is low and can be handled by 3 subdirectories in **src**.

```
├───src
│   ├───controllers
│   ├───models
│   └───util
└───test
```

# API

## Reference

The following routes are available for the film resource:

| Route        | HTTP Method | Description             |
| ------------ | ----------- | ----------------------- |
| `/films`     | `GET`       | Get all films           |
| `/films/:id` | `GET`       | Get a film by ID        |
| `/films`     | `POST`      | Add a new film          |
| `/films/:id` | `PUT`       | Update an existing film |
| `/films/:id` | `DELETE`    | Delete a film           |

# Deployment

The microservice can be deployed using Docker. The included `Dockerfile` and `docker-compose.yml` files can be used to build and run the Docker image.

## Run everything with Docker Compose

Start both microservice and MongoDB containers with Docker Compose:

```shell
docker-compose up -d
```

## Build the microservice container image

```shell
docker build -t nodejs-microservice-example:latest .
```

## Run microservice container

```shell
docker run -d -p 3000:3000 \
  --link mongodb:mongodb \
  -e MONGO_URI=mongodb://mongodb:27017/film-microservice nodejs-microservice-example
```

# Built With

- [Node.js](https://nodejs.org) - The JavaScript runtime
- [Express](https://expressjs.com) - The web framework
- [MongoDB](https://www.mongodb.com) - The database
- [Docker](https://www.docker.com) - The containerization platform

# Author

- [Adrian Dantas](https://github.com/adriandantas) - [Github](https://github.com/adriandantas)
