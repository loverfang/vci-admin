import request from '@/utils/request'

// 根据ntype获取单篇类型的新闻信息
export function fetchSingleArticle(ntype) {
  return request({
    url: 'manage/querySignleNews',
    method: 'get',
    params: { ntype: ntype }
  })
}

// 修改单篇类型的新闻信息
export function updateSignleArticle(data) {
  return request({
    url: 'manage/updateSignleNews',
    method: 'post',
    data
  })
}

// 查询新闻列表
export function fetchList(query) {
  return request({
    url: 'manage/newsList',
    method: 'get',
    params: query
  })
}

// 通用的更新新闻索引
export function updateNewsSindex(data) {
  return request({
    url: 'manage/updateNewsSindex',
    method: 'post',
    data: data
  })
}

// 根据新闻ID查询新闻详情
export function fetchNewsDetail(nid) {
  return request({
    url: 'manage/newsInfo',
    method: 'get',
    params: { nid }
  })
}

// 批量删除选中的新闻信息
export function deleteAllNews(data) {
  return request({
    url: 'manage/deleteAllNews',
    method: 'post',
    data
  })
}

// 新增Insights类型的新闻
export function createInsights(data) {
  return request({
    url: 'manage/createInsights',
    method: 'post',
    data
  })
}

// 修改Insights类型的新闻
export function updateInsights(data) {
  return request({
    url: 'manage/updateInsights',
    method: 'post',
    data
  })
}

// 新增Partner类型的新闻
export function createPartner(data) {
  return request({
    url: 'manage/createPartner',
    method: 'post',
    data
  })
}

// 修改Partner类型的新闻
export function updatePartner(data) {
  return request({
    url: 'manage/updatePartner',
    method: 'post',
    data
  })
}

// 新增Stories类型的新闻
export function createStories(data) {
  return request({
    url: 'manage/createStories',
    method: 'post',
    data
  })
}

// 修改Stories类型的新闻
export function updateStories(data) {
  return request({
    url: 'manage/updateStories',
    method: 'post',
    data
  })
}

// 新增Stories类型的新闻
export function createEvents(data) {
  return request({
    url: 'manage/createEvents',
    method: 'post',
    data
  })
}

// 修改Stories类型的新闻
export function updateEvents(data) {
  return request({
    url: 'manage/updateEvents',
    method: 'post',
    data
  })
}

// 新增Live类型的新闻
export function createLive(data) {
  return request({
    url: 'manage/createLive',
    method: 'post',
    data
  })
}

// 修改Live类型的新闻
export function updateLive(data) {
  return request({
    url: 'manage/updateLive',
    method: 'post',
    data
  })
}
