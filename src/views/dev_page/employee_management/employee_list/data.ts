import {
  BasicColumn,
  FormSchema,
} from '/@/components/Table';
import { getGroupPageList } from '/@/api/dev_page/employee_management';
import { getLangList } from '/@/api/dev_page/history_record';
import { formateTime } from '/@/utils/date-formate';


export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'name',
    width: 120,
  }, {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  }, {
    title: '状态',
    dataIndex: 'status',
    width: 50,
  }, {
    title: '所属组别',
    dataIndex: 'groupName',
    width: 120,
  }, {
    title: '最后登录时间',
    dataIndex: 'lastLoginTime',
    width: 150,
    customRender: ({ record }) => {
      return record.lastLoginTime === -1 ? null : formateTime(record.lastLoginTime);
    },
  }, {
    title: '最后登录IP',
    dataIndex: 'lastLoginIp',
    width: 120,
  }, {
    title: '备注',
    dataIndex: 'remark',
    width: 120,
  }
];

export const schemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    defaultValue: '',
    label: 'id',
    show:false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'name',
    component: 'Input',
    defaultValue: '',
    rules: [{ required: true }],
    label: '登录账号',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'password',
    component: 'Input',
    componentProps: {
      type: 'password'
    },
    defaultValue: '',
    ifShow({model}) {
        return !model.id
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          value = value.replace(/\s*/g,"");
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('值不能为空');
          }
          if (value.length < 6) {
            /* eslint-disable-next-line */
            return Promise.reject('密码不能少于6位');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
    label: '登录密码',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'password2',
    component: 'Input',
    componentProps: {
      type: 'password'
    },
    defaultValue: '',
    dynamicRules({model}) {
        return [
          {
            required: true,
            // @ts-ignore
            validator: async (rule, value) => {
              if (!value) {
                /* eslint-disable-next-line */
                return Promise.reject('值不能为空');
              }
              if (value != model.password) {
                /* eslint-disable-next-line */
                return Promise.reject('两次密码不一致');
              }
              return Promise.resolve();
            },
            trigger: 'blur',
          },
        ]
    },
    label: '确认密码',
    colProps: {
      span: 24,
    },
    ifShow({model}) {
        return !model.id
    },
  },
  {
    field: 'groupId',
    component: 'ApiSelect',
    label: '所属组别',
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('请选择组别');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
    componentProps: {
      // more details see /src/components/Form/src/components/ApiSelect.vue
      api: getGroupPageList,
      params: {
        page: 1,
        pageSize: 9999
      },
      resultField: 'items',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'langIds',
    component: 'ApiSelect',
    componentProps: {
      api: getLangList,
      params: {},
      resultField: 'items',
      // use name as label
      labelField: 'descZh',
      // use id as value
      valueField: 'id',
      mode: 'multiple',
      immediate: true,
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (value.length <= 0) {
            /* eslint-disable-next-line */
            return Promise.reject('至少选择一种语言');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
    label: '使用语言',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'nickname',
    component: 'Input',
    componentProps: {
    },
    defaultValue: '',
    rules: [{ required: true }],
    label: '昵称',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'status',
    component: 'RadioGroup',
    rules: [{ required: true }],
    label: '状态',
    componentProps: {
      options: [
        {
          label: '启用',
          value: "0",
          key: 'VIP0',
        },
        {
          label: '禁用',
          value: "1",
          key: 'VIP1',
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    defaultValue: '',
    rules: [{ required: true }],
    label: '备注',
    colProps: {
      span: 24,
    },
  },
];
