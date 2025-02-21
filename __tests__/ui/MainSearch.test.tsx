import { DEBOUNCE_MS } from "@/lib/constants";
import InputWithURLState from "@/ui/InputWithURLState/InputWithURLState";
import MainSearch from "@/ui/MainSearch/MainSearch";
import TextInput from "@/ui/TextInput/TextInput";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ComponentProps } from "react";

jest.mock("../../src/ui/InputWithURLState/InputWithURLState");

jest.mock("../../src/ui/TextInput/TextInput", () => {
  return jest.fn((props: ComponentProps<typeof TextInput>) => (
    <div>
      <input {...props} data-testid="mock-text-input" />
      {props.icon?.src || null}
    </div>
  ));
});

jest.mock("../../src/assets/icons/SearchIcon", () => {
  return jest.fn(() => <div data-testid="mock-search-icon" />);
});

describe("MainSearch component", () => {
  const mockUpdateUrlParams = jest.fn();

  (InputWithURLState as jest.Mock).mockImplementation(({ render }) => (
    <div data-testid="mock-input-with-url-state">
      {render(mockUpdateUrlParams, "initialValue")}
    </div>
  ));

  beforeEach(() => {
    render(<MainSearch />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render InputWithURLState with correct parameterKey and debounceMs", () => {
    expect(InputWithURLState).toHaveBeenCalledWith(
      expect.objectContaining({
        parameterKey: "keywords",
        debounceMs: DEBOUNCE_MS,
        render: expect.any(Function),
      }),
      undefined
    );
  });

  it("should call the render prop and render a TextInput with expected attributes", () => {
    expect(TextInput).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "search",
        role: "search",
        placeholder: "Search a character...",
        defaultValue: "initialValue",
        onChange: expect.any(Function),
      }),
      undefined
    );

    expect(screen.getByTestId("mock-search-icon")).toBeInTheDocument();
  });

  it("should update URL parameters when typing in the search input", () => {
    const input = screen.getByTestId("mock-text-input");
    fireEvent.change(input, { target: { value: "Goku" } });

    expect(mockUpdateUrlParams).toHaveBeenCalledWith("Goku");
  });
});
