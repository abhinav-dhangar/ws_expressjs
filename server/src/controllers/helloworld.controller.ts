import { wsStateManager } from "@configs/wsStateConfig";
import { Request, Response } from "express";

export const helloworldController = async (req: Request, res: Response) => {
  try {
    if (!wsStateManager) {
      throw new Error("Failed to get WsStateManager instance");
    }

    const rooms = wsStateManager.getRoomsList();
    console.log(rooms);

    res.json("rooms");
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
