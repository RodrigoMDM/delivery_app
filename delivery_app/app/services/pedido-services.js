import axios from "axios";
import * as config from '../config/api-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
//chamada para o serviço de cadastro de pedido
export const postPedido = (data) => {
 
    return axios.post(`${config.getApiDelivery()}/pedido`, data)
        .then(
            response => {
                return response.data;
            }
        )
}
 
//interceptador para garantir que será enviado um token
//de autorização para a API sempre que for feito uma
//requisição de cadastro de pedido
axios.interceptors.request.use(
    async config => {
 
        //verificar se a requisição é para o ENDPOINT /api/pedido
        if (config.url.includes('api/pedido')) {
 
            var accessToken = await AsyncStorage.getItem('access_token');
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
 
        return config;
    },
    error => {
        Promise.reject(error);
    }
)


