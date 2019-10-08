import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'manage/categoryList',
    method: 'get',
    params: data
  })
}

export function addCategory(data) {
  return request({
    url: 'manage/saveCategory',
    method: 'post',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: 'manage/updateCategory',
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: 'manage/updateCategoryStatus',
    method: 'post',
    data
  })
}

export function updateSindex(data) {
  return request({
    url: 'manage/updateCategorySindex',
    method: 'post',
    data
  })
}
export function queryOptions() {
  return request({
    url: 'manage/queryOptions',
    method: 'get'
  })
}

