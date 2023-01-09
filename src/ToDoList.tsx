import { useForm } from "react-hook-form";

export default function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (data: any) => {
    console.log(data);
  };
  const onInValid = (data: any) => {
    console.error(data);
  };
  const message = errors?.todo?.message;
  let flag = false;

  return (
    <div>
      <form onSubmit={handleSubmit(onValid, onInValid)}>
        <input
          type={"text"}
          placeholder="write to do"
          {...register("todo", {
            minLength: 5,
            required: "is Requried",
            pattern: {
              value: /^[a-zA-Z]@naver.com$/,
              message: "naver.com만 사용가능",
            },
          })}
        />
        <button type="submit">Add</button>
      </form>
      {!!errors?.todo ? (
        <div>
          <h1>{errors.todo.message?.toString()}</h1>
        </div>
      ) : (
        <h1>none</h1>
      )}
    </div>
  );
}
