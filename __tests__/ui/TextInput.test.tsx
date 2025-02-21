import { InputIconPosition } from "@/ui/TextInput/enums";
import TextInput from "@/ui/TextInput/TextInput";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const MockIcon = () => <span data-testid="mock-icon">Icon</span>;

describe("TextInput component", () => {
  it("should render without an icon", () => {
    render(<TextInput placeholder="No Icon" />);

    const inputElement = screen.getByPlaceholderText("No Icon");
    expect(inputElement).toBeInTheDocument();

    const iconElement = screen.queryByTestId("mock-icon");
    expect(iconElement).toBeNull();
  });

  it("should place the icon before the input when icon.position is LEFT", () => {
    render(
      <TextInput
        icon={{ src: <MockIcon />, position: InputIconPosition.LEFT }}
        placeholder="With Left Icon"
      />
    );
    const labelElement = screen
      .getByPlaceholderText("With Left Icon")
      .closest("label");
    expect(labelElement).toBeInTheDocument();

    const children = labelElement?.children;
    expect(children?.[0]).toHaveAttribute("data-testid", "mock-icon");
    expect(children?.[1]).toHaveAttribute("placeholder", "With Left Icon");
  });

  it("should place the icon after the input when icon.position is RIGHT", () => {
    render(
      <TextInput
        icon={{ src: <MockIcon />, position: InputIconPosition.RIGHT }}
        placeholder="With Right Icon"
      />
    );
    const labelElement = screen
      .getByPlaceholderText("With Right Icon")
      .closest("label");
    expect(labelElement).toBeInTheDocument();

    const children = labelElement?.children;
    expect(children?.[0]).toHaveAttribute("placeholder", "With Right Icon");
    expect(children?.[1]).toHaveAttribute("data-testid", "mock-icon");
  });

  it("should allow additional className props to be applied to the label", () => {
    render(<TextInput placeholder="Classes" className="my-extra-class" />);
    const labelElement = screen
      .getByPlaceholderText("Classes")
      .closest("label");
    expect(labelElement).toHaveClass("my-extra-class");
  });

  it("should allow typing", async () => {
    render(<TextInput placeholder="Type here" />);
    const inputElement = screen.getByRole<HTMLInputElement>("textbox");

    fireEvent.change(inputElement, { target: { value: "Hello" } });
    expect(inputElement.value).toBe("Hello");
  });
});
