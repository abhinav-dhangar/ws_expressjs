import { WsStateManager, wsStateManager } from "@configs/wsStateConfig";
import { CustomWebSocket } from "@src/types/ws";
import { allEventsWs } from "@utils/ws/allEvents";
import { onClickWS } from "@utils/ws/click";
import { onCreateRoomWs } from "@utils/ws/rooms/createRoom";
import { WebSocketServer } from "ws";

function generateSocketId() {
  return Math.random().toString(36).substr(2, 9); // Example: '5lhg4kd9e'
}

const socketIdMap = new Map<string, CustomWebSocket>();

export const initializeWS = (httpServer: any) => {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on("connection", function connection(ws: CustomWebSocket) {
    ws.on("error", console.error);
    console.log("someone connected");

    const socketId = generateSocketId();
    socketIdMap.set(socketId, ws);
    ws.socketId = socketId;
    ws.send(JSON.stringify({ type: "socketId", data: socketId }));
    ws.on("message", function message(data, isBinary) {
      // onClickWS(ws, wss, data, isBinary);
      // onCreateRoomWs(ws, wss, data, isBinary);
      allEventsWs({
        data,
        socketId,
        ws,
        wss,
        wsManager: wsStateManager as WsStateManager,
      });
    });
    ws.on("close", function message() {
      console.log("someone disconnected");
    });

    // ws.send("Hello! Message From Server!!");
  });
};
