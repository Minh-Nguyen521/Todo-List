import { useState } from "react";
import { UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../css/index.css";
import fetchLogin from "./fetchLogin";
import fetchRegister from "./fetchRegister";
import setCookie from "../cookie/setCookie";

export default function LoginPage() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!Username || !password) {
      setError("Please fill in all fields");
      return;
    }

    const response = await fetchLogin({
      Username: Username,
      Password: password,
    });

    if (response.error) {
      setError(response.error);
      return;
    }
    console.log(response);

    setCookie("token", response.data.token, 1);
    setCookie("userid", response.data.userID, 1);
    setCookie("username", response.data.username, 1);
    navigate("/index");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!Username || !password) {
      setError("Please fill in all fields");
      return;
    }

    const response = await fetchRegister({
      Username: Username,
      Password: password,
    });

    if (response.error) {
      setError(response.error);
      return;
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-90 p-10 rounded-xl shadow-2xl">
        <div>
          <div className="flex justify-center">
            <UserIcon className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="space-y-4">
            <div>
              <label htmlFor="Username-address" className="sr-only">
                Username
              </label>
              <input
                autoComplete="Username"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleLogin}
              className="group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="group relative flex-1 flex justify-center py-2 px-4 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
