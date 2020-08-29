import axios from 'axios';
import {Onlineroot, RootPath} from './Config';
 
const Post = (path, root, data, target) => {
    const promise = new Promise ((resolve, reject) => {
        let dataHeader = {headers: {
            'Authorization': `Bearer ${localStorage.getItem("fixToken")}`,
            'Accept': 'application/json',
        }};
        axios.post(`${root ? Onlineroot : RootPath }/${path}?param={"target":"${target}"}`, data, dataHeader)
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

export default Post;