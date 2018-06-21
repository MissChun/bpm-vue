/* axios二次封装
 * desc:
 * 统一捕获接口报错
 * 统一报错弹窗提示
 * 接入api
 */

import axios from 'axios';
import { Message } from 'element-ui';
import api from './api';
import { getLocalData } from '../assets/js/cache'
import router from '../router'

/* 接口超时时长设置 */
let timeout = 15000;


/* 配置访问url */
let domainUrl = '';
let currentUrl = document.location.href.toString();

if (currentUrl.match('xxx.91lng.cn')) {
  domainUrl = 'http://91lng.cn';
} else if (currentUrl.match('bpm.hhtdlng.com') && !currentUrl.match('devbpm.hhtdlng.com')) {
  domainUrl = 'http://bpm.hhtdlng.com';
} else if (currentUrl.match('bpm.91lng.cn')) {
  domainUrl = 'http://bpm.91lng.cn';
} else {
  //domainUrl = 'http://devbpm.hhtdlng.com';
  domainUrl = 'http://bpm.hhtdlng.com';
}


let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let unCancelAjax = ['getTripRecords'];//设定可以重复请求的ajax请求的apiname(str)。
let cancelToken = axios.CancelToken;
let cancelLimitTime = 500;//设置需要cancel的间隔时限

//切换路由时，cancel请求
router.beforeEach((to, from, next) => {

  if(pending.length){
    for(let i in pending){
      pending[i].cancel();
    }
  }
  next();

})


let removePending = (config,isCancel) => {


}

//添加请求拦截器
axios.interceptors.request.use(config=>{
      //console.log('axios.interceptors',config,config.url);
     removePending(config,true); //在一个ajax发送前执行一下取消操作
     let isNeedCancel = true;
     if(unCancelAjax.length){
      for(let i in unCancelAjax){
        if(api[unCancelAjax[i]].url == config.url){
          isNeedCancel = false;
          break;
        }
      }
     }
     if(isNeedCancel){
      config.cancelToken = new cancelToken((c)=>{
          // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
          pending.push({ u:(config.url + '&' + config.method), cancel: c ,time:new Date()});
          //console.log('config,xxx',config,config.url,config.baseURL,config.baseURL + config.url + '&' + config.method,pending);
      });
     }
     return config;
   },error => {
     return Promise.reject(error);
   });

//添加响应拦截器
axios.interceptors.response.use(response=>{
      //console.log('axios.interceptors',response,response.config);
      removePending(response.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
      return response;
   },error =>{
    return error; //返回一个空对象，主要是防止控制台报错
   });


/* 统一处理网络问题或者代码问题造成的错误 */
const errorState = function(error) {
  console.log('error',error);
  let errorMsg = '';
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        errorMsg = '参数错误';
        break;
      case 401:
        errorMsg = '未授权，请重新登录';
        break;
      case 403:
        errorMsg = '拒绝访问';
        break;
      case 404:
        errorMsg = '请求出错(404)';
        break;
      case 405:
        errorMsg = '拒绝访问(405)';
        break;
      case 408:
        errorMsg = '请求超时，请检查网络';
        break;
      case 500:
        errorMsg = '服务器错误(500)';
        break;
      case 501:
        errorMsg = '服务未实现(501)';
        break;
      case 502:
        errorMsg = '网络错误(502)';
        break;
      case 503:
        errorMsg = '服务不可用(503)';
        break;
      case 504:
        errorMsg = '网络超时(504)';
        break;
      case 505:
        errorMsg = 'HTTP版本不受支持(505)';
        break;
      default:
        errorMsg = `连接出错(${error.response.status})!`;
    }
  } else {
    errorMsg = '连接服务器失败!'
  }
  Message.error(errorMsg);
}


/* 根据后端接口文档统一处理错误信息 */
const successState = function(response) {

  if (response.data && response.data.code) {
    if (response.data.code == 401) {
      Message.error('登录过期，请重新登录');
      router.push({ path: "/login" });
    } else if (response.data.code == 403) {
      Message.error('无操作权限');
    } else if (response.data.code == 0) {

    } else {
      if (response.data.msg) {
        Message.error(response.data.msg);
      }
    }
  }

}


/* 处理url */
const dealApiUrlParam = function(apiName, postData) {
  let httpUrl = api[apiName].url;

  if (httpUrl) {
    //设置最大循环数,以免死机
    let maxTimes = 0;
    while (httpUrl.match(/:([0-9a-z_]+)/i)) {
      let tempV = RegExp.$1;
      //console.log("tempV", tempV, postData)
      maxTimes++;
      //httpUrl最大支持10个变量替换
      if (maxTimes > 10) break;
      let reg = new RegExp(":" + tempV, "ig");
      //console.log("tempV2", tempV, postData.hasOwnProperty(tempV))
      if (postData.hasOwnProperty(tempV)) {
        httpUrl = httpUrl.replace(reg, postData[tempV])
        delete postData[tempV];
      }
    }
  }
  return httpUrl;
}


/* 处理http请求config */
const dealConfig = function(apiName, postData) {

  const httpConfig = {
    method: '',
    baseURL: domainUrl,
    url: '',
    timeout: timeout,
    params: '',
    data: postData,
    headers: '',
  }

  if (api.hasOwnProperty(apiName)) {
    let apiUrl = api[apiName].url ? api[apiName].url : '';
    let method = api[apiName].method ? api[apiName].method.toLowerCase() : '';
    let token = getLocalData('token',true);
    httpConfig.method = method;

    if (method == 'get') {
      httpConfig.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      }
    } else {
      httpConfig.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }

    if(!api[apiName].notNeedToken){
      httpConfig.headers.Authorization = 'jwt ' + token;
    }

    if (apiUrl) {
      apiUrl = dealApiUrlParam(apiName, postData);
    } else {
      return false
    }

    if (method == 'get' || method == 'delete') {
      delete httpConfig.data
    }

    if (method) {
      if ((method == 'get' || method == 'delete') && (postData && typeof postData === 'object')) {
        //如果接口为 get 请求，但是参数需要用？跟随，这是需要的对应处理
        let params = '?';
        let existedVars = {};
        for (let t in postData) {
          if (!existedVars.hasOwnProperty(t)) {
            params += t + "=" + encodeURIComponent(postData[t]) + '&';
          }
        }
        if (params.match(/^(.+)&$/i)) {
          params = RegExp.$1;
          apiUrl += params;
        }
      }
      httpConfig.url = apiUrl;
      // console.log('httpConfig', httpConfig);
      return httpConfig;
    } else {
      return false
    }

  } else {
    return false;
  }

}


/* http请求统一函数 */
const httpServer = (apiName, postData, defaultSuccessCallback, defaultErrorCallback) => {

  if (!apiName) return false;

  let httpConfig = dealConfig(apiName, postData);

  let promise = new Promise(function(resolve, reject) {
    axios(httpConfig).then(
      (res) => {
        // console.log('xxxx', res);
        //默认使用successState
        if (defaultSuccessCallback === undefined) {
          successState(res)
        } else if (typeof defaultSuccessCallback === 'function') {
          defaultSuccessCallback(res);
        }
        resolve(res)
      }
    ).catch(
      (response) => {
        console.log('xxxx111', response);
        //默认使用errorState
        if (defaultErrorCallback === undefined) {
          errorState(response)
        } else if (typeof defaultErrorCallback === 'function') {
          defaultErrorCallback(response);
        }
        reject(response)
      }
    )

  })
  return promise
}

export default httpServer
