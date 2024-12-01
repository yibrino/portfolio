import React, { Fragment } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
