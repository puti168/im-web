import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '组别名称',
    dataIndex: 'name',
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
];
