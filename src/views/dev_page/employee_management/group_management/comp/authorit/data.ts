import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '组别名称',
    dataIndex: 'name',
    width: 150,
  },

  {
    title: '权限',
    dataIndex: 'menuList',
    width: 150,
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    defaultValue: '',

    rules: [{ required: true }],
    label: '组别名称',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'menuList',
    component: 'ApiTreeSelect',
    rules: [{ required: true }],
    label: '权限',
    componentProps: {
      options: [],
      labelField: 'menuName',
      valueField: 'id',
    },
    colProps: {
      span: 24,
    },
  },
];
