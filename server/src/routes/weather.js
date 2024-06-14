import express from 'express'
import axios from 'axios';
import dotenv from 'dotenv'
import getWeather from '../services/weatherService.js';

dotenv.config()
const router = express.Router()


router.get('/', async (req, res) => {
    const location = req.query.location
    
    const data = await getWeather(location)

    return res.send({ success: true, data: data })
})


export default router