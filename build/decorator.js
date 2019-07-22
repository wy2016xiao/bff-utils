"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
/**
 * 服务方法错误拦截
 * 注意！一旦golang 接口报错，将不会上报到统一的错误中间件处理
 * 而是将错误格式化后传递给controller
 * @param {serviceCatchOptions} [options={}]
 * @returns {MethodDecorator}
 */
exports.Catch = (options = {}) => (target, propertyKey, descriptor) => {
    const _fn = descriptor.value;
    descriptor.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield _fn.apply(this, args);
                return result;
            }
            catch (err) {
                return common_1.formatServiceWarning({
                    service: options.service || propertyKey,
                    err
                });
            }
        });
    };
    return descriptor;
};
/**
 *
 *
 * @returns {MethodDecorator}
 */
exports.ControllerCatch = () => (target, propertyKey, descriptor) => {
    const _fn = descriptor.value;
    descriptor.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _fn.apply(this, args);
            return common_1.formatControllerWarning(result);
        });
    };
    return descriptor;
};
