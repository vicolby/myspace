import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: linear-gradient(to bottom, rgba(38, 38, 38, 0.7), rgba(25, 25, 25, 0.7)), url('/wxp.jpeg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Window = styled.div`
  background-color: rgba(31, 31, 31, 0.9);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  font-family: monospace;
  color: white;
  border-radius: 10px;
  overflow-y: auto;
  padding: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 40%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: move;
`;

const InputLine = styled.div`
  display: flex;

`;

const InputPrefix = styled.span`
  color: green;
  margin-right: 5px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  font-family: monospace;
  color: white;
  outline: none;
  flex-grow: 1;
  &:focus {
    outline: none;
  }
`;

type TerminalLine = {
  command: string;
  output: Array<string>;
};

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [inputValue, setInputValue] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<Array<TerminalLine>>([]);

  // window moving
  const handleMouseDown = (event) => {
    setIsDragging(true);
    setOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - offset.x,
        y: event.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  //command handling
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = inputValue.trim().toLowerCase();
      let output: Array<string> = [];
      switch (command) {
        case "help":
          output = ["Supported commands:", "- help", "- clear"];
          break;
        case "clear":
          setTerminalOutput([]);
          setInputValue("");
          return;
        default:
          output = [`Unknown command: ${command}`];
      }
      setTerminalOutput([...terminalOutput, { command, output }]);
      setInputValue("");
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <Window
          onMouseDown={handleMouseDown}
          style={{ left: position.x, top: position.y }}
        >
          {terminalOutput.map((line, index) => (
          <div key={index}>
            <div>${line.command}</div>
            {line.output.map((outputLine, outputIndex) => (
              <div key={outputIndex}>{outputLine}</div>
            ))}
          </div>
          ))}
          <InputLine>
          <InputPrefix>➜</InputPrefix>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </InputLine>
        </Window>
      </Container>
    </>
  );
}

