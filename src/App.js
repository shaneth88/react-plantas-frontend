import logo from "./logo.svg";
import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlantaList from "./components/PlantasList";
import PlantaForm from "./components/PlantasForm";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<PlantaList />} />
          <Route path="/add" element={<PlantaForm />} />
          <Route path="/edit/:id" element={<PlantaForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
