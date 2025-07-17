import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import MainBrandLogo from "./components/MainBrandLogo";

const App = () => {
  return (
    <>
      <MainBrandLogo
        logoSrc="/soft-logo.webp"
        mainDomain="soft.io.vn"
        dismissible={false}
        altText="Logo Soft"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/danh-sach" element={<Destinations />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
