import { useState } from "react";
import Card from "./components/Card";
import styled from "styled-components";
import "./styles.css";

export type TaskList = {
  id: number;
  taskTitle: string;
};

type AppState = {
  id: number;
  title: string;
  taskList?: TaskList[];
}[];

const initialState = [
  {
    id: 1,
    title: "Default Card",
    taskList: [
      {
        id: 11,
        taskTitle: "New Task"
      }
    ]
  }
];
const AddCardButton = styled.button`
  border-radius: 50%;
  background: #05b3ee;
  font-size: 16px;
  font-weight: bold;
  border: none;
  margin: 10px;
  width: 30px;
  cursor: pointer;
`;
export default function App() {
  const [cards, setCards] = useState<AppState>(initialState);
  const onAddCard = () => {
    const currCards = [...cards];
    currCards.push({
      id: currCards.length + 1,
      title: "New Card"
    });

    setCards(currCards);
  };

  const onDeleteCard = (id: number) => {
    const updatedCards = [...cards].filter((card) => card.id !== id);

    setCards(updatedCards);
  };
  return (
    <div className="App">
      {cards &&
        cards.map((card, idx) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            taskList={card.taskList}
            onDeleteCard={onDeleteCard}
          />
        ))}
      <AddCardButton onClick={onAddCard}>+</AddCardButton>
    </div>
  );
}
