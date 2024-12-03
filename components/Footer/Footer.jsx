import React, { useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import { getAllPages } from "../../features/pages/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPage } from "../../features/pages/pageSlice";
import { selectedPage } from "../../features/pages/pageSlice";
import { pages } from "../../utlis/pages";
import classes from "./footer.module.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const dispatch = useDispatch();

  console.log("Pages inside footer", pages);
  const handelActiveLink = (pageLabel) => {
    dispatch(setSelectedPage(pageLabel));
  };

  return (
    <div className={classes.footer}>
      <Row className={classes.footerRow}>
        {/* ========= footer top =========== */}
        <Col lg="12" className={`${classes.footer__top}`}>
          <div className={`${classes.nav__menu}`}>
            {pages.map((page, index) => (
              <Link href={page.page_link} key={index}>
                <a onClick={() => handelActiveLink(page.page_label)}>
                  {" "}
                  {page.page_label}
                </a>
              </Link>
            ))}
          </div>
        </Col>

        {/* ========= footer bottom ========= */}
        <Col lg="12">
          <div className={`${classes.footer__copyright}`}>
            <p>&copy; Copyright {year} BrightTech. All rights reserved. </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
