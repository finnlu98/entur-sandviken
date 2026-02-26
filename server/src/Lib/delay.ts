import type express from "express";

export function registerDelay(app: express.Express) {
  if (process.env.NODE_ENV !== "DEV") return;
  app.use(async (req, res, next) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    next();
  });
}
