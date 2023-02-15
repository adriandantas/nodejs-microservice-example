# Build image stage

# Uses an image that is friendlier to security scanners
FROM node:16.17.0-bullseye AS build

# Dumb-init is a simple process supervisor and init system designed to run as PID 1 inside Docker containers.
# This ensures that all signals are properly proxied to the child process.
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# Application directory
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/

# Limits dependencies that are installed
RUN npm ci --only=production

# Production image stage
FROM node:16.17.0-bullseye-slim

# Positively impacts the performance of several libraries.
ENV NODE_ENV production

# Copy dumb-init process supervisor
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

# Ensure that application is executed by a non-root user
# use default non-root user
USER node

WORKDIR /usr/src/app

# Copy only essential files required for production.
# Ensure their ownsership is set to node:node (a user without super user permissions).
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app

CMD ["dumb-init", "node", "server.js"]