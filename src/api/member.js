import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'manage/memberList',
    method: 'get',
    params: data
  })
}

export function addMember(data) {
  alert(data)
  return request({
    url: 'manage/saveMember',
    method: 'post',
    data
  })
}

export function updateMember(data) {
  return request({
    url: 'manage/editMember',
    method: 'post',
    data
  })
}

export function updateMemberStatus(data) {
  return request({
    url: 'manage/editMemberStatus',
    method: 'post',
    data
  })
}
