import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import "./styles/global.css";
import AppRouter from "./router.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import store, { persistor } from "./store";

import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "❌ Root element not found. Make sure <div id='root'></div> exists in index.html"
  );
}

createRoot(rootElement).render(
  <StrictMode>
    {/* <Suspense fallback={<Spinner />}> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <AppRouter />
            <ToastContainer position="top-right" />
          </BrowserRouter>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
    {/* </Suspense> */}
  </StrictMode>
);
