<template>
  <BasicTable @register="registerTable">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-button color="warning" @click="handleEdit(record)">编辑</a-button>
      </template>
    </template>
  </BasicTable>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getAgentSettingList } from '/@/api/dev_page/sys_config';
  import { columns } from '../data';

  export default defineComponent({
    name: 'AgentSettingList',
    components: {
      BasicTable,
    },
    emits: ['setEdit'],
    setup(props, { emit }) {
      const [registerTable] = useTable({
        columns: columns,
        bordered: true,
        api: getAgentSettingList,
        fetchSetting: {
          pageField: 'pageNo',
        },
        showTableSetting: true,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
        },
      });

      function handleEdit(record) {
        emit('setEdit', record.paramId);
      }

      return {
        registerTable,
        handleEdit,
      };
    },
  });
</script>
