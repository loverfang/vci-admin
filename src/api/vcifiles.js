import request from '@/utils/request'

// 查询新闻图片列表
export function fetchFileList(query) {
  return request({
    url: 'manage/fileList',
    method: 'get',
    params: query
  })
}

export function saveFileList(data) {
  alert('OK')
  return request({
    url: 'manage/saveFiles',
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
export function deleteVciFiles(data) {
  return request({
    url: 'manage/deleteVciFiles',
    method: 'post',
    data
  })
}

