import ErrorDisplay, {
  DEFAULT_ERROR_MESSAGE,
} from "@/ui/ErrorDisplay/ErrorDisplay";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("ErrorDisplay Component", () => {
  it("should render with default message", () => {
    render(<ErrorDisplay />);

    expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should render with a custom message", () => {
    const customMessage = "Custom error message";
    render(<ErrorDisplay message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("should render action button when action prop is provided", () => {
    const action = {
      onClick: jest.fn(),
      label: "Retry",
    };

    render(<ErrorDisplay action={action} />);

    const buttonElement = screen.getByRole("button", { name: /retry/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call action.onClick when action button is clicked", () => {
    const action = {
      onClick: jest.fn(),
      label: "Retry",
    };

    render(<ErrorDisplay action={action} />);

    const buttonElement = screen.getByRole("button", { name: /retry/i });

    fireEvent.click(buttonElement);

    expect(action.onClick).toHaveBeenCalledTimes(1);
  });

  it("should render correctly with custom message and action", () => {
    const customMessage = "An error occurred";
    const action = {
      onClick: jest.fn(),
      label: "Refresh",
    };

    render(<ErrorDisplay message={customMessage} action={action} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", { name: /refresh/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
