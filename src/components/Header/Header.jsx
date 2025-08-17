import { Suspense } from "react";
import { Outlet, NavLink } from "react-router-dom";

import styles from "./Header.module.css";

const Header = () => {
  const addActive = ({ isActive }) => (isActive ? styles.active : styles.link);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <nav>
            <ul className={styles.nav}>
              <li>
                <NavLink to="/" className={addActive}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/quiz" className={addActive}>
                  Quiz
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;
