import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/stat',
        name: 'stat',
        component: () => import('@/views/stat/index.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('@/views/goods/index.vue')
      },
      {
        path: '/detail/summary',
        name: 'summary',
        component: () => import('@/views/summary/index.vue')
      },
      {
        path: '/detail/statistic',
        name: 'statictic',
        component: () => import('@/views/statistic/index.vue')
      },

      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*', // 捕获所有路由或 404 Not found 路由, 可在括号中加入自定义正则表达式
    component: () => import('@/views/error/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
