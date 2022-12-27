import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const animation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius:0px
  }
  50% {
    transform: rotate(360deg);
    border-radius:100px
  }
  100% {
    transform: rotate(0deg);
    border-radius:0px
  }
`;

const Emoji = styled.span`
  font-size: 3rem;
`;

function App() {
  return (
    <Container>
      <Box bgColor="tomato">
        <Emoji as="p">😊</Emoji>
      </Box>
      <Emoji as="p">❤️</Emoji>
      <Title>rwqpjrpowqjrpowqjrpowqjrpowqjropwqjpo</Title>
    </Container>
  );
}

export default App;
