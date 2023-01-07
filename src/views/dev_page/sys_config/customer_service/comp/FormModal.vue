<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="modelRef.ruleId ? '编辑' : '新增'"
    @visible-change="handleVisibleChange"
    @ok="handleOK"
  >
    <div v-loading="loadingDetail" class="pr-3px">
      <BasicForm @register="registerForm" :model="modelRef" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, nextTick, reactive, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formModalSchemas } from '../data';
  import { addAgentRule, updateAgentRule, getAgentRuleDetail } from '/@/api/dev_page/sys_config';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
      paramId: Number,
    },
    setup(props, { emit }) {
      const modelRef = reactive<any>({});
      const loadingDetail = ref<boolean>(false);

      const [registerForm, { resetFields, clearValidate, validate }] = useForm({
        labelWidth: 120,
        schemas: formModalSchemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        loadingDetail.value = true;
        getAgentRuleDetail({
          ruleId: data.ruleId,
        })
          .then((res) => {
            const { ruleId, name, paramVal, groupInfos } = res.detailInfo;
            modelRef.ruleId = ruleId;
            modelRef.ruleName = name;
            modelRef.value = +paramVal;
            modelRef.groupIds = (groupInfos || []).map((_) => _.groupId);
          })
          .finally(() => {
            loadingDetail.value = false;
          });
      }

      //监听关闭打开
      function handleVisibleChange(v) {
        if (!v) {
          resetFields();
          clearValidate();
          for (let key in modelRef) {
            delete modelRef[key];
          }
        } else {
          props.userData && nextTick(() => onDataReceive(props.userData));
        }
      }

      function handleOK() {
        validate()
          .then(async (res) => {
            if (modelRef.ruleId) {
              // 更新
              await updateAgentRule({
                ruleId: modelRef.ruleId,
                name: res.ruleName,
                paramVal: res.value,
                groupIds: res.groupIds,
              });
            } else {
              // 新增
              await addAgentRule({
                paramId: props.paramId,
                ...res,
              });
            }

            closeModal();
            emit('reloadTable');
          })
          .catch((e) => {
            console.error(e, 'dsa');
          });
      }

      return {
        register,
        registerForm,
        loadingDetail,
        modelRef,
        handleVisibleChange,
        handleOK,
      };
    },
  });
</script>
