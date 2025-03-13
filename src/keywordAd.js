import axios from "axios";
import CryptoJS from "crypto-js";

//const proxyURL = "https://cors-anywhere.herokuapp.com/";

const NAVER_KEY = {
  naverAdSecret: "AQAAAAAfhzXZ1uzz82QzobroC4XXtujgeFZilDH14z6X/MjlqA==",
  naverAdAccess:
    "01000000001f8735d9d6ecf3f36433a1bae80b85d75e89a3a107f2b35d4b28f631583782ef",
  naverAdId: "3412614",
};

const getNaverAdApiHeader = (path) => {
  let timestamp = Date.now() + "";
  let hmac = CryptoJS.algo.HMAC.create(
    CryptoJS.algo.SHA256,
    NAVER_KEY.naverAdSecret
  );
  hmac.update(timestamp + path);
  let hash = hmac.finalize();
  hash.toString(CryptoJS.enc.Base64);

  const header = {
    "X-Timestamp": timestamp,
    "X-API-KEY": NAVER_KEY.naverAdAccess,
    "X-CUSTOMER": NAVER_KEY.naverAdId,
    "X-Signature": hash.toString(CryptoJS.enc.Base64),
  };

  return header;
};

const getNaverAdApiRequest = (url, method, headers, params) => {
  let request = {
    url,
    headers,
    method,
  };

  if (method === "get") request.params = params;
  if (method === "post") request.data = params;

  return request;
};

export async function requestKeywordAd(keyword) {
  const params = {
    hintKeywords: keyword,
    showDetail: 1,
  };

  const header = getNaverAdApiHeader(".GET./keywordstool");
  const request = getNaverAdApiRequest(
    //`${proxyURL}https://api.naver.com/keywordstool`,
    `/keywordstool`,
    "get",
    header,
    params
  );
  const res = await axios(request);
  const data = res.data["keywordList"];
  return data;
}
