import Header, {
  LOGO_ALT,
  LOGO_DIMENSIONS,
  LOGO_PATH,
} from "@/ui/Header/Header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Link from "next/link";
import { ComponentProps } from "react";
import Image from "next/image";
import { Route } from "@/lib/enums";

jest.mock("../../src/ui/FavoriteCount/FavoriteCount", () => {
  return jest.fn(() => <div data-testid="mock-favorite-count">FavCount</div>);
});

jest.mock("next/image", () => jest.fn());

jest.mock("next/link", () => (props: ComponentProps<typeof Link>) => {
  return <a href={props.href.toString()}>{props.children}</a>;
});

describe("Header component", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("should render a link to '/'", () => {
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", Route.HOME);
  });

  it("should render the logo image with correct alt text", () => {
    expect(Image).toHaveBeenCalledWith(
      expect.objectContaining({
        src: LOGO_PATH,
        alt: LOGO_ALT,
        ...LOGO_DIMENSIONS,
        priority: true,
      }),
      undefined
    );
  });

  it("should render the FavoriteCount component", () => {
    expect(screen.getByTestId("mock-favorite-count")).toBeInTheDocument();
  });
});
