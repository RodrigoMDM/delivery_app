import axios from 'axios';
import * as config from '../config/api-config';
 
//método para retornar um endereço baseado no CEP
export const getEndereco = (cep) => {
    return axios.get(`${config.getApiCep()}ws/${cep}/json`)
        .then(
            response => {
                return response.data;
            }
        )
}

