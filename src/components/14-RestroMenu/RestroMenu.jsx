import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import spicyChicken from "../../assets/kingsKurry/spicyChicken.png";
// import chickenTikka from "../../assets/kingsKurry/chickenTikka.png";
// import butterChicken from "../../assets/kingsKurry/butterChicken.png";
// import chickenCurry from "../../assets/kingsKurry/chickenCurry.png";

import chickenTikkaImg from "../../foodImgs/chickenTIkkaMasala.JPG";
import butterChickenImg from "../../foodImgs/butterChickenMasala.WEBP";
import chickenMadras from "../../foodImgs/madrasChicken.png";
import chickenVindaloo from "../../foodImgs/chickenVindaloo.WEBP";
import malabarPrawn from "../../foodImgs/prawnCurry.WEBP";
import paneerButter from "../../foodImgs/paneerButter.JPG";
import mixVegMasala from "../../foodImgs/mixVegMasala.png";
import dhalMakani from "../../foodImgs/dalMakhani.JPG";
import chickenCurry from "../../assets/kingsKurry/chickenCurry.png";
import vegSamosa from "../../foodImgs/vegSamosa.JPG";
import fruhlingsrolle from "../../foodImgs/fruhilibgsrolle.jpg";
import pommesFruits from "../../foodImgs/pommesFrites.JPG";
import chickenNuggets from "../../foodImgs/chickenNiggets.JPG";
import chickenWings from "../../foodImgs/chickenWings.JPG";
import onionRings from "../../foodImgs/onionRings.JPG";
import mixedSnackBox from "../../foodImgs/mixVegMasala.png";
import tamarindChutney from "../../foodImgs/tamarindChutney.JPG";
import sweetMangoChutney from "../../foodImgs/sweetMangoChutney.JPG";
import mayonnise from "../../foodImgs/mayonnaise.JPG";
import natureNaan from "../../foodImgs/natureNaan.JPG";
import currySauce from "../../foodImgs/currySauce.JPG";
import garlicNaan from "../../assets/kingsKurry/garlicNaan.png";
import butterNaan from "../../foodImgs/butterNaan.JPG";
import vanila from "../../foodImgs/movenPickVanilla.WEBP";
import chocolate from "../../foodImgs/movenPickChocolate.WEBP";
import caramel from "../../foodImgs/movenPickcaramelIceCream.WEBP";
import gulabJamun from "../../foodImgs/gulabJamun.JPG";
import sweetChilliSauce from "../../foodImgs/sweetChilliSauce.jpg";
import sauce from "../../foodImgs/sauce.jpg";
import basmathi from "../../foodImgs/basmathi.jpg";
import spicyFinger from "../../foodImgs/friedFingers.jpg";
import ketchup from "../../foodImgs/ketchup.jpg";
import tiramisu from "../../foodImgs/tiramisu.jpg";
import kingFisher from "../../foodImgs/kingFisher.jpg";
import feldschlossen from "../../foodImgs/feldschlossen.jpg";
import hauseweinWeissChardonnay from "../../foodImgs/hauseweinWeissChardonnay.jpg";
import hauseweinRotPrimitivo from "../../foodImgs/hauseweinRotPrimitivo.jpg";
import hausGetranke from "../../foodImgs/hausGetranke.jpg";
import cocacola from "../../foodImgs/cocacola.jpg";
import cocacolazero from "../../foodImgs/cocacolazero.jpg";
import fantaOrange from "../../foodImgs/fantaOrange.jpg";
import rivellaRot from "../../foodImgs/rivellaRot.jpg";
import rivellaBlau from "../../foodImgs/rivellaBlau.jpg";
import iceTeaLemon from "../../foodImgs/iceTeaLemon.jpg";
import mineralwasserOhne from "../../foodImgs/mineralwasserOhne.jpg";

import ProductDetailsModal from "../../pages/ProductDetailsModal/ProductDetailsModal";

import "./restroMenu.css";
import { ShoppingCart } from "lucide-react";
import ProductsModalLatest from "../../pages/ProductsModalLatest/ProductsModalLatest";

import { useTranslation } from "react-i18next";

export default function RestroMenu() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const routePath = params.get("routePath");

  const { t } = useTranslation("global");

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [searchTerm, setSearchTerm] = useState("");
  const [postalCodeSearch, setPostalCodeSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productModalOpen, setProductsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItem = [
    // NICHT VEGETARISCH - HAUPTGANG
    {
      id: 1,
      price: "32.90 CHF",
      image: chickenTikkaImg,
      name: "CHICKEN TIKKA MASALA mit Reis",
      postalCode: "8052",
      category: "HAUPTSPEISEN",
      mainCategory: "NICHT VEGETARISCH - HAUPTGANG",
      description:
        "Erst im Tonofen gebacken, dann mit Kümmel, gehacktem Koriander und Zwiebel-Tomaten-Mischung gekocht.",
      rating: 5,
    },
    {
      id: 2,
      price: "32.90 CHF",
      image: butterChickenImg,
      name: "BUTTER CHICKEN mit Reis",
      postalCode: "8052",
      category: "HAUPTSPEISEN",
      mainCategory: "NICHT VEGETARISCH - HAUPTGANG",
      description:
        "Erst im Tonofen gebacken, dann mit Fine Rahm-Tomaten und Curry -Mischung sauce gekocht",
      rating: 5,
    },
    {
      id: 3,
      price: "31.90 CHF",
      image: chickenMadras,
      name: "CHICKEN MADRAS mit Reis",
      postalCode: "8052",
      category: "HAUPTSPEISEN",
      mainCategory: "NICHT VEGETARISCH - HAUPTGANG",
      description:
        "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
      rating: 5,
    },
    {
      id: 4,
      price: "33.90 CHF",
      image: chickenVindaloo,
      name: "CHICKEN VINDALOO mit Reis",
      postalCode: "8052",
      category: "HAUPTSPEISEN",
      mainCategory: "NICHT VEGETARISCH - HAUPTGANG",
      description: "Poulet geschmort in scharfer Chili-Tomato sauce",
      rating: 5,
    },
    {
      id: 5,
      price: "33.90 CHF",
      image: malabarPrawn,
      name: "MALABAR PRAWN CURRY mit Reis",
      postalCode: "8052",
      category: "HAUPTSPEISEN",
      mainCategory: "NICHT VEGETARISCH - HAUPTGANG",
      description:
        "Krevetten in einer Kokosnuss- Curry Sauce mit Zwiebeln, Tomaten, Curry Blättern. Eine Spezialität der Kerala Küste in Indien",
      rating: 5,
    },
    // VEGETARISCH- HAUPTGANG
    {
      id: 6,
      price: "32.90 CHF",
      image: paneerButter,
      name: "PANEER BUTTER MASALA mit Reis",
      postalCode: "8052",
      category: "HAUPTSPEISEN",
      mainCategory: "VEGETARISCH- HAUPTGANG",
      description:
        "Hausgemachter, nicht gereifter Hüttenkäse nennt sich Paneer, ideal kombiniert mit Spinat, milden Gewürzen und Tomaten",
      rating: 5,
    },
    {
      id: 7,
      price: "31.90 CHF",
      image: mixVegMasala,
      name: "MIX VEG. MASALA mit Reis",
      postalCode: "8052",
      category: "HAUPTSPEISEN",
      mainCategory: "VEGETARISCH- HAUPTGANG",
      description: "Kombination von Gemüsen gekocht in frischer Kokosnuss",
      rating: 5,
    },
    {
      id: 8,
      price: "31.90 CHF",
      image: dhalMakani,
      name: "DAL MAKHANI mit Reis",
      postalCode: "8052",
      category: "HAUPTSPEISEN",
      mainCategory: "VEGETARISCH- HAUPTGANG",
      description:
        "Schwarz Linsen mit frischen Gewürzen gekocht glasiert mit Butter",
      rating: 5,
    },
    {
      id: 9,
      price: "30.90 CHF",
      image: chickenCurry,
      name: "PLANTED CHICKEN CURRY mit Reis",
      postalCode: "8052",
      category: "HAUPTSPEISEN",
      mainCategory: "VEGAN / PLANTED",
      description: "Fleischlos Poulet Curry mit  Zweibel, tomato, Curry Gewürz",
      rating: 5,
    },
    // SNACKS
    {
      id: 10,
      price: "5.00 CHF",
      image: vegSamosa,
      name: "VEGETABLE SAMOSA’S  1stk",
      postalCode: "8052",
      category: "SNACKS",
      mainCategory: "SNACKS",
      description:
        "Pikante Teigtasche Gemüse Ecken, serviert mit Mint und Tamarind Chutney",
      rating: 5,
    },
    {
      id: 11,
      price: "5.00 CHF",
      image: fruhlingsrolle,
      name: "FRÜHLINGSROLLE  1 stk",
      postalCode: "8052",
      category: "SNACKS",
      mainCategory: "SNACKS",
      description: "Frühlingsrolle",
      rating: 5,
    },
    {
      id: 12,
      price: "9.00 CHF",
      image: pommesFruits,
      name: "POMMES FRITES",
      postalCode: "8052",
      category: "SNACKS",
      mainCategory: "SNACKS",
      description: "-",
      rating: 5,
    },
    {
      id: 13,
      price: "12.00 CHF",
      image: chickenNuggets,
      name: "CHICKEN NUGGETS 8 Stk",
      postalCode: "8052",
      category: "SNACKS",
      mainCategory: "SNACKS",
      description: "-",
      rating: 5,
    },
    {
      id: 14,
      price: "18.00 CHF",
      image: chickenWings,
      name: "CHICKEN WINGS 9 stk",
      postalCode: "8052",
      category: "SNACKS",
      mainCategory: "SNACKS",
      description: "-",
      rating: 5,
    },
    {
      id: 15,
      price: "9.00 CHF",
      image: onionRings,
      name: "ONION RINGS 6 stk",
      postalCode: "8052",
      category: "SNACKS",
      mainCategory: "SNACKS",
      description: "-",
      rating: 5,
    },
    {
      id: 16,
      price: "15.90 CHF",
      image: spicyFinger,
      name: "CRISPY CHICKEN FINGERS 8 stk",
      postalCode: "8052",
      category: "SNACKS",
      mainCategory: "SNACKS",
      description: "-",
      rating: 5,
    },
    {
      id: 17,
      price: "20.90 CHF",
      image: mixedSnackBox,
      name: "MIXED SNACKS BOX",
      postalCode: "8052",
      category: "SNACKS",
      mainCategory: "SNACKS",
      description: "3 X ONION RINGS , 3 X VEG SAMOSA, 3 X CRISPY CHICKEN",
      rating: 5,
    },
    // SAUCEN/ TIP
    {
      id: 18,
      price: "2.50 CHF",
      image: currySauce,
      name: "CURRY SAUCE",
      postalCode: "8052",
      category: "SAUCEN / TIP",
      mainCategory: "DIPS",
      description: "-",
      rating: 5,
    },
    {
      id: 19,
      price: "2.50 CHF",
      image: sauce,
      name: "GARLIC SAUCE ",
      postalCode: "8052",
      category: "SAUCEN / TIP",
      mainCategory: "DIPS",
      description: "-",
      rating: 5,
    },
    {
      id: 20,
      price: "2.50 CHF",
      image: sweetChilliSauce,
      name: "SWEET CHILLY SAUCE",
      postalCode: "8052",
      category: "SAUCEN / TIP",
      mainCategory: "DIPS",
      description: "-",
      rating: 5,
    },
    {
      id: 21,
      price: "2.50 CHF",
      image: tamarindChutney,
      name: "TAMARIND SAUCE",
      postalCode: "8052",
      category: "SAUCEN / TIP",
      mainCategory: "DIPS",
      description: "-",
      rating: 5,
    },
    {
      id: 22,
      price: "2.50 CHF",
      image: sweetMangoChutney,
      name: "SWEET MANGO CHUTNEY",
      postalCode: "8052",
      category: "SAUCEN / TIP",
      mainCategory: "DIPS",
      description: "-",
      rating: 5,
    },
    {
      id: 23,
      price: "2.00 CHF",
      image: ketchup,
      name: "KETCHUP",
      postalCode: "8052",
      category: "SAUCEN / TIP",
      mainCategory: "DIPS",
      description: "-",
      rating: 5,
    },
    {
      id: 24,
      price: "2.00 CHF",
      image: mayonnise,
      name: "MAYONNAISE",
      postalCode: "8052",
      category: "SAUCEN / TIP",
      mainCategory: "DIPS",
      description: "-",
      rating: 5,
    },

    // BEILAGEN
    {
      id: 25,
      price: "5.00 CHF",
      image: natureNaan,
      name: "NATURE NAAN",
      postalCode: "8052",
      category: "BEILAGEN",
      mainCategory: "BEILAGEN | SIDE ORDERS | BROTE",
      description: "Fladen Brot- Natur",
      rating: 5,
    },
    {
      id: 26,
      price: "7.00 CHF",
      image: garlicNaan,
      name: "GARLIC NAAN",
      postalCode: "8052",
      category: "BEILAGEN",
      mainCategory: "BEILAGEN | SIDE ORDERS | BROTE",
      description: "Fladen Brot mit Knoblauch",
      rating: 5,
    },
    {
      id: 27,
      price: "6.00 CHF",
      image: butterNaan,
      name: "BUTTER NAAN",
      postalCode: "8052",
      category: "BEILAGEN",
      mainCategory: "BEILAGEN | SIDE ORDERS | BROTE",
      description: "Fladen Brot- mit Butter",
      rating: 5,
    },
    {
      id: 28,
      price: "5.00 CHF",
      image: basmathi,
      name: "BASMATI RICE ",
      postalCode: "8052",
      category: "BEILAGEN",
      mainCategory: "BEILAGEN | SIDE ORDERS | BROTE",
      description: "Natur Reis",
      rating: 5,
    },
    // DESSERTS
    {
      id: 29,
      price: "6.90 CHF",
      image: caramel,
      name: "MÖVENPICK CARAMEL ICECREAM ",
      postalCode: "8052",
      category: "DESSERTS",
      mainCategory: "DESSERTS",
      description: "-",
      rating: 5,
    },
    {
      id: 30,
      price: "6.90 CHF",
      image: vanila,
      name: "MÖVENPICK VANILLA ICECREAM ",
      postalCode: "8052",
      category: "DESSERTS",
      mainCategory: "DESSERTS",
      description: "-",
      rating: 5,
    },
    {
      id: 31,
      price: "6.90 CHF",
      image: chocolate,
      name: "MÖVENPICK CHOCOLATE ICECREAM ",
      postalCode: "8052",
      category: "DESSERTS",
      mainCategory: "DESSERTS",
      description: "-",
      rating: 5,
    },
    {
      id: 32,
      price: "9.90 CHF",
      image: gulabJamun,
      name: "GULAB JAMUN ",
      postalCode: "8052",
      category: "DESSERTS",
      mainCategory: "DESSERTS",
      description:
        "Milchbällchen in Kardamom Saffran Rosen -Sirup getaucht 2 Stücke",
      rating: 5,
    },
    {
      id: 33,
      price: "9.90 CHF",
      image: tiramisu,
      name: "TIRAMISU ",
      postalCode: "8052",
      category: "DESSERTS",
      mainCategory: "DESSERTS",
      description: "-",
      rating: 5,
    },
    // GETRÄNKE MIT ALKOHOL
    {
      id: 33,
      price: "7.5 CHF",
      image: kingFisher,
      name: "INDIA BEER- KINGFISHER ",
      postalCode: "8052",
      category: "BIER 3.33 dl",
      mainCategory: "GETRÄNKE MIT ALKOHOL",
      description: "-",
      rating: 5,
    },
    {
      id: 33,
      price: "6.5 CHF",
      image: feldschlossen,
      name: "Feldschlössen ORIGINAL ",
      postalCode: "8052",
      category: "BIER 3.33 dl",
      mainCategory: "GETRÄNKE MIT ALKOHOL",
      description: "-",
      rating: 5,
    },
    {
      id: 33,
      price: "25 CHF",
      image: hauseweinWeissChardonnay,
      name: "Hausewein Weiss Chardonnay ",
      postalCode: "8052",
      category: "WEINE 5dl",
      mainCategory: "GETRÄNKE MIT ALKOHOL",
      description: "-",
      rating: 5,
    },
    {
      id: 33,
      price: "25 CHF",
      image: hauseweinRotPrimitivo,
      name: "Hausewein Rot  Primitivo ",
      postalCode: "8052",
      category: "WEINE 5dl",
      mainCategory: "GETRÄNKE MIT ALKOHOL",
      description: "-",
      rating: 5,
    },
    // GETRÄNKE OHNE ALKOHOL
    {
      id: 34,
      price: "7.9 CHF",
      image: hausGetranke,
      name: "MANGO LASSI 3 DL ",
      postalCode: "8052",
      category: "HAUS GETRÄNKE ",
      mainCategory: "GETRÄNKE OHNE ALKOHOL",
      description: "Mango mit Joghurt und Kardamon",
      rating: 5,
    },
    {
      id: 35,
      price: "9.9 CHF",
      image: hausGetranke,
      name: "MANGO LASSI 5 DL ",
      postalCode: "8052",
      category: "HAUS GETRÄNKE ",
      mainCategory: "GETRÄNKE OHNE ALKOHOL",
      description: "Mango mit Joghurt und Kardamon",
      rating: 5,
    },
    {
      id: 36,
      price: "4.5 CHF",
      image: cocacola,
      name: "5 dl pet ",
      postalCode: "8052",
      category: "Coca Cola",
      mainCategory: "GETRÄNKE OHNE ALKOHOL",
      description: "-",
      rating: 5,
    },
    {
      id: 37,
      price: "4.5 CHF",
      image: cocacolazero,
      name: "5 dl pet ",
      postalCode: "8052",
      category: "Cola-Cola ZERO ",
      mainCategory: "GETRÄNKE OHNE ALKOHOL",
      description: "-",
      rating: 5,
    },
    {
      id: 38,
      price: "4.5 CHF",
      image: fantaOrange,
      name: "5 dl pet ",
      postalCode: "8052",
      category: "Fanta Orange ",
      mainCategory: "GETRÄNKE OHNE ALKOHOL",
      description: "-",
      rating: 5,
    },
    {
      id: 39,
      price: "4.5 CHF",
      image: rivellaRot,
      name: "5 dl pet ",
      postalCode: "8052",
      category: "Rivella Rot",
      mainCategory: "GETRÄNKE OHNE ALKOHOL",
      description: "-",
      rating: 5,
    },
    {
      id: 40,
      price: "4.5 CHF",
      image: rivellaBlau,
      name: "5 dl pet ",
      postalCode: "8052",
      category: "Rivella Blau",
      mainCategory: "GETRÄNKE OHNE ALKOHOL",
      description: "-",
      rating: 5,
    },
    {
      id: 41,
      price: "4.5 CHF",
      image: iceTeaLemon,
      name: "5 dl pet ",
      postalCode: "8052",
      category: "Ice Tea Lemon",
      mainCategory: "GETRÄNKE OHNE ALKOHOL",
      description: "-",
      rating: 5,
    },
    {
      id: 42,
      price: "4.5 CHF",
      image: mineralwasserOhne,
      name: "5 dl pet ",
      postalCode: "8052",
      category: "Mineralwasser mit  Kohlensäure",
      mainCategory: "GETRÄNKE OHNE ALKOHOL",
      description: "-",
      rating: 5,
    },
  ];

  // const menuItems = [
  //   {
  //     id: 1,
  //     name: "Spicy Chicken",
  //     price: "120 CHF",
  //     image: spicyChicken,
  //     postalCode: "8052",
  //     category: "Fast Food",
  //     description:
  //       "A fiery and flavorful chicken dish marinated with spices and grilled to perfection.",
  //     rating: 4.5,
  //   },
  //   {
  //     id: 2,
  //     name: "Garlic Naan",
  //     price: "50 CHF",
  //     image: garlicNaan,
  //     postalCode: "8052",
  //     category: "Dining",
  //     description:
  //       "Soft and fluffy naan infused with fresh garlic and butter, perfect for pairing with curries.",
  //     rating: 4.7,
  //   },
  //   {
  //     id: 3,
  //     name: "Chicken Tikka",
  //     price: "140 CHF",
  //     image: chickenTikka,
  //     postalCode: "8052",
  //     category: "Grill",
  //     description:
  //       "Tender, juicy chicken pieces marinated in yogurt and spices, then grilled to perfection.",
  //     rating: 4.6,
  //   },
  //   {
  //     id: 4,
  //     name: "Butter Chicken",
  //     price: "130 CHF",
  //     image: butterChicken,
  //     postalCode: "8052",
  //     category: "Dining",
  //     description:
  //       "A rich and creamy tomato-based curry with succulent pieces of chicken.",
  //     rating: 4.8,
  //   },
  //   {
  //     id: 5,
  //     name: "Chicken Curry",
  //     price: "125 CHF",
  //     image: chickenCurry,
  //     postalCode: "8052",
  //     category: "Homestyle",
  //     description:
  //       "A traditional Indian chicken curry made with aromatic spices and slow-cooked to perfection.",
  //     rating: 4.4,
  //   },
  // ];

  const filteredItems = menuItem.filter(
    (item) =>
      (postalCodeSearch === "" || item.postalCode.includes(postalCodeSearch)) &&
      (searchTerm === "" ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rating.toString().includes(searchTerm))
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleModal = (product = null) => {
    if (isModalOpen) {
      // Check cart items when closing the modal
      const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      console.log("Cart items count:", savedCartItems.length);
    }
    setSelectedProduct(product);
    setIsModalOpen((prev) => !prev);
  };

  const productToggle = (product = null) => {
    if (productModalOpen) {
      // Check cart items when closing the modal
      const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      console.log("Cart items count:", savedCartItems.length);
    }
    setSelectedProduct(product);
    setProductsModalOpen((prev) => !prev);
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCartItems);
  }, []);

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((acc, item) => {
        const price = parseFloat(item.price.replace(" CHF", "")); // Remove " CHF" and convert to float
        return acc + (price * item.quantity || 0);
      }, 0)
      .toFixed(2);
  };

  const isItemInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const [cartItemCount, setCartItemCount] = useState(0);

  const handleCartUpdate = (count) => {
    setCartItemCount(count);
    const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCartItems);
  };

  return (
    <div>
      <div className="restroMenuIntroCont flex lg:flex-row flex-col lg:p-7">
        <div className="flex-1 homePageCont p-4 mt-8">
          <p className="lg:text-7xl text-5xl text-[#FFF5E4] capitalize">
            {routePath}...
          </p>
        </div>
      </div>
      {routePath === "kingsKurry" ? (
        <>
          <ProductDetailsModal
            isOpen={isModalOpen}
            onClose={toggleModal}
            product={selectedProduct}
            onCartUpdate={handleCartUpdate}
          />

          <div className="menuItems py-10 w-full md:w-11/12 mx-auto">
            <p className="text-2xl font-bold">Our excellent cuisine</p>
            <div className="flex lg:flex-row flex-col justify-center items-center w-full md:w-10/12 mx-auto">
              <div className="relative lg:my-6 my-3 mx-3 lg:w-4/12 ">
                <input
                  type="text"
                  placeholder="Search by name, category, description, or rating"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 w-full rounded border px-4 text-slate-500 outline-none focus:border-[#cd5c08]"
                />
              </div>
              <div className="relative lg:my-6 my-3 mx-3 lg:w-4/12 ">
                <input
                  type="text"
                  placeholder="Enter Postal Code To Filter"
                  value={postalCodeSearch}
                  onChange={(e) => setPostalCodeSearch(e.target.value)}
                  className="h-12 w-full rounded border px-4 text-slate-500 outline-none focus:border-[#cd5c08]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 lg:mx-24 my-5">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <div key={index} className="cartItemContents relative group">
                    <div
                      className="relative overflow-hidden rounded-lg shadow-md cursor-pointer"
                      onClick={() => toggleModal(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-[160px] object-cover rounded-lg"
                      />
                      {isItemInCart(item.id) && (
                        <div className="absolute top-2 right-2">
                          <ShoppingCart
                            size={32}
                            className="text-white bg-[#4f391d] rounded-full p-2"
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className="foodContents text-center mt-2 cursor-pointer"
                      onClick={() => toggleModal(item)}
                    >
                      <p className="text-sm font-semibold line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-gray-600">{item.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No items match your search.
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen text-2xl font-bold text-gray-600">
          Products Coming Soon.
        </div>
      )}

      <div className="footerBuyProducts cursor-pointer" onClick={productToggle}>
        {cartItems.length > 0 ? (
          <>
            <p className="text-lg font-semibold md:hidden">
              {cartItems.length} items in cart - CHF {calculateTotalPrice()} to
              continue
            </p>

            <p className="hidden md:block relative">
              <a
                href="#"
                className="relative inline-flex h-12 w-12 items-center justify-center text-lg text-white"
              >
                <ShoppingCart />
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-white px-1.5 text-sm text-black">
                  {cartItems.length}
                </span>
              </a>
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold text-gray-500 md:hidden">
              No items in the cart
            </p>
            <p className="hidden md:block relative">
              <a
                href="#"
                className="relative inline-flex h-12 w-12 items-center justify-center text-lg text-white"
              >
                <ShoppingCart />
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-white px-1.5 text-sm text-black">
                  {cartItems.length}
                </span>
              </a>
            </p>
          </>
        )}
      </div>

      <ProductsModalLatest
        isOpen={productModalOpen}
        onClose={productToggle}
        cartItems={cartItems}
      />
    </div>
  );
}
