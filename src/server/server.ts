import axios from "axios";

const baseURL = 'http://192.168.4.232:3000/'; 

const soundApi = axios.create({
    baseURL,
});

export default soundApi;
