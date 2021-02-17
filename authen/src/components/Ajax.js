import axios from 'axios';

import { BASE_URL } from './Constatns';

export const ajaxRequest = async (url, request = {}, method = 'GET', callback) => {
    const headers = {
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Origin': "*",
        "cache-control": "no-cache"
    };
    const config = {
        baseURL: BASE_URL,
        url,
        method,
        data: request,
        headers,
        json: true,
        timeout: 40000
    };
    await axios(config)
        .then(resp => callback && callback(resp?.data?.status !== 0, resp.data))
        .catch(err => callback && callback(true, err));
};