import axios from 'axios';

const breakingBadApi = axios.create({
    baseURL: 'https://api.tvmaze.com/shows/169',
});

export default breakingBadApi;