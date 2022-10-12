import axios from 'axios';
import * as config from '../config/api-config';
 
//método para retornar os itens da API
export const getItens = (idCategoria = 0) => {
 
    var resource = '/cardapio';
 
    if (idCategoria > 0)
        resource += "/" + idCategoria;
 
    return axios.get(`${config.getApiDelivery()}${resource}`)
        .then(
            response => {
                return response.data;
            }
        )
}
 
//método para retornar as categorias
export const getCategorias = () => {
    return axios.get(`${config.getApiDelivery()}/categorias`)
        .then(
            response => {
                return response.data;
            }
        )
}
 


