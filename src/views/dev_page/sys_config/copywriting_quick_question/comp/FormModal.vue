<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="contentId ? '编辑' : '新增'"
    @visible-change="handleVisibleChange"
    @ok="handleOK"
  >
    <div v-loading="loadingLangData" class="pr-3px">
      <Tabs v-model:activeKey="activeKey" @change="handleChangeTabs" type="card">
        <TabPane :key="1" tab="默认语言" />
        <TabPane v-for="item in langTabs" :key="item.id" :tab="item.descZh" />
      </Tabs>
      <BasicForm @register="registerForm" :model="modelRef[activeKey]" @field-value-change="onFieldChange" />
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, nextTick, computed, reactive } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import {
    getOtherLangData,
    QuestionReplyContent,
    saveQuestionsAndReply,
    updateQuestionsAndReply,
  } from '/@/api/dev_page/sys_config';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  export default defineComponent({
    components: { BasicModal, BasicForm, TabPane, Tabs },
    props: {
      userData: {
        type: Object as PropType<QuestionReplyContent>,
      },
      type: {
        type: Number as PropType<4 | 5>,
        default: 4,
      },
    },
    setup(props, { emit }) {
      const { supportLangs, defaultLang = 1 } = useUserStore();
      const { createMessage } = useMessage();
      // 传过来的值
      const modelRef = reactive<Recordable>({});
      const activeKey = ref<number>(defaultLang);
      const contentId = ref<string>('');
      const loadingLangData = ref<boolean>(false);

      const langTabs = computed(() => {
        return supportLangs.filter((item) => item.id !== defaultLang);
      });

      const formSchema = computed<FormSchema[]>(() => [
        {
          field: 'title',
          component: 'Input',
          defaultValue: '',
          required: true,
          label: '标题',
          show: true,
          colProps: {
            span: 24,
          },
        },
        {
          field: 'content',
          component: 'InputTextArea',
          defaultValue: '',
          required: true,
          label: '内容',
          show: true,
          colProps: {
            span: 24,
          },
        },
      ]);

      const [registerForm, { validate, resetFields, updateSchema, clearValidate }] = useForm({
        labelWidth: 80,
        schemas: formSchema.value,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function createModelValue() {
        if (!modelRef[activeKey.value]) {
          modelRef[activeKey.value] = {
            title: '',
            content: '',
          };
        }
      }

      function handleChangeTabs(e) {
        activeKey.value = e;
        createModelValue();
        clearValidate();
        formSchema.value.forEach((item) => {
          item.required = e == 1;
          updateSchema(item);
        });
      }
      //监听关闭打开
      function handleVisibleChange(v) {
        if (!v) {
          //初始化表单
          resetForm();
        } else {
          nextTick(() => onDataReceive(props.userData));
        }
      }

      function resetForm() {
        contentId.value = '';
        Object.keys(modelRef).forEach((key) => {
          delete modelRef[key];
        });
        resetFields();
        handleChangeTabs(1);
      }

      function onFieldChange(filed: string, value: string) {
        createModelValue();
        modelRef[activeKey.value][filed] = value;
      }

      function onDataReceive(data?: QuestionReplyContent) {
        //初始和表单
        if (data) {
          loadingLangData.value = true;
          contentId.value = data.id;
          const { id, langId, content, title } = data;
          modelRef[langId] = {
            title,
            content,
          };
          getOtherLangData({
            parentId: id,
            type: props.type,
          })
            .then((res) => {
              const { list = [] } = res;
              for (const lang of list) {
                modelRef[lang.langId] = {
                  title: lang.title,
                  content: lang.content,
                };
              }
            })
            .finally(() => {
              loadingLangData.value = false;
            });
        }
      }

      function handleOK() {
        validate()
          .then(async () => {
            const data = supportLangs.map((lang) => {
              const value = modelRef[lang.id];
              return {
                langId: lang.id,
                title: value ? value.title : '',
                content: value ? value.content : '',
              };
            });

            const isNotComplate =
              data.filter((item) => {
                return (item.title && !item.content) || (!item.title && item.content);
              }).length > 0;
            if (isNotComplate) {
              createMessage.warning('请补全信息！');
            } else {
              try {
                if (contentId.value) {
                  await updateQuestionsAndReply({
                    mainId: contentId.value,
                    type: props.type,
                    data,
                  });
                  createMessage.success('更新成功');
                } else {
                  await saveQuestionsAndReply({
                    type: props.type,
                    data,
                  });
                  createMessage.success('保存成功');
                }

                closeModal();
                emit('reloadTable');
              } catch {}
            }
          })
          .catch((e) => {
            console.error(e, 'dsa');
          });
      }

      return {
        contentId,
        loadingLangData,
        langTabs,
        supportLangs,
        activeKey,
        modelRef,
        handleChangeTabs,
        register,
        registerForm,
        handleVisibleChange,
        onFieldChange,
        handleOK,
      };
    },
  });
</script>
