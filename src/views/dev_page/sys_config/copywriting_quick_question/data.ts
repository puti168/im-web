import {
  BasicColumn,
  FormSchema,
} from '/@/components/Table';


 
 export const columns: BasicColumn[] = [
  {
    title: '内容',
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