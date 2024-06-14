import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
// Inport routes
import weatherRoute from './routes/weather.js';
const app = express();

// Load the enviroment variable form .env file
dotenv.config();
const port = process.env.PORT || 8000;

// Cors middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:8000', 'http://localhost:5173'],
    credentials: true
}));

// Use routes
app.use('/', weatherRoute);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})