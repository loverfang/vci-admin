import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'manage/advertiseList',
    method: 'get',
    params: data
  })
}

export function saveAdvertise(data) {
  return request({
    url: 'manage/saveAdvertise',
    method: 'post',
    data
  })
}

export function updateAdvertise(data) {
  return request({
    url: 'manage/updateAdvertise',
    method: 'post',
    data
  })
}

export function updateAdvertiseSindex(data) {
  return request({
    url: 'manage/updateAdvertiseSindex',
    method: 'post',
    data
  })
}

export function updateAdvertiseStatus(data) {
  return request({
    url: 'manage/updateAdvertiseSatus',
    method: 'post',
    data
  })
}

export function deleteAdvertise(data) {
  return request({
    url: 'manage/deleteAdvertise',
    method: 'post',
    data
  })
}

