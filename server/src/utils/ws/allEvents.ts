import { parse } from "dotenv";
import { onClickWS } from "./click";
import WebSocket, { WebSocketServer } from "ws";
import { onCreateRoomWs } from "./rooms/createRoom";

import { RoomsType, WsStateManager } from "@configs/wsStateConfig";
import { joinRoomWS } from "./rooms/joinRoom";
type Props = {
  data: any;
  socketId: string;
  ws: WebSocket;
  wss: WebSocketServer;
  wsManager: WsStateManager;
};
export const allEventsWs = ({ data, socketId, ws, wss, wsManager }: Props) => {
  let parsedData;

  try {
    parsedData = JSON.parse(data.toString("utf-8"));
    switch (parsedData?.event) {
      case "event:click":
        onClickWS(ws, wss, parsedData);
        break;
      case "room:create":
        console.log("inside room:create event");
        onCreateRoomWs(ws, wss, parsedData);
        break;
      case "room:join":
        console.log("inside room:join event");

        joinRoomWS({ ws, wss, data: parsedData });
        break;
      case "room:leave":

      default:
        console.log("inside default event");
        console.log(data.toString("utf-8"));

        break;
    }
  } catch (error) {}
};
