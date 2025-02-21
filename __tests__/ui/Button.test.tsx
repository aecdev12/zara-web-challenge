import Button from "@/ui/Button/Button";
import { fireEvent, render, screen } from "@testing-library/react";
import { ComponentProps } from "react";

const TEST_TEXT = "TestButton";

describe("Button", () => {
  const renderButton = (props?: ComponentProps<typeof Button>) =>
    render(<Button {...props}>{TEST_TEXT}</Button>);

  it("should render a <button /> tag correctly with default props", () => {
    renderButton();

    const btn = screen.getByText(TEST_TEXT);
    expect(btn).toBeDefined();
    expect(btn.tagName).toBe("BUTTON");
  });

  it("should fire the onClick event correctly", () => {
    const handleClick = jest.fn();
    renderButton({ onClick: handleClick });

    const btn = screen.getByText(TEST_TEXT);
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should spread additional props to the button element", () => {
    renderButton({ type: "submit" });

    const btn = screen.getByText(TEST_TEXT);
    expect(btn.getAttribute("type")).toBe("submit");
  });
});
