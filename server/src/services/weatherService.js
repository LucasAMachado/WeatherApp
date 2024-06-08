import axios from 'axios'

async function getWeather() {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: '53.1,-0.13' },
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data
    } catch (error) {
        return 'Error getting weather data'
    }
}

export default getWeather