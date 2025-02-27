// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import App from "./App.tsx";
import { store } from "@/store";
import { fetcher } from "@/api";
import DialogProvider from "./components/providers/dialog-provider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
      }}
    >
      <App />
      <DialogProvider />
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </SWRConfig>
  </Provider>,
  // </StrictMode>,
);
