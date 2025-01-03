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
      console.log("WebSocket ist bereits verbunden oder wird gerade verbunden.");
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket connected!");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("websocket received message:", data);
      this.listeners.forEach((callback) => callback(data));
    };

    this.socket.onerror = (error) => {
      console.error("websocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("websocket closed!");
      if (this.shouldReconnect) {
        console.log("websocket trying to reconnect...");
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
