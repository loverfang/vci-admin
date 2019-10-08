import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'manage/videoList',
    method: 'get',
    params: data
  })
}

export function saveVideo(data) {
  return request({
    url: 'manage/saveVideo',
    method: 'post',
    data
  })
}

export function updateVideo(data) {
  return request({
    url: 'manage/updateVideo',
    method: 'post',
    data
  })
}

export function updateVideoSindex(data) {
  return request({
    url: 'manage/updateVideoSindex',
    method: 'post',
    data
  })
}

export function deleteVideo(data) {
  return request({
    url: 'manage/deleteVideos',
    method: 'post',
    data
  })
}

