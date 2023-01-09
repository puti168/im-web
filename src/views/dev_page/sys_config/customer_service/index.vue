<template>
  <PageWrapper title="客服配置" contentBackground contentClass="p-4">
    <SettingList v-if="!activeSettingParamId" @set-edit="onSetEdit" />
    <SettingDetail v-else :param-id="activeSettingParamId" @back="activeSettingParamId = null" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import SettingList from './comp/SettingList.vue';
  import SettingDetail from './comp/SettingDetail.vue';

  export default defineComponent({
    name: 'CustomerService',
    components: {
      PageWrapper,
      SettingList,
      SettingDetail,
    },
    setup() {
      const activeSettingParamId = ref<number | null>(null);

      function onSetEdit(paramId: number) {
        activeSettingParamId.value = paramId;
      }

      return {
        activeSettingParamId,
        onSetEdit,
      };
    },
  });
</script>
