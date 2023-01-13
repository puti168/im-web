<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="distributorId" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.distributorId"
        :placeholder="t('sys.login.distributorId')"
        class="fix-auto-fill"
      />
    </FormItem>

    <FormItem name="userName" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.userName"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="pwd" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.pwd"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>
    <FormItem name="secretCode" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.secretCode"
        :placeholder="t('sys.login.secretCode')"
        class="fix-auto-fill"
      />
    </FormItem>
    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <!-- <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
        
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol> -->
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
    <template v-if="false">
      <ARow class="enter-x">
        <ACol :md="8" :xs="24">
          <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
            {{ t('sys.login.mobileSignInFormTitle') }}
          </Button>
        </ACol>
        <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
          <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
            {{ t('sys.login.qrSignInFormTitle') }}
          </Button>
        </ACol>
        <ACol :md="6" :xs="24">
          <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
            {{ t('sys.login.registerButton') }}
          </Button>
        </ACol>
      </ARow>

      <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

      <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
        <GithubFilled />
        <WechatFilled />
        <AlipayCircleFilled />
        <GoogleCircleFilled />
        <TwitterCircleFilled />
      </div>
    </template>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed, onMounted } from 'vue';

  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';

  //import { onKeyStroke } from '@vueuse/core';

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);

  const formData = reactive({
    userName: '',
    pwd: '',
    distributorId: '',
    secretCode: '',
  });

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  onMounted(() => {
    let userName = localStorage.getItem('userName');
    let password = localStorage.getItem('password');
    let distributorId = localStorage.getItem('distributorId');
    if (userName) {
      formData.userName = userName;
      formData.pwd = password;
      formData.distributorId = distributorId;
    }
  });

  async function handleLogin() {
    const data = await validForm();

    if (!data) return;
    try {
      loading.value = true;
      console.log(data, '---data---');

      const userInfo = await userStore.login({
        distributorId: data.distributorId,
        secretCode: Number(data.secretCode),
        name: data.userName,
        password: data.pwd,
        mode: 'none', //不要默认的错误提示
      });
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.nickname}`,
          duration: 3,
        });
      }

      if (rememberMe.value) {
        localStorage.setItem('distributorId', data.distributorId);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('password', data.pwd);
      }
    } catch (error) {
      // createErrorModal({
      //   title: t('sys.api.errorTip'),
      //   content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
      //   getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      // });
    } finally {
      loading.value = false;
    }
  }
</script>
