import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";

import styled from "styled-components";
import Board from "./components/Board";
import { todoState } from "./recoil";

const Wrapper = styled.div`
  display: flex;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

function App() {
  const [todos, setTodos] = useRecoilState(todoState);

  const onDragEnd = (info: DropResult) => {
    const { source, destination } = info;

    if (
      !destination?.droppableId ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    setTodos((cur) => {
      let copy = { ...cur };

      const movedCategory = [...copy[source.droppableId]];
      const del = movedCategory.splice(source.index, 1);
      copy[source.droppableId] = movedCategory;

      const endCategory = [...copy[destination?.droppableId]];
      endCategory.splice(destination.index, 0, ...del);
      copy[destination.droppableId] = endCategory;

      return copy;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((category, idx) => (
            <Board boardId={category} todos={todos[category]} key={category} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
