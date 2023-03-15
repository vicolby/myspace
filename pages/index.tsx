import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { FaGithub } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  background-color: black;
  min-height: 100vh;
  width: 100%;
  display: flex;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const GithubLink = styled.a`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: white;
  font-size: 1.5rem;
`;

const CardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  gap: 1rem;
  -ms-overflow-style: none; 
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  background-color: lightgray;
  padding: 1rem;
  border-radius: 5px;
  min-width: 500px;
  min-height: 200px;
  cursor: pointer;
`;

export default function Home() {
  const [cards, setCards] = useState(["Card 1", "Card 2", "Card 3", "Card 4", "Card 5"]);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!cardContainerRef.current) return;
  
    const cardWidth = cardContainerRef.current.firstChild?.clientWidth || 0;
    const scrollLeft = cardContainerRef.current.scrollLeft;
  
    if (scrollLeft >= cardWidth) {
      setCards((prevCards) => {
        const newCards = [...prevCards.slice(1), prevCards[0]];
        return newCards;
      });
  
      cardContainerRef.current.scrollLeft = scrollLeft - cardWidth;
    } else if (scrollLeft === 0) {
      setCards((prevCards) => {
        const newCards = [prevCards[prevCards.length - 1], ...prevCards.slice(0, -1)];
        return newCards;
      });
  
      cardContainerRef.current.scrollLeft = cardWidth;
    }
  };

  useEffect(() => {
    if (cardContainerRef.current) {
      cardContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (cardContainerRef.current) {
        cardContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <GithubLink href="https://github.com/vicolby" target="_blank">
          <FaGithub />
        </GithubLink>
        <CardContainer ref={cardContainerRef}>
          {cards.map((card, index) => (
            <Card key={index} onClick={() => alert(`${card} clicked!`)}>
              {card}
            </Card>
          ))}
        </CardContainer>
      </Container>
    </>
  );
}

