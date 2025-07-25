# Use Node 16 LTS (compatible with Angular 12)
FROM node:16

# Set the working directory
WORKDIR /app

# Copy only package files first (for better cache)
COPY package*.json ./

# Install dependencies with legacy peer handling
RUN npm install --legacy-peer-deps

# Install Angular CLI 12 locally
RUN npm install @angular/cli@12 --save-dev

# Copy the rest of the source code
COPY . .

# Expose the Angular dev server port
EXPOSE 4200

# Run the Angular app using npx and local CLI
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]

