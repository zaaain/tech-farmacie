import React from "react";
import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import "./App.css";
import AppRouter from "./routes/index";
import { persistor, store } from "./redux/store";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ErrorBoundary from "pages/ErrorBoundary";


const snackIcons = {
  success: "😄 😎 ",
  error: "😠",
  warning: "⚠️",
  info: "ℹ️",
};

const App = () => {
// let location = useLocation();
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider maxSnack={3} iconVariant={snackIcons}>
            {/* <ErrorBoundary> */}
            <AppRouter />
            {/* </ErrorBoundary> */}
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
