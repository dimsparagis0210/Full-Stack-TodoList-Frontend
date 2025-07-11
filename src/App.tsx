import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import "./App.css";

/**
 * App component
 *
 * This component is the root component of the application.
 * It renders the application in the root element and provides the routes.
 */
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
