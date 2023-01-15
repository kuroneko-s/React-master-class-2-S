import { atom } from "recoil";

interface Todos {
  [key: string]: string[];
}

export const todoState = atom<Todos>({
  key: "todo",
  default: {
    todo: ["a", "b"],
    doing: ["c", "d", "e"],
    done: ["f"],
  },
});
