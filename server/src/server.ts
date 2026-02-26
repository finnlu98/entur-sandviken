import "dotenv/config";
import express from "express";
import { Routes } from "./Router/Routes";
import cors from "cors";
import { sessionMiddleware } from "./Lib/session";
import { registerMediaRoute } from "./Shared/Storage/Media";
import { globalLimiter } from "./Shared/RateLimiting/Limiters";
import { registerDelay } from "./Lib/delay";

class Server {
  constructor() {
    const app = express();
    app.set("trust proxy", true);
    const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
    app.use(
      cors({
        origin: [process.env.FRONTEND_ORIGIN ?? "http://localhost:3000"],
        credentials: true,
      }),
    );
    app.use(express.json());
    registerMediaRoute(app);
    registerDelay(app);
    app.use(sessionMiddleware);

    app.use(globalLimiter);
    new Routes(app);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

new Server();
