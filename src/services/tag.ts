import { ITag } from '@/interface';
import request, { IResponse } from '@/utils/request';

export function fetchTagList(params): Promise<IResponse<any>> {
  return request('/tag/list', {
    params,
  });
}
export function fetchTagArticleList(params) {
  return request({
    url: `/tag/article_list/${params.tagId}`,
    method: 'get',
    params,
  });
}

export function fetchCreateTag(data: ITag) {
  return request({
    url: '/tag/create',
    method: 'post',
    data,
  });
}

export function fetchUpdateTag(data: ITag) {
  return request({
    url: `/tag/update/${data.id}`,
    method: 'put',
    data,
  });
}

export function fetchDeleteTag(id: number) {
  return request({
    url: `/tag/delete/${id}`,
    method: 'delete',
  });
}
