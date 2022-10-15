import request, { IResponse } from '@/utils/request';

export function fetchPosition(): Promise<IResponse<any>> {
  return request.get('position/get');
}
