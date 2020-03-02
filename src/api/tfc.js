import request from '@/utils/request'
// TFC类别
export function fetchTypeList(data) {
  return request({
    url: 'manage/tfcTypeList',
    method: 'get',
    params: data
  })
}

export function saveTfcType(data) {
  return request({
    url: 'manage/saveTfcType',
    method: 'post',
    data
  })
}

export function updateTfcType(data) {
  return request({
    url: 'manage/updateTfcType',
    method: 'post',
    data
  })
}

export function updateTfcTypeSindex(data) {
  return request({
    url: 'manage/updateTfcTypeSindex',
    method: 'post',
    data
  })
}

export function updateTfcTypeStatus(data) {
  return request({
    url: 'manage/updateTfcTypeStatus',
    method: 'post',
    data
  })
}

// TFC视频
export function fetchList(data) {
  return request({
    url: 'manage/tfcVideoList',
    method: 'get',
    params: data
  })
}

export function saveVideo(data) {
  return request({
    url: 'manage/saveTfcVideo',
    method: 'post',
    data
  })
}

export function updateVideo(data) {
  return request({
    url: 'manage/updateTfcVideo',
    method: 'post',
    data
  })
}

export function updateVideoSindex(data) {
  return request({
    url: 'manage/updateTfcVideoSindex',
    method: 'post',
    data
  })
}

export function deleteVideo(data) {
  return request({
    url: 'manage/deleteTfcVideos',
    method: 'post',
    data
  })
}

export function queryOptions() {
  return request({
    url: 'manage/queryTfcTypeOptions',
    method: 'get'
  })
}
