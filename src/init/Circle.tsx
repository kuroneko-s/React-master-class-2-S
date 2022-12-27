import styled from "styled-components";
import { useState } from "react";

interface ContainerProps {
  bgColor?: string;
}

const Container = styled.div<ContainerProps>`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
`;

interface CircleProps {
  bgColor: string;
}

export default function Circle({ bgColor }: CircleProps) {
  const [counter, setCounter] = useState(0);

  return <Container bgColor={bgColor}></Container>;
}
