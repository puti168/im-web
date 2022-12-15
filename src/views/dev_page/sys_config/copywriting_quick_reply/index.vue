<template>
  <PageWrapper title="快捷回复" contentBackground contentClass="p-2">
    <BasicTable @register="registerTable" @edit-change="onEditChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button class="mr-1" type="warning" @click="send(record)">编辑</a-button>
          <PopConfirmButton type="danger" @confirm="deleteById(record.id)" title="确认删除？">删除</PopConfirmButton>
        </template>
      </template>
      <template #toolbar>
        <a-button type="success" @click="send({})">新增</a-button>
      </template>
    </BasicTable>
    <Modal4 @register="register4" @reloadTable="reload" />
  </PageWrapper>
</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import { BasicTable, useTable } from '/@/components/Table';
import { getPulbicMsgList , deletePulbicMsg } from '/@/api/dev_page/sys_config';
import { columns } from './data';
import { useModal } from '/@/components/Modal'
import Modal4 from './comp/Modal4.vue';
import { PopConfirmButton } from '/@/components/Button';
import { useMessage } from '/@/hooks/web/useMessage';

const [registerTable,{reload}] = useTable({
  api: getPulbicMsgList,
  searchInfo:{
    type:1
  },
  columns: columns,
  bordered: true,
  showTableSetting: true,
  // showIndexColumn: false,
  actionColumn: {
    width: 220,
    title: '操作',
    dataIndex: 'action',
    // slots: { customRender: 'action' },
  },
});
const [register4, { openModal: openModal4 }] = useModal();


function send(record: any) {
  openModal4(true, record);
}


let { createMessage } = useMessage()
async function deleteById(id) {
  await deletePulbicMsg([id])
  createMessage.success('删除成功' + id)
  reload();
}
function onEditChange({ column, value, record }) {
  // 本例
  if (column.dataIndex === 'id') {
    record.editValueRefs.name4.value = `${value}`;
  }
  console.log(column, value, record);
}


</script>
