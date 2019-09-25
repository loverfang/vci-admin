import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'manage/memberList',
    method: 'get',
    params: data
  })
}
