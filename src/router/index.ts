import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import pinia from '@/store';
import useGlobalStore from '@/store/global';

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
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/detail/index.vue'),
        children: [
          {
            path: '/detail/list',
            name: 'list',
            component: () => import('@/views/detail/components/List.vue')
          },
          {
            path: '/detail/cloud',
            name: 'cloud',
            component: () => import('@/views/detail/components/Cloud.vue')
          },
          {
            path: '/detail/emo',
            name: 'emo',
            component: () => import('@/views/detail/components/Emo.vue')
          }
        ]
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

const global = useGlobalStore(pinia);

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
