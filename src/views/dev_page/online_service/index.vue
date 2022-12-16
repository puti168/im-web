<template>
  <PageWrapper class="chat-box" contentBackground contentClass="p-2 chat-box display-flex">
    <div class="chat-list">
      <div class="chat-list-tab">
        <div
          @click="changeCurrentTab(0)"
          class="chat-list-tab-left"
          :class="{ 'chat-list-tab-current-tab': currentTab === 0 }"
          >等待用户</div
        >
        <div
          @click="changeCurrentTab(1)"
          class="chat-list-tab-right"
          :class="{ 'chat-list-tab-current-tab': currentTab === 1 }"
          >我的对话</div
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
            <span>当前等待{{ 233 }}....</span>
          </div>
          <div class="left-list-box">
            <div
              class="left-list"
              v-for="item in dataReadyData"
              @mouseenter="item.showChat = true"
              @mouseleave="item.showChat = false"
            >
              <input type="checkbox" :value="item.id" v-model="state.checkedList" @change="changeItem" />
              <!--              <input type="checkbox" value="item.id" v-model="state.checkedList" @change="(e) => changeItem(e, item)" />-->
              <div class="start-content">
                <div class="start-content-top">
                  <span>{{ item.name }}-{{ item.lang }}</span>
                  <span>{{ item.time }}</span>
                </div>
                <div class="start-content-bottom" v-show="item.showChat">开始会话</div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-list-list" v-else>
          <div @click="changeFirstLogin" class="chat-list-list-empty" v-if="firstLogin">
            <a-button type="primary">开始接入</a-button>
          </div>
          <div class="chat-list-list-content" v-else>
            <div v-for="item in list" @click="changeId(item)">
              <div class="list-content">
                <div class="list-content-top">
                  <div class="list-content-top-left">
                    <div class="list-content-top-name">{{ item.name }}</div>
                    <div class="list-content-top-name">{{ item.lang }}</div>
                  </div>
                  <div class="list-content-top-time">{{ item.timeStamp }}</div>
                </div>
                <div class="list-content-bottom">
                  <div class="list-content-bottom-content">{{ item.content }}</div>
                  <div class="list-content-bottom-num">{{ item.num }}</div>
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
          <div class="chat-right-top-header-left">{{ currentName ? currentName + '-' + currentLang : '等待接入' }}</div>
          <div class="chat-right-top-header-right">
            <div class="chat-right-top-header-right-name">tom001</div>
            <div class="chat-right-top-header-right-line">
              <span class="red-dot" :class="{ red: !onLine }"></span>
              <span>{{ onLine ? '在线' : '忙碌' }}</span>
            </div>
          </div>
        </div>
        <div class="chat-right-top-footer" @click="changeLineStatus">
          <a-button size="small">切换{{ onLine ? '忙碌' : '在线' }}</a-button>
          <image>1</image>
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
            <div class="chat-list-item" :class="item.float === 'left' ? 'left' : 'right'">
              <div v-if="item.float === 'left'" class="chat-top">
                <span>{{ item.nickname }}</span
                ><span>{{ 'tom' }}</span>
              </div>
              <div v-else class="chat-top">
                <span>{{ 'tom' }}</span>
                <span>{{ item.nickname }}</span>
              </div>
              <div class="chat-content">{{ item.content }}</div>
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
          @click="changeRightTab"
          class="chat-list-tab-left"
          :class="{ 'chat-list-tab-current-tab': curentRigthTab === 0 }"
          >用户信息</div
        >
        <div
          @click="changeRightTab"
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
              <div>用户ID:{{ 123 }}</div>
              <image>复制</image>
            </div>
            <div class="user-message-detail-line">
              <div>用户昵称:{{ 123 }}</div>
              <image>复制</image>
            </div>
            <div class="user-message-detail-line">
              <div>用户余额:{{ 123 }}</div>
            </div>
            <div class="user-message-detail-line">
              <div>用户地区:{{ 123 }}</div>
            </div>
            <div class="user-message-detail-line">
              <div>用户状态:{{ 123 }}</div>
              <a-switch v-model:checked="checked" />
            </div>
            <div class="user-message-detail-line">
              <div>用户返点:{{ 123 }}</div>
              <a-switch v-model:checked="checked" />
            </div>
            <div class="user-message-detail-line">
              <div>用户投注:{{ 123 }}</div>
              <a-switch v-model:checked="checked" /> </div
            ><div class="user-message-detail-line">
              <div>用户出款:{{ 123 }}</div>
              <a-switch v-model:checked="checked" /> </div
            ><div class="user-message-detail-line">
              <div>用户手机:{{ 123 }}</div>
              <image>复制</image> </div
            ><div class="user-message-detail-line">
              <div>用户邮箱:{{ 123 }}</div>
              <image>复制</image> </div
            ><div class="user-message-detail-line">
              <div>用户上级:{{ 123 }}</div>
              <image>复制</image> </div
            ><div class="user-message-detail-line">
              <div>用户下级:{{ 123 }}</div>
            </div>
            <div class="user-message-detail-line">
              <div>用户邀请码:{{ 123 }}</div>
              <image>复制</image>
            </div>
            <div class="user-message-detail-line">
              <div>用户IP:{{ 123 }}</div>
            </div>
          </div>
        </div>
        <div class="quick-replay" v-else>
          <div class="search">
            <a-input-search
              v-model:value="searchValue"
              placeholder="输入搜索内容"
              style="width: 200px"
              @search="search"
            />
          </div>
          <div v-for="item in payListData" @mouseover="item.showSend = true" @mouseout="item.showSend = false">
            <div class="content">
              <div class="content-answer margin-bottom">{{ item.question }}</div>
              <div class="content-answer">{{ item.answer }}</div>
            </div>
            <div class="send" v-show="item.showSend" @click="sendQuickReplay(item.answer)"> 发送 </div>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { ref, onMounted, reactive, watch, nextTick } from 'vue';
  import listData from './data';
  import listData2 from './data2';
  import listData3 from './data3';
  import dataReady from './data-ready';
  //tab切换,首次进入
  let currentTab = ref(1);
  function changeCurrentTab(curr) {
    if (currentTab.value === curr) return;
    // if (firstLogin.value) return;
    currentTab.value === 1 ? (currentTab.value = 0) : (currentTab.value = 1);
  }
  let firstLogin = ref(true);
  function changeFirstLogin() {
    //请求列表,将列表加入我的会话中,将等待用户加入到我的会话;
    firstLogin.value = false;
    //开始接入会改变在线状态;
    onLine.value = true;
  }
  //是否在线
  const onLine = ref(false);
  function changeLineStatus() {
    if (firstLogin.value) return;
    onLine.value = !onLine.value;
  }
  //当前选中的id;
  const id = ref();
  let currentName = ref();
  let currentLang = ref();
  function changeId(item) {
    console.log(item);
    id.value = item.id;
    currentName.value = item.name;
    currentLang.value = item.lang;
  }
  //id只要改变走接口,请求当前的聊天记录
  watch(
    id,
    (curr, pre) => {
      if (curr && curr !== pre) {
        //请求网路数据
        getData();
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
  function getData() {
    chatListData.value = [];

    nextTick(() => {
      const el = chatListRef.value;
      let scrollHeight = el.scrollHeight;
      chatListData.value = [...listData];

      nextTick(() => {
        if (count.value === 0) el.scrollTop = el.scrollHeight;
        else {
          el.scrollTop = el.scrollHeight - scrollHeight;
        }
        count.value++;
      });
    });
  }
  function addData(msg) {
    const newMsg = {
      avatar: 'https://im.gzydong.club/public/media/image/avatar/20221124/ea1bf7400e61fad835ad72c2c9e985b1_200x200.png',
      content: 'tom',
      nickname: 'kert',
      id: 8,
      user_id: '123',
      receiver_id: '312',
      float: 'right',
    };
    newMsg.content = msg;
    chatListData.value.push(newMsg);

    nextTick(() => {
      const el = chatListRef.value;
      el.scrollTop = el.scrollHeight;
    });
  }
  function chatScroll(e) {
    console.log(e);
    if (e.target.scrollTop === 0) {
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
  //网络请求
  const list = reactive(listData2);
  onMounted(() => {
    //开始直接接口请求;
    console.log('mounted');
    payListData.value = [...listData3];
  });
  //右侧tab
  const curentRigthTab = ref(0);
  function changeRightTab() {
    curentRigthTab.value === 1 ? (curentRigthTab.value = 0) : (curentRigthTab.value = 1);
  }
  //红包list
  const payListData = ref([]);
  const searchValue = ref('');
  const showSend = ref(false);
  function search() {
    console.log(123);
  }
  function sendQuickReplay(content) {
    if (!id) return;
    addData(content);
  }
  //待接入list
  const state = reactive({
    checkAll: false,
    checkedList: [],
  });
  const dataReadyData = ref(dataReady);
  function onCheckAllChange(e) {
    Object.assign(state, {
      checkedList: e.target.checked ? dataReadyData.value.map((item) => item.id) : [],
    });
  }
  function changeItem(e) {
    state.checkAll = state.checkedList.length === dataReady.length;
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
          padding: 15px 20px;
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
    width: 50%;
    background-color: #f5f5f5;
    font-size: 12px;
    color: #555555;
    margin: 10px 0;
    padding: 10px;
    border-radius: 10px;
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
        margin-bottom: 10px;
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
      height: 15px;
      line-height: 15px;
      text-align: center;
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
</style>
