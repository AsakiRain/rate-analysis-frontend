import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import pinia from '@/store';
import useGlobalStore from '@/store/global';
import { ElMessage } from 'element-plus';

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
        path: '/good',
        name: 'good',
        component: () => import('@/views/good/index.vue'),
        children: [
          {
            path: '/good',
            name: 'board',
            component: () => import('@/views/good/components/Board.vue')
          },
          {
            path: '/good/detail',
            name: 'detail',
            component: () => import('@/views/good/components/Detail.vue'),
            children: [
              {
                path: '/good/detail/list',
                name: 'list',
                component: () => import('@/views/good/components/List.vue')
              },
              {
                path: '/good/detail/cloud',
                name: 'cloud',
                component: () => import('@/views/good/components/Cloud.vue')
              },
              {
                path: '/good/detail/emo',
                name: 'emo',
                component: () => import('@/views/good/components/Emo.vue')
              }
            ]
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
