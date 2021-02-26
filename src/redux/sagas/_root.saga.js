import { all } from 'redux-saga/effects';
import zipcodeSaga from './zipcodes.saga';

export default function* rootSaga() {
  yield all([
    zipcodeSaga(),
  ]);
}
