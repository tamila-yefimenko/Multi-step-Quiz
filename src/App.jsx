import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";

const Quiz = lazy(() => import("./pages/Quiz/Quiz.jsx"));
const Result = lazy(() => import("./pages/Result/Result"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <div className="relative min-h-screen overflow-hidden bg-cover bg-center bg-gray-700 bg-[url(/public/bg2.jpg)] bg-blend-lighten ">
        <Header />

        <div className="container relative z-10 px-4 py-6 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
