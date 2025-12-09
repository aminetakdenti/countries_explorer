import React from "react";

import { fireEvent, render } from "@testing-library/react-native";

import { Button } from "./Button"; // change path if needed

describe("Button component", () => {
  it("renders the title correctly", () => {
    const { getByText } = render(
      <Button title="Click me" onPress={() => {}} />,
    );

    expect(getByText("Click me")).toBeTruthy();
  });

  it("triggers onPress when pressed", () => {
    const onPressMock = jest.fn();

    const { getByRole } = render(
      <Button title="Press" onPress={onPressMock} />,
    );

    fireEvent.press(getByRole("button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("sets the accessibility label from prop", () => {
    const { getByLabelText } = render(
      <Button
        title="Hello"
        onPress={() => {}}
        accessibilityLabel="Custom label"
      />,
    );

    expect(getByLabelText("Custom label")).toBeTruthy();
  });

  it("falls back to title when accessibilityLabel is not given", () => {
    const { getByLabelText } = render(
      <Button title="My Button" onPress={() => {}} />,
    );

    expect(getByLabelText("My Button")).toBeTruthy();
  });

  it("applies custom style and titleStyle", () => {
    const buttonStyle = { backgroundColor: "red" };
    const titleStyle = { color: "yellow" };

    const { getByText } = render(
      <Button
        title="Styled"
        onPress={() => {}}
        style={buttonStyle}
        titleStyle={titleStyle}
      />,
    );

    const text = getByText("Styled");

    // Title style applied
    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(titleStyle)]),
    );
  });
});
