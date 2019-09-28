/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const newsRouter = {
  path: '/news',
  component: Layout,
  name: 'News',
  meta: { title: '新闻发布系统', icon: 'news' },
  redirect: '/news/insights',
  children: [
    {
      path: 'insights',
      component: () => import('@/views/news/insights'), // Parent router-view
      name: 'Insights',
      meta: { title: 'Insights' },
      redirect: '/news/insights/list',
      children: [
        {
          path: 'list',
          component: () => import('@/views/news/insights'),
          name: 'List',
          meta: { title: 'List' }
        },
        {
          path: 'ncreate',
          component: () => import('@/views/news/insights/addInsights'),
          name: 'Create',
          meta: { title: 'Create' }
        },
        {
          path: 'nedit/:id(\\d+)',
          component: () => import('@/views/news/insights/editInsights'),
          name: 'Edit',
          meta: { title: 'Edit' }
        }
      ]
    }
    // ,
    // {
    //   path: 'events',
    //   name: 'Menu2',
    //   component: () => import('@/views/nested/menu2/index'),
    //   meta: { title: 'menu2' }
    // }
  ]
}

export default newsRouter
