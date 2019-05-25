import axios from 'axios';
import {Onlineroot, RootPath} from './Config';

const Get = (path, root) => {
    const promise = new Promise ((resolve, reject) => {
        let dataHeader = {headers: {
            'Authorization': `Bearer ${localStorage.getItem("fixToken")}`,
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }};
        axios({method:'get', url:`${root ? Onlineroot : RootPath }/${path}`}, dataHeader)
        .then((result)=> {
            resolve(result.data);
        }, (err) => {
            reject(err);
        }).then(() => {
            
        })
    });

    return promise;
}

export default Get;