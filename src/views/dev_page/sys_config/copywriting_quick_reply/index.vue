<template>
  <QuickDataTable title="快捷回复" :type="5" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import QuickDataTable from '../copywriting_quick_question/comp/QuickDataTable.vue';

  export default defineComponent({
    name: 'QuickReply',
    components: {
      QuickDataTable,
    },
  });
</script>
