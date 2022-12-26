<template>
  <PageWrapper title="对话详细" contentBackground contentClass="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'id'"> ID: {{ record.id }} </template>
        <template v-else-if="column.key === 'imgArr'">
          <TableImg :size="60" :simpleShow="true" :imgList="text" />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableImg } from '/@/components/Table';
  import { getSessionorderList } from '/@/api/dev_page/history_record';
  import { columns } from './dialogue_details_table';

  const [registerTable] = useTable({
    api: getSessionorderList,
    columns: columns,
    bordered: true,
    showTableSetting: true,
  });
</script>
