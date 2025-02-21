import { Route } from "@/lib/enums";
import CharacterCard from "@/ui/CharacterCard/CharacterCard";
import FavoriteButton from "@/ui/FavoriteButton/FavoriteButton";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

jest.mock("../../src/ui/FavoriteButton/FavoriteButton", () => jest.fn());

jest.mock("next/image", () => jest.fn());

jest.mock("next/link", () => (props: ComponentProps<typeof Link>) => {
  return <a href={props.href.toString()}>{props.children}</a>;
});

describe("CharacterCard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockProps = {
    id: 123,
    name: "Test Character",
    image: "/test.png",
  };

  it("should render a link with the correct href", () => {
    render(<CharacterCard {...mockProps} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute(
      "href",
      `${Route.CHARACTERS}/${mockProps.id}`
    );
  });

  it("should display the character name", () => {
    render(<CharacterCard {...mockProps} />);
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
  });

  it("should display the image with the correct alt text", () => {
    render(<CharacterCard {...mockProps} />);
    expect(Image).toHaveBeenCalledWith(
      expect.objectContaining({
        src: mockProps.image,
        alt: `${mockProps.name} avatar`,
        fill: true,
        sizes: "100%",
        priority: true,
      }),
      undefined
    );
  });

  it("should render the FavoriteButton with the correct props", () => {
    render(<CharacterCard {...mockProps} />);
    expect(FavoriteButton).toHaveBeenCalledWith(
      expect.objectContaining(mockProps),
      undefined
    );
  });
});
