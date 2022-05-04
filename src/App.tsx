import React from 'react';
import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import { HomeView } from './views/HomeView';
import { ResultsView } from './views/ResultsView';
import { TestView } from './views/TestView';
import {Redirector} from './components/Redirector';
import Pages from './Pages';
import './App.css';

function App() {
  return (
    <div className="App">
      <Redirector>
        <Routes>
          <Route path={Pages.Home} element={<HomeView />} />
          <Route path={Pages.Test} element={<TestView />} />
          <Route path={Pages.Results} element={<ResultsView />} />
        </Routes>
      
    </Redirector>
    </div>
  );
}

export default App;
