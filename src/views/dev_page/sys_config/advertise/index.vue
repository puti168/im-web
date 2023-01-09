<template>
  <PageWrapper title="广告设置" contentBackground contentClass="p-2">
    <BasicTable @register="registerTable" @edit-change="onEditChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button class="mr-1" type="warning" @click="handleEdit(record)">编辑</a-button>
          <span class="mr-1">
            <PopConfirmButton type="danger" @confirm="handleRemove(record)" title="确认删除？"> 删除 </PopConfirmButton>
          </span>
          <a-switch
            :checked="Boolean(record.isEnabled)"
            checked-children="开启"
            un-checked-children="关闭"
            @change="(checked) => handleChange(checked, record)"
          />
        </template>
      </template>
      <template #toolbar>
        <a-button type="success" @click="handleEdit()">新增</a-button>
      </template>
    </BasicTable>
    <RegisterModel @register="registerModel" @reload-table="reload" />
    <UploadModal @register="registerUploadModal" @reload-table="reload" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns } from './data';
  import { useModal } from '/@/components/Modal';
  import { PopConfirmButton } from '/@/components/Button';
  import { deleteQuestionsAndReply, getBannerRotation, updateRotationEnable } from '/@/api/dev_page/sys_config';
  import UploadModal from './comp/UploadModal.vue';
  import RegisterModel from './comp/RegisterModel.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'AdvertiseSetting',
    components: {
      RegisterModel,
      PageWrapper,
      BasicTable,
      UploadModal,
      PopConfirmButton,
    },
    setup() {
      const { createMessage } = useMessage();

      const [registerTable, { reload }] = useTable({
        api: getData,
        columns: columns,
        bordered: true,
        showTableSetting: true,
        fetchSetting: {
          pageField: 'pageNum',
        },
        // showIndexColumn: false,
        actionColumn: {
          width: 220,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
        },
      });

      const [registerModel, { openModal }] = useModal();

      const [registerUploadModal, { openModal: openUploadModal }] = useModal();

      function getData(params: any) {
        const typeMap = {
          1: '顶部banner',
          2: '循环文案',
          3: '开场文案',
        };
        return getBannerRotation(params).then((res) => {
          const { list = [], total } = res;
          const items = list.map((item) => ({
            typeName: typeMap[item.type] || '-',
            tid: item.type,
            ...item,
          }));
          return {
            items,
            total: +total,
          };
        });
      }

      function send(record: any) {
        openModal(true, record);
      }
      function sendUpload(record: any) {
        openUploadModal(true, record);
      }

      function handleEdit(record: any) {
        openModal(true, record);
      }

      function onEditChange({ column, value, record }) {
        // 本例
        if (column.dataIndex === 'id') {
          record.editValueRefs.name4.value = `${value}`;
        }
        console.log(column, value, record);
      }

      function handleChange(checked, record) {
        const { id, type } = record;
        record.isEnabled = checked;
        updateRotationEnable({
          id,
          type,
          isEnable: record.isEnabled ? 1 : 0,
        })
          .then(() => {
            setTimeout(reload, 1000);
          })
          .catch(() => {
            record.isEnabled = !checked;
          });
      }

      function handleRemove(record) {
        if (record.isEnabled) {
          createMessage.error('不能删除启用中的配置');
          return;
        }

        deleteQuestionsAndReply({
          ids: [record.id],
        }).then(() => {
          createMessage.success('删除成功');
          setTimeout(reload, 1000);
        });
      }

      return {
        registerTable,
        registerModel,
        registerUploadModal,
        send,
        reload,
        sendUpload,
        handleEdit,
        onEditChange,
        handleChange,
        handleRemove,
      };
    },
  });
</script>
