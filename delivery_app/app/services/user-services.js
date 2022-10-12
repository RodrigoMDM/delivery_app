import axios from 'axios';
import * as config from '../config/api-config';
 
//método para realizar o cadastro do cliente
export const postCliente = (data) => {
    return axios.post(`${config.getApiDelivery()}/cliente`, data)
        .then(
            response => {
                return response.data;
            }
        )
}
 
//método para realizar o login do cliente
export const postLogin = (data) => {
    return axios.post(`${config.getApiDelivery()}/login`, data)
        .then(
            response => {
                return response.data;
            }
        )
}

