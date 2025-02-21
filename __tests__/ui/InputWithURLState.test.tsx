import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import InputWithURLState from "@/ui/InputWithURLState/InputWithURLState";
import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComponentProps } from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("../../src/hooks/useDebouncedCallback", () =>
  jest.fn().mockImplementation((func) => func)
);

describe("InputWithURLState Component", () => {
  const replaceMock = jest.fn();
  let renderMock = jest.fn();
  let searchParamsMock: URLSearchParams;
  const useRouterMock = useRouter as jest.Mock;
  const useSearchParamsMock = useSearchParams as jest.Mock;
  const usePathnameMock = usePathname as jest.Mock;

  const defaultPathname = "/";

  interface TestParams {
    param1?: string;
    param2?: string;
    param3?: string;
  }

  interface ParamsToRemove {
    param2?: string;
    param3?: string;
  }

  const renderComponent = (
    overrides: Partial<
      ComponentProps<typeof InputWithURLState<TestParams, ParamsToRemove>> & {
        parameterKey: keyof TestParams;
      }
    > = {}
  ) => {
    const props: ComponentProps<
      typeof InputWithURLState<TestParams, ParamsToRemove>
    > = {
      parameterKey: "param1",
      render: jest.fn(),
      parametersToRemoveBeforeUpdate: undefined,
      debounceMs: 0,
      ...overrides,
    };

    return render(<InputWithURLState<TestParams, ParamsToRemove> {...props} />);
  };

  const getUpdateUrlParameters = (renderMock: jest.Mock) => {
    const [updateUrlParameters, defaultValue] = renderMock.mock.calls[0];
    return { updateUrlParameters, defaultValue };
  };

  beforeEach(() => {
    jest.clearAllMocks();

    searchParamsMock = new URLSearchParams();
    useRouterMock.mockReturnValue({
      replace: replaceMock,
    });
    useSearchParamsMock.mockReturnValue(searchParamsMock);
    usePathnameMock.mockReturnValue(defaultPathname);
    renderMock = jest.fn();
  });

  it("should call render with updateUrlParameters and defaultValue", () => {
    const renderMock = jest.fn();
    searchParamsMock.set("param1", "initialValue");

    renderComponent({ render: renderMock });

    expect(renderMock).toHaveBeenCalledWith(
      expect.any(Function),
      "initialValue"
    );
  });

  it("should update URL parameters when updateUrlParameters is called", () => {
    renderComponent({ render: renderMock });

    const { updateUrlParameters } = getUpdateUrlParameters(renderMock);

    act(() => {
      updateUrlParameters("newValue");
    });

    expect(replaceMock).toHaveBeenCalledWith(
      `${defaultPathname}?param1=newValue`
    );
  });

  it("should remove the parameter if updateUrlParameters is called with falsy value", () => {
    searchParamsMock.set("param1", "initialValue");

    renderComponent({ render: renderMock });

    const { updateUrlParameters } = getUpdateUrlParameters(renderMock);

    act(() => {
      updateUrlParameters("");
    });

    expect(replaceMock).toHaveBeenCalledWith(`${defaultPathname}?`);
  });

  it("should remove parameters specified in parametersToRemoveBeforeUpdate", () => {
    searchParamsMock.set("param1", "initialValue");
    searchParamsMock.set("param2", "value2");

    renderComponent({
      render: renderMock,
      parametersToRemoveBeforeUpdate: ["param2"],
    });

    const { updateUrlParameters } = getUpdateUrlParameters(renderMock);

    act(() => {
      updateUrlParameters("newValue");
    });

    expect(replaceMock).toHaveBeenCalledWith(
      `${defaultPathname}?param1=newValue`
    );
  });

  it("should handle multiple parameters to remove before update", () => {
    searchParamsMock.set("param1", "initialValue");
    searchParamsMock.set("param2", "value2");
    searchParamsMock.set("param3", "value3");

    renderComponent({
      render: renderMock,
      parametersToRemoveBeforeUpdate: ["param2", "param3"],
    });

    const { updateUrlParameters } = getUpdateUrlParameters(renderMock);

    act(() => {
      updateUrlParameters("newValue");
    });

    expect(replaceMock).toHaveBeenCalledWith(
      `${defaultPathname}?param1=newValue`
    );
  });

  it("should call useDebounceCallback hook with debounceMs when provided", () => {
    renderComponent({
      render: renderMock,
      debounceMs: 500,
    });

    expect(useDebouncedCallback).toHaveBeenCalledWith(
      expect.any(Function),
      500
    );
  });
});
