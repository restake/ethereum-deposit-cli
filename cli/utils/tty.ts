import { Tty, tty } from "cliffy/ansi/tty.ts";

const getTty = (): Tty => {
    return tty({
        writer: Deno.stdout,
        reader: Deno.stdin,
    });
};

export const eraseScreen = (): void => {
    getTty().cursorSave.cursorHide.cursorTo(0, 0).eraseScreen();
};
