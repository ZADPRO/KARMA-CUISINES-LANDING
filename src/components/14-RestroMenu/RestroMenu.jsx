import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import spicyChicken from "../../assets/kingsKurry/spicyChicken.png";
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
import vegSamosa from "../../foodImgs/samosaOne.png";
import fruhlingsrolle from "../../foodImgs/fruhilibgsrolle.jpg";
import pommesFruits from "../../foodImgs/pommesFruit.png";
import chickenNuggets from "../../foodImgs/chickenNugglets.png";
import chickenWings from "../../foodImgs/chickenWings.png";
import onionRings from "../../foodImgs/onionRings.png";
import mixedSnackBox from "../../foodImgs/mixVegMasala.png";
import tamarindChutney from "../../foodImgs/tamarindChutney1.jpg";
import sweetMangoChutney from "../../foodImgs/sweetMangoChutney1.JPG";
import mayonnise from "../../foodImgs/mayonnise1.jpg";
import natureNaan from "../../foodImgs/natureNaan.JPG";
import currySauce from "../../foodImgs/currySauce1.jpg";
import garlicNaan from "../../assets/kingsKurry/garlicNaan.png";
import butterNaan from "../../foodImgs/butterNaan.png";
import vanila from "../../foodImgs/movenPickVanilla.WEBP";
import reis from "../../foodImgs/reis.png";
import chocolate from "../../foodImgs/movenPickChocolate.WEBP";
import caramel from "../../foodImgs/movenPickcaramelIceCream.WEBP";
import gulabJamun from "../../foodImgs/gulabJamun.JPG";
import sweetChilliSauce from "../../foodImgs/sweetChillySauce1.jpg";
import sauce from "../../foodImgs/garlicSauce1.jpg";
import basmathi from "../../foodImgs/basmathi.jpg";
import spicyFinger from "../../foodImgs/chickenFingers.png";
import ketchup from "../../foodImgs/ketchup1.jpg";
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
import raita from "../../foodImgs/raita.png";
import knoblauch from "../../foodImgs/knoblauch.png";

import familyImg from "../../foodImgs/familyImg.png";

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

  const navigate = useNavigate();

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [postalCodeSearch, setPostalCodeSearch] = useState("");
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
    // FAMILY PACK
    {
      id: 47,
      price: "69.00 CHF",
      image: familyImg,
      name: "Family Pack (2 Personen)",
      postalCode: "8052",
      category: "FAMILY PACK",
      mainCategory: "FAMILY PACK",
      subProducts: true,
      description:
        "Wähle 2 von unseren Chicken Curries, dazu gibt es 2x Basmati Reis & 2x Naan Brot & 2 Getränke nach Wahl.",
      rating: 5,
      options: [
        {
          label: "Chicken Curries",
          type: "select",
          min: 2,
          max: 2,
          required: true,
          items: [
            {
              id: 1001,
              price: "0.00 CHF",
              image: chickenTikkaImg,
              name: "CHICKEN TIKKA MASALA mit Reis",
              description:
                "Erst im Tonofen gebacken, dann mit Kümmel, gehacktem Koriander und Zwiebel-Tomaten-Mischung gekocht.",
              rating: 5,
            },
            {
              id: 1002,
              price: "0.00 CHF",
              image: butterChickenImg,
              name: "BUTTER CHICKEN mit Reis",
              description:
                "Erst im Tonofen gebacken, dann mit Fine Rahm-Tomaten und Curry -Mischung sauce gekocht",
              rating: 5,
            },
            {
              id: 1003,
              price: "0.00 CHF",
              image: chickenMadras,
              name: "CHICKEN MADRAS mit Reis",
              description:
                "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
              rating: 5,
            },
            {
              id: 1004,
              price: "0.00 CHF",
              image: chickenMadras,
              name: "SPICY CHICKEN CURRY",
              description:
                "Poulet - Curry mit Stücken von der Pouletbrust in einer KokosTomatensauce raffiniert gewürtzt",
              rating: 5,
            },
          ],
        },
        {
          label: "Getränke",
          type: "select",
          min: 2,
          max: 2,
          required: true,
          items: [
            {
              id: 2004,
              price: "0.00 CHF",
              image: cocacola,
              name: "Coca cola 0.5 L",
              description: "-",
              rating: 5,
            },
            {
              id: 2005,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Coca Cola Zero 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2006,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Ice Tee Peach 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2007,
              price: "0.00 CHF",
              image: rivellaRot,
              name: "Rivella Rot 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2008,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Mineralwasser mit Kohlensäure 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2009,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Mineralwasser ohne Kohlensäure 0.5l",
              description: "-",
              rating: 5,
            },
          ],
        },
        {
          label: "Inklusive Beilagen",
          type: "info",
          items: [
            {
              id: 28,
              price: "5.00 CHF",
              image: basmathi,
              name: "BASMATI RICE ",
              description: "Natur Reis",
              rating: 5,
              included: true,
            },
            {
              id: 25,
              price: "5.00 CHF",
              image: natureNaan,
              name: "2X NAAN",
              description: "Fladen Brot- Natur",
              rating: 5,
            },
          ],
        },
      ],
    },
    {
      id: 48,
      price: "86.00 CHF",
      image: familyImg,
      name: "Family Pack (3 Personen)",
      postalCode: "8052",
      category: "FAMILY PACK",
      mainCategory: "FAMILY PACK",
      subProducts: true,
      description:
        "Wähle 3 von unseren Chicken Curries, dazu gibt es 3x Basmati Reis & 3x Naan Brot & 3 Getränke nach Wahl.",
      rating: 5,
      options: [
        {
          label: "Chicken Curries",
          type: "select",
          min: 3,
          max: 3,
          required: true,
          items: [
            {
              id: 1001,
              price: "0.00 CHF",
              image: chickenTikkaImg,
              name: "CHICKEN TIKKA MASALA mit Reis",
              description:
                "Erst im Tonofen gebacken, dann mit Kümmel, gehacktem Koriander und Zwiebel-Tomaten-Mischung gekocht.",
              rating: 5,
            },
            {
              id: 1002,
              price: "0.00 CHF",
              image: butterChickenImg,
              name: "BUTTER CHICKEN mit Reis",
              description:
                "Erst im Tonofen gebacken, dann mit Fine Rahm-Tomaten und Curry -Mischung sauce gekocht",
              rating: 5,
            },
            {
              id: 1003,
              price: "0.00 CHF",
              image: chickenMadras,
              name: "CHICKEN MADRAS mit Reis",
              description:
                "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
              rating: 5,
            },
            {
              id: 1004,
              price: "0.00 CHF",
              image: chickenMadras,
              name: "SPICY CHICKEN CURRY",
              description:
                "Poulet - Curry mit Stücken von der Pouletbrust in einer KokosTomatensauce raffiniert gewürtzt",
              rating: 5,
            },
          ],
        },
        {
          label: "Getränke",
          type: "select",
          min: 3,
          max: 3,
          required: true,
          items: [
            {
              id: 2004,
              price: "0.00 CHF",
              image: cocacola,
              name: "Coca cola 0.5 L",
              description: "-",
              rating: 5,
            },
            {
              id: 2005,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Coca Cola Zero 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2006,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Ice Tee Peach 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2007,
              price: "0.00 CHF",
              image: rivellaRot,
              name: "Rivella Rot 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2008,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Mineralwasser mit Kohlensäure 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2009,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Mineralwasser ohne Kohlensäure 0.5l",
              description: "-",
              rating: 5,
            },
          ],
        },
        {
          label: "Inklusive Beilagen",
          type: "info",
          items: [
            {
              id: 28,
              price: "5.00 CHF",
              image: basmathi,
              name: "BASMATI RICE ",
              description: "Natur Reis",
              rating: 5,
              included: true,
            },
            {
              id: 25,
              price: "5.00 CHF",
              image: natureNaan,
              name: "2X NAAN",
              description: "Fladen Brot- Natur",
              rating: 5,
            },
          ],
        },
      ],
    },
    {
      id: 49,
      price: "119.00 CHF",
      image: familyImg,
      name: "Family Pack (4 Personen)",
      postalCode: "8052",
      category: "FAMILY PACK",
      mainCategory: "FAMILY PACK",
      subProducts: true,
      description:
        "Wähle 3 von unseren Chicken Curries, dazu gibt es 3x Basmati Reis & 3x Naan Brot & 3 Getränke nach Wahl.",
      rating: 5,
      options: [
        {
          label: "Chicken Curries",
          type: "select",
          min: 4,
          max: 4,
          required: true,
          items: [
            {
              id: 1001,
              price: "0.00 CHF",
              image: chickenTikkaImg,
              name: "CHICKEN TIKKA MASALA mit Reis",
              description:
                "Erst im Tonofen gebacken, dann mit Kümmel, gehacktem Koriander und Zwiebel-Tomaten-Mischung gekocht.",
              rating: 5,
            },
            {
              id: 1002,
              price: "0.00 CHF",
              image: butterChickenImg,
              name: "BUTTER CHICKEN mit Reis",
              description:
                "Erst im Tonofen gebacken, dann mit Fine Rahm-Tomaten und Curry -Mischung sauce gekocht",
              rating: 5,
            },
            {
              id: 1003,
              price: "0.00 CHF",
              image: chickenMadras,
              name: "CHICKEN MADRAS mit Reis",
              description:
                "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
              rating: 5,
            },
            {
              id: 1004,
              price: "0.00 CHF",
              image: chickenMadras,
              name: "SPICY CHICKEN CURRY",
              description:
                "Poulet - Curry mit Stücken von der Pouletbrust in einer KokosTomatensauce raffiniert gewürtzt",
              rating: 5,
            },
          ],
        },
        {
          label: "Getränke",
          type: "select",
          min: 4,
          max: 4,
          required: true,
          items: [
            {
              id: 2004,
              price: "0.00 CHF",
              image: cocacola,
              name: "Coca cola 0.5 L",
              description: "-",
              rating: 5,
            },
            {
              id: 2005,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Coca Cola Zero 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2006,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Ice Tee Peach 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2007,
              price: "0.00 CHF",
              image: rivellaRot,
              name: "Rivella Rot 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2008,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Mineralwasser mit Kohlensäure 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2009,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Mineralwasser ohne Kohlensäure 0.5l",
              description: "-",
              rating: 5,
            },
          ],
        },
        {
          label: "Inklusive Beilagen",
          type: "info",
          items: [
            {
              id: 28,
              price: "5.00 CHF",
              image: basmathi,
              name: "BASMATI RICE ",
              description: "Natur Reis",
              rating: 5,
              included: true,
            },
            {
              id: 25,
              price: "5.00 CHF",
              image: natureNaan,
              name: "2X NAAN",
              description: "Fladen Brot- Natur",
              rating: 5,
            },
          ],
        },
      ],
    },
    {
      id: 50,
      price: "119.00 CHF",
      image: familyImg,
      name: "Family Pack & Friends",
      postalCode: "8052",
      category: "FAMILY PACK",
      mainCategory: "FAMILY PACK",
      subProducts: true,
      description:
        "Feier mit deinen Freunden oder auch nur mit deiner Familie mit 5 vegetarischen Samosas als Vorspeise,eine Auswahl aus 5 Chicken Gerichten,2 Naan Brote und 5x mal Basmati Reis & 5 Getränken",
      rating: 5,
      options: [
        {
          label: "Chicken Curries",
          type: "select",
          min: 4,
          max: 4,
          required: true,
          items: [
            {
              id: 1001,
              price: "0.00 CHF",
              image: chickenTikkaImg,
              name: "CHICKEN TIKKA MASALA mit Reis",
              description:
                "Erst im Tonofen gebacken, dann mit Kümmel, gehacktem Koriander und Zwiebel-Tomaten-Mischung gekocht.",
              rating: 5,
            },
            {
              id: 1002,
              price: "0.00 CHF",
              image: butterChickenImg,
              name: "BUTTER CHICKEN mit Reis",
              description:
                "Erst im Tonofen gebacken, dann mit Fine Rahm-Tomaten und Curry -Mischung sauce gekocht",
              rating: 5,
            },
            {
              id: 1003,
              price: "0.00 CHF",
              image: chickenMadras,
              name: "CHICKEN MADRAS mit Reis",
              description:
                "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
              rating: 5,
            },
            {
              id: 1004,
              price: "0.00 CHF",
              image: chickenMadras,
              name: "SPICY CHICKEN CURRY",
              description:
                "Poulet - Curry mit Stücken von der Pouletbrust in einer KokosTomatensauce raffiniert gewürtzt",
              rating: 5,
            },
          ],
        },
        {
          label: "Getränke",
          type: "select",
          min: 4,
          max: 4,
          required: true,
          items: [
            {
              id: 2004,
              price: "0.00 CHF",
              image: cocacola,
              name: "Coca cola 0.5 L",
              description: "-",
              rating: 5,
            },
            {
              id: 2005,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Coca Cola Zero 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2006,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Ice Tee Peach 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2007,
              price: "0.00 CHF",
              image: rivellaRot,
              name: "Rivella Rot 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2008,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Mineralwasser mit Kohlensäure 0.5l",
              description: "-",
              rating: 5,
            },
            {
              id: 2009,
              price: "0.00 CHF",
              image: cocacolazero,
              name: "Mineralwasser ohne Kohlensäure 0.5l",
              description: "-",
              rating: 5,
            },
          ],
        },
        {
          label: "Inklusive Beilagen",
          type: "info",
          items: [
            {
              id: 28,
              price: "5.00 CHF",
              image: basmathi,
              name: "BASMATI RICE ",
              description: "Natur Reis",
              rating: 5,
              included: true,
            },
            {
              id: 25,
              price: "5.00 CHF",
              image: natureNaan,
              name: "2X NAAN",
              description: "Fladen Brot- Natur",
              rating: 5,
            },
          ],
        },
      ],
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
      subProducts: true,
      options: [
        {
          label: "Chicken Curries",
          type: "select",
          min: 1,
          max: 100,
          required: true,
          items: [
            {
              id: 3001,
              price: "2.90 CHF",
              image: tamarindChutney,
              name: "Tamarind Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3002,
              price: "2.50 CHF",
              image: currySauce,
              name: "Curry Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3003,
              price: "2.50 CHF",
              image: sweetChilliSauce,
              name: "Sweet Chilli Sauce, 50ml",
              description:
                "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
              rating: 5,
            },
            {
              id: 3004,
              price: "2.00 CHF",
              image: ketchup,
              name: "Ketchup, 50ml",
              rating: 5,
            },
            {
              id: 3005,
              price: "2.50 CHF",
              image: mayonnise,
              name: "Mayonaise, 50ml",
              rating: 5,
            },
            {
              id: 3006,
              price: "2.90 CHF",
              image: sweetMangoChutney,
              name: "Sweet Mango Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3007,
              price: "2.50 CHF",
              image: knoblauch,
              name: "Knoblauch Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3008,
              price: "2.50 CHF",
              image: raita,
              name: "Raita, 50ml",
              rating: 5,
            },
          ],
        },
      ],
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
      subProducts: true,
      options: [
        {
          label: "Chicken Curries",
          type: "select",
          min: 1,
          max: 100,
          required: true,
          items: [
            {
              id: 3001,
              price: "2.90 CHF",
              image: tamarindChutney,
              name: "Tamarind Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3002,
              price: "2.50 CHF",
              image: currySauce,
              name: "Curry Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3003,
              price: "2.50 CHF",
              image: sweetChilliSauce,
              name: "Sweet Chilli Sauce, 50ml",
              description:
                "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
              rating: 5,
            },
            {
              id: 3004,
              price: "2.00 CHF",
              image: ketchup,
              name: "Ketchup, 50ml",
              rating: 5,
            },
            {
              id: 3005,
              price: "2.50 CHF",
              image: mayonnise,
              name: "Mayonaise, 50ml",
              rating: 5,
            },
            {
              id: 3006,
              price: "2.90 CHF",
              image: sweetMangoChutney,
              name: "Sweet Mango Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3007,
              price: "2.50 CHF",
              image: knoblauch,
              name: "Knoblauch Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3008,
              price: "2.50 CHF",
              image: raita,
              name: "Raita, 50ml",
              rating: 5,
            },
          ],
        },
      ],
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
      subProducts: true,
      options: [
        {
          label: "Chicken Curries",
          type: "select",
          min: 1,
          max: 100,
          required: true,
          items: [
            {
              id: 3001,
              price: "2.90 CHF",
              image: tamarindChutney,
              name: "Tamarind Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3002,
              price: "2.50 CHF",
              image: currySauce,
              name: "Curry Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3003,
              price: "2.50 CHF",
              image: sweetChilliSauce,
              name: "Sweet Chilli Sauce, 50ml",
              description:
                "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
              rating: 5,
            },
            {
              id: 3004,
              price: "2.00 CHF",
              image: ketchup,
              name: "Ketchup, 50ml",
              rating: 5,
            },
            {
              id: 3005,
              price: "2.50 CHF",
              image: mayonnise,
              name: "Mayonaise, 50ml",
              rating: 5,
            },
            {
              id: 3006,
              price: "2.90 CHF",
              image: sweetMangoChutney,
              name: "Sweet Mango Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3007,
              price: "2.50 CHF",
              image: knoblauch,
              name: "Knoblauch Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3008,
              price: "2.50 CHF",
              image: raita,
              name: "Raita, 50ml",
              rating: 5,
            },
          ],
        },
      ],
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
      subProducts: true,
      options: [
        {
          label: "Chicken Curries",
          type: "select",
          min: 1,
          max: 100,
          required: true,
          items: [
            {
              id: 3001,
              price: "2.90 CHF",
              image: tamarindChutney,
              name: "Tamarind Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3002,
              price: "2.50 CHF",
              image: currySauce,
              name: "Curry Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3003,
              price: "2.50 CHF",
              image: sweetChilliSauce,
              name: "Sweet Chilli Sauce, 50ml",
              description:
                "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
              rating: 5,
            },
            {
              id: 3004,
              price: "2.00 CHF",
              image: ketchup,
              name: "Ketchup, 50ml",
              rating: 5,
            },
            {
              id: 3005,
              price: "2.50 CHF",
              image: mayonnise,
              name: "Mayonaise, 50ml",
              rating: 5,
            },
            {
              id: 3006,
              price: "2.90 CHF",
              image: sweetMangoChutney,
              name: "Sweet Mango Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3007,
              price: "2.50 CHF",
              image: knoblauch,
              name: "Knoblauch Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3008,
              price: "2.50 CHF",
              image: raita,
              name: "Raita, 50ml",
              rating: 5,
            },
          ],
        },
      ],
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
      subProducts: true,
      options: [
        {
          label: "Chicken Curries",
          type: "select",
          min: 1,
          max: 100,
          required: true,
          items: [
            {
              id: 3001,
              price: "2.90 CHF",
              image: tamarindChutney,
              name: "Tamarind Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3002,
              price: "2.50 CHF",
              image: currySauce,
              name: "Curry Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3003,
              price: "2.50 CHF",
              image: sweetChilliSauce,
              name: "Sweet Chilli Sauce, 50ml",
              description:
                "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
              rating: 5,
            },
            {
              id: 3004,
              price: "2.00 CHF",
              image: ketchup,
              name: "Ketchup, 50ml",
              rating: 5,
            },
            {
              id: 3005,
              price: "2.50 CHF",
              image: mayonnise,
              name: "Mayonaise, 50ml",
              rating: 5,
            },
            {
              id: 3006,
              price: "2.90 CHF",
              image: sweetMangoChutney,
              name: "Sweet Mango Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3007,
              price: "2.50 CHF",
              image: knoblauch,
              name: "Knoblauch Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3008,
              price: "2.50 CHF",
              image: raita,
              name: "Raita, 50ml",
              rating: 5,
            },
          ],
        },
      ],
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
      subProducts: true,
      options: [
        {
          label: "Chicken Curries",
          type: "select",
          min: 1,
          max: 100,
          required: true,
          items: [
            {
              id: 3001,
              price: "2.90 CHF",
              image: tamarindChutney,
              name: "Tamarind Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3002,
              price: "2.50 CHF",
              image: currySauce,
              name: "Curry Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3003,
              price: "2.50 CHF",
              image: sweetChilliSauce,
              name: "Sweet Chilli Sauce, 50ml",
              description:
                "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
              rating: 5,
            },
            {
              id: 3004,
              price: "2.00 CHF",
              image: ketchup,
              name: "Ketchup, 50ml",
              rating: 5,
            },
            {
              id: 3005,
              price: "2.50 CHF",
              image: mayonnise,
              name: "Mayonaise, 50ml",
              rating: 5,
            },
            {
              id: 3006,
              price: "2.90 CHF",
              image: sweetMangoChutney,
              name: "Sweet Mango Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3007,
              price: "2.50 CHF",
              image: knoblauch,
              name: "Knoblauch Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3008,
              price: "2.50 CHF",
              image: raita,
              name: "Raita, 50ml",
              rating: 5,
            },
          ],
        },
      ],
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
      subProducts: true,
      options: [
        {
          label: "Chicken Curries",
          type: "select",
          min: 1,
          max: 100,
          required: true,
          items: [
            {
              id: 3001,
              price: "2.90 CHF",
              image: tamarindChutney,
              name: "Tamarind Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3002,
              price: "2.50 CHF",
              image: currySauce,
              name: "Curry Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3003,
              price: "2.50 CHF",
              image: sweetChilliSauce,
              name: "Sweet Chilli Sauce, 50ml",
              description:
                "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
              rating: 5,
            },
            {
              id: 3004,
              price: "2.00 CHF",
              image: ketchup,
              name: "Ketchup, 50ml",
              rating: 5,
            },
            {
              id: 3005,
              price: "2.50 CHF",
              image: mayonnise,
              name: "Mayonaise, 50ml",
              rating: 5,
            },
            {
              id: 3006,
              price: "2.90 CHF",
              image: sweetMangoChutney,
              name: "Sweet Mango Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3007,
              price: "2.50 CHF",
              image: knoblauch,
              name: "Knoblauch Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3008,
              price: "2.50 CHF",
              image: raita,
              name: "Raita, 50ml",
              rating: 5,
            },
          ],
        },
      ],
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
      subProducts: true,
      options: [
        {
          label: "Chicken Curries",
          type: "select",
          min: 1,
          max: 100,
          required: true,
          items: [
            {
              id: 3001,
              price: "2.90 CHF",
              image: tamarindChutney,
              name: "Tamarind Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3002,
              price: "2.50 CHF",
              image: currySauce,
              name: "Curry Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3003,
              price: "2.50 CHF",
              image: sweetChilliSauce,
              name: "Sweet Chilli Sauce, 50ml",
              description:
                "Eine Madras Poulet Curry- Spezialität, Stücke vom Huhn gekocht mit Curry Blättern, Kokosnuss Paste, gemahlenem Fenchel, Chilis und Garam Masala",
              rating: 5,
            },
            {
              id: 3004,
              price: "2.00 CHF",
              image: ketchup,
              name: "Ketchup, 50ml",
              rating: 5,
            },
            {
              id: 3005,
              price: "2.50 CHF",
              image: mayonnise,
              name: "Mayonaise, 50ml",
              rating: 5,
            },
            {
              id: 3006,
              price: "2.90 CHF",
              image: sweetMangoChutney,
              name: "Sweet Mango Chutney, 50ml",
              rating: 5,
            },
            {
              id: 3007,
              price: "2.50 CHF",
              image: knoblauch,
              name: "Knoblauch Sauce, 50ml",
              rating: 5,
            },
            {
              id: 3008,
              price: "2.50 CHF",
              image: raita,
              name: "Raita, 50ml",
              rating: 5,
            },
          ],
        },
      ],
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
      image: butterNaan,
      name: "Naan Brot Natur",
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
      name: "Naan Brot mit Knoblauch",
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
      name: "Naan Brot mit Butter",
      postalCode: "8052",
      category: "BEILAGEN",
      mainCategory: "BEILAGEN | SIDE ORDERS | BROTE",
      description: "Fladen Brot- mit Butter",
      rating: 5,
    },
    {
      id: 28,
      price: "5.00 CHF",
      image: reis,
      name: "Portion Basmati Reis ",
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
      id: 34,
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
      id: 35,
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
      id: 36,
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
      id: 37,
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
      id: 38,
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
      id: 39,
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
      id: 40,
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
      id: 41,
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
      id: 42,
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
      id: 43,
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
      id: 44,
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
      id: 45,
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
      id: 46,
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

  // const filteredItems = menuItem.filter(
  //   (item) =>
  //     (postalCodeSearch === "" || item.postalCode.includes(postalCodeSearch)) &&
  //     (searchTerm === "" ||
  //       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.rating.toString().includes(searchTerm))
  // );

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
    if (product?.subProducts) {
      console.log("product", product);
      navigate("/subproducts", { state: { product } });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    let mergedProduct = product;
    if (product) {
      const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const cartItem = savedCartItems.find((item) => item.id === product.id);
      if (cartItem) {
        mergedProduct = {
          ...product,
          quantity: cartItem.quantity,
        };
      } else {
        mergedProduct = {
          ...product,
          quantity: 1,
        };
      }
    }

    console.log("mergedProduct", mergedProduct);
    setSelectedProduct(mergedProduct);
    setIsModalOpen((prev) => !prev);
  };

  const productToggle = (product = null) => {
    let mergedProduct = product;
    if (product) {
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

  // const [selectedCategory, setSelectedCategory] = useState("ALL");
  // const uniqueCategories = [
  //   "ALL",
  //   ...new Set(menuItem.map((item) => item.mainCategory?.trim().toLowerCase())),
  // ];

  // const filteredItems =
  //   selectedCategory === "ALL"
  //     ? menuItem
  //     : menuItem.filter(
  //         (item) =>
  //           item.mainCategory?.trim().toLowerCase() ===
  //           selectedCategory.trim().toLowerCase()
  //       );

  const [selectedCategory, setSelectedCategory] = useState("all");
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const cleanedMenuItem = menuItem.map((item) => ({
    ...item,
    mainCategory: item.mainCategory?.trim().toLowerCase() || "others",
  }));

  const uniqueCategories = [
    "all",
    ...Array.from(new Set(cleanedMenuItem.map((item) => item.mainCategory))),
  ];

  const filteredItems =
    selectedCategory === "all"
      ? cleanedMenuItem
      : cleanedMenuItem.filter(
          (item) => item.mainCategory === selectedCategory
        );

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
            {/* <p className="text-2xl font-bold">
              {t("restroMenu.excellentCuisine")}
            </p>
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
            </div> */}
            <p className="text-2xl font-bold">
              {t("restroMenu.excellentCuisine")}
            </p>

            <div className="p-4 max-w-4xl mx-auto">
              {/* Category Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {uniqueCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded border ${
                      selectedCategory === category
                        ? "bg-orange-600 text-white"
                        : "bg-white text-gray-800 border-gray-300"
                    } hover:bg-orange-500 hover:text-white transition-all`}
                  >
                    {capitalize(category)}
                  </button>
                ))}
              </div>

              {/* Menu Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="cartItemContents relative group"
                    >
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
                  <p className="text-center text-gray-500 col-span-full">
                    No items match your search.
                  </p>
                )}
              </div>

              {filteredItems.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  No items found in this category.
                </p>
              )}
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 lg:mx-24 my-5">
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
            </div> */}
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
