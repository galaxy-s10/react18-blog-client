import { IArticle, IList, IResponsePaging } from '@/interface';
import request from '@/utils/request';

export function fetchArticleList(
  params: IList<IArticle>
): Promise<IResponsePaging<IArticle>> {
  return request.get('/article/list', {
    params,
  });
}

export function fetchArticleDetail(id: number) {
  return request({
    url: `/article/find/${id}`,
    method: 'get',
  });
}

export function fetchCreateArticle(data: IArticle) {
  return request({
    url: '/article/create',
    method: 'post',
    data,
  });
}
export function fetchUpdateArticle(data: IArticle) {
  return request({
    url: `/article/update/${data.id}`,
    method: 'put',
    data,
  });
}
export function fetchDeleteArticle(id: number) {
  return request({
    url: `/article/delete/${id}`,
    method: 'delete',
  });
}
