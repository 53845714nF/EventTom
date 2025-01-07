import { defineStore } from "pinia";
import WebSocketService from "@/services/WebSocketService";

export const useWebSocketStore = defineStore("webSocket", () => {
  const webSocketService = new WebSocketService(`${import.meta.env.VITE_WEBSOCKET_URL}/api/v1/ws`);
  webSocketService.connect();

  return {
    webSocketService,
    addListener: webSocketService.addListener.bind(webSocketService),
    removeListener: webSocketService.removeListener.bind(webSocketService),
    removeAllListeners: webSocketService.removeAllListeners.bind(webSocketService),
    send: webSocketService.send.bind(webSocketService),
  };
});
