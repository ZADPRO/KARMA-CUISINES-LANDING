import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../01-Header/Header";
import Home from "../02-Home/Home";
import About from "../03-About/About";
import Menu from "../04-Menu/Menu";
import Contact from "../05-Contact/Contact";
import Cart from "../06-Cart/Cart";
import Login from "../07-Login/Login";
import Footer from "../08-Footer/Footer";
import NotFound from "../09-NotFound/NotFound";

export default function MainRoutes() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
