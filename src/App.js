import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/usuarios" element={<Users />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
