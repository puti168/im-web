import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const SysConfigRoute: AppRouteModule = {
    path: '/sys_config',
    name: 'sys_config',
    component: LAYOUT,
    redirect: '/sys_config/customer_service',
    meta: {
      title: '系统配置',
      icon: 'bx:bx-home',
    },
    children: [
      {
        path: 'customer_service',
        name: 'customer_service',
        component: () => import('/@/views/dev_page/sys_config/customer_service/index.vue'),
        meta: {
          title: '客服配置',
        },
      },
      {
        path: 'advertise',
        name: 'advertise',
        component: () => import('/@/views/dev_page/sys_config/advertise/index.vue'),
        meta: {
          title: '广告设置',
        },
      },
      {
        path: 'copywriting_quick_question',
        name: 'copywriting_quick_question',
        component: () => import('/@/views/dev_page/sys_config/copywriting_quick_question/index.vue'),
        meta: {
          title: '文案设置-快捷提问',
        },
      },
      {
        path: 'copywriting_quick_reply',
        name: 'copywriting_quick_reply',
        component: () => import('/@/views/dev_page/sys_config/copywriting_quick_reply/index.vue'),
        meta: {
          title: '文案设置-快捷回复',
        },
      },
    ],
  };

export default SysConfigRoute;
