export default class WebSocketService {
    constructor(url) {
      this.socket = new WebSocket(url);
      this.listeners = [];
    }
  
    connect() {
      this.socket.onopen = () => {
        console.log("WebSocket connected!");
      };
  
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.listeners.forEach((callback) => callback(data));
      };
  
      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
  
      this.socket.onclose = () => {
        console.log("WebSocket closed!");
      };
    }
  
    send(message) {
      this.socket.send(JSON.stringify(message));
    }
  
    addListener(callback) {
      this.listeners.push(callback);
    }
  
    close() {
      this.socket.close();
    }
  }

  