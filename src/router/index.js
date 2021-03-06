import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import newsRouter from './modules/newsRouter'
import ventorRouter from './modules/ventorRouter'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '控制台',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'dashboard' }
    }]
  },
  {
    path: '/banner',
    component: Layout,
    children: [
      {
        path: 'banner',
        name: 'Banner',
        component: () => import('@/views/banner/index'),
        meta: { title: '首页Banner', icon: 'link' }
      }
    ]
  },
  {
    path: '/single',
    component: Layout,
    name: 'Single',
    meta: { title: '单页发布系统', icon: 'form' },
    children: [
      {
        path: 'aboutus',
        name: 'Aboutus',
        component: () => import('@/views/signpage/index'),
        meta: { title: 'About Us', icon: 'form' },
        props: {
          signType: 'aboutus'
        }
      },
      {
        path: 'services',
        name: 'Services',
        component: () => import('@/views/signpage/index'),
        meta: { title: 'Our Services', icon: 'form' },
        props: {
          signType: 'ourservices'
        }
      },
      {
        path: 'clients',
        name: 'Clients',
        component: () => import('@/views/signpage/index'),
        meta: { title: 'Our Clients', icon: 'form' },
        props: {
          signType: 'ourcilents'
        }
      },
      {
        path: 'marketing',
        name: 'Marketing',
        component: () => import('@/views/signpage/index'),
        meta: { title: 'Marketing With Us', icon: 'form' },
        props: {
          signType: 'marketingwithus'
        }
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/views/signpage/index'),
        meta: { title: 'Contact Us', icon: 'form' },
        props: {
          signType: 'contactus'
        }
      }
    ]
  },
  newsRouter, // 新闻中心路由
  ventorRouter, // 供应商管理路由
  {
    path: '/members',
    component: Layout,
    meta: { title: '会员信息系统', icon: 'user' },
    children: [

      {
        path: 'tfctype',
        name: 'tfctype',
        component: () => import('@/views/tfctype/index'),
        meta: { title: 'TFC类型', icon: 'eye-open' }
      },
      {
        path: 'tfcvideos',
        name: 'tfcvideos',
        component: () => import('@/views/tfcvideos/index'),
        meta: { title: 'TFC/橙色供应链行动', icon: 'eye-open' }
      },
      {
        path: 'videos',
        name: 'Videos',
        component: () => import('@/views/videos/index'),
        meta: { title: '视频/MemberShip', icon: 'eye-open' }
      },
      {
        path: 'members',
        name: 'Members',
        component: () => import('@/views/member/list'),
        meta: { title: '会员信息', icon: 'user' }
      }
    ]
  },
  {
    path: '/filesys',
    component: Layout,
    children: [
      {
        path: 'filelist',
        name: 'Filelist',
        component: () => import('@/views/vcifiles/index'),
        meta: { title: '文件管理系统', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/example/table',
    name: '系统设置',
    meta: { title: '系统设置', icon: 'setting' },
    children: [
      // {
      //   path: 'adminlist',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: '后台账号管理', icon: 'tree' }
      // },
      {
        path: 'password',
        name: 'Password',
        component: () => import('@/views/system/password'),
        meta: { title: '修改密码', icon: 'setting' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
