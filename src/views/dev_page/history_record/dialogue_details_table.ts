import { BasicColumn, FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';
export const columns: BasicColumn[] = [
  {
    title: '时间',
    dataIndex: 'createTime',
    customRender: ({text}) => {
      return text ? dayjs(Number(text)).format('YYYY-MM-DD HH:mm:ss') : '-'
    },
    width: 120,
  },
  {
    title: '类型',
    dataIndex: 'msgType',
    width: 80,
    align: 'center',
    // slots: { customRender: 'category' },
  },
  {
    title: '用户昵称',
    dataIndex: 'userNickName',
    width: 120,
    customRender: (opts) => {
      return opts.record.sendType === 2 ? '' : opts.record.userNickName;
    },
  },
  {
    title: '客服昵称',
    dataIndex: 'csNickName',
    width: 120,
    customRender: (opts) => {
      return opts.record.sendType === 1 ? '' : opts.record.csNickName;
    },
  },
  {
    title: '内容',
    dataIndex: 'content',
    helpMessage: ['图片列表', '只会显示一张在表格中', '但点击可预览多张图片'],
    width: 200,
    // slots: { customRender: 'img' },
  },
  {
    title: '是否系统消息',
    dataIndex: 'isSys',
    width: 120,
    defaultHidden: true,
    // slots: { customRender: 'id' },
  },
  // 结束对话消息提示：
  // 1.用户结束对话；
  // 2.客服结束对话；
  // 3.等待时间过长，系统结束对话；
];

export const columnsAll: BasicColumn[] = [
  {
    title: '单号',
    dataIndex: 'id',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    align: 'center',
    // slots: { customRender: 'category' },
  },
  {
    title: '用户信息',
    dataIndex: 'userNickName',
    width: 120,
  },
  {
    title: '发起时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '接入客服',
    dataIndex: 'csNickName',
    width: 200,
    // slots: { customRender: 'img' },
  },
  {
    title: '接入时间',
    dataIndex: 'updateTime',
    width: 200,
    // slots: { customRender: 'id' },
  },
  {
    title: '聊天条数',
    dataIndex: 'msgNum',
    width: 120,
    // slots: { customRender: 'id' },
  },
  // 结束对话消息提示：
  // 1.用户结束对话；
  // 2.客服结束对话；
  // 3.等待时间过长，系统结束对话；
];


export const searchFormSchema: FormSchema[] = [
  // todo: 补充上时间过滤条件
  {
    field: 'time',
    label: '时间',
    component: 'RadioButtonDate',
    defaultValue: [dayjs().startOf('days').format('YYYY-MM-DD HH:mm:ss'), dayjs().endOf('days').format('YYYY-MM-DD HH:mm:ss')],    
    colProps: { span: 24 },
  },
  {
    field: 'orderNo',
    label: '单号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'name',
    label: '接入客服',
    component: 'Input',
    colProps: { span: 8 },
  },
];