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
    dataIndex: 'time',
    width: 100,
  },
  {
    title: '操作人',
    dataIndex: 'name7',
    width: 150,
  }
];

export const schemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    componentProps:{
      type:'number'
    },
    defaultValue:'',
    rules: [{ required: true }],
    label: '优先匹配等级',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'field2',
    component: 'Select',
    rules: [{ required: true }],
    label: '单人上限',
    componentProps: {
      class:'start-create-1',
      options: [
        {
          label: 'VIP0',
          value: "0",
          key: 'VIP0',
        },
        {
          label: 'VIP1',
          value: "1",
          key: 'VIP1',
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
];