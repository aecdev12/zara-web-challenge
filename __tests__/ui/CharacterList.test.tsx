import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CharacterList from "@/ui/CharacterList/CharacterList";
import CharacterCard from "@/ui/CharacterCard/CharacterCard";
import { CharacterLesserFragment } from "@/api/dragonBall/schema/types";

jest.mock("../../src/ui/CharacterCard/CharacterCard", () => {
  return jest.fn(() => <li data-testid="mock-character-card">Mocked Card</li>);
});

describe("CharacterList", () => {
  const mockList: CharacterLesserFragment[] = [
    { id: 1, name: "Goku", image: "/goku.png" },
    { id: 2, name: "Vegeta", image: "/vegeta.png" },
    { id: 3, name: "Trunks", image: "/trunks.png" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the correct number of results in the heading", () => {
    render(<CharacterList list={mockList} />);
    const resultsText = screen.getByText(`${mockList.length} RESULTS`);
    expect(resultsText).toBeInTheDocument();
  });

  it("should render the correct number of CharacterCard items", () => {
    render(<CharacterList list={mockList} />);
    const cards = screen.getAllByTestId("mock-character-card");
    expect(cards).toHaveLength(mockList.length);
  });

  it("should pass the expected props to CharacterCard", () => {
    render(<CharacterList list={mockList} />);

    mockList.forEach((character) => {
      expect(CharacterCard).toHaveBeenCalledWith(
        expect.objectContaining(character),
        undefined
      );
    });
  });

  it("should handle empty lists", () => {
    render(<CharacterList list={[]} />);
    expect(screen.getByText("0 RESULTS")).toBeInTheDocument();

    const cards = screen.queryAllByTestId("mock-character-card");
    expect(cards).toHaveLength(0);
  });
});
