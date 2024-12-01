// components/AdminLayout.js
import Topbar from "./topbar/topbar";
import Sidebar from "./sidebar/sidebar";
import styles from "./adminlayout.module.css";
import Footer from "./Footer/Footer";

export default function AdminLayout({ children }) {
  return (
    <div className={styles.layout}>
      <div>
        {" "}
        <Topbar />
      </div>

      <div className={styles.container}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
