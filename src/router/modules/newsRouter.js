/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const newsRouter = {
  path: '/news',
  name: 'News',
  redirect: '/news/insights',
  component: Layout,
  meta: { title: '新闻发布系统', icon: 'example' },
  children: [
    {
      path: 'insights',
      redirect: '/news/insights/list',
      name: 'Insights',
      component: () => import('@/views/news/index'),
      meta: { title: 'VCI Insights', icon: 'example' },
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
          path: 'list',
          component: () => import('@/views/news/insights/index'),
          name: 'InsightsList',
          meta: { title: 'Insights 数据列表', icon: 'example', activeMenu: '/news/insights' }
        }
      ]
    }
    // ,
    // {
    //   path: 'events',
    //   redirect: '/news/events/list',
    //   name: 'Events',
    //   component: () => import('@/views/news/index'),
    //   meta: { title: 'VCI events', icon: 'example' },
    //   children: [
    //     {
    //       path: 'create',
    //       component: () => import('@/views/news/events/create'),
    //       name: 'CreateEvents',
    //       meta: { title: 'Create Events', icon: 'add' },
    //       hidden: true
    //     },
    //     {
    //       path: 'edit/:id(\\d+)',
    //       component: () => import('@/views/news/events/edit'),
    //       name: 'EditEvents',
    //       meta: { title: 'Edit Events', noCache: true, activeMenu: '/example/list' },
    //       hidden: true
    //     },
    //     {
    //       path: 'list',
    //       component: () => import('@/views/news/events/index'),
    //       name: 'EventsList',
    //       meta: { title: 'VCI Events', icon: 'list' }
    //     }
    //   ]
    // },
    // {
    //   path: 'partners',
    //   redirect: '/news/partners/list',
    //   name: 'Partners',
    //   component: () => import('@/views/news/index'),
    //   meta: { title: 'Partners', icon: 'example' },
    //   children: [
    //     {
    //       path: 'create',
    //       component: () => import('@/views/news/partners/create'),
    //       name: 'CreatePartners',
    //       meta: { title: 'Create Insights', icon: 'edit' },
    //       hidden: true
    //     },
    //     {
    //       path: 'edit/:id(\\d+)',
    //       component: () => import('@/views/news/partners/edit'),
    //       name: 'EditPartners',
    //       meta: { title: 'Edit Partners', noCache: true, activeMenu: '/example/list' },
    //       hidden: true
    //     },
    //     {
    //       path: 'list',
    //       component: () => import('@/views/news/partners/index'),
    //       name: 'PartnersList',
    //       meta: { title: 'VCI Partners', icon: 'list' }
    //     }
    //   ]
    // },
    // {
    //   path: 'stories',
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
    //       meta: { title: 'Success Stories', icon: 'list' }
    //     }
    //   ]
    // }
  ]
}
export default newsRouter
