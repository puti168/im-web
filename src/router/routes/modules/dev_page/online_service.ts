import type { AppRouteModule } from '/@/router/types';

const online_service: AppRouteModule = {
    path: '/online_service',
    name: 'online_service',
    component: 'LAYOUT',
    redirect: '/online_service/index',
    meta: {
      orderNo: 0,
      icon: 'bx:bx-home',
      title: '在线客服',
    },
    children: [
      {
        path: 'index',
        name: 'online_service-index',
        component: () => import('/@/views/dev_page/online_service/index.vue'),
        meta: {
          title: '在线客服',
        },
      },
    ],
  };

export default online_service;
