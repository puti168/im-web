import {
  BasicColumn,
  FormSchema,
} from '/@/components/Table';


 
 export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'name',
    width: 120,
  },{
    title: '昵称',
    dataIndex: 'time',
    width: 120,
  },{
    title: '状态',
    dataIndex: 'name5',
    width: 50,
  },{
    title: '所属组别',
    dataIndex: 'name7',
    width: 120,
  },{
    title: '所属组别',
    dataIndex: 'name7',
    width: 100,
  },{
    title: '最后登录时间',
    dataIndex: 'name7',
    width: 150,
  },{
    title: '最后登录IP',
    dataIndex: 'name7',
    width: 120,
  },{
    title: '备注',
    dataIndex: 'name7',
    width: 120,
  }
];

export const schemas: FormSchema[] = [
  {
    field: 'name1',
    component: 'Input',
    defaultValue:'',
    rules: [{ required: true }],
    label: '登录账号',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'name1',
    component: 'Input',
    componentProps:{
      type:'password'
    },
    defaultValue:'',
    rules: [{ required: true }],
    label: '登录密码',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'name1',
    component: 'Input',
    componentProps:{
      type:'password'
    },
    defaultValue:'',
    rules: [{ required: true }],
    label: '确认密码',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'name1',
    component: 'Select',
    componentProps:{
      options:[ {
        label: '组别1',
        value: "0",
        key: 'VIP0',
      },
      {
        label: '组别2',
        value: "1",
        key: 'VIP1',
      },]
    },
    defaultValue:'',
    rules: [{ required: true }],
    label: '所属组别',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'name1',
    component: 'Select',
    componentProps:{
      options:[ {
        label: '中文',
        value: "0",
        key: 'VIP0',
      },
      {
        label: '英语',
        value: "1",
        key: 'VIP1',
      },]
    },
    defaultValue:'',
    rules: [{ required: true }],
    label: '使用语言',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'name1',
    component: 'Input',
    componentProps:{
    },
    defaultValue:'',
    rules: [{ required: true }],
    label: '昵称',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'name2',
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
    field: 'name3',
    component: 'InputTextArea',
    defaultValue:'',
    rules: [{ required: true }],
    label: '备注',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'id',
    component: 'Input',
    show:false,
    defaultValue:'',
    rules: [{ required: true }],
    label: '备注',
    colProps: {
      span: 24,
    },
  },
];