import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'manage/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'manage/userInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'manage/logout',
    method: 'post'
  })
}

export function resetPwd(data) {
  return request({
    url: 'manage/resetpwd',
    method: 'post',
    data
  })
}
