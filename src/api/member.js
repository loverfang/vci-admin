import request from '@/utils/request'

export function fetchList(data) {
  request({
    url: 'manage/memberList',
    method: 'get',
    params: data
  })
}
