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
import { saveUSER , updateUSER } from '/@/api/dev_page/employee_management';
import { useMessage } from '/@/hooks/web/useMessage';
export default defineComponent({
  components: { BasicModal, BasicForm },
  props: {
    userData: { type: Object },
  },
  setup(props,{emit}) { // 传过来的值
    const { createMessage } = useMessage();
    const modelRef = ref<Recordable|any>({});
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
      data && onDataReceive(data,true);
    });
    function handleOK() {
      validate().then(async res => {
        if (res) {
          if(modelRef.value.id) await updateUSER({...{id:modelRef.value.id, "distributorId": 123},...res})
          else await saveUSER({...res,"distributorId": 123})
          createMessage.success('保存成功');
          emit('reloadTable')
          closeModal()
        }
      }).catch(e => {
        console.error(e, 'dsa');
      })
    }
    function onDataReceive(data,v) { //初始和表单
      modelRef.value = data
      if(typeof modelRef.value.status == 'number') modelRef.value.status = String(modelRef.value.status)
      if(typeof modelRef.value.groupId == 'number') modelRef.value.groupId = String(modelRef.value.groupId)
      if (v && !modelRef.value.id) resetFields()
    }
    //监听关闭打开
    function handleVisibleChange(v) {
      v && props.userData && nextTick(() => onDataReceive(props.userData,v));
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
