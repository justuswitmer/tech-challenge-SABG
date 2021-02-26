import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchZipcodes() {
  let response = yield axios({
    method: 'GET',
    url: '/zipcodes',
  });
  console.log('in fetchZipcodes', response);
  yield put({
    type: 'SET_ZIPCODES',
    payload: response.data,
  });
}

function* zipcodeSaga() {
  yield takeLatest('FETCH_ZIPCODES', fetchZipcodes);
}

export default zipcodeSaga;