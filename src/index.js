import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Races from "./routes/Races.js"

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="schedule" element={<Races />} />
      </Routes>
  </BrowserRouter>,
  rootElement
);