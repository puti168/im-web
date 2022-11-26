<template>
    <PageWrapper
      title="组别管理"
      contentBackground
      contentClass="p-2"
    >
      <BasicTable @register="registerTable" @edit-change="onEditChange">
        <template #bodyCell="{ column, record}">
          <template v-if="column.key === 'action'">
            <a-button class="mr-1" type="warning" @click="send(record)">编辑</a-button>
            <a-button class="mr-1" type="danger">删除</a-button>
            <a-button >权限</a-button>
          </template>
        </template>
        <template #toolbar>
          <a-button type="success" @click="send({})">新增</a-button>
        </template>
      </BasicTable>
      <Modal4 @register = "register4" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { demoListApi } from '/@/api/demo/table';
  import { columns } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal'
  import Modal4 from './comp/Modal4.vue';
  
  const [registerTable] = useTable({
    api: demoListApi,
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
  const [register4, { openModal: openModal4}] = useModal();

  
  function send(record:any) {
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
