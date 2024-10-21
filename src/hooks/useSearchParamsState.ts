import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchParamsState = (param: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = useMemo(
    () => searchParams.get(param) ?? undefined,
    [searchParams, param],
  );
  const setParamValue = (value?: string) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      if (value) {
        params.set(param, value);
      } else {
        params.delete(param);
      }
      return params;
    });
  };
  return [paramValue, setParamValue] as const;
};
