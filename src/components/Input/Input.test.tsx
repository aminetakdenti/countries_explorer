import React from "react";
import { Text } from "react-native";

import { fireEvent, render } from "@testing-library/react-native";

import { Input } from "./Input";

describe("Input component", () => {
  it("calls onChangeText when typing", () => {
    const onChangeText = jest.fn();

    const { getByPlaceholderText } = render(
      <Input placeholder="Enter" onChangeText={onChangeText} />,
    );

    const input = getByPlaceholderText("Enter");

    fireEvent.changeText(input, "Hello");

    expect(onChangeText).toHaveBeenCalledWith("Hello");
  });

  it("renders leftView and rightView", () => {
    const left = <Text testID="left">L</Text>;
    const right = <Text testID="right">R</Text>;

    const { getByTestId } = render(
      <Input
        placeholder="Test"
        leftView={left}
        rightView={right}
        onChangeText={() => {}}
      />,
    );

    expect(getByTestId("left")).toBeTruthy();
    expect(getByTestId("right")).toBeTruthy();
  });

  it("applies containerStyle", () => {
    const { getByTestId } = render(
      <Input
        placeholder="Styled"
        containerStyle={{ backgroundColor: "red" }}
        onChangeText={() => {}}
        testID="wrapper"
      />,
    );

    const wrapper = getByTestId("wrapper");

    expect(wrapper.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: "red" }),
      ]),
    );
  });

  it("uses accessibilityLabel if provided", () => {
    const { getByLabelText } = render(
      <Input
        placeholder="Email"
        accessibilityLabel="Email input"
        onChangeText={() => {}}
      />,
    );

    expect(getByLabelText("Email input")).toBeTruthy();
  });

  it("falls back to placeholder when no accessibilityLabel is given", () => {
    const { getByLabelText } = render(
      <Input placeholder="Name" onChangeText={() => {}} />,
    );

    expect(getByLabelText("Name")).toBeTruthy();
  });

  it("applies accessibilityHint when provided", () => {
    const { getByHintText } = render(
      <Input
        placeholder="Search"
        accessibilityHint="Type to search"
        onChangeText={() => {}}
      />,
    );

    expect(getByHintText("Type to search")).toBeTruthy();
  });
});
