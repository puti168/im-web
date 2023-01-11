import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'code',
    width: 150,
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    width: 150,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 150,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 150,
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'ip',
    component: 'Input',
    defaultValue: '',
    rules: [{ required: true }],
    label: 'IP',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    defaultValue: '',
    rules: [{ required: true }],
    label: '备注',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'type',
    component: 'Select',
    defaultValue: '0',
    rules: [{ required: true }],
    componentProps: {
      options: [
        {
          label: '白名单',
          value: '0',
        },
        // {
        //   label: '黑名单',
        //   value: '1',
        // },
      ],
    },
    label: '类型',
    colProps: {
      span: 24,
    },
  },
];
