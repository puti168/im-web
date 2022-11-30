<template>
  <BasicModal v-bind="$attrs" @register="register" :title="modelRef.id ? '编辑' : '新增'"
    @visible-change="handleVisibleChange" @ok="handleOK">
    <div class="pr-3px">
      <BasicForm @register="registerForm" :model="modelRef" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { schemas } from '../data'
import { useMessage } from '/@/hooks/web/useMessage';
export default defineComponent({
  components: { BasicModal, BasicForm },
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
      },
    ] = useForm({
      labelWidth: 120,
      schemas: schemas,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 24,
      },
    });
    const [register, { closeModal }] = useModalInner((data) => {
      data && onDataReceive(data);
    });
    function handleOK() {
      validate().then(res => {
        console.log(res);
        if (res) {
          console.log(res);
          createMessage.success('保存成功');
          closeModal()
        }
      }).catch(e => {
        console.error(e, 'dsa');

      })
    }
    function onDataReceive(data) { //初始和表单
      modelRef.value = data
    }
    //监听关闭打开
    function handleVisibleChange(v) {
      if (!v) resetFields()
      v && props.userData && nextTick(() => onDataReceive(props.userData));
    }
    return {
      register,
      schemas,
      registerForm,
      modelRef,
      handleVisibleChange,
      handleOK
    };
  },
});
</script>
