import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface DragabbleCardProps {
  todo: string;
  idx: number;
}

const Card = styled.div<{ isDragging: boolean }>`
  padding: 8px 14px;
  background-color: ${(props) =>
    props.isDragging ? "tomato" : props.theme.cardColor};
  border-radius: 10px;
  margin-bottom: 5px;
  box-shadow: ${(props) => (props.isDragging ? "2px 0px 5px" : "none")};
`;

function DragabbleCard({ todo, idx }: DragabbleCardProps) {
  return (
    // draggableId랑 key랑 값이 같아야만 함.
    <Draggable draggableId={todo} index={idx}>
      {(provided, snapshot, rubric) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
