// import { get } from '@/utils/localStorage'
// import store from '@/store/index'
import { useUserStore } from '../../store/modules/user';

class WsSocket {
  /**
   * Websocket 连接
   *
   * @var Websocket
   *
   */
  connect = null;

  /**
   * 配置信息
   *
   * @var Object
   */
  config = {
    heartbeat: {
      setInterval: null,
      pingInterval: 60 * 1000, //60s
      pingTimeout: 180 * 1000, //180s
    },
    reconnect: {
      lockReconnect: false,
      setTimeout: null, // 计时器对象
      time: 5000, // 重连间隔时间
      number: 1000, // 重连次数
    },
  };

  // 最后心跳时间
  lastTime = 0;

  /**
   * 自定义绑定消息事件
   *
   * @var Array
   */
  onCallBacks = [];

  defaultEvent = {
    onError: (evt) => {
      console.log(evt);
    },
    onOpen: (evt) => {
      console.log(evt);
    },
    onClose: (evt) => {
      console.log(evt);
    },
  };

  /**
   * 创建 WsSocket 的实例
   *
   * @param {Function} urlCallBack url闭包函数
   * @param {Object} events 原生 WebSocket 绑定事件
   */
  constructor(urlCallBack, events) {
    this.urlCallBack = urlCallBack;
    // 定义 WebSocket 原生方法
    this.events = Object.assign({}, this.defaultEvent, events);
    this.count = 0;

    // this.on('connect', (data) => {
    //   this.config.heartbeat.pingInterval = data.ping_interval * 1000;
    //   this.config.heartbeat.pingTimeout = data.ping_timeout * 1000;
    //   this.heartbeat();
    // });
  }

  /**
   * 事件绑定
   *
   * @param {String} event 事件名
   * @param {Function} callBack 回调方法
   */
  on(event, callBack) {
    this.onCallBacks[event] = callBack;

    return this;
  }

  /**
   * 加载 WebSocket
   */
  loadSocket() {
    const url = this.urlCallBack();

    const connect = new WebSocket(url);
    connect.onerror = this.onError.bind(this);
    connect.onopen = this.onOpen.bind(this);
    connect.onmessage = this.onMessage.bind(this);
    connect.onclose = this.onClose.bind(this);

    this.connect = connect;
  }

  /**
   * 连接 Websocket
   */
  connection() {
    this.connect == null && this.loadSocket();
    return this;
  }

  reconnectNormal() {
    // 没连接上会一直重连，设置延迟避免请求过多
    clearTimeout(this.config.reconnect.setTimeout);

    this.config.reconnect.setTimeout = setTimeout(() => {
      this.connection();
      console.log(`网络连接已断开，正在尝试重新连接...`);
    }, this.config.reconnect.time);
  }

  /**
   * 掉线重连 Websocket
   */
  reconnect() {
    // 没连接上会一直重连，设置延迟避免请求过多
    clearTimeout(this.config.reconnect.setTimeout);

    this.config.reconnect.setTimeout = setTimeout(() => {
      if (this.count > 3) return;
      this.connection();
      this.count++;
      console.log(`网络连接已断开，正在尝试重新连接...`);
    }, this.config.reconnect.time);
  }

  /**
   * 解析接受的消息
   *
   * @param {Object} evt Websocket 消息
   */
  onParse(evt) {
    const { csId, content, distributorId, fromId, msgType, sendType, userId, time, orderId, senderNickName, langId } =
      JSON.parse(evt.data);

    return {
      content: content,
      csId: csId,
      distributorId: distributorId,
      fromId: fromId,
      msgType: msgType,
      sendType: sendType,
      userId: userId,
      time: time,
      orderId: orderId,
      senderNickName: senderNickName,
      langId,
    };
  }

  /**
   * 打开连接
   *
   * @param {Object} evt Websocket 消息
   */
  onOpen(evt) {
    this.lastTime = new Date().getTime();

    this.events.onOpen(evt);
    this.config.heartbeat.setInterval && clearTimeout(this.config.heartbeat.setInterval);
    this.heartbeat();
    this.ping();
  }

  /**
   * 关闭连接
   *
   * @param {Object} evt Websocket 消息
   */
  onClose(evt) {
    this.events.onClose(evt);

    this.connect.close();

    this.connect = null;

    evt.code == 1006 && this.reconnect();
  }

  /**
   * 连接错误
   *
   * @param {Object} evt Websocket 消息
   */
  onError(evt) {
    this.events.onError(evt);
    this.connect.close();
    this.connect = null;
    this.reconnect();
  }

  /**
   * 接收消息
   *
   * @param {Object} evt Websocket 消息
   */
  onMessage(evt) {
    this.lastTime = new Date().getTime();

    let result = this.onParse(evt);

    // 判断消息事件是否被绑定
    // eslint-disable-next-line no-prototype-builtins
    // if (this.onCallBacks.hasOwnProperty(result.event)) {
    //   this.onCallBacks[result.event](result.data, result.orginData);
    // } else {
    //   console.warn(`WsSocket 消息事件[${result.event}]未绑定...`);
    // }
    console.log(evt, result, '----onMessage-----');
    this.onCallBacks['message'](result);
  }

  /**
   * WebSocket 心跳检测
   */
  heartbeat() {
    this.config.heartbeat.setInterval = setInterval(() => {
      let t = new Date().getTime();

      if (t - this.lastTime > this.config.heartbeat.pingTimeout) {
        if (this.connect) {
          this.connect.close();
        }

        this.reconnectNormal();
      } else {
        this.ping();
      }
    }, this.config.heartbeat.pingInterval);
  }

  ping() {
    // todo
    const userStore = useUserStore();
    const fromId = userStore.getUserInfo.userId;
    console.log(userStore.getUserInfo);
    //{"distributorId":123,"msgType":5,"sendType":"1"}
    this.connect.send('{"distributorId":123,"msgType":5,"sendType":"2","fromId":' + fromId + '}');
  }

  /**
   * 聊天发送数据
   *
   * @param {Object} mesage
   */
  send(mesage) {
    this.connect.send(JSON.stringify(mesage));
  }

  /**
   * 关闭连接
   */
  close() {
    this.connect && this.connect.close();
  }

  /**
   * 推送消息
   *
   * @param {String} event 事件名
   * @param {Object} data 数据
   */
  emit(event, data) {
    const content = JSON.stringify({ event, data });

    if (this.connect && this.connect.readyState === 1) {
      this.connect.send(content);
    } else {
      alert('WebSocket 连接已关闭...');
      console.error('WebSocket 连接已关闭...', this.connect);
    }
  }
}

export default WsSocket;
