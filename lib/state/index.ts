import { atom } from "recoil";
import { UserType } from "../types";

export const userAtom = atom<UserType>({
    default: {
        username: "",
        id: "",
        email: ""
    },
    key: "userAtom"
})