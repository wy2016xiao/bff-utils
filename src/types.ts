export interface ControllerError {
  'code': number;
  'error': [string];
}
export interface ServiceError {
  'code': 3;
  'error': [string];
}

export interface ServiceResponse {
  'code': number;
  'data'?: any;
  'error'?: any;
}