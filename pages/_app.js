import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../components/Layout/Layout.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { GoogleAnalytics } from "@next/third-parties/google";

import store from "../redux/store.js";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");
  const gaId = process.env.NEXT_APP_GA_ID;
  const useLayout = !isAdminPage && Component.noLayout !== true;
  console.log("gaID", gaId);
  return (
    <Provider store={store}>
      <ToastContainer />

      {useLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </Provider>
  );
}

export default MyApp;
