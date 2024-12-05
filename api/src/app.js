import dotenv from "dotenv";
import Server from "./models/server.model.js";

dotenv.config();

const server = new Server();

server.listen();