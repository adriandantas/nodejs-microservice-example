FROM node:16.17.0-bullseye-slim

# Positively impacts the performance of several libraries.
ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

# Limits dependencies that are installed
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
