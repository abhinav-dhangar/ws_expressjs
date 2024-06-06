import { WsStateManager } from "@configs/wsStateConfig";
import { WebSocketServer } from "ws";

type Props = { ws: any; wss: WebSocketServer; data: any };

export const joinRoomWS = ({ ws, wss, data }: Props) => {
  try {
    WsStateManager.getInstance()?.joinRoom(data.room, ws);
  } catch (error) {}
};
