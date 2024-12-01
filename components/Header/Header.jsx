import React, { useRef, useEffect, useState } from "react";
import { Container } from "reactstrap";
import baseUrl from "../../utlis/config";
import classes from "./header.module.css";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Import lucide-react icons
import { getData } from "../../utlis/getData";
import LoadingSpinner from "../../utlis/loadingSpinner";
import { getAllPages } from "../../features/pages/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPage } from "../../features/pages/pageSlice";
import { selectedPage } from "../../features/pages/pageSlice";
const Header = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false); // Manage menu open/close state
  const activePage = useSelector(selectedPage);
  const { pages } = useSelector((state) => state.pages);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // UseEffect to call fetchPages when the component mounts
  useEffect(() => {
    dispatch(getAllPages());
    window.addEventListener("scroll", headerFunc);

    return () => window.removeEventListener("scroll", headerFunc);
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  useEffect(() => {
    if (pages.length > 0) {
      dispatch(setSelectedPage(pages[0]?.page_label));
    }
  }, [dispatch, pages]);
  const headerFunc = () => {
    if (
      document.body.scrollTop > 70 ||
      document.documentElement.scrollTop > 70
    ) {
      headerRef.current.classList.add(`${classes.header__shrink}`);
    } else {
      headerRef.current.classList.remove(`${classes.header__shrink}`);
    }
  };
  const handelActiveLink = (pageLabel) => {
    dispatch(setSelectedPage(pageLabel));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu open/close state
    menuRef.current.classList.toggle(`${classes.menu__active}`);
  };
  if (!pages) return <LoadingSpinner />;
  return (
    <div className={`${classes.header} px-16`} ref={headerRef}>
      <div className={`${classes.nav__wrapper}`}>
        {/* ======== navigation logo ======== */}
        <div className={`${classes.logo}`}>
          <img
            src="https://i.pinimg.com/control/564x/96/c1/72/96c1720919baa5c867e1f4f2afc2a4f3.jpg"
            alt="TechDoItAll Logo"
            style={{ width: "100px", height: "70px" }} // Adjust width/height as needed
          />
        </div>

        {/* ========= navigation menu =========== */}
        <div className={`${classes.navigation} `} ref={menuRef}>
          <div className={`${classes.nav__menu} `}>
            {/* Render dynamic pages from API */}
            {pages.map((page) => (
              <li key={page.page_id}>
                <Link href={page.page_link}>
                  <a
                    onClick={() => handelActiveLink(page.page_label)}
                    className={
                      activePage === page.page_label
                        ? classes.activeLink
                        : classes.not__visited
                    }
                  >
                    {page.page_label}
                  </a>
                </Link>
              </li>
            ))}

            <div className={`${classes.nav__right}`}>
              <p className="d-flex align-items-center gap-2 mb-0">
                <i className="ri-phone-line"></i> +3 93278020805
              </p>
            </div>
          </div>
        </div>
        {/* Hamburger Menu Icon */}
        <div className={`${classes.hamburger}`}>
          <div
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </div>
        </div>
      </div>
      <div
        className={`${menuOpen ? classes.open : classes.closed}`}
        style={{
          width: "100%",
          direction: "rtl",
        }}
      >
        {/* Render dynamic pages from API */}
        {pages.map((page) => (
          <li key={page.page_id}>
            <Link href={page.page_link}>
              <a
                onClick={() => setActiveLink(page.page_label)}
                className={
                  activePage === page.page_label
                    ? classes.activeLink
                    : classes.not__visited
                }
              >
                {page.page_label}
              </a>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Header;
