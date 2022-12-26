import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    // defaultHidden: true,
    // slots: { customRender: 'id' },
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    width: 120,
  },
  {
    title: '类型',
    dataIndex: 'category',
    width: 80,
    align: 'center',
    // slots: { customRender: 'category' },
  },
  {
    title: '用户',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '客服',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '内容',
    dataIndex: 'imgArr',
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
