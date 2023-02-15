# Uses an image that is friendlier to security scanners
FROM node:16.17.0-bullseye-slim

# Positively impacts the performance of several libraries.
ENV NODE_ENV production

# Application directory
WORKDIR /usr/src/app
COPY . /usr/src/app

# Limits dependencies that are installed
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
