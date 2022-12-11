import { RoleEnum } from '/@/enums/roleEnum';
import type { AppRouteModule } from '/@/router/types';

const EmployeeManagement: AppRouteModule = {
    path: '/employee_management',
    name: 'employee_management',
    component: 'LAYOUT',
    redirect: 'LAYOUT',
    meta: {
      title: '员工管理',
      icon: 'bx:bx-home',
      roles: [RoleEnum.TEST]
    },
    children: [
      {
        path: 'group_management',
        name: 'group_management',
        component: () => import('/@/views/dev_page/employee_management/group_management/index.vue'),
        meta: {
          title: '组别管理',
        },
      },
      {
        path: 'employee_list',
        name: 'employee_list',
        component: () => import('/@/views/dev_page/employee_management/employee_list/index.vue'),
        meta: {
          title: '员工列表',
        },
      },
      {
        path: 'ip_whitelist',
        name: 'ip_whitelist',
        component: () => import('/@/views/dev_page/employee_management/ip_whitelist/index.vue'),
        meta: {
          title: 'IP白名单',
        },
      },
    ],
  };

export default EmployeeManagement;
