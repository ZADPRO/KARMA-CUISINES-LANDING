import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "../01-Header/Header";
import Home from "../02-Home/Home";
import About from "../03-About/About";
import Menu from "../04-Menu/Menu";
import Contact from "../05-Contact/Contact";
import Cart from "../06-Cart/Cart";
import Login from "../07-Login/Login";
import Footer from "../08-Footer/Footer";
import NotFound from "../09-NotFound/NotFound";
import Orders from "../10-Orders/Orders";

function AppRoutes() {
  const location = useLocation();

  // Define routes where the header should be shown
  const headerRoutes = ["/", "/about", "/menu", "/contact"];
  const showHeader = headerRoutes.includes(location.pathname);

  return (
    <div>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function MainRoutes() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
