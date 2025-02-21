import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Transformation } from "@/api/dragonBall/schema/types";
import TransformationCard from "@/ui/TransformationCard/TransformationCard";
import Image from "next/image";

jest.mock("next/image", () => jest.fn());

describe("TransformationCard component", () => {
  const mockTransformation: Transformation = {
    id: 1,
    image: "/test-transformation.png",
    name: "Super Saiyan",
    ki: "90 billion",
  };

  beforeEach(() => {
    render(<TransformationCard {...mockTransformation} />);
  });

  it("should render the transformation image with the correct alt text", () => {
    expect(Image).toHaveBeenCalledWith(
      expect.objectContaining({
        src: mockTransformation.image,
        alt: `transformation-${mockTransformation.id}`,
        fill: true,
        sizes: "100%",
      }),
      undefined
    );
  });

  it("should display the transformation name as passed", () => {
    expect(screen.getByText(mockTransformation.name)).toBeInTheDocument();
  });

  it("should display the ki by adding 'ki' at the end of the passed value", () => {
    expect(screen.getByText(`${mockTransformation.ki} ki`)).toBeInTheDocument();
  });
});
