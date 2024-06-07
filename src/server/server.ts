import axios from "axios";

const baseURL = ''; 

const soundApi = axios.create({
    baseURL,
});

export default soundApi;
