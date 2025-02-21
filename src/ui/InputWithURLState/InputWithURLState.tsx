"use client";
import useDebouncedCallback, {
  UnaryVoidFunction,
} from "@/hooks/useDebouncedCallback";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement } from "react";
import { URLParameters } from "@/lib/types";

type SupportedParameterTypes = string | number;
type InputWithURLStateUpdateFunction =
  UnaryVoidFunction<SupportedParameterTypes>;

interface IProps<T, R> {
  parameterKey: keyof T;
  render: (
    updateUrlParameters: InputWithURLStateUpdateFunction,
    defaultValue?: string
  ) => ReactElement;
  parametersToRemoveBeforeUpdate?: (keyof R)[];
  debounceMs?: number;
}

// Must be used inside a client component.
const InputWithURLState = <T, R = URLParameters>({
  parameterKey,
  render,
  parametersToRemoveBeforeUpdate,
  debounceMs = 0,
}: IProps<T, R>) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const formattedParamKey = parameterKey.toString();

  const updateUrlParameters = useDebouncedCallback<SupportedParameterTypes>(
    (value) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(formattedParamKey, value.toString());
      } else {
        params.delete(formattedParamKey);
      }

      parametersToRemoveBeforeUpdate?.forEach((key) =>
        params.delete(key.toString())
      );

      replace(`${pathname}?${params}`);
    },
    debounceMs
  );

  return render(
    updateUrlParameters,
    searchParams.get(formattedParamKey)?.toString()
  );
};

export default InputWithURLState;
