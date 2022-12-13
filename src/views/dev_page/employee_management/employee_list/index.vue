<template>
  <PageWrapper title="员工列表" contentBackground contentClass="p-2">
    <BasicTable @register="registerTable" @edit-change="onEditChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button class="mr-1" type="warning" @click="send(record)">编辑</a-button>
          <PopConfirmButton type="danger" @confirm="deleteById(record.id)" title="确认删除？">删除</PopConfirmButton>
          <a-button class="ml-1">权限</a-button>
        </template>
      </template>
      <template #toolbar>
        <a-button type="success" @click="send({})">新增</a-button>
      </template>
    </BasicTable>
    <Modal4 @register="register4" />
  </PageWrapper>
</template>
<script lang="ts" setup>
import { BasicTable, useTable } from '/@/components/Table';
import { getUserPageList,deleteUSER } from '/@/api/dev_page/employee_management';
import { columns } from './data';
import { PopConfirmButton } from '/@/components/Button';
import { PageWrapper } from '/@/components/Page';
import { useModal } from '/@/components/Modal'
import Modal4 from './comp/Modal4.vue';
import { useMessage } from '/@/hooks/web/useMessage';
let { createMessage } = useMessage()
const [registerTable] = useTable({
  api: getUserPageList,
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

function deleteById(id) {
  deleteUSER([id]).then(()=>{
    createMessage.success('删除成功' + id)
  }).catch(e => {
    console.error(e);
    createMessage.success('删除失败' + id)
  })
}
function onEditChange({ column, value, record }) {
  // 本例
  if (column.dataIndex === 'id') {
    record.editValueRefs.name4.value = `${value}`;
  }
  console.log(column, value, record);
}


</script>
