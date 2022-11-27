import {
  BasicColumn,
  FormSchema,
} from '/@/components/Table';


 
 export const columns: BasicColumn[] = [
  {
    title: 'IP',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '备注',
    dataIndex: 'name7',
    width: 150,
  }
];

export const schemas: FormSchema[] = [
  {
    field: 'IP',
    component: 'Input',
    defaultValue:'',
    rules: [{ required: true }],
    label: 'IP',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'name3',
    component: 'InputTextArea',
    defaultValue:'',
    // rules: [{ required: true }],
    label: '备注',
    colProps: {
      span: 24,
    },
  },
];