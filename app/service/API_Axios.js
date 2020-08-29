import axios from 'axios';
import {Onlineroot, RootPath} from './Config';

export const INSERT_AXIOS = (path, root, data) => {
    return axios({method:'POST', url:`${root ? Onlineroot : RootPath }/${path}`, data}, {headers: {
        'Authorization': `Bearer ${localStorage.getItem("fixToken")}`,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }});
}

export const UPDATE_AXIOS = (path, root, data) => {
    return axios({method:'put', url:`${root ? Onlineroot : RootPath }/${path}`, data}, {headers: {
        'Authorization': `Bearer ${localStorage.getItem("fixToken")}`,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }});
}