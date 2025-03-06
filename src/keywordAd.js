import axios from 'axios';
import CryptoJS from 'crypto-js';

//const axios = require('axios');
//const CryptoJS = require('crypto-js');

const NAVER_KEY = {
    naverAdSecret: "AQAAAAAfhzXZ1uzz82QzobroC4XXtujgeFZilDH14z6X/MjlqA==",
    naverAdAccess: "01000000001f8735d9d6ecf3f36433a1bae80b85d75e89a3a107f2b35d4b28f631583782ef",
    naverAdId: "3412614"
};

const getNaverAdApiHeader = (path) => {  
    let timestamp = Date.now() + '';
    let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, NAVER_KEY.naverAdSecret);
    hmac.update(timestamp + path);
    let hash = hmac.finalize();
    hash.toString(CryptoJS.enc.Base64);

    const header = {
        "X-Timestamp": timestamp,
        "X-API-KEY": NAVER_KEY.naverAdAccess,
        "X-CUSTOMER": NAVER_KEY.naverAdId,
        "X-Signature" : hash.toString(CryptoJS.enc.Base64)
    };

    return header;
};

const getNaverAdApiRequest = (url, method, headers, params) => {
    let request = {
        url,
        headers,
        method
    };
    
    if(method==='get') request.params = params;
    if(method==='post') request.data = params;
    
    return request;
};

const params = {
    hintKeywords: "키워드",
    showDetail: 1
}

export async function requestKeywordAd() {
    const header = getNaverAdApiHeader('.GET./keywordstool');
    const request = getNaverAdApiRequest(`https://api.naver.com/keywordstool`, 'get', header, params);
    console.log(request);
    const res = await axios(request);
    const data = res.data['data'];
    return data;
};