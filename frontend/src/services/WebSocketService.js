export default class WebSocketService {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.listeners = []; // callbacks for when a message is received
    this.reconnectInterval = 5000; // 5 seconds
    this.shouldReconnect = true; // reconnect automatically
  }

  connect() {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.listeners.forEach((callback) => callback(data));
    };

    this.socket.onerror = (error) => {
      console.error("websocket error:", error);
    };

    this.socket.onclose = () => {
      if (this.shouldReconnect) {
        setTimeout(() => this.connect(), this.reconnectInterval);
      }
    };
  }

  send(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn("message could not be sent: websocket not connected.");
    }
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  removeAllListeners() {
    this.listeners = [];
  }

  close() {
    this.shouldReconnect = false;
    if (this.socket) {
      this.socket.close();
    }
  }
}
