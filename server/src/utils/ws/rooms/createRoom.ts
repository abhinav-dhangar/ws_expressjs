import { WebSocket, WebSocketServer } from "ws";
import {
  adjectives,
  animals,
  colors,
  names,
  uniqueNamesGenerator,
  starWars,
  NumberDictionary,
} from "unique-names-generator";
import { RoomsType, WsStateManager } from "@configs/wsStateConfig";

const onCreateRoomWs = (
  ws: WebSocket,
  wss: WebSocketServer,
  data: any,
  isBinary?: boolean
) => {
  // let parsedData;
  // console.log(parsedData.event);
  // try {
  //   parsedData = JSON.parse(data.toString("utf-8"));
  // } catch (error) {
  //   parsedData = data.toString("utf-8");
  // }

  const roomName = WsStateManager.getInstance()?.createRoom(ws);

  let sendEventData = {
    type: "room:create",
    data: roomName,
  };

  let errEvent = {
    type: "room:create/error",
    data: "joota japani",
  };
  let randomNum = Math.floor(Math.random() * 2);
  if (randomNum == 0) {
    ws.send(JSON.stringify(sendEventData));
  } else {
    ws.send(JSON.stringify(errEvent));
  }
};

export { onCreateRoomWs };

//helper function for converting Map to Object
///
////
export function mapToObjectForRooms(map: Map<string, Set<any>>): object {
  const obj: any = {};
  map.forEach((value, key) => {
    obj[key] = Array.from(value); // Convert Set to Array
  });
  return obj;
}
