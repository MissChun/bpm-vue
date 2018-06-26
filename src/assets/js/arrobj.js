/* 数组对象相关 */
/**
 * @function isArray
 * @memberOf pbFunc
 * @ngdoc function
 * @description 是否是数组
 * @param  {object}  data [需要检测的对象]
 * @return {Boolean}      [返回是否是数组]
 */
export const isArray = function(data) {
  return Array.isArray(data);
}
/**
 * @function inArray
 * @memberOf pbFunc
 * @ngdoc function
 * @description 是否存在数组中
 * @param  {any}  needle [需要检测的值]
 * @param  {array}  arr [需要检测的数组]
 * @return {Boolean}      [返回是否在数组中]
 */
export const inArray = function(needle, arr) {
  let isFound = false;
  for (let i = 0, imax = arr.length; i < imax; i++) {
    if (arr[i] === needle) {
      isFound = true;
      break;
    }
  }
  return isFound;
}
/**
 * @function inObjName
 * @memberOf pbFunc
 * @ngdoc function
 * @description 是否存在于对象属性中
 * @param  {*} needle [需要检查的内容]
 * @param  {string} name   [对象的属性名称]
 * @param  {object} obj    [需要检查的对象]
 * @returns {boolean}        [返回是否存在]
 */
export const inObjName = function(needle, name, obj) {
  /**
   * 键值
   * @type {number}
   */
  var i;
  for (i in obj) {
    if (needle === obj[i][name]) {
      return true;
    }
  }
  return false;
}

/**
 * @function objToArrStr
 * @memberOf pbFunc
 * @ngdoc function
 * @description 把对象中某种属性转成数组join的字符串
 * @param  {object} obj  [需要转换的对象]
 * @param  {string} prop [对象的属性名称]
 * @returns {string}      [返回数组join的字符串]
 */
export const objToArrStr = function(obj, prop) {
  /**
   * 需要处理的数组对象
   * @type {array}
   */
  var arr = [];
  /**
   * 键值
   * @type {number}
   */
  var i;
  for (i in obj) {
    if (obj[i][prop] !== undefined) {
      arr.push(obj[i][prop]);
    }
  }
  return arr.join(',');
}

/**
 * @function objByKeyToArr
 * @memberOf pbFunc
 * @ngdoc function
 * @description 把对象中某种属性转成数组
 * @param  {object} obj  [需要转换的对象]
 * @param  {string} prop [对象的属性名称]
 * @returns {array}      [返回匹配属性的数组]
 */
export const objByKeyToArr = function(obj, prop) {
  /**
   * 需要处理的数组对象
   * @type {array}
   */
  var arr = [];
  /**
   * 键值
   * @type {number}
   */
  var i;
  for (i in obj) {
    if (obj[i][prop] !== undefined) {
      arr.push(obj[i][prop]);
    }
  }
  return arr;
}
/**
 * @function arrToObj
 * @memberOf pbFunc
 * @ngdoc function
 * @description 数组转可选标注的对象
 * @param  {array}   selectedArr [需要检测的数组]
 * @param  {array}   arr         [需要遍例的数组]
 * @param  {string}   keyName     [属性名称]
 * @param  {Function} cb          [判断是否可选的回调函数]
 * @returns {object}               [返回标注可选的对象]
 *
 */
export const arrToObj = function(selectedArr, arr, keyName, cb) {
  /**
   * 对象
   * @type {object}
   */
  var objList = {};
  /**
   * 键值
   * @type {number}
   */
  var i;
  for (i in arr) {
    objList[i] = {
      keyName: arr[i],
      id: i,
      isSelected: (cb(arr, selectedArr, keyName, i)) ? true : false
    }
  }
  return objList;
}
/**
 * @function arrToObjWithKey
 * @memberOf pbFunc
 * @ngdoc function
 * @description 数组转对象带Key
 * @param  {array}   selectedObj [需要检测的对象]
 * @param  {array}   arr         [需要遍例的数组]
 * @param  {string}   keyName     [属性名称]
 * @param  {Function} cb          [判断是否可选的回调函数]
 * @returns {object}               [返回标注可选的对象]
 *
 */
export const arrToObjWithKey = function(selectedObj, arr, keyName, cb) {
  /**
   * 对象
   * @type {object}
   */
  var objList = {};
  /**
   * 键值
   * @type {number}
   */
  var i;
  /**
   * 同一个键值的数组
   * @type {string}
   */
  var selectedArr = objByKeyToArr(selectedObj, keyName);
  for (i in arr) {
    /**
     * 序号
     * @type {string}
     */
    var xh = arr[i].id.toString();
    objList[xh] = {
      name: arr[i][keyName],
      id: xh,
      isSelected: (cb(arr, selectedArr, keyName, i)) ? true : false
    }
  }
  return objList;
}
/**
 * @function objPushToArr
 * @memberOf pbFunc
 * @ngdoc function
 * @description 对象中某个key加入到数组
 * @param  {string} submitData [提交的字符串]
 * @param  {object} obj        [需要检查的对象]
 * @param  {string} field      [需要检查的对象包含的字段]
 * @returns {array}            [返回数组]
 */
export const objPushToArr = function(submitData, obj, field) {
  /**
   * 需要处理的数组对象
   * @type {array}
   */
  var selectedArr = [];
  /**
   * 键值
   * @type {number}
   */
  var i;
  if (obj.length > 0 && typeof submitData === 'string') {
    /**
     * 逗号分隔的数组
     * @type {array}
     */
    var submitDataArr = submitData.split(',');
    for (i in obj) {
      /**
       * 名称
       * @type {string}
       */
      var name = obj[i][field];
      /**
       * ID
       * @type {string}
       */
      var id = obj[i]['id'];
      if (inArray(name, submitDataArr)) {
        selectedArr.push(id);
      }
    }
  }
  return selectedArr;
}
/**
 * @function isEmptyObj
 * @memberOf pbFunc
 * @ngdoc function
 * @description 对象是否为空
 * @param  {object} listObj        [需要检查的对象]
 * @returns {number}            [返回整数表示长度]
 */
export const isEmptyObj = function(listObj) {
  /**
   * 初始化对象长度为零
   * @type {number}
   */
  var len = 0;
  if (typeof listObj !== 'object') return len;
  for (var i in listObj) {
    if (listObj[i] !== null || listObj[i] !== undefined) {
      len++;
    }
  }
  return len;
}

/**
 * @function objSize
 * @memberOf pbFunc
 * @ngdoc function
 * @description 获取对象大小
 * @param  {object} trg [需要检查的对象]
 */
export const objSize = function(trg) {
  if (typeof trg !== 'object' || trg === null) return 0;
  /**
   * 计数器
   * @type {Number}
   */
  var i = 0;
  for (var t in trg) {
    i++;
  }
  return i; //Object.keys(trg).length;
}
/**
 * @function objPrint
 * @memberOf pbFunc
 * @ngdoc function
 * @description [用于IE调试]打印object内部数据(3级数据)
 * @param  {object} obj [需要检查的对象]
 * @param  {number} level [最大层级]
 * @param  {number} currentLevel [当前层级]
 * @param  {number} showLevel [需要展示的层级]
 */
export const objPrint = function(obj, level, currentLevel, showLevel) {
  /**
   * 最大层级
   * @type {number}
   */
  var _level = (typeof level === 'number' && level > 0 && level < 4) ? level : 3;
  /**
   * 当前层级
   * @type {number}
   */
  var _currentLevel = (typeof currentLevel === 'number' && currentLevel > 0 && currentLevel < 4) ? currentLevel : 0;
  /**
   * 需要展示的层级
   * @type {number}
   */
  var _showLevel = (typeof showLevel === 'number' && showLevel >= 0 && showLevel < 4) ? showLevel : _level;
  /**
   * 需要展示的箭头
   * @type {string}
   */
  var arrow = "";
  if (typeof obj !== 'object') {
    //console.log("objPrint ", (obj || "").toString().replace(/[\n\r]/gi, ""));
    return false;
  }
  if (obj === null) {
    //console.log("objPrint ", "null");
    return false;
  }
  if (objSize(obj) === null) {
    //console.log("objPrint ", "empty");
    return false;
  }
  //console.log("objPrint init", _level, _currentLevel);
  if (_level === 0) {
    //console.log("objPrint ", "[" + _level + ":" + _currentLevel + "]" + "[obj]=" + obj.toString().replace(/[\n\r]/gi, ""));
    return false;
  }
  /**
   * 键值
   * @type {string}
   */
  var t;
  /**
   * 计数器
   * @type {number}
   */
  var i;
  for (t in obj) {
    if (_currentLevel < _level) {
      /**
       * 清空箭头
       * @type {string}
       */
      arrow = "";
      for (i = 0; i < 3 - _level; i++) {
        /**
         * 展示箭头
         * @type {string}
         */
        arrow += ">>>>>";
      }
      if (typeof obj[t] === 'object') {
        //console.log("objPrint ", arrow + "[" + _level + ":" + _currentLevel + "]" + "[" + t + "]; ");
        if (_currentLevel < _showLevel) objPrint(obj[t], _level - 1, _currentLevel + 1);
      } else {
        var temp = (obj && obj[t]) ? obj[t].toString().replace(/[\n\r]/gi, "") : '';
        //console.warn("objPrint ", arrow + "[" + _level + ":" + _currentLevel + "]" + "[" + t + "]=" + temp + "; ");
      }
    }
  }
}
/**
 * @function chkObjLen
 * @memberOf pbFunc
 * @ngdoc function
 * @description 检查对象长度
 * @param  {object} trg [需要检查的对象]
 * @param  {number} size [预估长度]
 * @returns  {boolean}  [返回真假]
 */
export const chkObjLen = function(obj, size) {
  if (objSize(obj) === size) {
    return true;
  } else {
    return false;
  }
}

/**
 * @function getObjFromArrByKey
 * @memberOf pbFunc
 * @ngdoc function
 * @description 通过数组中对象的键值返回相应的对象
 * @param  {string} name [数组中对象的键值名称]
 * @param  {*} value [数组中对象的键值所对应的值]
 * @returns {object}      [返回相应的对象]
 */
export const getObjFromArrByKey = function(arr, name, value) {
  /**
   * 初始化对象
   * @type {object}
   */
  var obj = {};
  if (!isArray(arr)) return obj;
  for (var i = 0, imax = arr.length; i < imax; i++) {
    if (arr[i].hasOwnProperty(name) && arr[i][name] === value) {
      obj = arr[i];
      break;
    }
  }
  return obj;
}

/**
 * @function delObjKey
 * @memberOf pbFunc
 * @ngdoc function
 * @description 删除对象属性]
 * @param  {object} obj [目标对象]
 * @param  {object} key [目标键值]
 * @return {object}     [返回找到的对象]
 */
export const delObjKey = function(obj, key) {
  var newFileListObj;
  if (typeof obj === 'object') {
    if (obj.constructor === Array) {
      newFileListObj = [];
      for (var j = 0, jmax = obj.length; j < jmax; j++) {
        if (obj[j].key !== key) {
          newFileListObj.push(obj[j]);
        }
      }
    } else {
      newFileListObj = {};
      for (var t in obj) {
        if (obj.hasOwnProperty(t) && t !== key) {
          newFileListObj[t] = obj[t];
        }
      }
    }
  }
  return newFileListObj;
}

/**
 * @function arrFilter
 * @memberOf pbFunc
 * @ngdoc function
 * @description 通过过滤条件过滤数组对象]
 * @param  {object} arr             [目标数组对象]
 * @param  {object} filterObj       [过滤对象]
 * @param  {object} returnedFields  [需要返回的字段对象]
 * @param  {object} defaultValues   [默认值对象]
 * @param  {object} returnedNameMap [名称映射对象]
 * @return {object}                 [返回过滤后的对象]
 * @example
 *     $scope.logList = _this.arrFilter(data.flow_logs, {
 *         id: new RegExp("^[0-9]+$", "i")
 *     }, ['created_time', 'actor_name', 'content'], {
 *         href: ''
 *     }, {
 *         created_time: 'operationTime',
 *         actor_name: 'operator',
 *     });
 */
export const arrFilter = function(arr, filterObj, returnedFields, defaultValues, returnedNameMap) {
  var newArr = [];
  var t;
  var pushToNewArr = function(newArr, n, returnedFields, defaultValues, returnedNameMap) {
    var newItem,
      x;
    if (returnedFields) {
      newItem = {};
      for (x in n) {
        if (n.hasOwnProperty(x) && inArray(x, returnedFields)) {
          if (returnedNameMap && returnedNameMap.hasOwnProperty(x)) {
            //如果需要映射到不同的属性名
            newItem[returnedNameMap[x]] = n[x];
          } else {
            newItem[x] = n[x];
          }
        }
      }
      if (defaultValues)
        newItem = angular.extend(newItem, defaultValues);
    } else {
      if (defaultValues) {
        newItem = angular.extend(n, defaultValues);
      } else {
        newItem = n;
      }
    }
    newArr.push(newItem);
  };
  if (typeof arr === 'object' && arr.constructor === Array) arr.map(function(n, i) {

    for (t in filterObj) {
      if (filterObj.hasOwnProperty(t) && n.hasOwnProperty(t)) {
        //满足filterObj中任何一个条件就返回
        if (filterObj[t] instanceof RegExp && n[t] && n[t].toString().match(filterObj[t])) {
          pushToNewArr(newArr, n, returnedFields, defaultValues, returnedNameMap);
          break;
        } else if (n[t] && n[t] === filterObj[t]) {
          pushToNewArr(newArr, n, returnedFields, defaultValues, returnedNameMap);
          break;
        }
      }
    }
  });
  return newArr;
}

/**
 * @function objValues
 * @memberOf pbFunc
 * @ngdoc function
 * @description 数组对象中相同键值提取成数组]
 * @param  {object} obj [目标对象]
 * @return {object}     [相同键值提取成数组]
 */
export const objValues = function(obj) {
  var values = [];
  for (var t in obj) {
    if (obj.hasOwnProperty(t)) {
      values.push(obj[t]);
    }
  }
  return values;
}
/**
 * @function objKeys
 * @memberOf pbFunc
 * @ngdoc function
 * @description 对象键值数组]
 * @param  {object} obj [目标对象]
 * @return {object}     [键值数组]
 */
export const objKeys = function(obj) {
  var values = [];
  for (var t in obj) {
    if (obj.hasOwnProperty(t)) {
      values.push(t);
    }
  }
  return values;
}

/**
 * @function deepcopy
 * @memberOf pbFunc
 * @ngdoc function
 * @description 深拷贝]
 * @param  {object}/{array}  source [目标对象]
 * @return {object}/{array}         [目标对象]
 */
export const deepcopy = function(source) {
  if (!source) {
    return source;
  }
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
  }
  return sourceCopy;
};

export const fifterObjIsNull = function(Obj) {
  var object = deepcopy(Obj);

  var isEmpty = function(object) {
    for (var name in object) {
      return false;
    }
    return true;
  }

  for (var i in object) {
    var value = object[i];
    if (value && typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length == 0) {
          delete object[i];
          continue;
        }
      }else {
        for (let j = 0; j < value.length; j++) {
          value[j] = fifterObjIsNull(value[j]);
        }
      }
      value = fifterObjIsNull(value);
      if (isEmpty(value)) {
        delete object[i];
      }
    } else {
      if (value === '' || value === null || value === undefined) {
        delete object[i];
      }
    }
  }
  return object;
};

export const fifterbyArr = function(Obj, fifterArr,isNull) {
  var object = deepcopy(Obj);
  var newObj = {};
  if(isNull){
    for (let i = 0; i < fifterArr.length; i++) {
      newObj[fifterArr[i]] = object[fifterArr[i]];
    }
  }else{
    for (let i = 0; i < fifterArr.length; i++) {
      newObj[fifterArr[i]] = object[fifterArr[i]] ? object[fifterArr[i]] : null;
    }
  }
  return newObj;
}
export const dealNullData = function(data) {
  if(data === null || data === undefined || data === ''){
    return '<span class="text-stance">无</span>'
  }else{
    return data
  }
}
