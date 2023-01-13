import { atom, selector } from "recoil";

export enum Categories {
  "DONE" = "DONE",
  "DOING" = "DOING",
  "TODO" = "TODO",
}

export interface ITodo {
  text: string;
  categoriy: Categories;
  id: number;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: [],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todoList = get(todoState);
    const category = get(categoryState);

    switch (category) {
      case Categories.TODO:
        return todoList.filter((todo) => todo.categoriy === Categories.TODO);
      case Categories.DOING:
        return todoList.filter((todo) => todo.categoriy === Categories.DOING);
      case Categories.DONE:
        return todoList.filter((todo) => todo.categoriy === Categories.DONE);
    }
  },
});
