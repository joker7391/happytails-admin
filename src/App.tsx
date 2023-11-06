import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/login/Login";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  return (
    <div className="h-screen">
      <div className="flex mx-auto">
        <Routes>
          <Route path="/" element={<Login email={""} password={""} />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};
export default App;
