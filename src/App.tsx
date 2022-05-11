import React from "react";
import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import { HomeView } from "./views/HomeView";
import { ResultsView } from "./views/ResultsView";
import { TestView } from "./views/TestView";
import { Redirector } from "./components/Redirector";
import { ImageSelector } from "./views/ImageSelector";
import { CalibrationView } from "./views/CalibrationView";
import { NavBar } from "./components/NavBar";
import Pages from "./Pages";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Redirector>
        <Routes>
          <Route path={Pages.Home} element={<HomeView />} />
          <Route path={Pages.Test} element={<TestView />} />
          <Route path={Pages.Results} element={<ResultsView />} />
          <Route path={Pages.Calibrate} element={<CalibrationView />} />
          <Route path={Pages.ImageSelect} element={<ImageSelector />} />
        </Routes>
      </Redirector>
    </div>
  );
}

export default App;
