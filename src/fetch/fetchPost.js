import Vue from 'vue';
import qs from 'qs'

var FetchPost = function (url, data) {
    let config = {
        url: url,
        params: data,
        timeout: 5000,
        //ContentType: "application/x-www-form-urlencoded; charset=UTF-8",
        headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               'Access-Control-Allow-Headers': 'X-Requested-With',
              'Access-Control-Allow-Origin': '*'
         },
        baseURL: 'http://localhost:3000/test-post/',
        method: 'POST',
        data: data,
        //withCredentials: true,
        transformResponse: [function (result) {
            return result;
        }],
        responseType: 'JSON'
    }
    console.log('--------------------------------:');
    console.log(config)
    return Vue.axios.post(url, data, config);
}

export default {
    FetchPost
}