class WebSocketService {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.listeners = [];
  }

  connect() {
    this.socket.onopen = () => {
      console.log("WebSocket verbunden!");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Empfangene Nachricht:", data);
      this.listeners.forEach((callback) => callback(data));
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket Fehler:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket geschlossen!");
    };
  }

  send(message) {
    this.socket.send(JSON.stringify(message));
  }

  addListener(callback) {
    console.log("added listener");
    this.listeners.push(callback);
  }

  close() {
    this.socket.close();
  }

  removeListeners() {
    this.listeners = [];
  }
}

export default new WebSocketService("ws://localhost:8000/api/v1/ws");
