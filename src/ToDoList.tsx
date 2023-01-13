import { useRecoilState, useRecoilValue } from "recoil";
import CreateTodo from "./components/CreateTodo";
import Todo from "./components/Todo";
import { Categories, categoryState, todoSelector } from "./recoil";

export default function ToDoList() {
  const [category, setCategory] = useRecoilState(categoryState);
  const todoList = useRecoilValue(todoSelector);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(todoList);
  return (
    <div>
      <h1>TO DOS</h1>
      <hr />
      <select onChange={onInput} value={category}>
        <option value={Categories.TODO}>TODO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
      <hr />
      <CreateTodo />
      <ul>
        {todoList?.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}
