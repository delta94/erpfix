import { all } from 'redux-saga/effects';
import { takeGetDataArea } from './f0/area';
import { takeSagaTrigger } from './globalSaga';

export default function* rootSaga() {
  yield all([
    takeGetDataArea(),
    takeSagaTrigger()
  ]);
}
