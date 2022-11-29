<template>
  <BasicModal v-bind="$attrs" @register="register" :title="modelRef.name" @visible-change="handleVisibleChange"
    @ok="handleOK">
    <div class="pr-3px">
      <Tabs v-model:activeKey="activeKey" @change="handleChangeTabs" type="card">
        <TabPane key="name1" tab="*默认语言"></TabPane>
        <TabPane key="name2" tab="越南语"></TabPane>
        <TabPane key="name3" tab="印地语"></TabPane>
        <TabPane key="name4" tab="葡萄牙语"></TabPane>
        <TabPane key="name5" tab="繁体中文"></TabPane>
      </Tabs>
      <BasicForm @register="registerForm" :model="modelRef" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import { Tabs, TabPane } from 'ant-design-vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { schemas } from '../data'
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
        updateSchema
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
        if (res) {
          console.log('res:', res);
          console.log('model:', modelRef.value);
          if (!res.name1) {
            createMessage.warning('请填写默认语言！')
          } else {
            createMessage.success('保存成功 ' + modelRef.value.name + '  ' + modelRef.value.type);
            closeModal()
          }
        }
      }).catch(e => {
        console.error(e, 'dsa');

      })
    }
    function onDataReceive(data) { //初始和表单
      modelRef.value = data
    }
    const activeKey = ref('name1')

    function handleChangeTabs(e) {
      activeKey.value = e
      schemas.forEach(item => {
        if (item.field != e) item.show = false
        else item.show = true
        updateSchema(item)

      })
    }
    //监听关闭打开
    function handleVisibleChange(v) {
      if (!v) { //初始化表单
        resetFields()
        handleChangeTabs('name1')
      }
      v && props.userData && nextTick(() => onDataReceive(props.userData));
    }
    return {
      activeKey,
      handleChangeTabs,

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
