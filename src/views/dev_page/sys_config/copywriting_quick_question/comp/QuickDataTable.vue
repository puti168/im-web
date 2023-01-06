<template>
  <PageWrapper :title="title" contentBackground contentClass="p-2">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button class="mr-1" type="warning" @click="openModel(record)">编辑</a-button>
          <PopConfirmButton type="danger" @confirm="deleteById(record.id)" title="确认删除？">删除</PopConfirmButton>
        </template>
      </template>
      <template #toolbar>
        <a-button type="success" @click="openModel()">新增</a-button>
      </template>
    </BasicTable>
    <FormModal :type="type" @register="registerModel" @reload-table="reload" />
  </PageWrapper>
</template>

<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getQuestionsAndReply, deleteQuestionsAndReply, QuestionReplyContent } from '/@/api/dev_page/sys_config';
  import { useModal } from '/@/components/Modal';
  import FormModal from './FormModal.vue';
  import { PopConfirmButton } from '/@/components/Button';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'QuickQuestion',
    components: {
      PageWrapper,
      BasicTable,
      FormModal,
      PopConfirmButton,
    },
    props: {
      type: {
        type: Number as PropType<4 | 5>,
        default: 4,
      },
      title: String,
    },
    setup(props) {
      const { createMessage } = useMessage();

      const [registerTable, { reload }] = useTable({
        api: getQuestionsAndReply,
        searchInfo: {
          type: props.type,
        },
        fetchSetting: {
          pageField: 'pageNum',
        },
        columns: [
          {
            title: '标题',
            dataIndex: 'title',
            width: 150,
          },
          {
            title: '添加时间',
            dataIndex: 'addtime',
            width: 150,
          },
          {
            title: '操作人',
            dataIndex: 'creator',
            width: 150,
          },
        ],
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

      const [registerModel, { openModal: openRegisterModal }] = useModal();

      function openModel(record?: QuestionReplyContent) {
        openRegisterModal(true, record);
      }

      function deleteById(id: string) {
        deleteQuestionsAndReply({ ids: [id] }).then(() => {
          createMessage.success('删除成功' + id);
          setTimeout(reload, 1000);
        });
      }

      return {
        reload,
        registerTable,
        registerModel,
        deleteById,
        openModel,
      };
    },
  });
</script>
