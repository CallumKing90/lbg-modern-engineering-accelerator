FROM node:16-alpine
# Create the app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
# Install the packages from the package.json and package-lock.json
RUN npm install
# Copy the source code into the image
COPY . .
# Expose a port
EXPOSE 3000
# Start the app
CMD npm start