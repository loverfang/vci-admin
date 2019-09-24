import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'manage/advertiseList',
    method: 'get',
    data
  })
}

