interface serviceCatchOptions {
    service?: string;
}
/**
 * 服务方法错误拦截
 * 注意！一旦golang 接口报错，将不会上报到统一的错误中间件处理
 * 而是将错误格式化后传递给controller
 * @param {serviceCatchOptions} [options={}]
 * @returns {MethodDecorator}
 */
export declare const Catch: (options?: serviceCatchOptions) => MethodDecorator;
/**
 *
 *
 * @returns {MethodDecorator}
 */
export declare const ControllerCatch: () => MethodDecorator;
export {};
