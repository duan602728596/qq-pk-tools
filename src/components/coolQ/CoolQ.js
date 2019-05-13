class CoolQ {
  constructor(options, commandCallback) {
    // QQ群号
    this.options = options;

    // 监听事件回调函数
    this.commandCallback = commandCallback;

    // 事件
    this.handleListenerMessage = this._handleListenerMessage.bind(this);

    // socket监听
    this.eventIo = new WebSocket(`ws://127.0.0.1:${ options.port }/event`);
    this.apiIo = new WebSocket(`ws://127.0.0.1:${ options.port }/api`);

    this.eventIo.addEventListener('message', this.handleListenerMessage);
  }

  // 监听
  _handleListenerMessage(event) {
    const dataJson = JSON.parse(`${ event.data }`);
    const { options } = this;

    // 群消息
    if (
      'group_id' in dataJson
      && dataJson.group_id === options.groupNumber
      && dataJson.self_id === options.qq
      && dataJson.message_type === 'group'
    ) {
      const content = dataJson.raw_message ? dataJson.raw_message : dataJson.message;

      if (content in this.commandCallback) {
        this.commandCallback[content](this, dataJson);
      }
    }
  }

  // 发送消息
  sendMessage(msg) {
    this.apiIo.send(JSON.stringify({
      action: 'send_group_msg',
      params: {
        group_id: this.options.groupNumber,
        message: msg
      }
    }));
  }

  // 销毁
  close() {
    this.eventIo.removeEventListener('message', this.handleListenerMessage);
    this.eventIo.close();
    this.apiIo.close();
  }
}

export default CoolQ;