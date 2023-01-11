<template>
  <div class="image-upload-input">
    <Input :value="value" allowClear @change="onInput" placeholder="建议图片尺寸：720*340" />
    <Upload name="file" accept=".jpg,.jpeg,.gif,.png,.webp" :showUploadList="false" :before-upload="beforeUpload">
      <Button :loading="uploading"> Click to Upload </Button>
    </Upload>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Input, Upload, Button } from 'ant-design-vue';
  import { uploadBannerImage } from '/@/api/dev_page/sys_config';

  export default defineComponent({
    name: 'ImageUploadInput',
    components: { Input, Upload, Button },
    props: {
      value: String,
    },
    setup(props, { emit }) {
      const uploading = ref<boolean>(false);

      function onInput(e) {
        emit('change', e.target.value);
      }

      function beforeUpload(file) {
        uploading.value = true;
        const formData = new FormData();
        formData.append('file', file);
        uploadBannerImage(formData)
          .then((res) => {
            const { filePath } = res;
            emit('change', filePath);
          })
          .finally(() => {
            uploading.value = false;
          });
        return false;
      }

      return {
        uploading,
        onInput,
        beforeUpload,
      };
    },
  });
</script>

<style lang="less" scoped>
  .image-upload-input {
    display: flex;
    align-items: center;
  }
</style>
