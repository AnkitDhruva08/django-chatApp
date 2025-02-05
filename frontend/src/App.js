import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ContextProvider } from "./context/Context";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ContextProvider>
      <Router>  {/* Move Router first */}
        <AuthProvider>  {/* Now AuthProvider is inside Router */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ContextProvider>
  );
}

export default App;
