import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Layout from '@/layout'
import store from '@/store'

Vue.use(VueRouter)

NProgress.configure({ showSpinner: false })

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  try {
    return originalPush.call(this, location).catch(err => err)
  } catch (error) {
    console.log(error)
  }
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  try {
    return originalReplace.call(this, location).catch(err => err)
  } catch (error) {
    console.log(error)
  }
}

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
    meta: {
      notCertified: true
    },
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/error-page"),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        meta: {
          title: 'Page Permission',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        meta: {
          title: 'Directive Permission'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: "/nested",
    component: Layout,
    redirect: '/nested/menu1',
    meta: {
      title: 'Nested Routes',
      icon: 'nested'
    },
    children: [
      {
        path: "menu1",
        component: () => import('@/views/nested/menu1'),
        redirect: 'menu1/menu1-1',
        meta: { title: 'Menu 1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1-1'),
            meta: { title: 'Menu 1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1-2'),
            meta: { title: 'Menu 1-2' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2'),
        meta: { title: 'Menu 2' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.getters.token


  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const role = store.getters.info.role
      if (role) {
        next()
      } else {
        store.dispatch('user/getInfo').then(
          info => {
            store.dispatch('permission/generateRoutes', info.role)
              .then(accessRoutes => {
                accessRoutes.forEach(item => {
                  router.addRoute(item)
                })
                next({ ...to, replace: true })
              })
          }
        )
      }
    }
  } else {
    if (to.meta.notCertified) {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }

})

router.afterEach(() => {
  NProgress.done()
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
