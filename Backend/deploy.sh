#!/bin/bash

# Exit on error
set -e

echo "Starting deployment process..."

# Build the frontend
echo "Building frontend..."
cd Frontend
npm install
npm run build

# Copy the frontend build to the backend's dist directory
echo "Copying frontend build to backend..."
mkdir -p ../dist
cp -r dist/* ../dist/

# Go back to the backend directory
cd ..

# Install production dependencies
echo "Installing production dependencies..."
npm install --production

# Start the server
echo "Starting the server..."
NODE_ENV=production node src/index.js

echo "Deployment complete!" 