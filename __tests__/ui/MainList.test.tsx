import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { getAllCharacters } from "@/api/dragonBall/apiService";
import {
  CharacterFragment,
  CharacterLesserFragment,
} from "@/api/dragonBall/schema/types";
import { GetAllCharactersParams } from "@/api/dragonBall/apiService";
import purgeUndefinedValueFromObject from "@/utils/purgeUndefinedValuesFromObject";
import MainList from "@/ui/MainList/MainList";
import CharacterList from "@/ui/CharacterList/CharacterList";
import { Affiliation, Gender, Race } from "@/api/dragonBall/schema/enums";

jest.mock("../../src/api/dragonBall/apiService", () => ({
  __esModule: true,
  getAllCharacters: jest.fn(),
}));
jest.mock("../../src/utils/purgeUndefinedValuesFromObject", () =>
  jest.fn().mockImplementation((obj) => obj)
);

jest.mock("../../src/ui/CharacterList/CharacterList", () => {
  return jest.fn(() => <div data-testid="mock-character-list">MockedList</div>);
});

const mockArrayResponse: CharacterFragment[] = [
  {
    id: 1,
    name: "Goku",
    ki: "60.000.000",
    maxKi: "90 Septillion",
    race: Race.SAIYAN,
    gender: Gender.MALE,
    description: "Desc 1",
    image: "/test1.png",
    affiliation: Affiliation.Z_FIGHTER,
    deletedAt: undefined,
  },
  {
    id: 2,
    name: "Vegeta",
    ki: "54.000.000",
    maxKi: "19.84 Septillion",
    race: Race.SAIYAN,
    gender: Gender.MALE,
    description: "Desc 1",
    image: "/test2.png",
    affiliation: Affiliation.Z_FIGHTER,
    deletedAt: undefined,
  },
];

const lesserMockArrayResponse: CharacterLesserFragment[] = [
  {
    id: 1,
    name: "Goku",
    image: "/test1.png",
  },
  {
    id: 2,
    name: "Vegeta",
    image: "/test2.png",
  },
];

describe("MainList (server component)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call getAllCharacters with purged filters", async () => {
    const mockFilters: GetAllCharactersParams = { name: "Goku", page: 1 };

    (getAllCharacters as jest.Mock).mockResolvedValue(mockArrayResponse);

    const element = await MainList({ filters: mockFilters });
    render(element);

    expect(purgeUndefinedValueFromObject).toHaveBeenCalledWith(mockFilters);
    expect(getAllCharacters).toHaveBeenCalledWith(mockFilters);
  });

  it("should map character fragment into lesser ones pass that array CharacterList", async () => {
    (getAllCharacters as jest.Mock).mockResolvedValue(mockArrayResponse);

    const element = await MainList({});
    render(element);

    expect(CharacterList).toHaveBeenCalledWith(
      {
        list: lesserMockArrayResponse,
      },
      undefined
    );
    expect(screen.getByTestId("mock-character-list")).toBeInTheDocument();
  });

  it("should handle response object with items and pass them to CharacterList", async () => {
    const mockFilters: GetAllCharactersParams = { limit: 5 };
    const mockObjectResponse = {
      items: mockArrayResponse,
    };

    (getAllCharacters as jest.Mock).mockResolvedValue(mockObjectResponse);

    const element = await MainList({ filters: mockFilters });
    render(element);

    expect(CharacterList).toHaveBeenCalledWith(
      { list: lesserMockArrayResponse },
      undefined
    );
    expect(screen.getByTestId("mock-character-list")).toBeInTheDocument();
  });

  it("should default to empty filters if none are provided", async () => {
    (purgeUndefinedValueFromObject as jest.Mock).mockReturnValue({});
    (getAllCharacters as jest.Mock).mockResolvedValue(mockArrayResponse);

    const element = await MainList({});
    render(element);

    expect(purgeUndefinedValueFromObject).toHaveBeenCalledWith({});
    expect(getAllCharacters).toHaveBeenCalledWith({});
    expect(CharacterList).toHaveBeenCalledWith(
      { list: lesserMockArrayResponse },
      undefined
    );
    expect(screen.getByTestId("mock-character-list")).toBeInTheDocument();
  });
});
