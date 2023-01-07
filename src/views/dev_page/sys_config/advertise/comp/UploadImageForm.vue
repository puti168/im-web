<template>
  <BasicForm @register="formRegister" :model="formModel" @field-value-change="onValueChange" />
  <template v-if="formModel.content">
    <Image :src="formModel.content" />
  </template>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Image } from 'ant-design-vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { add } from '/@/components/Form/src/componentMap';
  import ImageUploadInput from './ImageUploadInput.vue';

  add(ImageUploadInput.name, ImageUploadInput);

  export default defineComponent({
    name: 'UploadImageForm',
    components: {
      BasicForm,
      Image,
    },
    setup(props, { expose }) {
      const formModel = reactive({
        title: '',
        content: '',
      });

      const formSchema: FormSchema[] = [
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
          component: ImageUploadInput.name,
          defaultValue: '',
          required: true,
          label: '图片链接',
          colProps: {
            span: 24,
          },
        },
      ];

      const [formRegister, { validate }] = useForm({
        labelWidth: 80,
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      function onValueChange(filed: string, value: string) {
        formModel[filed] = value;
      }

      function setFormModel(model: { title: string; content: string }) {
        formModel.title = model.title;
        formModel.content = model.content;
      }

      function submit() {
        return validate().then(() => {
          return formModel;
        });
      }

      expose({
        submit,
        setFormModel,
      });

      return {
        formModel,
        formRegister,
        onValueChange,
      };
    },
  });
</script>
