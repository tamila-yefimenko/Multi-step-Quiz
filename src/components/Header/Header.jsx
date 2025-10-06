import { Suspense } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const addActive = ({ isActive }) =>
    isActive
      ? "text-red-600 underline"
      : "text-white hover:text-blue-100 focus:outline-none";

  return (
    <>
      <header className="mx-auto flex max-w-100 justify-center  p-6 shadow-lg outline-black/5 bg-orange-400/70">
        <nav>
          <ul className="flex gap-x-6 text-xl font-medium">
            <li>
              <NavLink to="/" className={addActive}>
                Home
              </NavLink>
            </li>
            {location.pathname !== "/result" && (
              <li>
                <NavLink to="/quiz" className={addActive}>
                  Quiz
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;
