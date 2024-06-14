import axios from 'axios'

async function getWeather(location) {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: location },
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data
    } catch (error) {
        return false
    }
}

export default getWeather