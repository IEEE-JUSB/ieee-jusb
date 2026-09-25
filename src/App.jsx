import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AnimatedRoutes from "./Components/AnimatedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
