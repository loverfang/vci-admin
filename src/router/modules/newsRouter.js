/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const newsRouter = {
  path: '/news',
  name: 'News',
  redirect: '/news/insights',
  component: Layout,
  meta: { title: '新闻发布系统', icon: 'table' },
  children: [
    {
      path: 'insights',
      redirect: '/news/insights/list',
      name: 'Insights',
      component: () => import('@/views/news/index'),
      meta: { title: 'VCI Insights', icon: 'list' },
      children: [
        {
          path: 'create',
          component: () => import('@/views/news/insights/create'),
          name: 'CreateInsights',
          meta: { title: 'Create Insights', icon: 'example' },
          hidden: true
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/news/insights/edit'),
          name: 'EditInsights',
          meta: { title: 'Edit Insights', noCache: true },
          hidden: true
        },
        {
          path: 'imglist/:id(\\d+)',
          component: () => import('@/views/news/insights/imglist'),
          name: 'InsightsImgList',
          meta: { title: 'Insights 图片管理' },
          hidden: true
        },
        {
          path: 'pdflist/:id(\\d+)',
          component: () => import('@/views/news/insights/pdflist'),
          name: 'InsightsPdfList',
          meta: { title: 'Insights PDF文件管理' },
          hidden: true
        },
        {
          path: 'list',
          component: () => import('@/views/news/insights/index'),
          name: 'InsightsList',
          meta: { title: 'VCI Insights管理', icon: 'list' }
        }
      ]
    },
    {
      path: 'events',
      redirect: '/news/events/list',
      name: 'Events',
      component: () => import('@/views/news/index'),
      meta: { title: 'Events', icon: 'list' },
      children: [
        {
          path: 'create',
          component: () => import('@/views/news/events/create'),
          name: 'CreateEvents',
          meta: { title: 'Create Events', icon: 'example' },
          hidden: true
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/news/events/edit'),
          name: 'EditEvents',
          meta: { title: 'Edit Events' },
          hidden: true
        },
        {
          path: 'imglist/:id(\\d+)',
          component: () => import('@/views/news/events/imglist'),
          name: 'EventsImgList',
          meta: { title: 'Events 图片管理' },
          hidden: true
        },
        {
          path: 'pdflist/:id(\\d+)',
          component: () => import('@/views/news/events/pdflist'),
          name: 'EventsPdfList',
          meta: { title: 'Events PDF文件管理' },
          hidden: true
        },
        {
          path: 'adlist/:id(\\d+)',
          component: () => import('@/views/news/events/adlist'),
          name: 'EventsAList',
          meta: { title: 'Events 广告管理' },
          hidden: true
        },
        {
          path: 'list',
          component: () => import('@/views/news/events/index'),
          name: 'EventsList',
          meta: { title: 'VCI Events管理' }
        }
      ]
    },
    {
      path: 'partners',
      redirect: '/news/partners/list',
      name: 'Partners',
      component: () => import('@/views/news/index'),
      meta: { title: 'Partners', icon: 'list' },
      children: [
        {
          path: 'create',
          component: () => import('@/views/news/partners/create'),
          name: 'CreateStories',
          meta: { title: 'Create Stories', icon: 'example' },
          hidden: true
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/news/partners/edit'),
          name: 'EditStories',
          meta: { title: 'Edit Stories' },
          hidden: true
        },
        {
          path: 'imglist/:id(\\d+)',
          component: () => import('@/views/news/partners/imglist'),
          name: 'StoriesImgList',
          meta: { title: 'Stories 图片管理' },
          hidden: true
        },
        {
          path: 'pdflist/:id(\\d+)',
          component: () => import('@/views/news/partners/pdflist'),
          name: 'StoriesPdfList',
          meta: { title: 'Stories PDF文件管理' },
          hidden: true
        },
        {
          path: 'list',
          component: () => import('@/views/news/partners/index'),
          name: 'InsightsList',
          meta: { title: 'Partners管理' }
        }
      ]
    },
    {
      path: 'stories',
      redirect: '/news/stories/list',
      name: 'Stories',
      component: () => import('@/views/news/index'),
      meta: { title: 'Success Stories', icon: 'list' },
      children: [
        {
          path: 'create',
          component: () => import('@/views/news/stories/create'),
          name: 'CreateStories',
          meta: { title: 'Create Stories', icon: 'example' },
          hidden: true
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/news/stories/edit'),
          name: 'EditStories',
          meta: { title: 'Edit Stories' },
          hidden: true
        },
        {
          path: 'imglist/:id(\\d+)',
          component: () => import('@/views/news/stories/imglist'),
          name: 'StoriesImgList',
          meta: { title: 'Stories 图片管理' },
          hidden: true
        },
        {
          path: 'pdflist/:id(\\d+)',
          component: () => import('@/views/news/stories/pdflist'),
          name: 'StoriesPdfList',
          meta: { title: 'Stories PDF文件管理' },
          hidden: true
        },
        {
          path: 'list',
          component: () => import('@/views/news/stories/index'),
          name: 'InsightsList',
          meta: { title: 'Success Stories管理', icon: 'list' }
        }
      ]
    },
    {
      path: 'live',
      redirect: '/news/live/list',
      name: 'Live',
      component: () => import('@/views/news/index'),
      meta: { title: 'Live Broadcast', icon: 'list' },
      children: [
        {
          path: 'create',
          component: () => import('@/views/news/live/create'),
          name: 'CreateLive',
          meta: { title: 'Create Live', icon: 'example' },
          hidden: true
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/news/live/edit'),
          name: 'EditLive',
          meta: { title: 'Edit Live' },
          hidden: true
        },
        {
          path: 'imglist/:id(\\d+)',
          component: () => import('@/views/news/live/imglist'),
          name: 'LiveImgList',
          meta: { title: 'Live 图片管理' },
          hidden: true
        },
        {
          path: 'pdflist/:id(\\d+)',
          component: () => import('@/views/news/live/pdflist'),
          name: 'LivePdfList',
          meta: { title: 'Live PDF文件管理' },
          hidden: true
        },
        {
          path: 'adlist/:id(\\d+)',
          component: () => import('@/views/news/live/adlist'),
          name: 'LiveAList',
          meta: { title: 'Live 广告管理' },
          hidden: true
        },
        {
          path: 'list',
          component: () => import('@/views/news/live/index'),
          name: 'LiveBroadcast',
          meta: { title: 'Live Broadcast管理' }
        }
      ]
    }
  ]
}
export default newsRouter
