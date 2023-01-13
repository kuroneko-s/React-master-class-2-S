import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, todoState } from "../recoil";

interface IForm {
  todo: string;
}

export default function CreateTodo() {
  const category = useRecoilValue(categoryState);
  const setTodoList = useSetRecoilState(todoState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm<IForm>({
    defaultValues: {
      todo: "learning React",
    },
  });

  const onValid = (data: IForm) => {
    console.log(data);
    setValue("todo", "");
    setTodoList((prev) => [
      { text: data.todo, categoriy: category, id: Date.now() },
      ...prev,
    ]);
    setFocus("todo");
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        type={"text"}
        placeholder="write to do"
        {...register("todo", {
          /* minLength: {
              value: 5,
              message: "min length is 5",
            }, */
          required: "is Requried",
          /* pattern: {
              value: /^[a-zA-Z]+@naver.com$/,
              message: "naver.com만 사용가능",
            }, */
          /* validate: {
              noDong: (v) => (v.includes("dong") ? "no dong allowed" : true),
              noChoi: (v) => (v.includes("choi") ? "no choi" : true),
            }, */
        })}
      />
      <button type="submit">Add</button>
      {/* {!!errors?.todo ? (
        <div>
          <h1>{errors.todo.message?.toString()}</h1>
        </div>
      ) : (
        <h1>none</h1>
      )} */}
    </form>
  );
}
