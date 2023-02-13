# NodeJS Microservice example

An educational example on how to build a NodeJS microservice including real world best practices.
The project is built with Node.js, Express, MongoDB and Docker.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Optional requirements](#optional-requirements)
  - [Installing](#installing)
  - [Running the microservice](#running-the-microservice)
- [Project structure](#project-structure)
- [API](#api)
  - [Reference](#reference)
  - [Testing with PostMan](#testing-with-PostMan)
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

### Optional requirements

- Docker Compose
- Postman

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

## Testing with PostMan

This requires the microservice is running locally, either using Docker or running the Node.js application directly.
Download and install [Postman](https://www.postman.com/downloads/) on your computer.

1. Open Postman and click the Import button in the top-left corner of the window.

2. Choose the Import File option and select the [postman_collection.json](./test/postman_collection.json) file.

3. The collection will be imported and you will see a list of requests in the left-side panel.

4. Select a request and click the Send button to send it to the API. You can view the response in the right-side panel.

5. Repeat this process for each request in the collection to test all of the endpoints of the API.

# Deployment

The microservice can be deployed using Docker. The included `Dockerfile` and `docker-compose.yml` files can be used to build and run the Docker image.

## Run everything with Docker Compose

Start both microservice and MongoDB containers with Docker Compose:

```shell
docker-compose up -d
```

## Build the microservice container image

```shell
docker build -t film-microservice .
```

## Run microservice container

```shell
docker run -d -p 3000:3000 \
  --link mongodb:mongodb \
  -e MONGO_URI=mongodb://mongodb:27017/film-microservice film-microservice
```

# Built With

- [Node.js](https://nodejs.org) - The JavaScript runtime
- [Express](https://expressjs.com) - The web framework
- [MongoDB](https://www.mongodb.com) - The database
- [Docker](https://www.docker.com) - The containerization platform
- [Postman](https://www.postman.com) - The Postman API client enables API exploration and testing

# Author

- [Adrian Dantas](https://github.com/adriandantas) - [Github](https://github.com/adriandantas)
