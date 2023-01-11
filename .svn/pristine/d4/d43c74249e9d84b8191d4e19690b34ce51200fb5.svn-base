<template>
  <BasicModal v-bind="$attrs" @register="register" title="编辑Banner图片" @visible-change="handleVisibleChange"
    @ok="handleOK">
    <div class="pr-3px">
      <BasicForm @register="registerForm" :model="modelRef" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import { Tabs, TabPane } from 'ant-design-vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { schemasUpload } from '../data'
import { useMessage } from '/@/hooks/web/useMessage';
export default defineComponent({
  components: { BasicModal, BasicForm, TabPane, Tabs },
  props: {
    userData: { type: Object },
  },
  setup(props) { // 传过来的值
    const { createMessage } = useMessage();
    const modelRef = ref<Recordable>({});
    const [
      registerForm,
      {
        validate,
        resetFields,
        getFieldsValue
        // updateSchema
      },
    ] = useForm({
      labelWidth: 120,
      schemas: schemasUpload,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 24,
      },
    });
    const [register, { closeModal }] = useModalInner((data) => {
      data && onDataReceive(data);
    });
    function handleOK() {
      console.log(modelRef.value);
      console.log(getFieldsValue());


      validate().then(res => {

        if (res) {
          console.log('res:', res);
          console.log('model:', modelRef.value);
          if (!res.name1) {
            createMessage.warning('请填写默认语言！')
          } else {
            createMessage.success('保存成功');
            closeModal()
          }
        }
      }).catch(e => {
        console.error(e, 'dsa');

      })
    }
    function onDataReceive(data) { //初始和表单
      // modelRef.value = []
      console.log(data);
    }

    //监听关闭打开
    function handleVisibleChange(v) {
      if (!v) { //初始化表单
        resetFields()
      }
      v && props.userData && nextTick(() => onDataReceive(props.userData));
    }
    return {

      register,
      schemasUpload,
      registerForm,
      modelRef,
      handleVisibleChange,
      handleOK
    };
  },
});
</script>
  