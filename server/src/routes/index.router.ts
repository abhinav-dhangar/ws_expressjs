import express from "express";
import { helloworldRouter } from "./helloworld.route";

const router = express.Router();

router.use("/", helloworldRouter);

export { router };
