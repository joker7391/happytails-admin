import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/login/Login";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import UserManagement from "./pages/UserManagement";
import Dashboard from "./pages/Dashboard";
import Branch from "./pages/Branch";
import Users from "./pages/Users";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="min-h-screen">
      {!isLoginPage && <Header />}
      <div className="flex mx-auto">
        {!isLoginPage && <Navigation />}
        <Routes>
          <Route path="/" element={<Login email={""} password={""} />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/branch" element={<Branch />} />
          <Route path="/users" element={<Users />} />
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
