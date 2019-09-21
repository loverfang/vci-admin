import request from '@/utils/request'

export function login(data) {
  console.log('api--->'+data);
  return request({
    url: 'manage/dologin',
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
