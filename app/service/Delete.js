import axios from 'axios';
import {Onlineroot, RootPath} from './Config';

export const Delete = (path, root) => {
    const promise = new Promise ((resolve, reject) => {
        axios.delete(`${root ? Onlineroot : RootPath }/${path}`)
        .then((result)=> {
            resolve(result.data);
        }, (err) => {
            reject(err);
        }).then(() => {
            // console.log('Always show')
        })
    });

    return promise;
}


export const DELETE_AXIOS = (path, root) => {
    console.log(`${root ? Onlineroot : RootPath }/${path}`);
    return axios({method:'get', url:`${root ? Onlineroot : RootPath }/${path}`}, {headers: {
        'Authorization': `Bearer ${localStorage.getItem("fixToken")}`,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }});
}