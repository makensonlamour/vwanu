/*eslint-disable*/
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./TextEditor.css";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";
import "react-quill/dist/quill.snow.css";
import "cropperjs/dist/cropper.css";
import "react-slidy/lib/styles.css";
import "react-videoplayer/lib/index.css";
// import { StyledEngineProvider } from "@mui/material/styles";
// import { CssBaseline } from "@mui/material";

// import "video-react/dist/video-react.css";
// import "quill-emoji/dist/quill-emoji.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { history } from "./components/common/Alert/_helpers";
import { AuthContextProvider } from "./context/AuthContext";
import { MessageContextProvider } from "./context/MessageContext";
import { ImageBlogContextProvider } from "./context/imageBlogContext";
import { IntlProvider } from "react-intl";
import lan_en from "./translations/en.json";
import lan_fr from "./translations/fr.json";
import lan_es from "./translations/es.json";
import lan_ht from "./translations/ht.json";

const languages = {
  en: lan_en,
  fr: lan_fr,
  es: lan_es,
  ht: lan_ht,
};

const language = navigator.language.split(/[-_]/)[0];

if (typeof document === "undefined") {
  React.useLayoutEffect = React.useEffect;
}

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter history={history}>
    <div>
      <AuthContextProvider>
        <MessageContextProvider>
          <ImageBlogContextProvider>
            <IntlProvider locale={language} messages={languages[language]}>
              <App />
            </IntlProvider>
          </ImageBlogContextProvider>
        </MessageContextProvider>
      </AuthContextProvider>
    </div>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
