import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ListPage } from "../list-page";
describe("ListPage", () => {
  it("renders an empty list", () => {
    const { queryByText } = render(<ListPage />);
    expect(queryByText(/In den Einkaufswagen/i)).toBeNull();
    expect(queryByText(/Schon dabei/i)).toBeNull();
  });
  it("add items form works", async () => {
    const {
      getByLabelText,
      getByText,
      getByRole,
      findByText,
      queryByText
    } = render(<ListPage />);

    // open up list-form
    const toggleButton = getByLabelText(/brauche sachen/i);
    fireEvent.click(toggleButton);
    getByText(/einkaufsliste erweitern/i);

    // type items
    const input = getByRole("textbox");
    const items = `item1
    item2`;
    fireEvent.change(input, { target: { value: items } });

    //submit form
    fireEvent.submit(getByText("speichern"));

    // form should be closed and items are displayed in the list
    await findByText("item1");
    await findByText("item2");
    expect(queryByText(/In den Einkaufswagen/i)).toBeVisible();
    expect(queryByText(/Schon dabei/i)).toBeNull();

    // move items to basket
    fireEvent.click(getByText("item1"));
    fireEvent.click(getByText("item2"));
    await findByText("Schon dabei");
    expect(queryByText(/In den Einkaufswagen/i)).toBeNull();

    // clear list
    fireEvent.click(getByText("Liste löschen"));
    getByText("Die Einkaufsliste leeren ?");
    fireEvent.click(getByText("ja"));
    await findByText("Du hast noch nichts auf der Einkaufsliste");
  });
});
