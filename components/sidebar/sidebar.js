import LineStyleIcon from "@mui/icons-material/LineStyle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import WorkIcon from "@mui/icons-material/Work";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const router = useRouter();

  // Set default active item to '/admin/home/' or the current path
  const [activeItem, setActiveItem] = useState(router.pathname);

  useEffect(() => {
    // Update the active item whenever the route changes
    setActiveItem(router.pathname);
  }, [router.pathname]);

  const handleItemClick = (path) => {
    setActiveItem(path); // Set the clicked path as active
  };

  // Define the menu items for Dashboard and Pages
  const dashboardMenu = [
    { title: "Pages", path: "/admin/page", icon: <LineStyleIcon /> },
    { title: "Categories", path: "/admin/categories", icon: <LineStyleIcon /> },

    { title: "Inquiry", path: "/admin/inquiry", icon: <LineStyleIcon /> },
    { title: "Education", path: "/admin/education", icon: <LineStyleIcon /> },
    {
      title: "Projecttech",
      path: "/admin/projecttech",
      icon: <LineStyleIcon />,
    },
    {
      title: "Experience",
      path: "/admin/experience",
      icon: <LineStyleIcon />,
    },
    {
      title: "Specialization",
      path: "/admin/specialization",
      icon: <LineStyleIcon />,
    },
  ];

  const pagesMenu = [
    { title: "Home", path: "/admin/home", icon: <LineStyleIcon /> },
    { title: "Skills", path: "/admin/skills", icon: <WorkIcon /> },
    { title: "Projects", path: "/admin/projects", icon: <ArticleIcon /> },
    { title: "News", path: "/admin/news", icon: <StorefrontIcon /> },
  ];

  // Function to generate list items for the menu
  const generateMenuItems = (menu) => {
    return menu.map(({ title, path, icon }) => (
      <Link key={path} href={path} className={styles.link}>
        <li
          className={`${styles.sidebarListItem} ${
            activeItem === path ? styles.active : ""
          }`}
          onClick={() => handleItemClick(path)} // Update active item on click
        >
          {icon}
          {title}
        </li>
      </Link>
    ));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarTitle}>Dashboard</h3>
          <ul className={styles.sidebarList}>
            {generateMenuItems(dashboardMenu)}
          </ul>
        </div>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarTitle}>Pages</h3>
          <ul className={styles.sidebarList}>{generateMenuItems(pagesMenu)}</ul>
        </div>
      </div>
    </div>
  );
}
