import useHorizontalScroll from "@/hooks/useHorizontalScroll";
import Caroussel from "@/ui/Caroussel/Caroussel";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("../../src/hooks/useHorizontalScroll", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Caroussel component", () => {
  it("should call useHorizontalScroll<HTMLUListElement> and renders the children", () => {
    render(
      <Caroussel>
        <li>Child 1</li>
        <li>Child 2</li>
      </Caroussel>
    );

    expect(useHorizontalScroll).toHaveBeenCalled();

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });
});
