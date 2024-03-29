import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import ResultsPage from "./containers/ResultsPage/ResultsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/results' element={<ResultsPage />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
