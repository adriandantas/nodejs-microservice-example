# Uses an image that is friendlier to security scanners
FROM node:16.17.0-bullseye-slim

# Positively impacts the performance of several libraries.
ENV NODE_ENV production

# Application directory
WORKDIR /usr/src/app

# Ensure that file ownership is assigned to a non-root user
COPY --chown=node:node . /usr/src/app

# Limits dependencies that are installed
RUN npm ci --only=production

COPY . .

EXPOSE 3000

# Ensure that application is executed by a non-root user
USER node

CMD ["npm", "start"]
