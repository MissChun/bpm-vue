
/* 缓存相关 */

/**
 * @function setLocalData
 * @memberOf pbFunc
 * @ngdoc function
 * @description 本地存储数据
 * @param  {string} storageKey [基于local/sessionStorage存储的key值]
 * @param  {string} storageValue [基于local/sessionStorage存储的value值]
 * @param {boolean} isPermanent [是否永久保存]
 * @returns {boolean} [是否成功]
 * @see {@link pbFunc.getLocalData}
 * @see {@link pbFunc.delLocalData}
 */
export const setLocalData = function(storageKey, storageValue, isPermanent) {
  /**
   * [是否永久保存]
   * @type {boolean}
   */
  var _isPermanent = (typeof isPermanent === 'boolean') ? isPermanent : false;
  /**
   * [本地存储对象]
   * @type {objecy}
   */
  var windowStorageObj = (_isPermanent) ? window.localStorage : window.sessionStorage;
  //console.log('setLocalData', storageKey);
  try {
    //windowStorageObj.setItem(storageKey, angular.toJson(storageValue));
    windowStorageObj.setItem(storageKey, JSON.stringify(storageValue));
    return true;
  } catch ( errStorageObj ) {
    //if (isLoging) throw new Error('Storage数据失败! [' + errStorageObj.toString() + ']');
    return false;
  }
  //return false;

}
/**
 * @function getLocalData
 * @memberOf pbFunc
 * @ngdoc function
 * @description 获取本地存储数据
 * @param  {string} storageKey [基于local/sessionStorage存储的key值]
 * @param {boolean} isPermanent [是否永久保存]
 * @returns  {string|boolean}  [返回基于local/sessionStorage存储的value值]
 * @see {@link pbFunc.setLocalData}
 * @see {@link pbFunc.delLocalData}
 */
export const getLocalData = function(storageKey, isPermanent) {
  /**
   * [是否永久保存]
   * @type {boolean}
   */
  var _isPermanent = (typeof isPermanent === 'boolean') ? isPermanent : false;
  /**
   * [本地存储对象]
   * @type {objecy}
   */
  var windowStorageObj = (_isPermanent) ? window.localStorage : window.sessionStorage;
  //if (pbDebug) console.log('getLocalData', storageKey);
  try {
    if (storageKey in windowStorageObj) {
      //return angular.fromJson(windowStorageObj.getItem(storageKey));
      return JSON.parse(windowStorageObj.getItem(storageKey));
    }
  } catch ( errStorageObj ) {
    //if (isLoging) throw new Error('Storage数据失败! [' + errStorageObj.toString() + ']');
    return false;
  }
  //return null;

}
/**
 * @function delLocalData
 * @memberOf pbFunc
 * @ngdoc function
 * @description 删除本地存储数据
 * @param  {string} storageKey [基于local/sessionStorage存储的key值]
 * @param  {function} cb [删除后回调]
 * @param {boolean} isPermanent [是否永久保存]
 * @see {@link pbFunc.setLocalData}
 * @see {@link pbFunc.getLocalData}
 */
export const delLocalData = function(storageKey, cb, isPermanent) {
  /**
   * [是否永久保存]
   * @type {boolean}
   */
  var _isPermanent = (typeof isPermanent === 'boolean') ? isPermanent : false;
  /**
   * [本地存储对象]
   * @type {objecy}
   */
  var windowStorageObj = (_isPermanent) ? window.localStorage : window.sessionStorage;
  /**
   * [本地存储对象(localStorage|sessionStorage)]
   * @type {objecy}
   */
  var storageObj = (_isPermanent) ? localStorage : sessionStorage;
  //if (pbDebug) console.log('delLocalData', storageKey);
  try {
    if (storageKey in windowStorageObj) {
      windowStorageObj.removeItem(storageKey);
      if (typeof cb === 'function') {
        cb();
      }
    } else if (storageKey in storageObj) {
      storageObj.removeItem(storageKey);
      if (typeof cb === 'function') {
        cb();
      }
    } else {
      storageObj.removeItem(storageKey);
      if (typeof cb === 'function') {
        cb();
      }
    }
  } catch ( errStorageObj ) {
    //if (isLoging) throw new Error('Storage数据失败! [' + errStorageObj.toString() + ']');
    //return false;
  }
}
//批量删除
export const delBatchLocalData = function(dataArray, cb, isPermanent) {
  for (var i = 0, _length = dataArray.length; i < _length; i++) {
    delLocalData(dataArray[i], cb, isPermanent);
  }
}
/**
 * @function clearLocalData
 * @memberOf pbFunc
 * @ngdoc function
 * @description 清除所有本地存储数据
 * @param {boolean} isPermanent [是否是local storage，如果不是就是session storage]
 */
export const clearLocalData = function(isPermanent) {
  /**
   * [是否永久保存]
   * @type {boolean}
   */
  var _isPermanent = (typeof isPermanent === 'boolean') ? isPermanent : false;
  /**
   * [本地存储对象]
   * @type {objecy}
   */
  var windowStorageObj = (_isPermanent) ? window.localStorage : window.sessionStorage;
  try {
    windowStorageObj.clear();
    return true;
  } catch ( errStorageObj ) {
    throw new Error('Storage清除数据失败! [' + errStorageObj.toString() + ']');
    return false;
  }
}

/**
 * @function cacheKey
 * @memberOf pbFunc
 * @ngdoc function
 * @description 生成缓存key
 * @param  {string}  cType        [图表类型]
 * @param  {string} cUrl [RESTFul接口路径]
 * @param  {string}  cId          [图表元素ID]
 * @param  {string}  more          [更多名字相关字符]
 * @return {string}     [缓存key]
 */
export const cacheKey = function(cType, cUrl, cId, more) {
  var _more = (typeof more === 'string') ? more : 'ecOpt';
  //console.log('cacheKey', cType, cUrl, cId);
  return _more + '_' + cType + '_' + MD5(cType + '_' + cUrl + '_' + cId);
}

/**
 * @function setLocalDataWithTime
 * @memberOf pbFunc
 * @ngdoc function
 * @description 设置带缓存时间缓存]
 * @param {string} name  [缓存名称]
 * @param {string} value [缓存字符串]
 */
export const setLocalDataWithTime = function(name, value) {
  var ts = sTime();
  //console.log("[save]setLocalDataWithTime", name, JSON.stringify(value).length);
  setLocalData(name, {
    ts: ts,
    data: value
  }, true);
}
/**
 * @function getLocalDataWithTime
 * @memberOf pbFunc
 * @ngdoc function
 * @description 获取带缓存时间缓存]
 * @param  {string} name      [缓存名称]
 * @param  {number} cacheTime [缓存时间（秒）]
 * @return {object}           [返回缓存对象]
 */
export const getLocalDataWithTime = function(name, cacheTime) {
  var _cacheTime = cacheTime || 10;
  var cache = getLocalData(name, true);
  var currentTime = sTime();
  if (cache && cache.ts) {
    //console.log("[get]getLocalDataWithTime", name, currentTime, cache.ts, currentTime - cache.ts, _cacheTime);
    if (currentTime - cache.ts >= _cacheTime) {
      //过期
      delLocalData(name, undefined, true);
      return undefined
    } else {
      return cache.data;
    }
  } else {
    return undefined;
  }
}
