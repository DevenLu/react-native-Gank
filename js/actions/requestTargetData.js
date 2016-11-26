/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import * as types from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import {getYesterdayFromDate} from '../utils/getDate';

function requestData() {
    return {
        type: types.REQUEST_DATA,
    };
}

function receiveData(responseData){
    return {
        type: types.RECEIVE_DATA,
        dataSource: responseData
    }
}

function isValidData(responseData) {
    if(responseData.category.length > 0)
        return true;
    return false;
}

export function fetchData(date) {
    const url = fetchUrl.daily + date;
    return function (dispatch) {
        //dispatch(requestData());
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                //if today's data hasn't updated yet, it will fetch yesterday's data
                if(isValidData(json)){
                    dispatch(receiveData(json));
                }else{
                    dispatch(fetchData(getYesterdayFromDate(date)));
                }
            });
    }
}