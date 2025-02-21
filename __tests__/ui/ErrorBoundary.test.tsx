import ErrorBoundary from "@/ui/ErrorBoundary/ErrorBoundary";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const ProblemChild = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary Component", () => {
  beforeEach(() => {
    jest.spyOn(console, "error");
    (console.error as jest.Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("should render the child component when there is no error", () => {
    render(
      <ErrorBoundary fallbackUI={<div>Fallback UI</div>}>
        <div>Child Component</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  it("should render the fallback UI when a child component throws an error", () => {
    render(
      <ErrorBoundary fallbackUI={<div>Fallback UI</div>}>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Fallback UI")).toBeInTheDocument();
  });

  it("should call componentDidCatch when an error is thrown", () => {
    render(
      <ErrorBoundary fallbackUI={<div>Fallback UI</div>}>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(console.error as jest.Mock).toHaveBeenCalled();
  });
});
