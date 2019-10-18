import request from '@/utils/request'

export function fetchGroupData() {
  return request({
    url: 'manage/groupData',
    method: 'get'
  })
}

export function fetchNewsList() {
  return request({
    url: 'manage/indexNewsList',
    method: 'get'
  })
}

export function fetchVideosList() {
  return request({
    url: 'manage/indexVideosList',
    method: 'get'
  })
}

export function fetchMemberList() {
  return request({
    url: 'manage/indexMemberList',
    method: 'get'
  })
}
