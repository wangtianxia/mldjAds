import { baseUrl } from './env.js';
import md5 from './md5'
require('es6-promise').polyfill();
var Axios = require('src/config/axios');
export default async(url='',data ,type='GET')=>{
    // data['sign'] = md5.makeSign(data);
    type = type.toUpperCase();
    url = baseUrl+url
    if (type == 'GET') {
      let dataStr = ''; //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
      });
      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
      }
    }
    try {
      const response = await Axios({
        url: url,
        method: type,
        data: data
      });
      const responseJson = await response.data;
      return responseJson
    } catch (error) {
      const err = await error;
      return '0';
    }
}
