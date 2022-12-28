<template>
  <PageWrapper title="对话详细" contentBackground contentClass="p-4">
    <BasicTable @register="registerTable" v-if="!isMessage">
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'id'"> ID: {{ record.id }} </template>
        <template v-if="column.key === 'status'">
          {{ {0:'等待中',1:'服务中',2:'超时结束',3:'正常结束'}[Number(text)] || text }}
        </template>
        <template v-if="column.key === 'msgNum'">
          <a @click="clickNumber(record)">{{ text }}</a>
        </template>
        <template v-if="column.key === 'imgArr'">
          <TableImg :size="60" :simpleShow="true" :imgList="text" />
        </template>
      </template>
    </BasicTable>
    <BasicTable @register="registerTableMsg" v-else>
      <template #tableTitle>
        <a-button @click="isMessage = false">返回</a-button>
      </template>
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'msgType'">
          {{ 
              {
                0:'心跳消息',
                1:'文字消息',
                2:'图片',
                3:'视频',
                4:'语音',
                5:'心跳消息',
                6:'通知用户匹配成功',
              }[Number(text)] 
          }}
        </template>
        <template v-if="column.key === 'createTime'">
          <!-- {{ dayjs(text).format('YYYY-MM-DD HH:mm:ss') }} -->
          {{ text }}
        </template>
        <template v-if="column.key === 'content' && record.msgType == 2">
          <TableImg :size="60" :simpleShow="true" :imgList="text" />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableImg } from '/@/components/Table';
  import { getSessionorderList,getSessionorderListMsg } from '/@/api/dev_page/history_record';
  import { columns,columnsAll } from './dialogue_details_table';
  import { ref } from 'vue';

  const [registerTable ] = useTable({
    api: getSessionorderList,
    columns: columnsAll,

    bordered: true,
    showTableSetting: true,
  });
  let sessionOrderId = ref<string>('112333')
  const [registerTableMsg] = useTable({
    api: getSessionorderListMsg,
    columns: columns,
    searchInfo:{
      sessionOrderId:sessionOrderId,
      sortByTime:1,
    },
    bordered: true,
    showTableSetting: true,
  });
  let isMessage = ref<boolean>(false)
  function clickNumber(item:any){
    isMessage.value = true;
    sessionOrderId.value = item.id;
  }
</script>
