import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "@/i18n";
import App from "@/components/App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </StrictMode>,
);
