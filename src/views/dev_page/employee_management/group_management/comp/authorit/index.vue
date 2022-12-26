<template>
  <BasicModal v-bind="$attrs" @register="register" title="权限" @visible-change="handleVisibleChange" @ok="handleOK">
    <div class="pr-3px">
      <!-- 树选择 \src\views\demo\tree\index.vue -->
      <BasicForm @register="registerForm" :model="modelRef" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemas } from './data';
  import { saveGroup, getGroupById } from '/@/api/dev_page/employee_management';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
    },
    setup(props, { emit }) {
      // 传过来的值
      const { createMessage } = useMessage();
      const modelRef = ref<Recordable | any>({});
      const menuList = ref([]);

      const [registerForm, { validate, resetFields }] = useForm({
        labelWidth: 120,
        schemas,
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
            console.log(res);
            if (res) {
              await saveGroup(res);
              console.log(modelRef.value);
              emit('reloadTable');
              createMessage.success('保存成功');
              closeModal();
            }
          })
          .catch((e) => {
            console.error(e, 'dsa');
          });
      }
      function onDataReceive(data) {
        console.log('data2', data);
        //初始和表单
        modelRef.value = data;
        getGroupById({ id: data.id })
          .then((res) => {
            menuList.value = res.menuList;
          })
          .catch(() => {});
      }

      //监听关闭打开
      function handleVisibleChange(v) {
        if (!v) resetFields();
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
