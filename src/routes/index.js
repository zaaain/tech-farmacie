import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesMain from "./route";
import ErrorBoundary from "pages/ErrorBoundary";

const AppRouter = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
          <RoutesMain />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default AppRouter;
