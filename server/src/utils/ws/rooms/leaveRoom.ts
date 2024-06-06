import { WsStateManager } from "@configs/wsStateConfig";
import { WebSocketServer } from "ws";

type Props = { ws: any; wss: WebSocketServer; data: any };

function leaveRoomWs({ ws, wss, data }: Props) {
  try {
    WsStateManager.getInstance().leaveRoom(data.room, ws);
  } catch (error) {}
}

export { leaveRoomWs };
