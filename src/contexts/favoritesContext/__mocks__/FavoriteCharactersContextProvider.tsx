import { createContext, FC, PropsWithChildren } from "react";

export const MockFavoriteCharactersContext = createContext<string | undefined>(
  undefined
);

const MockFavoriteCharactersContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <MockFavoriteCharactersContext.Provider
      data-testid="favCharacterContextProvider"
      value="test-value"
    >
      {children}
    </MockFavoriteCharactersContext.Provider>
  );
};

export default MockFavoriteCharactersContextProvider;
