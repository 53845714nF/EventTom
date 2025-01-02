import { defineStore } from "pinia";
import { ref } from "vue";
import WebSocketService from "@/services/WebSocketService";

export const useWebSocketStore = defineStore("webSocket", () => {
  const webSocketService = new WebSocketService("ws://localhost:8000/api/v1/ws");
  webSocketService.connect();

  return {
    webSocketService,
    addListener: webSocketService.addListener.bind(webSocketService),
    removeListener: webSocketService.removeListener.bind(webSocketService),
    removeAllListeners: webSocketService.removeAllListeners.bind(webSocketService),
    send: webSocketService.send.bind(webSocketService),
  };
});
