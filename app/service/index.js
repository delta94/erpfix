import Get from './Get';
import Get_axios from './Get_axios';
import Post from './Post';
import Put from './Put';
import { INSERT_AXIOS, UPDATE_AXIOS } from './API_Axios';
import { DELETE_AXIOS, Delete } from './Delete';
import { Map } from 'immutable';
import moment from "moment";

// POST
const postNewsBlog = (data) => Post('posts', false, data);
const login = (data, target) => Post('f0/auth/login', true, data, target);
const INSERT_DATA_AXIOS = (source, data, param) => INSERT_AXIOS(`f1/${source}${param}`, true, data);

// PUT
const updateNewsBlog = (data, id) => Put(`posts/${id}`, false, data);
const UPDATE_DATA_AXIOS = (source, id, data, param) => UPDATE_AXIOS(`f1/${source}/${id}${param}`, true, data);

// Delete
const deleteNewsBlog = (id) => Delete(`posts/${id}`, false);
const DELETE_DATA_AXIOS = (source, id, param) => DELETE_AXIOS(`f1/${source}/${id}${param}`, true);

// GET
const getNewsBlog = () => Get('posts?_sort=id&_order=desc', false);
const getComments = () => Get('comments', true);
const getProfile = () => Get('api/users/profile', true);
const getDataArea = (param) => Get(`f1/city${param}`, true);
const getData_axios = (source, param) => Get_axios(`f1/${source}${param}`, true);
const logout = (target) => Get(`f0/auth/logout?param={"target":"${target}"}`, true);
const fetchSelfApiAREA = params => {
    let param = {
        "target":"showData",
        "pageNumber":params.page,
        "pageLimit":params.per_page,
        "filter":"",
        "orderBy":"",
        "groupBy": ""
      };
    
    return new Promise((resolve, reject) => {
      getData_axios(`?param=${JSON.stringify(param)}`).then(res => 
        {
          let dataContent = [];
          let dataObj = Map({data:{}, count:0, page:1, per_page:4});
          res.data.data.data.map(data => {
            dataContent.push([data.akode, data.anama, data.acatatan, data.aaktif]);
          });
          let obj = {};
          obj.a = dataObj.setIn(['data'], dataContent);
          obj.b = obj.a.setIn(['count'], res.data.data.total);
          obj.c = obj.b.setIn(['page'], res.data.data.current_page);
          obj.d = obj.c.setIn(['per_page'], res.data.data.per_page);
          resolve(obj.d)
        },
        (err) => 
        {
            console.log(`err API: ${err}`);
            resolve(err.response.data);
        });
    });
  }

  const GET_DATA_SEARCH = params => {
    let param = {
        "target"    : params.target,
        "pageNumber": params.page,
        "pageLimit" : params.limit,
        "filter"    : params.filter,
        "orderBy"   : "",
        "groupBy"   : ""
      };
    
    return new Promise((resolve) => {
      getData_axios(`search/${params.source}`, `?param=${encodeURIComponent(JSON.stringify(param))}`).then(res => 
      {
        resolve(res.data)
      },
      (err) => 
      {
          resolve(err.response.data);
      });
  });
}

const GETDATA_COMPSEARCH = params => {
  let param = {
      "operator"  : params.operator,
      "column"    : params.column,
      "target"    : params.target,
      "pageNumber": params.page,
      "pageLimit" : params.limit,
      "filter"    : params.filter,
      "filterSearch": params.filterSearch,
      "orderBy"   : "",
      "groupBy"   : ""
    };
  
  return new Promise((resolve) => {
    getData_axios(`search/${params.source}`, `?param=${encodeURIComponent(JSON.stringify(param))}`).then(res => 
    {
      resolve(res.data)
    },
    (err) => 
    {
        resolve(err.response.data);
    });
});
}



const GET_DATA = params => {
  let param = {
      "target"    : "showData",
      "pageNumber": params.page,
      "pageLimit" : params.limit,
      "filter"    : params.filter,
      "orderBy"   : "",
      "groupBy"   : ""
    };
  
  return new Promise((resolve, reject) => {
    getData_axios(params.source, `?param=${encodeURIComponent(JSON.stringify(param))}`).then(res => 
    {
      resolve(res.data)
    },
    (err) => 
    {
        resolve(err.response.data);
    });
});
}

const REMOVE_DATA = params => {
  const param = {"target"    : "REMOVE_DATA"};
  return new Promise((resolve, reject) => {
    DELETE_DATA_AXIOS(params.source, params.id, `?param=${JSON.stringify(param)}`).then(res => 
    {
      resolve(res.data);
    },
    (err) => 
    {
        console.log(`err API: ${err}`);
        resolve(err.response.data);
    });
  });
}

const SAVE_TRANSACTION = params => {
  return new Promise((resolve, reject) => {
    INSERT_AXIOS(`f2/${params.source}/insert`, true, params).then(res => 
    {
      alert(res.data);
    },
    (err) => 
    {
      console.log(`err API: ${JSON.stringify(err.response.data)}`);
      alert(err.response.data);
    });
  });
}

const INSERT_DATA = params => {
  const param = {"target"    : "INSERT_DATA"};
   
  return new Promise((resolve, reject) => {
    INSERT_DATA_AXIOS(params.source, params.data, `?param=${JSON.stringify(param)}`).then(res => 
    {
      resolve(res.data);
    },
    (err) => 
    {
      console.log(`err API: ${JSON.stringify(err.response.data)}`);
      resolve(err.response.data);
    });
  });
}

const UPDATE_DATA = params => {
  params.data = JSON.stringify(params.data).replace(/:(\d+)([,\}])/g, ':"$1"$2');
  params.data = JSON.parse(params.data);
  const param = {"target"    : "UPDATE_DATA"};
   
  return new Promise((resolve, reject) => {
    UPDATE_DATA_AXIOS(params.source, params.id, params.data, `?param=${JSON.stringify(param)}`).then(res => 
    {
      resolve(res.data);
    },
    (err) => 
    {
      console.log(`err API: ${err}`);
      resolve(err.response.data);
    });
  });
}

export const API = {
    getNewsBlog,
    getComments,
    postNewsBlog,
    updateNewsBlog,
    deleteNewsBlog,
    login,
    logout,
    getProfile,
    getDataArea,
    getData_axios,
    fetchSelfApiAREA,
    GET_DATA,
    GET_DATA_SEARCH,
    GETDATA_COMPSEARCH,
    REMOVE_DATA,
    INSERT_DATA,
    SAVE_TRANSACTION,
    UPDATE_DATA
};

const data = {
    a: function()
    {
        return 'Hellooowww';

    },
    abc: function(data)
    {
        return `data: ${data}`
    },
    abcd: () => {
        return 'wog';
    },
    abcde: 'fat'
}
// 2019-05-04 21:59:09	
export const formatDate = (data, split) =>
{
  if(data !== '')
  {
    let arr;
    if(split == "/") {
      arr = data.split("/");
      if(arr.length == 3)
      {
        let arrTime = arr[2].split(' ');
        if(arrTime.length == 2)
            return `${arr[0]}/${arr[1]}/${arrTime[0]} ${arrTime[1]}`;
        else
         return `${arr[0]}-${arr[1]}-${arr[2]}`;
      }
    } else {
      arr = data.split("-");
      if(arr.length == 3)
      {
        let arrTime = arr[2].split(' ');
        if(arrTime.length == 2) {
            return `${arrTime[0]}-${arr[1]}-${arr[0]} ${arrTime[1]}`;
        } else
         return `${arr[2]}-${arr[1]}-${arr[0]}`;
      }
    }
  }

  return data;
}

export const isEmpty = (obj) => 
{
  if (Object.keys(obj).length === 0)  return true;
  if (JSON.stringify(obj) === '{}')  return true;
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;
  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

export const mapToObj = (data) => 
{
  let obj = {}, i;
  const arr = [...data];
  for(i=0;i<arr.length;i++)
  {
    obj[arr[i][0]] = arr[i][1];
  }
  return obj;
}

export const defaultDate = "1971-01-01 00:00:00"
export const dateNow = () => {return moment().format('YYYY-MM-DD H:mm:ss')}

export const initialItem = (keyTemplate, anchor) => {
  const [...rawKey] = keyTemplate.keys();
  const staticKey = {};
  for (let i = 0; i < rawKey.length; i += 1) {
    if (rawKey[i] !== 'id') {
      const itemIndex = anchor.findIndex(a => a.name === rawKey[i]);
      if(itemIndex >= 0)
      {
        staticKey[rawKey[i]] = anchor[itemIndex].initialValue;
      }
    }
  }

  return staticKey;
};