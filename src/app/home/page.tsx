import { CHARACTERS_LIMIT } from "@/lib/constants";
import { URLParameters } from "@/lib/types";
import ErrorBoundary from "@/ui/ErrorBoundary/ErrorBoundary";
import ErrorDisplay from "@/ui/ErrorDisplay/ErrorDisplay";
import LoadingSpinner from "@/ui/LoadingSpinner/LoadingSpinner";
import MainList from "@/ui/MainList/MainList";
import { FC, Suspense } from "react";

const Home: FC = async (props: { searchParams?: Promise<URLParameters> }) => {
  const searchParams = await props.searchParams;
  const wordsToMatch = searchParams?.keywords;

  return (
    <ErrorBoundary fallbackUI={<ErrorDisplay />}>
      <Suspense fallback={<LoadingSpinner />}>
        <MainList filters={{ limit: CHARACTERS_LIMIT, name: wordsToMatch }} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;
