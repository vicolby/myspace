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
  justify-content: center;
  border-radius: 10px;
  overflow-y: scroll;
  padding: 16rem;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 40%;
  height: 10%;
  top: 50%; 
  right: 50%;
  transform: translate(20%,25%);
  position: absolute;
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
  width: 80rem;
  color: white;
  outline: none;
  flex-grow: 1;
  &:focus {
    outline: none;
  }
`;

const CommandLine = styled.div`
  color: #0ff;
`;

const OutputLine = styled.div`
  margin-left: 20px;
  margin-top: 5px;
`;

const CommandOutputContainer = styled.div`
  margin-bottom: 10px;
`;

const CommandContainer = styled.div`
  margin-bottom: 2px;
  margin-right: 3 px;
  position: absolute;
  top: 3%;
  left: 1%;
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
          output = ["Supported commands:", "- help", "- clear", "- work exp"];
          break;
        case "work exp":
          output = ["SBDA Group, December 2020 - Now", 
          "- Created an NBA ML system to enhance the application experience for doctors", 
          "- Participated in the development of a document classifier system for bank clients",
          "- Created a Python library to accelerate prototyping of next-best-action pipelines",
          "- Created a platform for A/B testing",
          "- Contributed to the development of an in-house data platform",
          "- Created a product for data scientists that enables the effortless deployment of a research environment for data science experiments",
          "----------",
          "Magnit, August 2019 - December 2020",
          "- Successfully improved the accuracy of promo sales forecasting through statistical analysis by modifying the clusterization scheme",
          "- Significantly increased the accuracy of promo sales forecasting by utilizing a boosting algorithm and adding new seasonality coefficients to the model",
          "----------",
          "Sibur, October 2018 - August 2019",
          "- Significantly reduced MAPE in PE and PP forecasts through statistical analysis, surpassing the performance of the naive forecast",
          "- Created a methodology to predict the likelihood of a particular variance in spot prices of PE and PP across Asia and Europe, enabling informed business decisions regarding logistics"


        ];
          break;
        case "clear":
          setTerminalOutput([]);
          setInputValue("");
          return;
        case "github":
          output = ["https://github.com/vicolby"]
          break
        default:
          output = [`Unknown command: ${command} \n`, "Supported commands:", "- help", "- clear", "- work exp"];
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
          <CommandContainer>
            {terminalOutput.map((line, index) => (
            <CommandOutputContainer key={index}>
              <CommandLine> <InputPrefix>➜</InputPrefix>{line.command}</CommandLine>
              {line.output.map((outputLine, outputIndex) => (
                <OutputLine key={outputIndex}>{outputLine}</OutputLine>
              ))}
            </CommandOutputContainer>
            ))}
            <InputLine>
            <InputPrefix>➜</InputPrefix>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="command"
              />
            </InputLine>
          </CommandContainer>
        </Window>
      </Container>
    </>
  );
}

