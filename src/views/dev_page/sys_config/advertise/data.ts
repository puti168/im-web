import { BasicColumn, FormSchema } from '/@/components/Table';
import { formateTime } from '/@/utils/date-formate';

export const columns: BasicColumn[] = [
  {
    title: '项目名',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '添加时间',
    dataIndex: 'addtime',
    width: 150,
    customRender: ({ record }) => {
      return formateTime(record.addtime);
    },
  },
  {
    title: '操作人',
    dataIndex: 'creator',
    width: 150,
  },
];

export const dataSource = [
  {
    name: '顶部banner',
    id: 0,
  },
  {
    name: '循环文案',
    id: 1,
  },
  {
    name: '开场文案',
    id: 2,
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'remark1',
    component: 'InputTextArea',
    defaultValue: '',
    rules: [{ required: true }],
    label: '内容',
    show: true,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'remark2',
    component: 'InputTextArea',
    defaultValue: '',
    // rules: [{ required: true }],
    label: '内容',
    show: false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'remark3',
    component: 'InputTextArea',
    defaultValue: '',
    // rules: [{ required: true }],
    label: '内容',
    show: false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'remark4',
    component: 'InputTextArea',
    defaultValue: '',
    // rules: [{ required: true }],
    label: '内容',
    show: false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'remark5',
    component: 'InputTextArea',
    defaultValue: '',
    show: false,
    // rules: [{ required: true }],
    label: '内容',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'id',
    component: 'Input',
    defaultValue: '',
    show: false,
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
      multiple: true,
      value: ['https://4k.wpcoder.cn/wp-content/uploads/2022/07/1_1658113094-1600x743.png'],
      maxSize: 3,
      accept: ['image/*'],
    },
  },
];
