import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Task from "../Task";

describe("Card component", () => {
  test("it renders", () => {
    const dummyTask = {
      id: 123445,
      title: "test task"
    };
    render(<Task {...dummyTask} />);

    expect(screen.getByText("test task")).toBeInTheDocument();
  });
});
