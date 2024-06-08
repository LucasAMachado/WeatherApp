import express from 'express';
import dotenv from 'dotenv';

// Inport routes
import weatherRoute from './routes/weather.js';
const app = express();

// Load the enviroment variable form .env file
dotenv.config();
const port = process.env.PORT || 8000;

// Use routes
app.use('/', weatherRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})