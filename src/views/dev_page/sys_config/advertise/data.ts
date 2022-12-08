import {
  BasicColumn,
  FormSchema,
} from '/@/components/Table';

 
 export const columns: BasicColumn[] = [
  {
    title: '项目名',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '添加时间',
    dataIndex: 'name7',
    width: 150,
  },
  {
    title: '操作人',
    dataIndex: 'name2',
    width: 150,
  }
];

 
 export const dataSource = [
    {
      name: '顶部banner',
      name7:'2021-11-11',
      name2:'你好',
      type:1,
    },
    {
      name: '循环文案',
      name7:'2021-11-11',
      name2:'你好',
      type:2,
    },
    {
      name: '开场文案',
      name7:'2021-11-11',
      name2:'你好',
      type:3,
    },
  ];

export const schemas: FormSchema[] = [
  {
    field: 'name1',
    component: 'InputTextArea',
    defaultValue:'',
    rules: [{ required: true }],
    label: '内容',
    show:true,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'name2',
    component: 'InputTextArea',
    defaultValue:'',
    // rules: [{ required: true }],
    label: '内容',
    show:false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'name3',
    component: 'InputTextArea',
    defaultValue:'',
    // rules: [{ required: true }],
    label: '内容',
    show:false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'name4',
    component: 'InputTextArea',
    defaultValue:'',
    // rules: [{ required: true }],
    label: '内容',
    show:false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'name5',
    component: 'InputTextArea',
    defaultValue:'',
    show:false,
    // rules: [{ required: true }],
    label: '内容',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'id',
    component: 'Input',
    defaultValue:'',
    show:false,
    // rules: [{ required: true }],
    label: 'ID',
    colProps: {
      span: 24,
    },
  },
];


import { uploadApi } from '/@/api/sys/upload';
export const schemasUpload: FormSchema[] = [
  {
    field: 'field1',
    component: 'Upload',
    label: '',
    colProps: {
      span: 8,
    },
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: {
      api: uploadApi,
      multiple:true,
      value:[
        'https://4k.wpcoder.cn/wp-content/uploads/2022/07/1_1658113094-1600x743.png',
      ],
      maxSize:3,
      accept:['image/*'],
    },
  },
];