"use client";
import { Component, PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  fallbackUI: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch() {}

  public render() {
    if (this.state.hasError) {
      return this.props.fallbackUI;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
