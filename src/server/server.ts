import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = 'https://ondigitalapi.azurewebsites.net/api'; 

const onDigitalApi = axios.create({
    baseURL,
});

onDigitalApi.interceptors.request.use(
    // async (config: any) => {
    //     const token = await AsyncStorage.getItem('token');
    //     if (token) {
    //         config.headers['authorization'] = token;
    //     }
    //     return config;
    // }
);

export default onDigitalApi;
