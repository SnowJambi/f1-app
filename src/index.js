import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Tracks from "./routes/tracks.js"
// import Drivers from "./routes/tracks.js"

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="schedule" element={<Tracks />} />
      {/* <Route path="drivers" element={<Drivers />} /> */}
    </Routes>
  </BrowserRouter>,
  rootElement
);