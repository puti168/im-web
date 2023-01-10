<template>
  <BasicTable class="cs-rule-list-table" @register="registerTable">
    <template #tableTitle>
      <a-button @click="$emit('back')">返回</a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-button class="mr-1" color="warning" @click="openModel(record)">编辑</a-button>
        <span class="mr-1">
          <PopConfirmButton type="danger" @confirm="deleteRule(record)" title="确认删除？">删除</PopConfirmButton>
        </span>
        <a-button class="table-raw-drag-btn mr-1" shape="circle">
          <DragOutlined />
        </a-button>
      </template>
    </template>
    <template #toolbar>
      <a-button type="success" @click="openModel()">新增</a-button>
    </template>
  </BasicTable>
  <FormModal :param-id="paramId" @register="registerModel" @reload-table="reload" />
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { DragOutlined } from '@ant-design/icons-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getAgentSettingRuleList, removeAgentRule, updateCsRuleSort } from '/@/api/dev_page/sys_config';
  import { PopConfirmButton } from '/@/components/Button';
  import FormModal from './FormModal.vue';
  import { detailColumns } from '../data';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import Sortable from 'sortablejs';

  export default defineComponent({
    name: 'AgentSettingDetail',
    components: {
      BasicTable,
      FormModal,
      PopConfirmButton,
      DragOutlined,
    },
    props: {
      paramId: Number,
    },
    emits: ['back'],
    setup(props) {
      const { createMessage } = useMessage();

      const [registerTable, { reload, getDataSource }] = useTable({
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

      function initDragSortable() {
        const el = document.querySelector('.cs-rule-list-table .ant-table-tbody');
        if (el) {
          new Sortable(el as HTMLElement, {
            handle: '.table-raw-drag-btn',
            animation: 150,
            onEnd({ newIndex, oldIndex }) {
              if (newIndex !== oldIndex) {
                const dataSource = getDataSource();
                const newIndexRow = dataSource[(newIndex || 1) - 1];
                const oldIndexRow = dataSource[(oldIndex || 1) - 1];
                updateCsRuleSort({
                  paramId: props.paramId!,
                  startSortId: newIndexRow.sortId!,
                  endSortId: oldIndexRow.sortId!,
                }).then(() => {
                  createMessage.success('操作成功');
                  reload();
                });
              }
            },
          });
        }
      }

      onMounted(initDragSortable);

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
