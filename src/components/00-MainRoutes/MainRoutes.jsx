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
import OurBrands from "../11-OurBrands/OurBrands";
import OurPartners from "../12-BeOurPartner/OurPartners";
import Career from "../13-Career/Career";
import RestroMenu from "../14-RestroMenu/RestroMenu";
import GuestLogin from "../15-GuestLogin/GuestLogin";
import SubProducts from "../16-SubProducts/SubProducts";
import OtherBrands from "../11-OurBrands/OtherBrands";

function AppRoutes() {
  const location = useLocation();

  // Define routes where the header should be shown
  const headerRoutes = [
    "/",
    "/about",
    "/menu",
    "/contact",
    "/restroMenu",
    "/ourBrand",
    "/comingSoon",
    "/beOurPartner",
    "/subproducts",
    "/career",
  ];
  const showHeader = headerRoutes.includes(location.pathname);

  const footerRoutes = [
    "/",
    "/about",
    "/menu",
    "/contact",
    "/ourBrand",
    "/comingSoon",
    "/beOurPartner",
    "/subproducts",
    "/career",
  ];

  const showFooter = footerRoutes.includes(location.pathname);

  return (
    <div>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ourBrand" element={<OurBrands />} />
        <Route path="/beOurPartner" element={<OurPartners />} />
        <Route path="/career" element={<Career />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/comingSoon" element={<OtherBrands />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/subproducts" element={<SubProducts />} />
        <Route path="/restroMenu" element={<RestroMenu />} />
        <Route path="/guestLogin" element={<GuestLogin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {showFooter && <Footer />}
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
