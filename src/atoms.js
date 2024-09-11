import { getAll } from "@/apis/Posts";
import { atom } from "jotai";

export const postAtom = atom((async () => {
    const res = await getAll();
    return res?.data?.reverse();
})());