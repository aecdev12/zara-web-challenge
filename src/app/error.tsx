"use client";
import ErrorDisplay from "@/ui/ErrorDisplay/ErrorDisplay";
import React, { FC } from "react";

const ErrorPage: FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ reset }) => {
  return <ErrorDisplay action={{ label: "Reload", onClick: reset }} />;
};

export default ErrorPage;
