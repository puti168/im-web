<template>
  <PageWrapper class="chat-box" contentBackground contentClass="p-2 chat-box display-flex">
    <div class="chat-list">
      <div class="chat-list-tab">
        <div
          @click="changeCurrentTab(0)"
          class="chat-list-tab-left"
          :class="{ 'chat-list-tab-current-tab': currentTab === 0 }"
          >等待用户({{ waitCount }})</div
        >
        <div
          @click="changeCurrentTab(1)"
          class="chat-list-tab-right"
          :class="{ 'chat-list-tab-current-tab': currentTab === 1 }"
          >我的对话({{ myCount }})</div
        >
      </div>
      <div style="height: 100%">
        <div v-if="currentTab === 0" style="height: 100%">
          <div class="top">
            <a-checkbox
              v-model:checked="state.checkAll"
              @change="
                (e) => {
                  onCheckAllChange(e);
                }
              "
            >
              全选
            </a-checkbox>
            <span v-if="!state.showChat">当前等待{{ waitCount }}....</span>
            <span v-else @click="startChat" style="cursor: pointer">开始会话</span>
          </div>
          <div class="left-list-box" ref="userWaitListRef">
            <div
              class="left-list"
              v-for="item in dataReadyData"
              @mouseenter="item.showChat = true"
              @mouseleave="item.showChat = false"
            >
              <input
                type="checkbox"
                :value="item.userId + ',' + item.orderId"
                v-model="state.checkedList"
                @change="changeItem"
              />
              <!--              <input type="checkbox" value="item.id" v-model="state.checkedList" @change="(e) => changeItem(e, item)" />-->
              <div class="start-content">
                <div class="start-content-top">
                  <span>{{ item.nickName }}-{{ item.lang }}</span>
                  <span>{{ getTimeHour(Number(item.time)) }}</span>
                </div>
                <div class="start-content-bottom" v-show="item.showChat" @click="startChatItem(item)">开始会话</div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-list-list" v-else>
          <div class="chat-list-list-empty" v-if="firstLogin">
            <a-button type="primary" @click="changeFirstLogin">开始接入</a-button>
          </div>
          <div class="chat-list-list-content" v-else ref="userListRef">
            <div v-for="item in list" @click="changeId(item)">
              <div class="list-content" :class="{ curr: item.orderId === currOrderId }">
                <div class="list-content-top">
                  <div class="list-content-top-left">
                    <div class="list-content-top-name">{{ item.nickName }}-</div>
                    <div class="list-content-top-name">{{ item.lanSimpleCode }}</div>
                  </div>
                  <div class="list-content-top-time">{{ getTimeHour(Number(item.lastTime)) }}</div>
                </div>
                <div class="list-content-bottom">
                  <div class="list-content-bottom-content">{{ item.lastContent }}</div>
                  <div class="list-content-bottom-num">{{ item.hasClick ? 0 : item.unReadNum }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-middle">
      <div class="chat-right-top">
        <div class="chat-right-top-header">
          <div class="chat-right-top-header-left">
            <div>{{ currentName ? currentName + '-' + currentLang : '等待接入' }}</div>
            <div style="font-size: 12px">{{ currOrderId }}</div>
          </div>
          <div class="chat-right-top-header-right">
            <div class="chat-right-top-header-right-name">{{ userStore.getUserInfo.username }}</div>
            <div class="chat-right-top-header-right-line">
              <span class="red-dot" :class="{ red: !onLine }"></span>
              <span>{{ onLine ? '在线' : '忙碌' }}</span>
            </div>
          </div>
        </div>
        <div class="chat-right-top-footer">
          <a-button @click="changeLineStatus" size="small" style="margin-right: 10px"
            >切换{{ onLine ? '忙碌' : '在线' }}</a-button
          >
          <close-circle-outlined @click="closeOrderVue" v-if="id" />
        </div>
      </div>
      <div
        class="chat-right-content"
        ref="chatListRef"
        @scroll="
          (e) => {
            chatScroll(e);
          }
        "
      >
        <template v-if="id">
          <div v-for="item in chatListData" :key="item.id" style="width: 100%">
            <div class="chat-list-item" :class="item.sendType === 1 ? 'left' : 'right'">
              <div v-if="item.sendType === 1" class="chat-top">
                <span style="margin-right: 10px">{{ item.userNickName }}</span>
                <span>{{ getTime(Number(item.crtTime)) }}</span>
              </div>
              <div v-else class="chat-top">
                <span style="margin-right: 10px">{{ getTime(Number(item.crtTime)) }}</span>
                <span>{{ item.csNickName }}</span>
              </div>
              <div>
                <div class="chat-content">{{ item.content }}</div>
                <button v-if="item.sendType === 1" class="translate" @click="toTranslate(item.content, item)"
                  >翻译</button
                >
              </div>
              <div class="chat-content" v-if="item.isTrans">{{ item.trans }}</div>
            </div>
          </div>
          <div style="height: 50px; clear: both"></div>
        </template>
      </div>
      <div class="chat-right-input">
        <div class="input-type">
          <image @click="clickLink">链接</image>
          <image @click="clickSymbol">表情</image>
          <image @click="clickFile">文件</image>
          <image @click="clickPic">图片</image>
        </div>
        <div class="input-content">
          <textarea
            ref="textArea"
            v-model.trim="inputValue"
            v-if="id"
            @keydown.enter="(e) => enterInput(e)"
            class="input-content-input"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="chat-right">
      <div class="chat-list-tab">
        <div
          @click="changeRightTab(0)"
          class="chat-list-tab-left"
          :class="{ 'chat-list-tab-current-tab': curentRigthTab === 0 }"
          >用户信息</div
        >
        <div
          @click="changeRightTab(1)"
          class="chat-list-tab-right"
          :class="{ 'chat-list-tab-current-tab': curentRigthTab === 1 }"
          >快捷回复</div
        >
      </div>
      <div style="height: 100%">
        <div class="user-message" v-if="curentRigthTab === 0">
          <div v-if="!id" class="user-message-empty">暂无</div>
          <div v-else class="user-message-detail">
            <div class="user-message-detail-line">
              <div>用户ID:{{ userInfo?.userId }}</div>
              <copy-outlined @click="copy(userInfo.userId)" />
            </div>
            <div class="user-message-detail-line">
              <div>用户昵称:{{ userInfo?.nickName }}</div>
              <copy-outlined @click="copy(userInfo.nickName)" />
            </div>
            <div class="user-message-detail-line">
              <div>用户余额:{{ userInfo?.balance }}</div>
            </div>
            <div class="user-message-detail-line">
              <div>用户地区:{{ userInfo?.userLocation }}</div>
            </div>
            <div class="user-message-detail-line">
              <div>用户状态:{{ userInfo?.status === 1 ? '启用' : '停用' }}</div>
              <a-switch v-model:checked="userInfo.status" disabled />
            </div>
            <div class="user-message-detail-line">
              <div>用户返点:{{ userInfo?.commissionStatus === 1 ? '启用' : '停用' }}</div>
              <a-switch v-model:checked="userInfo.commissionStatus" disabled />
            </div>
            <div class="user-message-detail-line">
              <div>用户投注:{{ userInfo?.investStatus === 1 ? '启用' : '停用' }}</div>
              <a-switch v-model:checked="userInfo.investStatus" disabled /> </div
            ><div class="user-message-detail-line">
              <div>用户出款:{{ userInfo?.disbursementsStatus === 1 ? '启用' : '停用' }}</div>
              <a-switch v-model:checked="userInfo.disbursementsStatus" disabled /> </div
            ><div class="user-message-detail-line">
              <div>用户手机:{{ userInfo?.tel }}</div>
              <copy-outlined @click="copy(userInfo.tel)" /> </div
            ><div class="user-message-detail-line">
              <div>用户邮箱:{{ userInfo?.email }}</div>
              <copy-outlined @click="copy(userInfo.email)" /> </div
            ><div class="user-message-detail-line">
              <div>用户上级:{{ userInfo?.superior }}</div>
              <copy-outlined @click="copy(userInfo.superior)" /> </div
            ><div class="user-message-detail-line">
              <div>用户下级:{{ userInfo?.subordinate }}</div>
            </div>
            <div class="user-message-detail-line">
              <div>用户邀请码:{{ userInfo?.inviteCode }}</div>
              <copy-outlined @click="copy(userInfo.inviteCode)" />
            </div>
            <div class="user-message-detail-line">
              <div>用户IP:{{ 123 }}</div>
            </div>
          </div>
        </div>
        <div class="quick-replay" v-else ref="payListDataRef">
          <div class="search">
            <a-input-search
              v-model:value="searchValue"
              placeholder="输入搜索内容"
              style="width: 200px"
              @search="search"
              @pressEnter="search"
            />
          </div>
          <template v-if="payListData && payListData.length > 0">
            <div v-for="item in payListData" @mouseover="item.showSend = true" @mouseout="item.showSend = false">
              <div class="content">
                <div class="content-answer margin-bottom">{{ item.title }}</div>
                <div class="content-answer">{{ item.content }}</div>
              </div>
              <div class="send" v-show="item.showSend" @click="sendQuickReplay(item.content)"> 发送 </div>
            </div>
          </template>
          <template v-else>
            <div style="height: 100px; line-height: 100px; text-align: center; width: 100%">没有搜到相关数据</div>
          </template>
        </div>
      </div>
    </div>
    <div class="lang-select" v-show="langState.showDialog">
      <a-select
        class="select"
        v-model:value="langState.lanSimpleCode"
        :size="size"
        style="width: 200px"
        placeholder="12312312"
        :options="langState.langList.map((item) => ({ value: item.descZh }))"
        @select="seleceChange"
      >
      </a-select>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { ref, onMounted, onUnmounted, reactive, watch, nextTick } from 'vue';
  import {
    setOnlineStatus,
    queryOnlineStatus,
    queryMychatList,
    queryWaitList,
    queryCsMWChatCount,
    matchOrders,
    queryHistoryRecords,
    queryUserMessage,
    closeOrder,
    getLang,
    translate,
    getConductInfo,
  } from '/@/api/dev_page/online_service';
  import { useServiceStore } from '/@/store/modules/online-service';
  import { useUserStore } from '/@/store/modules/user';
  import { useLocaleStore } from '/@/store/modules/locale';
  import { AesEncryption } from '/@/utils/cipher';
  import SocketInstance from '/@/api/im-server/socket-instance';
  import { CopyOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
  import { formateTime, formateTimeDate } from '/@/utils/date-formate';

  const serviceStore = useServiceStore();
  const userStore = useUserStore();
  const localeStore = useLocaleStore();
  const aesEncr = new AesEncryption({ key: userStore.getUserInfo.numberStaticKey });

  const waitCount = ref(0);
  const myCount = ref(0);

  let firstLogin = ref(true);
  async function changeFirstLogin() {
    //请求列表,将列表加入我的会话中,将等待用户加入到我的会话;
    // changeLineStatusNet('1');
    //开始启动service
    startIm();
    firstLogin.value = false;
  }

  function getTime(time) {
    return formateTime(time);
  }
  function getTimeHour(time) {
    return formateTimeDate(time);
  }
  async function queryOnlineStatusVue() {
    const { status } = await queryOnlineStatus();
    // firstLogin.value = status != 1;
    // //开始接入会改变在线状态;
    onLine.value = status === 1;
  }

  onUnmounted(() => {
    // changeLineStatusNet('2');
    SocketInstance.close();
  });

  async function changeLineStatusNet(status) {
    const { opStatus } = await setOnlineStatus({
      status,
    });
    if (opStatus === 1) {
      // firstLogin.value = false;
      // //开始接入会改变在线状态;
      onLine.value = !onLine.value;
    }
    serviceStore.setServiceInfo({
      opStatus,
    });
  }
  //ws是否在线
  const wsOnline = ref(false);
  //是否在线
  const onLine = ref(false);
  function changeLineStatus() {
    // if (firstLogin.value) return;
    changeLineStatusNet(onLine.value ? '2' : '1');
  }

  if (serviceStore.getServiceInfo?.opStatus === 1) {
    // firstLogin.value = false;
    // //开始接入会改变在线状态;
    onLine.value = true;
  }
  //当前选中的id;
  const id = ref();
  const currOrderId = ref();
  const currlangId = ref();
  let currentName = ref();
  let currentLang = ref();
  const historyPageNo = ref(1);
  const historyPageLimit = ref(1);
  function changeId(item) {
    currOrderId.value = item.orderId;
    currlangId.value = item.langId;
    id.value = item.userId;
    currentName.value = item.nickName;
    currentLang.value = item.lanSimpleCode;
    item.hasClick = true;
  }
  const langState = reactive({
    langList: ref([]),
    lanSimpleCode: '英语',
    showDialog: false,
    target: '',
    currMessage: '',
  });
  let currItem = null;
  async function seleceChange() {
    if (currItem) {
      langState.showDialog = false;
      // langState.target = langState.

      const source = langState.langList.filter((item) => {
        return item.id === currlangId.value;
      })[0];
      const target = langState.langList.filter((item) => item.descZh === langState.lanSimpleCode)[0];

      const data = await translate({
        message: langState.currMessage,
        sourceLanguage: source.lanSimpleCode,
        targetLanguage: target.lanSimpleCode,
      });
      currItem.trans = data;
      currItem.isTrans = true;
    }
  }
  async function toTranslate(message, item) {
    if (langState.langList.length === 0) {
      const langTemp = await getLang();
      Object.keys(langTemp).forEach((item) => {
        langState.langList.push(langTemp[item]);
      });
    }
    currItem = item;
    //弹出选择框;
    langState.showDialog = true;
    langState.lanSimpleCode = '英语';
    langState.currMessage = message;
  }
  let preTimeHistory = 0;
  //id只要改变走接口,请求当前的聊天记录
  async function queryHistoryRecordsVue() {
    if (!id.value) return;
    const { pageCount, records, cutTime } = await queryHistoryRecords({
      cutTime: historyPageNo.value === 1 ? Date.now() : preTimeHistory,
      distributeId: userStore.getUserInfo.distributorId,
      pageNo: historyPageNo.value,
      pageSize: 10,
      userId: id.value,
    });
    historyPageNo.value++;
    preTimeHistory = cutTime;
    historyPageLimit.value = Number(pageCount);
    return records.map((item) => {
      item.content = item.content && aesEncr.decryptByAES(item.content);
      return item;
    });
  }
  const userInfo = reactive({});
  async function queryUserMessageVue() {
    const {
      balance,
      commissionStatus,
      disbursementsStatus,
      distributeId,
      email,
      investStatus,
      inviteCode,
      ip,
      nickName,
      status,
      subordinate,
      superior,
      tel,
      userId,
      userLocation,
    } = await queryUserMessage({
      distributeId: userStore.getUserInfo.distributorId,
      userId: id.value,
    });
    userInfo.balance = balance;
    userInfo.commissionStatus = commissionStatus;
    userInfo.disbursementsStatus = disbursementsStatus;
    userInfo.distributeId = distributeId;
    userInfo.email = email;
    userInfo.investStatus = investStatus;
    userInfo.inviteCode = inviteCode;
    userInfo.ip = ip;
    userInfo.nickName = nickName;
    userInfo.status = status;
    userInfo.subordinate = subordinate;
    userInfo.superior = superior;
    userInfo.tel = tel;
    userInfo.userId = userId;
    userInfo.userLocation = userLocation;
  }
  watch(
    id,
    (curr, pre) => {
      if (curr && curr !== pre) {
        //清空快速回复数据
        payListData.value = [];
        quickReplay.pageNum = 0;
        pageListVue();
        //请求网路数据
        historyPageNo.value = 1;
        chatListData.value = [];
        getData();
        queryUserMessageVue();
        nextTick(() => {
          console.log(textArea.value);
          textArea.value?.focus();
        });
      }
    },
    { deep: true, immediate: false },
  );
  //聊天数据
  const chatListData = ref([]);
  //滚动监听:
  let count = ref(0);
  const chatListRef = ref();
  async function getData() {
    let list = await queryHistoryRecordsVue();

    nextTick(() => {
      const el = chatListRef.value;
      let scrollHeight = el.scrollHeight;
      if (historyPageNo.value === 1) chatListData.value.push(...list);
      else chatListData.value.splice(0, 0, ...list);

      nextTick(() => {
        if (count.value === 0) el.scrollTop = el.scrollHeight;
        else {
          el.scrollTop = el.scrollHeight - scrollHeight;
        }
        count.value++;
      });
    });
  }
  function addData(msg, userNickName, sendType, msgType, time) {
    if (msg && msg.trim()) {
      const newMsg = {
        msgType: 1,
        sendType: 2,
        userNickName,
        crtTime: Date.now(),
      };
      newMsg.content = msg;
      if (sendType) {
        newMsg.msgType = msgType;
        newMsg.sendType = sendType;
        newMsg.crtTime = time;
      }

      newMsg.csNickName = userStore.getUserInfo.nickname;
      console.log(newMsg, '---newMsg----');
      chatListData.value.push(newMsg);
      if (!sendType) {
        SocketInstance.send({
          distributorId: userStore.getUserInfo.distributorId,
          msgType: '1',
          orderId: currOrderId.value,
          fromId: userStore.getUserInfo.userId,
          sendType: '2',
          content: aesEncr.encryptByAES(msg),
          senderNickName: userStore.getUserInfo.nickname,
          time: Date.now(),
        });
      }
    }

    nextTick(() => {
      const el = chatListRef.value;
      el.scrollTop = el.scrollHeight;
    });
  }
  function chatScroll(e) {
    console.log(historyPageNo.value, '-----');
    if (e.target.scrollTop === 0 && historyPageNo.value > 1) {
      if (historyPageNo.value > historyPageLimit.value) return;
      getData();
    }
  }
  //监听回车
  function enterInput(e) {
    if (inputValue.value) {
      addData(inputValue.value);
      inputValue.value = '';
    }
    e.preventDefault();
  }
  //监听tools点击
  function clickLink() {
    if (!id.value) return;
  }
  function clickSymbol() {
    if (!id.value) return;
  }
  function clickFile() {
    if (!id.value) return;
  }
  function clickPic() {
    if (!id.value) return;
  }
  //input-value
  let inputValue = ref('');
  let textArea = ref();
  let userListRef = ref();
  const userWaitListRef = ref();
  const userListPageNo = ref(1);
  const userWaitListPageNo = ref(1);
  const userListPageNoLimit = ref(1);
  const userWaitListPageNoLimit = ref(1);

  //网络请求
  const list = reactive([]);
  //开始执行query我的会话列表
  async function queryMychatListVue() {
    const { mlist, pageCount } = await queryMychatList({
      distributeId: userStore.getUserInfo.distributorId,
      pageNo: userListPageNo.value,
      pageSize: 10,
    });
    if (userListPageNo.value === 1) {
      list.length = 0;
    }
    list.push(
      ...mlist.map((item) => {
        item.hasClick = false;
        item.lastContent = item.lastContent ? aesEncr.decryptByAES(item.lastContent) : item.lastContent;
        return item;
      }),
    );
    userListPageNoLimit.value = Number(pageCount);
  }

  async function queryWaitListVue() {
    const { wlist, pageCount } = await queryWaitList({
      distributeId: userStore.getUserInfo.distributorId,
      pageNo: userWaitListPageNo.value,
      pageSize: 10,
    });
    dataReadyData.value.push(...wlist);
    userWaitListPageNoLimit.value = Number(pageCount);
  }
  async function queryCsMWChatCountVue() {
    const { myChatCount, waitChatCount } = await queryCsMWChatCount({
      distributeId: userStore.getUserInfo.distributorId,
    });
    waitCount.value = waitChatCount;
    myCount.value = myChatCount;
  }
  const localLanguage = {
    en: 'ENU',
  };
  onMounted(async () => {
    //开始直接接口请求;
    queryOnlineStatusVue();
    queryMychatListVue();
    queryCsMWChatCountVue();
    console.log(localeStore.getLocale, '-------', localLanguage[localeStore.getLocale]);
  });

  const quickReplay = reactive({
    pageNum: 1,
    pageSize: 10,
    pageLimitNum: 0,
  });

  watch(userListRef, (curr, pre) => {
    curr &&
      userListRef.value.addEventListener('scroll', function (e) {
        const el = e.target;
        const clientHeight = el.clientHeight;
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        if (clientHeight + scrollTop === scrollHeight) {
          if (userListPageNo.value > userListPageNoLimit.value) return;
          userListPageNo.value++;
          queryMychatListVue();
        }
      });
  });

  watch(userWaitListRef, (curr, pre) => {
    curr &&
      userWaitListRef.value.addEventListener('scroll', function (e) {
        const el = e.target;
        const clientHeight = el.clientHeight;
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        if (clientHeight + scrollTop === scrollHeight) {
          console.log('bbottom');
          if (userWaitListPageNo.value > userListPageNoLimit.value) return;
          userWaitListPageNo.value++;
          queryWaitListVue();
        }
      });
  });

  //右侧tab
  const curentRigthTab = ref(0);
  function changeRightTab(curr) {
    curentRigthTab.value = curr;
    if (curr === 1) {
      console.log(123213212);
    }
  }
  //红包list
  const payListData = ref([]);
  const payListDataRef = ref();
  const searchValue = ref('');
  const showSend = ref(false);

  function search() {
    if (!currOrderId.value) return;
    quickReplay.pageNum = 0;
    payListData.value = [];
    // todo
    pageListVue();
  }
  watch(searchValue, (curr) => {
    console.log(curr, '------curr');
    if (!curr) {
      console.log(curr, '------curr---inner');
      //重新执行请求
      search();
    }
  });
  function sendQuickReplay(content) {
    if (!id.value) return;
    addData(content);
  }
  watch(payListDataRef, (curr) => {
    curr &&
      payListDataRef.value.addEventListener('scroll', function (e) {
        const el = e.target;
        const clientHeight = el.clientHeight;
        想``;
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        if (clientHeight + scrollTop === scrollHeight) {
          if (quickReplay.pageNum > quickReplay.pageLimitNum) return;
          quickReplay.pageNum++;
          pageListVue();
        }
      });
  });
  async function pageListVue() {
    const data = await getConductInfo({
      type: 5,
      pageNum: quickReplay.pageNum,
      pageSize: quickReplay.pageSize,
      distributorId: Number(userStore.getUserInfo.distributorId),
      orderId: currOrderId.value,
      keyWord: searchValue.value,
    });
    console.log(data, '----');
    quickReplay.pageLimitNum = Number(data.pages);
    payListData.value.push(...data.conductList);
  }
  //待接入list
  const state = reactive({
    checkAll: false,
    checkedList: [],
    showChat: false,
  });
  const dataReadyData = ref([]);
  function onCheckAllChange(e) {
    if (e.target.checked) {
      state.showChat = true;
    } else {
      state.showChat = false;
    }
    Object.assign(state, {
      checkedList: e.target.checked ? dataReadyData.value.map((item) => item.userId + ',' + item.orderId) : [],
    });
  }
  function changeItem(e) {
    state.checkAll = state.checkedList.length === dataReadyData.value.length;
    if (state.checkedList.length > 0) {
      state.showChat = true;
    } else state.showChat = false;
  }
  async function startChat() {
    if (state.checkedList.length === 0) return;
    const data = await matchOrders({
      distributorId: userStore.getUserInfo.distributorId,
      csId: userStore.getUserInfo.userId,
      orderBaseInfos: state.checkedList.map((item) => {
        return {
          orderId: item.split(',')[1],
          userId: item.split(',')[0],
        };
      }),
    });
    if (data?.matchResList.length > 0) {
      dataReadyData.value = [];
      queryWaitListVue();
      queryCsMWChatCountVue();
    }
  }
  async function startChatItem(item) {
    console.log(item, '----');
    const data = await matchOrders({
      distributorId: userStore.getUserInfo.distributorId,
      csId: userStore.getUserInfo.userId,
      orderBaseInfos: [
        {
          orderId: item.orderId,
          userId: item.userId,
        },
      ],
    });
    if (data?.matchResList.length > 0) {
      dataReadyData.value = [];
      queryWaitListVue();
      queryCsMWChatCountVue();
    }
  }
  function copy(text) {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', text);
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      console.log('复制成功');
    }
    document.body.removeChild(input);
  }
  //tab切换,首次进入
  let currentTab = ref(1);
  function changeCurrentTab(curr) {
    if (currentTab.value === curr) return;
    // if (firstLogin.value) return;
    currentTab.value === 1 ? (currentTab.value = 0) : (currentTab.value = 1);
    if (currentTab.value === 0) {
      dataReadyData.value = [];
      userWaitListPageNo.value = 1;
      queryWaitListVue();
    } else {
      list.splice(0, list.length);
      userListPageNo.value = 1;
      queryMychatListVue();
    }
  }
  function startIm() {
    SocketInstance.connect();
    SocketInstance.on('message', (data) => {
      //增加防抖
      if (data.msgType === 9 || data.msgType === 12) {
        //用户发起关单操作,发送到客服端,清空orderid,刷新列表
        id.value = null;
        if (currentTab.value === 1) {
          list.splice(0, list.length);
          userListPageNo.value = 1;
          queryMychatListVue();
          queryCsMWChatCountVue();
        }
      } else if (data.msgType === 10) {
        //表示有会话匹配成功,需要自动刷新页面
        if (currentTab.value === 1) {
          list.splice(0, list.length);
          userListPageNo.value = 1;
          queryMychatListVue();
          queryCsMWChatCountVue();
        }
      } else if (data.msgType === 11) {
        //表示有会话匹配成功,需要自动刷新页面
        queryCsMWChatCountVue();
      } else {
        console.log(currOrderId.value, data.orderId);
        //如果订单id不是当前的,不执行;如果当前的id,执行addData操作;
        if (currOrderId.value === data.orderId) {
          list.forEach((item, index) => {
            if (item.orderId === currOrderId.value) {
              // item.content = data.content;
              list[index].lastContent = aesEncr.decryptByAES(data.content);
              list[index].lastTime = data.time;
              // console.log(list[index].content);
              console.log(list[index], '----', list);
            }
          });
          addData(aesEncr.decryptByAES(data.content), data.senderNickName, data.sendType, data.msgType, data.time);
        } else {
          //刷新页面;
          if (currentTab.value === 1) {
            list.splice(0, list.length);
            userListPageNo.value = 1;
            queryMychatListVue();
            queryCsMWChatCountVue();
          }
        }
      }
    });
  }
  async function closeOrderVue() {
    const { op } = await closeOrder({
      distributorId: userStore.getUserInfo.distributorId,
      orderId: currOrderId.value,
    });
    if (op === 1) {
      id.value = null;
      currOrderId.value = null;
      list.splice(0, list.length);
      userListPageNo.value = 1;
      queryMychatListVue();
      queryCsMWChatCountVue();
    }
  }
</script>
<style lang="less">
  .chat-box {
    height: 700px;
    background-color: #f5f5f5;

    .display-flex {
      display: flex;
    }

    .chat-list {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 282px;
      margin-right: 10px;
      background-color: #ffffff;

      &-list {
        height: 100%;
        flex: 1;

        .list-content {
          height: 66px;
          border-radius: 10px;
          background-color: #f2f2f2;
          padding-top: 12px;
          padding-left: 15px;
          padding-right: 15px;
          margin: 15px;

          &-top {
            display: flex;
            justify-content: space-between;

            &-left {
              display: flex;
            }

            &-name {
              color: #555555;
              font-size: 13px;
            }
          }

          &-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &-content {
              flex: 1;
              font-size: 12px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            &-num {
              width: 22px;
              height: 22px;
              line-height: 22px;
              text-align: center;
              color: #ffffff;
              background-color: #d9001b;
              border-radius: 100%;
            }
          }
        }
        .curr {
          background-color: #d7d7d7;
        }

        &-empty {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        &-content {
          height: 100%;
          overflow: scroll;
          padding-bottom: 50px;
        }
      }
    }

    .chat-middle {
      display: flex;
      flex: 1;
      flex-direction: column;
      margin-right: 10px;

      .chat-right-top {
        height: 100px;
        background-color: #ffffff;
        padding: 10px;

        &-header {
          display: flex;
          justify-content: space-between;

          &-left {
            font-size: 14px;
            color: #797979;
          }

          &-right {
            font-size: 12px;
            color: #797979;

            &-line {
              display: flex;
              justify-content: center;
              align-items: center;

              .red-dot {
                width: 8px;
                height: 8px;
                background-color: #95f204;
                border-radius: 8px;
                margin-right: 5px;
              }
              .red {
                background-color: red;
              }
            }
          }
        }

        &-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: 20px;
          margin-bottom: 10px;
        }
      }

      .chat-right-content {
        width: 100%;
        flex: 2;
        background-color: #ffffff;
        margin-top: 10px;
        overflow-y: scroll;
      }

      .chat-right-input {
        display: flex;
        flex-direction: column;
        flex: 1;
        background-color: #ffffff;

        .input-type {
          display: flex;
          align-items: center;
          height: 30px;
          background-color: #ebebeb;

          image {
            margin-right: 10px;
          }
        }

        .input-content {
          flex: 1;

          .input-content-input {
            width: 100%;
            height: 100%;
            padding: 10px;
          }
        }
      }
    }

    .chat-right {
      width: 240px;
      height: 100%;
      background-color: #ffffff;
    }
  }

  .chat-list-item {
    //width: 50%;
    width: 100%;
    font-size: 12px;
    color: #555555;
    margin: 10px 0;

    .chat-content {
      display: inline-block;
      background-color: #f5f5f5;
      border-radius: 10px;
      padding: 10px;
    }
    .translate {
      margin-left: 10px;
    }
    .translate:hover {
      color: #0960bd;
    }
  }

  .left {
    float: left;
    margin-left: 10px;
    margin-right: 100px;
  }

  .right {
    float: right;
    text-align: right;
    margin-right: 10px;
  }

  .chat-list-tab {
    display: flex;
    height: 43px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &-left,
    &-right {
      flex: 1;
      text-align: center;
      line-height: 43px;
      color: #d7d7d7; //7f7f7f
      cursor: pointer;
    }

    &-current-tab {
      color: #7f7f7f;
    }
  }

  .top {
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: #797979;
    font-size: 13px;
  }

  .user-message {
    &-empty {
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #797979;
    }

    &-detail {
      padding: 10px;
      color: #797979;

      &-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        div {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 10px;
        }
      }
    }
  }

  .quick-replay {
    height: 100%;
    padding: 10px;
    overflow: auto;
    padding-bottom: 50px;

    .search {
      &-input {
        height: 30px;
        line-height: 30px;
        border: 1px solid #797979;
        border-radius: 5px;
        padding: 0 5px;
      }
    }

    .content {
      font-size: 12px;
      border-radius: 5px;
      background-color: #ebebeb;
      padding: 10px;
      margin: 10px 0;

      .content-answer {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .margin-bottom {
        margin-bottom: 10px;
      }
    }

    .send {
      height: 25px;
      line-height: 25px;
      text-align: center;
      border: 1px solid #ebebeb;
      border-radius: 5px;
    }
  }
  .left-list-box {
    height: 100%;
    overflow: scroll;
    padding-bottom: 100px;
  }
  .left-list {
    display: flex;
    align-items: center;
    height: 66px;
    background-color: #ebebeb;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;

    &:hover {
      background-color: #e0e0e0;
    }

    .start-content {
      width: 100%;
      padding: 0 10px;

      &-top {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      &-bottom {
        width: 58px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: #ffffff;
        border-radius: 5px;
        font-size: 12px;
        margin-top: 10px;

        &:hover {
          color: #0960bd;
        }
      }
    }
  }

  .lang-select {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(240 242 245 / 70%);

    .select {
      position: absolute;
      top: 20%;
      left: 40%;
      transform: translate(-50%, -50%);
      width: 200px;
    }
  }
</style>
