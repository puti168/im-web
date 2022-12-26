<template>
  <BasicModal v-bind="$attrs" @register="register" title="编辑" @visible-change="handleVisibleChange" @ok="handleOK">
    <div class="pr-3px">
      <BasicForm @register="registerForm" :model="modelRef" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemas } from '../data';
  import { updateUserConfig } from '/@/api/dev_page/sys_config';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
    },
    setup(props, { emit }) {
      // 传过来的值
      const { createMessage } = useMessage();
      const modelRef = ref<Recordable>({});
      const [registerForm, { removeSchemaByField, appendSchemaByField, validate }] = useForm({
        labelWidth: 120,
        schemas: [],
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });
      function handleOK() {
        validate()
          .then(async (res) => {
            if (res) {
              await updateUserConfig({ ...res, id: modelRef.value.id, distributorId: modelRef.value.distributorId });
              createMessage.success('保存成功');
              emit('reloadTable');
              closeModal();
            }
          })
          .catch((e) => {
            console.error(e, 'dsa');
          });
      }
      function onDataReceive(data) {
        //初始和表单
        // // 方式2
        if (data.tid == '1') {
          //客服匹配限制
          schemas[0].defaultValue = data.handleLimit;
          appendSchemaByField(schemas[0], '');
          modelRef.value = { handleLimit: data.handleLimit, id: data.id, distributorId: data.distributorId };
        } else {
          //优先匹配
          schemas[1].defaultValue = data.levelNum;
          appendSchemaByField(schemas[1], '');
          modelRef.value = { levelNum: data.levelNum, id: data.id, distributorId: data.distributorId };
        }
        console.log(modelRef.value, 'modelRef.value2');

        // setProps({
        //   model:{ field2: data.data, field1: data.info }
        // })
      }
      //监听关闭打开
      function handleVisibleChange(v) {
        removeSchemaByField('handleLimit');
        removeSchemaByField('levelNum');
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }
      return {
        register,
        schemas,
        registerForm,
        modelRef,
        handleVisibleChange,
        handleOK,
      };
    },
  });
</script>
