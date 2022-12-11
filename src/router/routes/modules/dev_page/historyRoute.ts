import { RoleEnum } from '/@/enums/roleEnum';
import type { AppRouteModule } from '/@/router/types';

const historyRoute: AppRouteModule = {
  path: '/history_record',
  name: 'history_record',
  component: 'LAYOUT',
  redirect: '/history_record/dialogue_details',
  meta: {
    title: '历史记录',
    icon: 'bx:bx-home',
    roles:[RoleEnum.TEST]
  },
  children: [
    {
      path: 'dialogue_details',
      name: 'dialogue_details',
      component: '/@/views/dev_page/history_record/dialogue_details',
      meta: {
        title: '对话详细',
      },
    },
  ],
};

export default historyRoute;
