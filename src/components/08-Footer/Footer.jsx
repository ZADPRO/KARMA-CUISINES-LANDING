import logo from "../../assets/logoNew/kcWhite1.png";

export default function Footer() {
  return (
    <div>
      <svg
        className="css-p1skv3"
        style={{
          display: "block",
          width: "100%",
          marginBottom: "-1px",
          height: "40px",
          color: "#cd5c08",
        }}
      >
        <pattern
          id="curve-f989b4a0-bdbc-4484-bdd1-a42e780d25d0"
          x="0"
          y="0"
          width="800"
          height="100%"
          patternUnits="userSpaceOnUse"
        >
          <path
            fill="currentColor"
            d="M 0 40 L 0 20 Q 200 0, 400 20 Q 600 40, 800 20 L 800 40"
          ></path>
        </pattern>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#curve-f989b4a0-bdbc-4484-bdd1-a42e780d25d0"
        ></rect>
      </svg>
      <footer className="w-full text-slate-500">
        {/*      <!-- Main footer --> */}
        <div className="bg-[#cd5c08] pt-16 pb-12 text-sm">
          <div className="container px-6 w-full md:w-11/12 mx-auto">
            <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 ">
              <nav
                className="col-span-2 md:col-span-4 lg:col-span-4"
                aria-labelledby="footer-docs-4-sub"
              >
                <img src={logo} alt="" className="w-[300px]" />
                <p className="text-white text-[20px] py-5">
                  Be the first to know about new collections, special events,
                  and what's going on at our place.
                </p>
              </nav>
              <nav
                className="col-span-2 md:col-span-4 lg:col-span-2"
                aria-labelledby="footer-about-4-sub"
              >
                <h3
                  className="mb-6  font-bold uppercase text-[20px] text-white"
                  id="footer-about-4-sub"
                >
                  Connect with us
                </h3>
                <ul>
                  <li className="mb-2 leading-6">
                    <a className="transition-colors duration-300 text-white text-[18px] hover:text-[#ffffff] hover:font-bold focus:text-emerald-600">
                      Home
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a className="transition-colors duration-300 text-white text-[18px] hover:text-[#ffffff] hover:font-bold focus:text-emerald-600">
                      About Us
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a className="transition-colors duration-300 text-white text-[18px] hover:text-[#ffffff] hover:font-bold focus:text-emerald-600">
                      Course
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a className="transition-colors duration-300 text-white text-[18px] hover:text-[#ffffff] hover:font-bold focus:text-emerald-600">
                      Blog
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a className="transition-colors duration-300 text-white text-[18px] hover:text-[#ffffff] hover:font-bold focus:text-emerald-600">
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
              <nav
                className="col-span-4 md:col-span-4 lg:col-span-3"
                aria-labelledby="footer-get-in-touch-4-sub"
              >
                <h3
                  className="mb-6  font-bold uppercase text-[20px] text-white"
                  id="footer-get-in-touch-4-sub"
                >
                  Get in touch
                </h3>
                <ul>
                  {/* <li className="mb-2 leading-6">
                    <a className="transition-colors duration-300 text-white text-[20px] hover:text-[#ffffff] hover:font-bold focus:text-emerald-600">
                      Mobile: +41 76 760 39 21
                    </a>
                  </li> */}
                  <li className="mb-2 leading-6">
                    <a className="transition-colors duration-300 text-white text-[18px] hover:text-[#ffffff] hover:font-bold focus:text-emerald-600">
                      <b> Email:</b> info@karmacuisine.ch
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a className="transition-colors duration-300 text-white text-[18px] hover:text-[#ffffff] hover:font-bold focus:text-emerald-600">
                      <b>Address:</b> Schaffhausserstrasse 56, 8152 Glattbrugg,
                      Zürich Switzerland.
                    </a>
                  </li>
                </ul>
              </nav>
              <nav
                className="col-span-2 md:col-span-4 lg:col-span-3"
                aria-labelledby="footer-product-4-sub"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2755.291166356684!2d8.558529576446725!3d47.43025907117414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aa009eb4c02d5%3A0x733e539db9ff57ca!2sSchaffhauserstrasse%2056%2C%208152%20Opfikon%2C%20Switzerland!5e1!3m2!1sen!2sin!4v1741676206584!5m2!1sen!2sin"
                  className="absolute w-full h-full"
                  style={{ border: "0", maxHeight: "200px", maxWidth: "300px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
