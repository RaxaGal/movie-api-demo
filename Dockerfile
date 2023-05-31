# Use the official Node.js image as the base image
FROM node:14 AS movie-api-build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm i -g typescript
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the TypeScript code
RUN tsc

# Expose the port that the Express server is listening on
EXPOSE 3000

# Set the command to run when the container starts
CMD [ "node", "dist/src/index.js" ]

# FROM node:14 AS movie-ui-build
# WORKDIR /root/
# COPY movie-search-app/ ./movie-search-app/
# EXPOSE 4200
# RUN cd movie-search-app && npm install -g @angular/cli && npm install && npm run start