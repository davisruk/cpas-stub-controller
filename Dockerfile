# Use Node 16 LTS (compatible with Angular 12)
FROM node:18

# Set the working directory
WORKDIR /app

COPY package.json ./

# Install dependencies with legacy peer handling
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the Angular dev server port
EXPOSE 4200

# Run the Angular app using npx and local CLI
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]

