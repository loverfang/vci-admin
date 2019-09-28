import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'manage/newsList',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchSingleArticle(ntype) {
  return request({
    url: 'manage/querySignleNews',
    method: 'get',
    params: { ntype }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: 'manage/updateSignleNews',
    method: 'post',
    data
  })
}
