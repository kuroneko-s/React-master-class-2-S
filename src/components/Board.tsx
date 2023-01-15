import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

interface IBoardProps {
  todos: string[];
  boardId: string;
}

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  text-align: center;
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 1.25rem;
  text-transform: uppercase;
`;

interface AreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<AreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "red"
      : props.draggingFromThisWith
      ? "pink"
      : "blue"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

export default function Board({ todos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div>
              {todos.map((todo, idx) => (
                <DragabbleCard key={todo} todo={todo} idx={idx} />
              ))}
              {provided.placeholder}
            </div>
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
