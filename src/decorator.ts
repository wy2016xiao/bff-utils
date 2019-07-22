import { formatServiceWarning, formatControllerWarning } from "./common";
import { ServiceResponse } from "./types";


interface serviceCatchOptions {
  // 服务方法名
  service?: string
}

/**
 * 服务方法错误拦截
 * 注意！一旦golang 接口报错，将不会上报到统一的错误中间件处理
 * 而是将错误格式化后传递给controller
 * @param {serviceCatchOptions} [options={}]
 * @returns {MethodDecorator}
 */
export const Catch = (options: serviceCatchOptions = {}): MethodDecorator => (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  const _fn = descriptor.value
  descriptor.value = async function (...args: any[]): Promise<ServiceResponse> {
    try {
      const result = await _fn.apply(this, args)
      return result
    } catch (err) {
      return formatServiceWarning({
        service: options.service || propertyKey,
        err
      })
    }
  }

  return descriptor
}


/**
 * 
 *
 * @returns {MethodDecorator}
 */
export const ControllerCatch = (): MethodDecorator => (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  const _fn = descriptor.value
  descriptor.value = async function (...args: any[]): Promise<ServiceResponse> {
    const result = await _fn.apply(this, args)
    return formatControllerWarning(result)
  }

  return descriptor
}
