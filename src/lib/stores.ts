import { writable, type Writable } from "svelte/store";

export type Keys = {
    apikey: string;
};

export const authorized: Writable<boolean> = writable<boolean>(false);
export const apiKeys: Writable<Keys[]> = writable<Keys[]>([]);

