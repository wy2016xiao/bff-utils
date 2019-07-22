import { ServiceResponse } from './types';
/**
 * 打印错误日志并返回service错误，不会被错误处理中间件捕获
 * @param service 服务名称
 * @param err catch返回的错误
 * @return {Object} {code,error}
 */
export declare function formatServiceWarning(data: any): any;
/**
 * 聚合各服务返回值在同一个对象内
 * exp { seller: {code: 3, error: ['xxxxxx']}}, project: {code: 0, data: {a:2}} }
 * 聚合成 {code:1, data: {project:{a:2}}, error: ['xxxxxx']}
 * @date 2019-02-21
 * @export
 * @param {*} params
 * @returns
 */
export declare function formatControllerWarning(params: any): ServiceResponse;
