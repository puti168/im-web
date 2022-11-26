<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="编辑"
    @visible-change="handleVisibleChange"
    @ok="handleOK"
  >
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
          removeSchemaByField,
          appendSchemaByField,
          validate
        },
      ] = useForm({
        labelWidth: 120,
        schemas:[],
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [register,{closeModal}] = useModalInner((data) => {
        data && onDataReceive(data);
      });
      function handleOK(){
        
        validate().then(res => {
          console.log(res);
          if(res){
            console.log(modelRef.value);
            createMessage.success('保存成功'); 
            closeModal()
          }
        }).catch(e => {
          console.error(e,'dsa');
          
        })
      }
      function onDataReceive(data) { //初始和表单
         // // 方式2
         if(data.id == "0"){
            appendSchemaByField(schemas[0],'')
            modelRef.value = { field1: data.no,id:data.id};
          }else{
            appendSchemaByField(schemas[1],'')
            modelRef.value = { field2 : data.radio1,id:data.id};
          }
          // setProps({
          //   model:{ field2: data.data, field1: data.info }
          // })
      }
      //监听关闭打开
      function handleVisibleChange(v) {
        removeSchemaByField('field1')
        removeSchemaByField('field2')
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
