<template>
    <PageWrapper
      title="客服配置"
      contentBackground
      contentClass="p-4"
    >
      <BasicTable @register="registerTable" @edit-change="onEditChange">
        <template #bodyCell="{ column, record}">
          <template v-if="column.key === 'action'">
            <a-button color="warning" @click="send(record)">编辑</a-button>
          </template>
        </template>
      </BasicTable>
      <Modal4 @register = "register4" />
  </PageWrapper>
</template>
<script lang="ts" setup>
import { BasicTable, useTable } from '/@/components/Table';
import { columns } from './data';
import { PageWrapper } from '/@/components/Page';
import { useModal } from '/@/components/Modal'
import Modal4 from './comp/Modal4.vue';
import { getUserConfig } from '/@/api/dev_page/sys_config'
const [registerTable] = useTable({
  columns: columns,
  bordered: true,
  api:getUserConfig,
  searchInfo:{
    distributorId:123,
  },
  showTableSetting: true,
  // showIndexColumn: false,
  actionColumn: {
    width: 160,
    title: 'Action',
    dataIndex: 'action',
    // slots: { customRender: 'action' },
  },
});
const [register4, { openModal: openModal4 }] = useModal();



function send(record: any) {
  openModal4(true, record);
}


function onEditChange({ column, value, record }) {
  // 本例
  if (column.dataIndex === 'id') {
    record.editValueRefs.name4.value = `${value}`;
  }
  console.log(column, value, record);
}


</script>
