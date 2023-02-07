import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./../Pages/Home/Home";
import Detail from "./../Pages/Detail/Detail";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
