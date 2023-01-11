import { formateTime } from '/@/utils/date-formate';
import { getGroupPageList } from '/@/api/dev_page/employee_management';
import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '项目名',
    dataIndex: 'desc',
    width: 150,
  },
  {
    title: '添加时间',
    width: 100,
    customRender: ({ record }) => formateTime(record.opTime),
  },
  {
    title: '操作人',
    dataIndex: 'operName',
    width: 150,
  },
];

export const detailColumns: BasicColumn[] = [
  {
    title: '配置名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '适用组别',
    width: 150,
    customRender: ({ record }) => {
      return (record.groupInfos || '').reduce((str, curItem) => {
        str += str ? `、${curItem.name}` : curItem.name;
        return str;
      }, '');
    },
  },
  {
    title: '限制人数',
    dataIndex: 'paramVal',
    width: 150,
  },
  {
    title: '操作时间',
    width: 150,
    customRender: ({ record }) => formateTime(record.opTime),
  },
  {
    title: '操作人',
    dataIndex: 'operName',
    width: 150,
  },
];

export const formModalSchemas: FormSchema[] = [
  {
    field: 'ruleName',
    component: 'Input',
    defaultValue: '',
    label: '配置名称',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'groupIds',
    component: 'Select',
    label: '所属组别',
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value || value.length === 0) {
            /* eslint-disable-next-line */
            return Promise.reject('请选择组别');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
    componentProps: {
      options: [],
      mode: 'multiple',
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'value',
    component: 'InputNumber',
    defaultValue: '',
    label: '限制人数',
    required: true,
    colProps: {
      span: 24,
    },
  },
];
