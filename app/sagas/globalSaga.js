import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_DATA_FORM, SUBMIT_DATA } from "../actions/actionConstants";
import { API } from "../service";

export function* GET_DATA(action) 
{
  const { branch, pagging, source, primaryKey } = action;
  const res = yield call(API.GET_DATA, {filter: pagging.filter, page: pagging.page, limit: pagging.limit, source});
  yield put({ type: `${branch}/${FETCH_DATA_FORM}`, res, branch, primaryKey});
}

export function* GET_DATA_COMPSEARCH(action) 
{
  const { branch, pagging, source, primaryKey } = action;
  const res = yield call(API.GET_DATA_SEARCH, {filter: pagging.filter, page: pagging.page, limit: pagging.limit, source});
  yield put({ type: `${branch}/${FETCH_DATA_FORM}`, res, branch, primaryKey});
}

export function* REMOVE_ROW_FORM(action) 
{
  const { branch, item, pagging, source, primaryKey } = action;
  const res = yield call(API.REMOVE_DATA, {id: item.get(primaryKey), source});
  if(res.success === true)
  {
    yield put({ type: `${branch}/REMOVE_ROW_FORM_SAGA`, res, branch});
    const res = yield call(API.GET_DATA, {filter: '', page: pagging.page, limit: pagging.limit, source, primaryKey});
    yield put({ type: `${branch}/${FETCH_DATA_FORM}`, res, branch});
  }
}

export function* INSERT_DATA(action) 
{
  const { branch, newData, editingId, source, primaryKey } = action;
  const pagging = {page: 1, limit:5};
  let res = {};
  if (editingId === '')
    res = yield call(API.INSERT_DATA, {data: newData, source});
  else
    res = yield call(API.UPDATE_DATA, {id: editingId, data: newData, source});

  if(res.success)
  {
    const res = yield call(API.GET_DATA, {filter: '', page: pagging.page, limit: pagging.limit, source});
    yield put({ type: `${branch}/${FETCH_DATA_FORM}`, res, branch, primaryKey});

    yield put({ type: `${branch}/SUBMIT_DATA_SAGA`, branch, editingId});
  }
  else
  {
    yield put({ type: `${branch}/SET_NOTIF`, message: res.msguser, branch});
  }
}

export function* takeSagaTrigger() 
{
  yield takeLatest(`compSearch/GET_DATA`, GET_DATA_COMPSEARCH);


  yield takeLatest(`crudTbFrmDemo/GET_DATA`, GET_DATA);
  yield takeLatest(`crudTbFrmDemo/SUBMIT_DATA`, INSERT_DATA);
  yield takeLatest(`crudTbFrmDemo/REMOVE_ROW_FORM`, REMOVE_ROW_FORM);
}