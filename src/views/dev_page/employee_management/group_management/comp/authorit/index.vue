<template>
  <BasicModal v-bind="$attrs" @register="register" title="权限" @visible-change="handleVisibleChange" @ok="handleOK">
    <div class="pr-3px">
      <!-- 树选择 \src\views\demo\tree\index.vue -->
      <BasicForm @register="registerForm" :model="modelRef" />
    </div>
    <Spin :spinning="treeLoading">
      <BasicTree ref="asyncExpandTreeRef" :checkable="true" defaultExpandAll @check="handleCheck" :treeData="tree" />
    </Spin>
  </BasicModal>
</template>
<script lang="ts">
  import { Spin } from 'ant-design-vue';
  import { BasicTree, TreeActionType } from '/@/components/Tree/index';
  import { defineComponent, ref, nextTick, unref, onMounted } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getMenuList } from '/@/api/sys/menu';
  import { schemas } from './data';
  import { updateGroup, getGroupById } from '/@/api/dev_page/employee_management';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    components: { BasicModal, BasicForm, Spin, BasicTree },
    props: {
      userData: { type: Object },
    },
    setup(props, { emit }) {
      // 传过来的值
      const { createMessage } = useMessage();
      const modelRef = ref<Recordable | any>({});
      const menuList = ref([]);
      const [registerForm, { validate, resetFields }] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function handleOK() {
        validate()
          .then(async (res) => {
            console.log(res);
            if (res) {
              console.log(selectKey, 'selectKey');
              let arr: any = [];
              selectKey.forEach((item) => {
                arr.push({ id: item });
              });
              // setListForKey(menuList.value)
              res.menuList = arr;
              res.id = id.value;
              console.log(res, '---参数');
              await updateGroup(res);
              console.log(modelRef.value);
              emit('reloadTable');
              createMessage.success('保存成功');
              closeModal();
            }
          })
          .catch((e) => {
            console.error(e, 'dsa');
          });
      }
      let selectKey: any[] = [];
      let id = ref<string>('');
      function onDataReceive(data) {
        //初始和表单
        modelRef.value = data;
        id.value = data.id;
        getGroupById({ id: data.id })
          .then((res: any) => {
            menuList.value = res.menuList;
            modelRef.value.name = res.name;
            setTreeForkey();
          })
          .catch(() => {});
      }
      function setTreeForkey() {
        selectKey = [];
        setKeyForList(menuList.value);
        getTree().setCheckedKeys(selectKey);
      }
      function setKeyForList(list: any[]) {
        list.forEach((item: any) => {
          if (item.childrens && item.childrens.length > 0) {
            setKeyForList(item.childrens);
          } else if (item.checked) {
            selectKey.push(item.id);
          }
        });
      }
      // function setListForKey(list: any[]) {
      //   list.forEach((item) => {
      //     if (selectKey.includes(item.id)) item.checked = true;
      //     else item.checked = false;
      //     if (item.childrens && item.childrens.length > 0) setListForKey(item.childrens);
      //   });
      // }
      function getTree() {
        const tree = unref(asyncExpandTreeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }
      //监听关闭打开
      function handleVisibleChange(v) {
        if (!v) resetFields();
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }
      const tree = ref<any>([]);

      const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);
      const treeLoading = ref(false);
      async function loadTreeData() {
        treeLoading.value = true;
        tree.value = await getMenuList();
        treeLoading.value = false;
        // 展开全部
        nextTick(() => {
          unref(asyncExpandTreeRef)?.expandAll(true);
        });
        console.log(tree.value, 'tree data');
      }
      function handleCheck(data, { halfCheckedKeys = [] }) {
        selectKey = [...data, ...halfCheckedKeys];
      }
      onMounted(() => {
        if (tree.value.length <= 0) loadTreeData();
      });
      return {
        tree,
        loadTreeData,
        asyncExpandTreeRef,
        treeLoading,
        handleCheck,
        register,
        schemas,
        registerForm,
        modelRef,
        handleVisibleChange,
        handleOK,
      };
    },
  });
</script>
