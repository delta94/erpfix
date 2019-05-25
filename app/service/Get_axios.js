import axios from 'axios';
import {Onlineroot, RootPath} from './Config';

const Get_axios = (path, root) => {
    return axios({method:'get', url:`${root ? Onlineroot : RootPath }/${path}`}, {headers: {
        'Authorization': `Bearer ${localStorage.getItem("fixToken")}`,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }});
}

export default Get_axios;