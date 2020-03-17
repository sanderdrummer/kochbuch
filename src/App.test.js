import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("toggle works", () => {
  const { getByText, queryByText } = render(<App />);
  const button = getByText(/button/i);

  expect(queryByText("PAPER 2")).not.toBeInTheDocument();

  fireEvent.click(button);

  expect(getByText("PAPER 2")).toBeVisible();

  fireEvent.click(button);

  expect(queryByText("PAPER 2")).not.toBeInTheDocument();
});
