# Use the base image with Node.js
FROM node:latest

# Copy the current directory into the Docker image
COPY . /leaderboard-ui

# Set working directory for future use
WORKDIR /leaderboard-ui

# Install the dependencies from package.json
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm install
RUN npm run lint
RUN npm run build
#RUN npm run test

CMD npm start
