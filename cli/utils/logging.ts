import { colors } from "cliffy/ansi/mod.ts";

export type LogLevel = "info" | "warn" | "error";

const consoleColors = {
    info: colors.bold.blue,
    warn: colors.bold.yellow,
    error: colors.bold.red,
};

const log = (message: string, logLevel: LogLevel) => {
    console.log(consoleColors[logLevel](`[${logLevel.toUpperCase()}]`), colors.bold(message));
};

export const info = (message: string) => log(message, "info");
export const warn = (message: string) => log(message, "warn");
export const error = (message: string) => log(message, "error");
