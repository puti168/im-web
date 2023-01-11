import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const historyRoute: AppRouteModule = {
  path: '/history_record',
  name: 'history_record',
  component: LAYOUT,
  redirect: '/history_record/dialogue_details',
  meta: {
    title: '历史记录',
    icon: 'bx:bx-home',
  },
  children: [
    {
      path: 'dialogue_details',
      name: 'dialogue_details',
      component: () => import('/@/views/dev_page/history_record/dialogue_details.vue'),
      meta: {
        title: '对话详细',
      },
    },
  ],
};

export default historyRoute;
