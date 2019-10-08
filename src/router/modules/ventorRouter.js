import Layout from '@/layout'

const ventorRouter = {
  path: '/supplier',
  name: 'Supplier',
  redirect: '/supplier/vendor/list',
  component: Layout,
  meta: { title: '供应商管理系统', icon: 'example' },
  children: [
    {
      path: 'category',
      name: 'Category',
      component: () => import('@/views/category/index'),
      meta: { title: 'Category', icon: 'example' }
    },
    {
      path: 'vendor',
      // redirect: '/supplier/vendor/list',
      name: 'Vendor',
      component: () => import('@/views/vendor/index'),
      children: [
        {
          path: 'create',
          component: () => import('@/views/vendor/create'),
          name: 'CreateInsights',
          meta: { title: '添加 Vendor', icon: 'example' },
          hidden: true
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/vendor/edit'),
          name: 'EditInsights',
          meta: { title: '编辑 Vendor', noCache: true },
          hidden: true
        },
        {
          path: 'pdflist/:id(\\d+)',
          component: () => import('@/views/vendor/pdflist'),
          name: 'InsightsPdfList',
          meta: { title: 'Vendor Pdf数据列表' },
          hidden: true
        },
        {
          path: 'list',
          component: () => import('@/views/vendor/list'),
          name: 'VendorList',
          meta: { title: 'Vendor数据列表', icon: 'example'}
        }
      ]
    }
  ]
}

export default ventorRouter
