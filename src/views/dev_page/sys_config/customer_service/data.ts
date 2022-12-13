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
    title: '修改时间',
    dataIndex: 'updateTime',
    width: 100,
  },
  {
    title: '操作人',
    dataIndex: 'updateUser',
    width: 150,
  }
];

export const schemas: FormSchema[] = [
  {
    field: 'handleLimit',
    component: 'Input',
    componentProps:{
      type:'number'
    },
    rules: [{ required: true }],
    label: '客服接待最多人数',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'levelNum',
    component: 'Select',
    rules: [{ required: true }],
    label: '优先匹配等级',
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