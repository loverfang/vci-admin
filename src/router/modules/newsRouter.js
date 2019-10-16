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
      meta: { title: 'Partners', icon: 'list' },
      children: [
        {
          path: 'create',
          component: () => import('@/views/news/events/create'),
          name: 'CreateStories',
          meta: { title: 'Create Stories', icon: 'example' },
          hidden: true
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/news/events/edit'),
          name: 'EditStories',
          meta: { title: 'Edit Stories' },
          hidden: true
        },
        {
          path: 'imglist/:id(\\d+)',
          component: () => import('@/views/news/events/imglist'),
          name: 'StoriesImgList',
          meta: { title: 'Stories 图片管理' },
          hidden: true
        },
        {
          path: 'pdflist/:id(\\d+)',
          component: () => import('@/views/news/events/pdflist'),
          name: 'StoriesPdfList',
          meta: { title: 'Stories PDF文件管理' },
          hidden: true
        },
        {
          path: 'list',
          component: () => import('@/views/news/events/index'),
          name: 'InsightsList',
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
          meta: { title: 'Partners管理'}
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
    }
    // {
    //   path: '',
    //   redirect: '/news/stories/list',
    //   name: 'Stories',
    //   component: () => import('@/views/news/index'),
    //   meta: { title: 'VCI Stories', icon: 'example' },
    //   children: [
    //     {
    //       path: 'create',
    //       component: () => import('@/views/news/stories/create'),
    //       name: 'CreateStories',
    //       meta: { title: 'Create Stories', icon: 'edit' },
    //       hidden: true
    //     },
    //     {
    //       path: 'edit/:id(\\d+)',
    //       component: () => import('@/views/news/stories/edit'),
    //       name: 'EditStories',
    //       meta: { title: 'Edit Stories', noCache: true },
    //       hidden: true
    //     },
    //     {
    //       path: 'list',
    //       component: () => import('@/views/news/stories/index'),
    //       name: 'StoriesList',
    //       meta: { title: '', icon: 'list' }
    //     }
    //   ]
    // }
  ]
}
export default newsRouter
