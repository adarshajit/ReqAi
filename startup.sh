#!/bin/bash

# Navigate to the backend folder
cd backend

pip install -r requirements.txt

# Start the Flask API server in the background
flask --app hello run --debug &

# Navigate to the client folder
cd ../client

npm i

# Start the React development server
npm run dev
