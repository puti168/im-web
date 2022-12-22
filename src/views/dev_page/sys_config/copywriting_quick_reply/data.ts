import {
  BasicColumn,
  FormSchema,
} from '/@/components/Table';


 
 export const columns: BasicColumn[] = [
  {
    title: '内容',
    dataIndex: 'title',
    width: 150,
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
    width: 150,
  },
  {
    title: '操作人',
    dataIndex: 'createUser',
    width: 150,
  }
];

export const schemas: FormSchema[] = [
  {
    field: 'remark1',
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
    field: 'remark2',
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
    field: 'remark3',
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
    field: 'remark4',
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
    field: 'remark5',
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
  {
    field: 'type',
    component: 'Input',
    defaultValue:'1',
    show:false,
    // rules: [{ required: true }],
    label: 'ID',
    colProps: {
      span: 24,
    },
  },
];