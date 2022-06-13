import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
// import renderer from "react-test-renderer";
import Card from "../Card";

describe("Card component", () => {
  // it("renders correctly", () => {
  //   const dummyCard = {
  //     id: 1234,
  //     title: "test card snapshot",
  //     taskList: [
  //       {
  //         id: 123445,
  //         taskTitle: "test task  snapshot"
  //       }
  //     ]
  //   };
  //   const tree = renderer.create(<Card {...dummyCard} />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  test("it renders", () => {
    const dummyCard = {
      id: 1234,
      title: "test card",
      taskList: [
        {
          id: 123445,
          taskTitle: "test task"
        }
      ]
    };
    render(<Card {...dummyCard} />);

    expect(screen.getByText("test card")).toBeInTheDocument();
    expect(screen.getByText("test task")).toBeInTheDocument();
  });

  test("it deletes task", () => {
    const dummyCard = {
      id: 1234,
      title: "test card delete",
      taskList: [
        {
          id: 123445,
          taskTitle: "test task delete"
        }
      ]
    };
    render(<Card {...dummyCard} />);

    const button = screen.getByText("X");
    expect(screen.getByText("test task delete")).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByText("test task delete")).toBeNull();
  });
});
