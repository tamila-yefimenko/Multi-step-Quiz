import { Suspense } from "react";
import { Outlet, NavLink } from "react-router-dom";

const Header = () => {
  // const location = useLocation();
  const addActive = ({ isActive }) =>
    isActive ? "text-red-600 underline" : "text-white hover:text-blue-100";

  // if (location.pathname === "/result") {
  //   return <Outlet />;
  // }

  return (
    <>
      <header className="mx-auto flex max-w-100 justify-center rounded-xl p-6 mb-10 shadow-lg outline-black/5 bg-orange-400">
        <nav>
          <ul className="flex gap-x-6 text-xl font-medium ">
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
      </header>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;
