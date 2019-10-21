import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'manage/adList',
    method: 'get',
    params: data
  })
}

export function saveAd(data) {
  return request({
    url: 'manage/saveAd',
    method: 'post',
    data
  })
}

export function updateAd(data) {
  return request({
    url: 'manage/updateAd',
    method: 'post',
    data
  })
}

export function deleteAd(data) {
  return request({
    url: 'manage/deleteAd',
    method: 'post',
    data
  })
}
