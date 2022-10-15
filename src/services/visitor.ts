import { IVisitor } from '@/interface';
import request, { IResponse } from '@/utils/request';

export function fetchVisitorHistoryData(): Promise<IResponse<any>> {
  return request.get('/visitor_log/history');
}

export function fetchVisitorDayData(params): Promise<IResponse<any>> {
  return request.get('/visitor_log/day', {
    params: {
      startTime: params.startTime,
      endTime: params.endTime,
    },
  });
}

export function fetchVisitorList(params) {
  return request({
    url: '/visitor_log/list',
    method: 'get',
    params,
  });
}

export function fetchCreateVisitor(data: IVisitor) {
  return request({
    url: '/visitor_log/create',
    method: 'post',
    data,
  });
}

export function fetchUpdateVisitor(data: IVisitor) {
  return request({
    url: `/visitor_log/update/${data.id}`,
    method: 'put',
    data,
  });
}

export function fetchDeleteVisitor(id: number) {
  return request({
    url: `/visitor_log/delete/${id}`,
    method: 'delete',
  });
}
