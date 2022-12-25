// import config from '@/config/config';

import WsSocket from './ws-socket';
// import { get } from '@/utils/localStorage';
// import { Notification } from 'element-ui'
import { useUserStore } from '../../store/modules/user';

// 引入消息处理类
// import KeyboardEvent from '@/im-server/event/keyboard'
// import LoginEvent from '@/im-server/event/login'
// import TalkEvent from '@/im-server/event/talk'
// import RevokeEvent from '@/im-server/event/revoke'
// import GroupJoinEvent from '@/im-server/event/group-join'
// import FriendApplyEvent from '@/im-server/event/friend-apply'

/**
 * SocketInstance 连接实例
 *
 * 注释: 所有 WebSocket 消息接收处理在此实例中处理
 */
class SocketInstance {
  /**
   * WsSocket 实例
   */
  socket;

  /**
   * SocketInstance 初始化实例
   */
  constructor() {
    this.socket = new WsSocket(
      () => {
        const userStore = useUserStore();
        console.log(userStore.getUserInfo.userId, '----');
        let token = userStore.getToken;

        if (!token) {
          window.location.reload();
        }
        return `ws://13.228.27.17/long-connecting/ws/cs?Auth=` + token;
      },
      {
        onError: (evt) => {
          console.log('Websocket 连接失败回调方法', evt);
        },
        // Websocket 连接成功回调方法
        onOpen: (evt) => {
          console.log(evt);
          // 更新 WebSocket 连接状态
        },
        // Websocket 断开连接回调方法
        onClose: (evt) => {
          console.log(evt);
          // 更新 WebSocket 连接状态
        },
      },
    );

    this.registerEvents();
  }

  // 连接 WebSocket 服务
  connect() {
    this.socket.connection();
  }

  /**
   * 注册回调消息处理事件
   */
  registerEvents() {
    this.socket.on('heartbeat', (data) => {
      console.log(data, '------------heartbeat-------------');
    });

    this.socket.on('event_talk', (data) => {
      // new TalkEvent(data).handle()
    });
    //
    // this.socket.on('event_login', (data) => {
    //   new LoginEvent(data).handle()
    // })

    this.socket.on('event_talk_keyboard', (data) => {
      // new KeyboardEvent(data).handle()
    });

    // this.socket.on('event_talk_revoke', (data) => {
    //   new RevokeEvent(data).handle()
    // })
    //
    // this.socket.on('event_contact_apply', (data) => {
    //   new FriendApplyEvent(data).handle()
    // })
    //
    // this.socket.on('event_talk_join_group', (data) => {
    //   new GroupJoinEvent(data).handle()
    // })

    // this.socket.on('event_error', (data) => {
    //   Notification({
    //     title: '友情提示',
    //     message: data.message,
    //     type: 'warning'
    //   })
    // })
  }

  /**
   * 聊天发送数据
   *
   * @param {Object} mesage
   */
  send(mesage) {
    this.socket.send(mesage);
  }

  /**
   * 推送消息
   *
   * @param {String} event 事件名
   * @param {Object} data 数据
   */
  emit(event, data) {
    this.socket.emit(event, data);
  }

  /**
   * 订阅消息
   *
   *
   */
  on(event, fn) {
    this.socket.on(event, fn);
  }

  /**
   * close;
   * 前端增加关闭;
   * 1:前端:客服手动打开ws;
   * 2:前端:每次进入页面开始接单都会显示;
   * 3:前端:右上角控制客服状态;status
   * 4:前端+后端:客服端订单关闭,服务端发送消息;用户关闭订单,ws关闭,后端推送消息到客服,清空order_id和刷新会话列表;
   * 5:前端+后端:新的会话, 新增message_type用于刷新会话列表
   */
  close() {
    this.socket.close();
  }
}

export default new SocketInstance();
