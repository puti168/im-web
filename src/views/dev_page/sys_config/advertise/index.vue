<template>
  <PageWrapper title="广告设置" contentBackground contentClass="p-2">
    <BasicTable @register="registerTable" @edit-change="onEditChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button class="mr-1" v-if="record.tid == 1" type="warning" @click="sendUpload(record)">编辑</a-button>
          <a-button class="mr-1" v-else type="warning" @click="send(record)">编辑</a-button>
        </template>
      </template>
    </BasicTable>
    <RegisterModel @register="register4" @reload-table="reload" />
    <UploadModal @register="registerUploadModal" @reload-table="reload" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns } from './data';
  import { useModal } from '/@/components/Modal';
  import { getBannerRotation } from '/@/api/dev_page/sys_config';
  import UploadModal from './comp/UploadModal.vue';
  import RegisterModel from './comp/RegisterModel.vue';

  export default defineComponent({
    name: 'AdvertiseSetting',
    components: {
      RegisterModel,
      PageWrapper,
      BasicTable,
      UploadModal,
    },
    setup() {
      const [registerTable, { reload }] = useTable({
        api: getData,
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

      function getData() {
        const sourceMap = [
          {
            name: '顶部banner',
            tid: 1,
          },
          {
            name: '循环文案',
            tid: 2,
          },
          {
            name: '开场文案',
            tid: 3,
          },
        ];
        return getBannerRotation().then((res) => {
          const map = res.map || {};
          Object.keys(map).forEach((key: string) => {
            const index = +key - 1;
            sourceMap[index] = { ...map[key], ...sourceMap[index] };
          });
          return {
            items: sourceMap,
            total: 3,
          };
        });
      }

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

      return {
        registerTable,
        register4,
        registerUploadModal,
        send,
        reload,
        sendUpload,
        onEditChange,
      };
    },
  });
</script>
