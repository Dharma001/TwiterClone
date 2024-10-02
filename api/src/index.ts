import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectToDatabase } from './utils/database'; // Import your database connection function (if applicable)

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests

// Connect to the database (if applicable)
connectToDatabase(); // Uncomment if you have a database connection function

// Routes
// app.use('/api/auth', authRoutes); // Use authentication routes
// app.use('/api/upload', uploadRoutes); // Use upload routes

// Health check route
app.get('/', (req, res) => {
    res.send('API is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
