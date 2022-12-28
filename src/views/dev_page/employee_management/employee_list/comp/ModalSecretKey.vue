<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="查看密钥"
    @visible-change="handleVisibleChange"
    @ok="handleOK"
  >
    <span>密钥：{{ modelRef.secretKey }}</span>
    <a-button class="ml-1" size="small" type="success" @click="copy(modelRef.secretKey)">复制</a-button>
    <div class="title mt-3">密钥二维码 </div>
    <QrCode :value="modelRef.secretKey" class="title" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { QrCode } from '/@/components/Qrcode/index';

  export default defineComponent({
    components: { BasicModal, QrCode },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      // 传过来的值
      const { createMessage } = useMessage();
      const modelRef = ref<Recordable | any>({});

      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });
      function handleOK() {
        closeModal();
      }
      function onDataReceive(data) {
        //初始和表单
        modelRef.value = data;
      }
      //监听关闭打开
      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      function copy(text) {
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', text);
        input.select();
        if (document.execCommand('copy')) {
          document.execCommand('copy');
          createMessage.success('复制成功');
        }
        document.body.removeChild(input);
      }
      return {
        register,
        modelRef,
        handleVisibleChange,
        handleOK,
        copy,
      };
    },
  });
</script>
<style lang="less" scoped>
  .title {
    text-align: center;
  }
</style>
