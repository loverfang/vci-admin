import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'manage/vendorList',
    method: 'get',
    params: data
  })
}
export function fetchVendorInfo(data) {
  return request({
    url: 'manage/vendorInfo',
    method: 'get',
    params: { pid: data }
  })
}

export function createVendor(data) {
  return request({
    url: 'manage/saveVendor',
    method: 'post',
    data
  })
}

export function updateVendor(data) {
  return request({
    url: 'manage/updateVendor',
    method: 'post',
    data
  })
}

export function deleteVendor(data) {
  return request({
    url: 'manage/deleteVendor',
    method: 'post',
    data
  })
}

export function updateSindex(data) {
  return request({
    url: 'manage/updateVendorSindex',
    method: 'post',
    data
  })
}

