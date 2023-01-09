<template>
  <BasicTable @register="registerTable">
    <template #tableTitle>
      <a-button @click="$emit('back')">返回</a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-button class="mr-1" color="warning" @click="openModel(record)">编辑</a-button>
        <PopConfirmButton type="danger" @confirm="deleteRule(record)" title="确认删除？">删除</PopConfirmButton>
      </template>
    </template>
    <template #toolbar>
      <a-button type="success" @click="openModel()">新增</a-button>
    </template>
  </BasicTable>
  <FormModal :param-id="paramId" @register="registerModel" @reload-table="reload" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getAgentSettingRuleList, removeAgentRule } from '/@/api/dev_page/sys_config';
  import { PopConfirmButton } from '/@/components/Button';
  import FormModal from './FormModal.vue';
  import { detailColumns } from '../data';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'AgentSettingDetail',
    components: {
      BasicTable,
      FormModal,
      PopConfirmButton,
    },
    props: {
      paramId: Number,
    },
    emits: ['back'],
    setup(props) {
      const { createMessage } = useMessage();

      const [registerTable, { reload }] = useTable({
        columns: detailColumns,
        bordered: true,
        searchInfo: {
          paramId: props.paramId,
        },
        api: getAgentSettingRuleList,
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

      const [registerModel, { openModal: openRegisterModal }] = useModal();

      function openModel(record: any) {
        openRegisterModal(true, record);
      }

      function deleteRule(rule) {
        removeAgentRule({
          ruleId: rule.ruleId,
        }).then(() => {
          createMessage.success('删除成功');
          reload();
        });
      }

      return {
        registerTable,
        registerModel,
        openModel,
        reload,
        deleteRule,
      };
    },
  });
</script>
