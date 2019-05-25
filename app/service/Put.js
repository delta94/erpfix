import axios from 'axios';
import {Onlineroot, RootPath} from './Config';
 
const Put = (path, root, data) => {
    const promise = new Promise ((resolve, reject) => {
        axios.put(`${root ? Onlineroot : RootPath }/${path}`, data)
        .then((res)=> {
            resolve(res);
        }, (err) => {
            reject(err);
        }).then(() => {
            // console.log('Always show')
        })
    });

    return promise;
}

export default Put;