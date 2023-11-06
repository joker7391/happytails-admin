import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Admin.png";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { supabase } from "../../utils/SupabaseClient";

interface loginData {
  email: string;
  password: string;
}

const Login: React.FC<loginData> = ({ email, password }) => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="flex-1 flex flex-col gap-8 py-3 bg-[#fff] ">
      <h1 className="uppercase cursor-pointer text-[#2997d8] font-bold text-[20px] px-4 ">
        Happy Tails
      </h1>
      {/* Logo */}
      <div className="flex flex-col justify-center items-center">
        <img src={logo} alt="logo" />
        <h1 className="font-bold text-[30px]">ADMIN</h1>
      </div>
      {/* Form */}
      <div className="flex justify-center items-center w-auto">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "blue",
                  brandAccent: "darkred",
                },
              },
            },
          }}
          providers={["google"]}
        />
      </div>
      {/* <button onClick={handleAdminLogin} className="text-center ">
        Admin
      </button> */}
    </div>
  );
};

export default Login;