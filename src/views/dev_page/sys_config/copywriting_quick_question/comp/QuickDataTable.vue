<template>
  <PageWrapper :title="title" contentBackground contentClass="p-2">
    <BasicTable class="copywriting-quick-table" @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button class="mr-1" type="warning" @click="openModel(record)">编辑</a-button>
          <span class="mr-1">
            <PopConfirmButton type="danger" @confirm="deleteById(record.id)" title="确认删除？">
              删除
            </PopConfirmButton>
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
    <FormModal :type="type" @register="registerModel" @reload-table="delayReload" />
  </PageWrapper>
</template>

<script lang="ts">
  import { DragOutlined } from '@ant-design/icons-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import {
    getQuestionsAndReply,
    deleteQuestionsAndReply,
    QuestionReplyContent,
    updateQuestionReplySort,
  } from '/@/api/dev_page/sys_config';
  import { useModal } from '/@/components/Modal';
  import FormModal from './FormModal.vue';
  import { PopConfirmButton } from '/@/components/Button';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { defineComponent, onMounted } from 'vue';
  import Sortable from 'sortablejs';
  import { formateTime } from '/@/utils/date-formate';

  export default defineComponent({
    name: 'QuickQuestion',
    components: {
      PageWrapper,
      BasicTable,
      FormModal,
      PopConfirmButton,
      DragOutlined,
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

      const [registerTable, { reload, getDataSource }] = useTable({
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
            customRender: ({ record }) => {
              return formateTime(record.addtime);
            },
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

      function delayReload() {
        setTimeout(reload, 1000);
      }

      function deleteById(id: string) {
        deleteQuestionsAndReply({ ids: [id] }).then(() => {
          createMessage.success('删除成功' + id);
          delayReload();
        });
      }

      function initDragSortable() {
        const el = document.querySelector('.copywriting-quick-table .ant-table-tbody');
        if (el) {
          new Sortable(el as HTMLElement, {
            handle: '.table-raw-drag-btn',
            animation: 150,
            onEnd({ newIndex, oldIndex }) {
              if (newIndex !== oldIndex) {
                const dataSource = getDataSource();
                const newIndexRow = dataSource[(newIndex || 1) - 1];
                const oldIndexRow = dataSource[(oldIndex || 1) - 1];
                updateQuestionReplySort({
                  type: props.type,
                  startSortId: oldIndexRow.sortId,
                  endSortId: newIndexRow.sortId,
                }).then(() => {
                  createMessage.success('操作成功');
                  delayReload();
                });
              }
            },
          });
        }
      }

      onMounted(initDragSortable);

      return {
        delayReload,
        registerTable,
        registerModel,
        deleteById,
        openModel,
      };
    },
  });
</script>
