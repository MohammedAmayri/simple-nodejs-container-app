# Use official Node.js runtime as base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Create healthcheck file BEFORE switching to non-root user
RUN printf 'const http=require("http");http.get({host:"127.0.0.1",port:3000},r=>{process.exit(r.statusCode===200?0:1)}).on("error",()=>process.exit(1));' > /app/healthcheck.js

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Change ownership of app directory to nodeuser
RUN chown -R nodeuser:nodejs /app

USER nodeuser

# Expose the port the app runs on
EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=5s --retries=3 CMD ["node","/app/healthcheck.js"]

# Define the command to run the application
CMD ["npm", "start"]