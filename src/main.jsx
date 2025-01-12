import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// I18
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import global_en from "./translation/english/global.json";
import global_de from "./translation/german/global.json";
import global_fr from "./translation/french/global.json";
import global_it from "./translation/italian/global.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    de: {
      global: global_de,
    },
    en: {
      global: global_en,
    },
    fr: {
      global: global_fr,
    },
    it: {
      global: global_it,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>{" "}
  </StrictMode>
);
