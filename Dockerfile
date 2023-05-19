# Use a Node.js 16 base image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the production version of the app
RUN npm run build

# Expose port 3000 for the app
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
