import axios from 'axios'

export const fetcher = url => axios.get(url, {
    headers: {
        'X-RapidAPI-Key': 'b8fe05d302msh80b36c9e3701b8dp1a15c3jsn8bbf3509da0b',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
}).then(res => res.data)