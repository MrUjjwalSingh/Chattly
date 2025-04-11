# Chattly - Real-time Chat Application

A full-stack real-time chat application built with React, Node.js, Express, and Socket.io.

## Project Structure

```
Chattly/
├── Backend/           # Node.js backend server
│   ├── src/          # Source code
│   ├── dist/         # Frontend build (in production)
│   └── package.json  # Backend dependencies
└── Frontend/         # React frontend
    ├── src/          # Source code
    └── package.json  # Frontend dependencies
```

## Features

- Real-time messaging using Socket.io
- User authentication
- Profile management
- Online/offline status
- File sharing
- Responsive design

## Setup

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/Chattly.git
cd Chattly
```

2. Install dependencies:
```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

3. Create environment files:
- Create `.env` in Backend directory
- Create `.env.production` in Backend directory for production

4. Start development servers:
```bash
# Start backend server
cd Backend
npm run dev

# Start frontend server
cd ../Frontend
npm run dev
```

## Deployment

The application is configured to be deployed on Render with the Backend directory as the root.

1. Build the frontend:
```bash
cd Frontend
npm run build
```

2. Copy the frontend build to the backend:
```bash
cd ../Backend
mkdir -p dist
cp -r ../Frontend/dist/* dist/
```

3. Start the production server:
```bash
NODE_ENV=production node src/index.js
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

## Technologies Used

- Frontend: React, Vite, TailwindCSS
- Backend: Node.js, Express
- Database: MongoDB
- Real-time: Socket.io
- Authentication: JWT
- File Storage: Cloudinary 