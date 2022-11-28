<template>
  <PageWrapper title="快捷提问" contentBackground contentClass="p-2">
    <BasicTable @register="registerTable" @edit-change="onEditChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button class="mr-1" v-if="record.type != 1" type="warning" @click="send(record)">编辑</a-button>
          <a-button class="mr-1" v-else type="warning" @click="sendUpload(record)">编辑</a-button>
        </template>
      </template>
    </BasicTable>
    <Modal4 @register="register4" />
    <UploadModal @register="registerUploadModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import { BasicTable, useTable } from '/@/components/Table';
import { columns , dataSource} from './data';
import { useModal } from '/@/components/Modal'
import Modal4 from './comp/Modal4.vue';
import UploadModal from './comp/UploadModal.vue';

const [registerTable] = useTable({
  dataSource: dataSource,
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

const [registerUploadModal, { openModal: openUploadModal }] = useModal();


function send(record: any) {
  openModal4(true, record);
}
function sendUpload(record: any) {
  openUploadModal(true, record);
}


function onEditChange({ column, value, record }) {
  // 本例
  if (column.dataIndex === 'id') {
    record.editValueRefs.name4.value = `${value}`;
  }
  console.log(column, value, record);
}


</script>
