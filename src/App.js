import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import PracticePage from "./PracticePage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </Router>
  );
}

export default App;
