import {
  BasicColumn,
  FormSchema,
} from '/@/components/Table';



export const columns: BasicColumn[] = [
  {
    title: '组别名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    
  },
  {
    title: '成员数',
    dataIndex: 'memberNum',
    width: 150,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 150,
  }
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
    field: 'status',
    component: 'RadioGroup',
    rules: [{ required: true }],
    label: '状态',
    componentProps: {
      options: [
        {
          label: '启用',
          value: "0",
          key: 'VIP0',
        },
        {
          label: '禁用',
          value: "1",
          key: 'VIP1',
        },
      ],
    },
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
];
