import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'manage/pdfList',
    method: 'get',
    params: data
  })
}

export function savePdf(data) {
  return request({
    url: 'manage/savePdf',
    method: 'post',
    data
  })
}

export function updatePdf(data) {
  return request({
    url: 'manage/updatePdf',
    method: 'post',
    data
  })
}

export function updateSindex(data) {
  return request({
    url: 'manage/updatePdfSindex',
    method: 'post',
    data
  })
}

export function deletePdf(data) {
  return request({
    url: 'manage/deletePdf',
    method: 'post',
    data
  })
}
