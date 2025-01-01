import { defineStore } from "pinia";
import { ref } from "vue";
import WebSocketService from "@/services/WebSocketService";

export const useWebSocketStore = defineStore("webSocket", () => {
  const webSocketService = new WebSocketService("ws://localhost:8000/api/v1/ws");
  webSocketService.connect();

  // you have to return every state property in order for pinia to work properly
  return {
    webSocketService
  };
});
