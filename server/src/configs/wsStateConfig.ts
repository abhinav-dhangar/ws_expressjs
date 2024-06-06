import {
  NumberDictionary,
  adjectives,
  animals,
  colors,
  names,
  starWars,
  uniqueNamesGenerator,
} from "unique-names-generator";

export type RoomsType = Map<string, Set<any>>;

export class WsStateManager {
  private static instance: WsStateManager;
  private rooms: RoomsType;
  constructor() {
    this.rooms = new Map<string, Set<any>>();
    this.rooms.set("default", new Set(["a", "b", "c"]));
  }

  static getInstance() {
    if (!WsStateManager.instance) {
      WsStateManager.instance = new WsStateManager();
    }
    return WsStateManager.instance;
  }

  public createRoom(ws: any): any {
    console.log("creating room");

    const roomName = uniqueNamesGenerator({
      dictionaries: [
        adjectives,
        names,
        colors,
        animals,
        NumberDictionary.generate({ min: 20, max: 200 }),
        starWars,
      ],
      length: 2,
    });

    console.log("made rooms " + roomName);
    this.rooms.set(roomName, new Set());

    this.rooms.get(roomName)!.add(ws);

    ws.room = roomName as any;
    console.log("abki baar 400 bhi nahi aayega");

    return roomName;
  }

  public joinRoom(room: string, client: any): void {
    if (!this.rooms.has(room)) {
      throw Error("Room does not exist");
    } else {
      console.log("joininig room");
      this.rooms.get(room)!.add(client);
    }
  }

  public getRoomsList(): RoomsType {
    console.log("getting rooms");

    return this.rooms;
  }

  public heartbeat() {
    console.log("too hot to handle");
  }
  // Method to leave a room
  public leaveRoom(room: string, client: any): void {
    if (this.rooms.has(room)) {
      this.rooms.get(room)!.delete(client);
      if (this.rooms.get(room)!.size === 0) {
        this.rooms.delete(room);
      }
    }
  }
}

export const wsStateManager = WsStateManager.getInstance();
