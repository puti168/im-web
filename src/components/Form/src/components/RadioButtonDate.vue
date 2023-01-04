<!--
 * @Description:It is troublesome to implement radio button group in the form. So it is extracted independently as a separate component
-->
<template>
  <div class="warp">
    <RadioGroup  @change="handleRadioChange"  v-model:value="radioValue" button-style="solid">
      <template v-for="item in optionsArr" :key="`${item.value}`">
        <RadioButton :value="item.value" :disabled="item.disabled">
          {{ item.label }}
        </RadioButton>
      </template>      
    </RadioGroup>
    <RangePicker show-time v-model:value="timeValue"/>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, watch } from 'vue';
  import { Radio, RangePicker } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';

  type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean };
  type RadioItem = string | OptionsItem;

  export default defineComponent({
    name: 'RadioButtonGroup',
    components: {
      RangePicker,
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
    },
    props: {
      value: {
        type: [String, Number, Boolean] as PropType<string | number | boolean>,
      },
      options: {
        type: Array as PropType<RadioItem[]>,
        default: () => [],
      },
    },
    setup(props, { emit }) {

      watch(
        () => props.value,
         (val) => {
         if ( typeof val === 'string') {
          const type = parseInt(val)
          if ( type === 1 ) {
            timeValue.value = [dayjs().subtract(type,'days').startOf('days'), dayjs().subtract(type,'days').endOf('days')]
            emit('change', [dayjs().subtract(type,'days').startOf('days').format('YYYY-MM-DD HH:mm:ss'), dayjs().subtract(type,'days').endOf('days').format('YYYY-MM-DD HH:mm:ss')]);
          } else {
            timeValue.value = [dayjs().subtract(type,'days').startOf('days'), dayjs().endOf('days')]
            emit('change', [dayjs().subtract(type,'days').startOf('days').format('YYYY-MM-DD HH:mm:ss'), dayjs().endOf('days').format('YYYY-MM-DD HH:mm:ss')]);
          }   
         }
      })
      
      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props);
      const radioValue = ref(0)
      const timeValue = ref([dayjs().startOf('days'),dayjs().endOf('days')])
      const optionsArr = ref([
        { label: '昨天', value: 1 },
        { label: '今天', value: 0 },
        { label: '7天', value: 7 },
        { label: '30天', value: 30 },
      ])     

      function handleRadioChange(e) {
        const { value } = e.target;
        
        if ( value === 1 ) {
          timeValue.value = [dayjs().subtract(value,'days').startOf('days'), dayjs().subtract(value,'days').endOf('days')]
          emit('change', [dayjs().subtract(value,'days').startOf('days').format('YYYY-MM-DD HH:mm:ss'), dayjs().subtract(value,'days').endOf('days').format('YYYY-MM-DD HH:mm:ss')]);
        } else {
          timeValue.value = [dayjs().subtract(value,'days').startOf('days'), dayjs().endOf('days')]
          emit('change', [dayjs().subtract(value,'days').startOf('days').format('YYYY-MM-DD HH:mm:ss'), dayjs().endOf('days').format('YYYY-MM-DD HH:mm:ss')]);
        }   
      }

      return { state, optionsArr, handleRadioChange, radioValue, timeValue };
    },
  });
</script>

<style lang="less" scoped>
.warp {
  height: 32px;
  display: flex;
}
</style>