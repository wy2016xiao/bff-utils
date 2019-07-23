import {ServiceResponse} from './types';
/**
 * 打印错误日志并返回service错误，不会被错误处理中间件捕获
 * @param service 服务名称
 * @param err catch返回的错误
 * @return {ServiceResponse} {code,error}
 */
export function formatServiceWarning (data: any) {
    let service = data.service || 'unKownService';
    let err = data.err || '';

    if (!err || !err.details) {
      data.bffAicardMpCode = '100001';
      return data
    }
    
    let errInfo:any;
    try {
      errInfo = err.details;

      if (typeof errInfo === 'string' && errInfo.indexOf('error') > -1) {
        // 证明是grpc调用报错，"{"code":10000001,"error":"非法请求参数"}"
        errInfo = JSON.parse(errInfo)
      }
      errInfo = {
        code: '3',
        service,
        msg: errInfo.error || '服务器异常',
        stack: err.stack
      }
      // console.error('BFF-AICARD-MP错误：', errInfo);
      return {
        code: 3,
        error:[errInfo.msg]
      }
    } catch (e) {
      console.error('格式化错误信息失败, 返回原始错误信息: ', err)
      return {
        code: 3,
        error:['服务器异常']
      }
    }
}



/**
 * 聚合各服务返回值在同一个对象内
 * @example 
 * // returns {code:1, data: {project:{a:2}}, error: ['xxxxxx']}
 * formatControllerWarning({ seller: {code: 3, error: ['xxxxxx']}}, project: {code: 0, data: {a:2}} })
 * @date 2019-02-21
 * @param {*} params
 * @returns {ServiceResponse} {code,error}
 */
export function formatControllerWarning (params: any): ServiceResponse {
  let res:ServiceResponse = {
    code: 0,
    data: {},
    error: []
  };
  
  // 循环检查传入对象属性
  // 如果有error，取出error并重置该属性为空
  // 将data赋值给该属性
  for (let item in params) {
    let data = params[item];
    if(data.error){
      res.error = res.error.concat(data.error);
      data.data = {};
    }
    res.data[item] = data.data;
  }

  let dataLength = Object.keys(res.data).length;
  if (res.error.length < dataLength) {
    res.code = 1;
  }
  if (res.error.length == dataLength) {
    res.code = 2;
    delete res.data;
  }
  if (res.error.length == 0) {
    res.code = 0;
    delete res.error;
  }
  return res;
}