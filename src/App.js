import Header from "./components/header";
import "./App.css";
import Body from "./components/body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/details">
          <Route path=":id" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
