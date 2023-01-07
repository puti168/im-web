<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="contentId ? '编辑' : '新增'"
    @visible-change="handleVisibleChange"
    @ok="handleOK"
  >
    <div v-loading="otherDataLoading" class="pr-3px">
      <BasicForm :model="modelRef" @register="confgFormRegister" @field-value-change="onConfigDataChange" />
      <template v-if="modelRef.type === 1">
        <UploadImageForm ref="uploadRef" />
      </template>
      <template v-else>
        <TextContentForm ref="contentRef" v-model="modelValue" />
      </template>
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, nextTick, computed, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import {
    QuestionReplyContent,
    saveQuestionsAndReply,
    updateQuestionsAndReply,
    getOtherLangData,
  } from '/@/api/dev_page/sys_config';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import TextContentForm from './TextContentForm.vue';
  import UploadImageForm from './UploadImageForm.vue';

  const AD_TYPEs = [
    {
      label: '顶部Banner',
      value: 1,
    },
    {
      label: '循环文案',
      value: 2,
    },
    {
      label: '开场文案',
      value: 3,
    },
  ];

  export default defineComponent({
    components: { BasicModal, BasicForm, TextContentForm, UploadImageForm },
    props: {
      userData: {
        type: Object as PropType<QuestionReplyContent>,
      },
    },
    setup(props, { emit }) {
      const { supportLangs, defaultLang = 1 } = useUserStore();
      const { createMessage } = useMessage();

      const otherDataLoading = ref<boolean>(false);
      const metaType = ref<number>(1);
      const contentId = ref<string>('');
      const uploadRef = ref();
      const contentRef = ref();
      const modelValue = reactive({});
      const modelRef = reactive({
        type: 1,
        open: false,
      });

      const configSchema = computed<FormSchema[]>(() => [
        {
          field: 'type',
          component: 'Select',
          defaultValue: 1,
          required: true,
          label: '类型',
          show: () => !contentId.value,
          colProps: {
            span: 24,
          },
          componentProps: {
            options: AD_TYPEs,
          },
        },
      ]);

      const [confgFormRegister] = useForm({
        labelWidth: 80,
        schemas: configSchema.value,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

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
        modelRef.type = 1;
        modelRef.open = false;
        resetFormBase();
      }

      function resetFormBase() {
        if (contentRef.value) {
          contentRef.value.reset();
        }
        for (let key in modelValue) {
          delete modelValue[key];
        }
        if (uploadRef.value) {
          uploadRef.value.setFormModel({
            title: '',
            content: '',
          });
        }
      }

      function onFieldChange(filed: string, value: string) {
        modelRef[filed] = value;
      }

      function onDataReceive(data?: any) {
        //初始和表单
        if (data) {
          console.log(data, '===');
          const { tid = 1, content, title, id } = data;
          modelRef.type = tid;
          contentId.value = data.id;

          if (tid === 1) {
            if (uploadRef.value) {
              uploadRef.value.setFormModel({
                title,
                content,
              });
            }
          } else {
            const { langId } = data;
            modelValue[langId] = {
              title,
              content,
            };
            otherDataLoading.value = true;
            getOtherLangData({
              parentId: id,
              type: tid,
            })
              .then((res) => {
                const { list = [] } = res;
                for (const lang of list) {
                  modelValue[lang.langId] = {
                    title: lang.title,
                    content: lang.content,
                  };
                }
              })
              .finally(() => {
                otherDataLoading.value = false;
              });
          }
        }
      }

      function onConfigDataChange(key: string, value: any) {
        modelRef[key] = value;
        if (key === 'type') {
          resetFormBase();
        }
      }

      async function handleSubmit(
        data: {
          langId: number;
          title: any;
          content: any;
        }[],
      ) {
        if (contentId.value) {
          await updateQuestionsAndReply({
            mainId: contentId.value,
            type: modelRef.type,
            data,
          });
        } else {
          await saveQuestionsAndReply({
            type: modelRef.type,
            data,
          });
        }

        createMessage.success('更新成功');
        closeModal();
        emit('reloadTable');
      }

      function handleOK() {
        if (modelRef.type === 1 && uploadRef.value) {
          uploadRef.value.submit().then(async (res) => {
            console.log(res, '==res===');
            await handleSubmit([
              {
                langId: defaultLang,
                ...res,
              },
            ]);
          });
        }
        if (modelRef.type !== 1 && contentRef.value) {
          contentRef.value
            .validate()
            .then(async () => {
              console.log(modelValue, 'model value');
              const requiredLang = modelValue[defaultLang];
              if (!requiredLang || !requiredLang.content || !requiredLang.title) {
                createMessage.warning('请填写默认语言！');
              } else {
                const data = supportLangs.map((lang) => {
                  const value = modelValue[lang.id];
                  return {
                    langId: lang.id,
                    title: value ? value.title : '',
                    content: value ? value.content : '',
                  };
                });

                await handleSubmit(data);
              }
            })
            .catch((e) => {
              console.error(e, 'dsa');
            });
        }
      }

      return {
        metaType,
        otherDataLoading,
        confgFormRegister,
        contentId,
        uploadRef,
        contentRef,
        modelValue,
        modelRef,
        register,
        handleVisibleChange,
        onFieldChange,
        onConfigDataChange,
        handleOK,
      };
    },
  });
</script>
