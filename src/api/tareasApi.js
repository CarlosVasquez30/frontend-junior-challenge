import axios from 'axios';

export const tareasApi = axios.create({
    baseURL: 'https://my-json-server.typicode.com/AlvaroArratia/static-todos-api'
});