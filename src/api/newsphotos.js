import request from '@/utils/request'

// 查询新闻图片列表
export function fetchPhotoList(query) {
  return request({
    url: 'manage/photoList',
    method: 'get',
    params: query
  })
}

export function savePhotoList(data) {
  alert('OK')
  return request({
    url: 'manage/savePhotos',
    method: 'post',
    data
  })
}

// 更新图片排序索引
export function updatePhotoSindex(data) {
  return request({
    url: 'manage/updatePhotoSindex',
    method: 'post',
    data: data
  })
}

// 根据图片ID批量删除图片
export function deletePhotosByPid(data) {
  return request({
    url: 'manage/deletePhotosByPid',
    method: 'post',
    data
  })
}

