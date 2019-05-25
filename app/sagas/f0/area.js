import { call, put, takeLatest, all } from "redux-saga/effects";
import { API } from "../../service";

export function* APIgetDataArea(action) 
{
  const response = yield call(API.fetchSelfApiAREA, action.payload);
  yield put({ type: 'GO_GET_DATA_AREA_FETCH', payload: response});
}

export function* ChangePage(action) 
{
  const response = yield call(API.fetchSelfApiAREA, {page: '1', per_page:action.payload});
  yield put({ type: 'GO_GET_DATA_AREA_FETCH', payload: response});
}

export function* takeGetDataArea() 
{
  yield takeLatest('GO_GET_DATA_AREA', APIgetDataArea);
  yield takeLatest('GO_CHANGE_ROW_PERPAGE', ChangePage);
}