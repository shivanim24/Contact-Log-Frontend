const connectToMongo = require('./db'); // Import the function from db.js
const express = require('express');

const app = express();
const port = 3000;

// Function to start the server after connecting to MongoDB
const startServer = async () => {
  try {
    await connectToMongo(); // Wait for MongoDB connection
    console.log('Connected to MongoDB!');

    app.get('/', (req, res) => {
      res.send('Hello Puneeth!');
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

// Start the server
startServer();
