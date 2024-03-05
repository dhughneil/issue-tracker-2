// src/utils/Logger.ts
import * as pino from "pino";
import { APP_ID, LOG_LEVEL } from "./Config"; // Customize as needed

export const logger = pino({
    name: "app-name", // Set your app name
    level: "debug", // Adjust the log level as desired
});
