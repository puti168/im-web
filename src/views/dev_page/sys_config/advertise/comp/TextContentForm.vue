<template>
  <div>
    <Tabs v-model:activeKey="activeKey" @change="handleChangeTabs" type="card">
      <TabPane :key="defaultLang" tab="默认语言" />
      <TabPane v-for="item in langTabs" :key="item.id" :tab="item.descZh" />
    </Tabs>
    <BasicForm @register="registerForm" :model="modelValue[activeKey]" @field-value-change="onFieldChange" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    components: { Tabs, TabPane, BasicForm },
    props: {
      modelValue: {
        type: Object,
        default: () => ({}),
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, expose }) {
      /* eslint-disable */
      const { modelValue } = props;

      const { supportLangs, defaultLang = 1 } = useUserStore();

      const activeKey = ref<number>(defaultLang);

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

      function createModelValue() {
        if (!modelValue[activeKey.value]) {
          modelValue[activeKey.value] = {
            title: '',
            content: '',
          };

          emit('update:modelValue', modelValue);
        }
      }

      function handleChangeTabs(e) {
        activeKey.value = e;
        createModelValue();
        clearValidate();
        formSchema.value.forEach((item) => {
          item.required = e == defaultLang;
          updateSchema(item);
        });
      }

      function resetForm() {
        resetFields();
        clearValidate();
        handleChangeTabs(1);
      }

      function onFieldChange(filed: string, value: string) {
        createModelValue();
        modelValue[activeKey.value][filed] = value;

        emit('update:modelValue', modelValue);
      }

      expose({
        reset: resetForm,
        validate,
      });

      return {
        defaultLang,
        langTabs,
        supportLangs,
        activeKey,
        handleChangeTabs,
        registerForm,
        onFieldChange,
      };
    },
  });
</script>
