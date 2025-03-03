// Load environment variables from .env file in express folder
require('dotenv').config();

// Import the Express app from index.js
const app = require('./index');

// Use the PORT variable from .env, or default to 5000 if not found
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
