import { useSetRecoilState } from "recoil";
import { Categories, ITodo, todoState } from "../recoil";

export default function Todo({ text, categoriy, id }: ITodo) {
  const setTodoList = useSetRecoilState(todoState);

  const onClick = (newCateory: any) => {
    setTodoList((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === id);
      const target = prev[targetIndex];

      if (!target) return prev;

      return [
        ...prev.slice(0, targetIndex),
        { ...target, categoriy: newCateory },
        ...prev.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {categoriy !== Categories.TODO && (
        <button
          name={Categories.TODO + ""}
          onClick={() => onClick(Categories.TODO)}
          style={{ backgroundColor: "red" }}
        >
          TODO
        </button>
      )}
      {categoriy !== Categories.DOING && (
        <button
          name={Categories.DOING + ""}
          onClick={() => onClick(Categories.DOING)}
          style={{ backgroundColor: "blue" }}
        >
          DOING
        </button>
      )}
      {categoriy !== Categories.DONE && (
        <button
          name={Categories.DONE + ""}
          onClick={() => onClick(Categories.DONE)}
          style={{ backgroundColor: "orange" }}
        >
          DONE
        </button>
      )}
    </li>
  );
}
