"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Dummy login credentials
const DUMMY_USERS = [
  { username: "admin", password: "admin123", type: "internal", role: "admin" },
  { username: "client", password: "client123", type: "client", role: "client" },
];

export default function LoginPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>("internal");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passVisible, setPassVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Auto-redirect dimatikan agar tidak otomatis masuk ke dashboard saat refresh halaman login
  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn");
  //   if (isLoggedIn === "true") {
  //     router.push("/dashboard");
  //   }
  // }, [router]);

  const handleLogin = async () => {
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Mohon isi username dan password Anda.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = DUMMY_USERS.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.type === userRole,
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", user.username);
      localStorage.setItem("role", user.role);
      localStorage.setItem("imgUri", "");
      router.push("/module-selection");
    } else {
      setError(
        "Username atau password salah. Coba: admin / admin123 (Internal) atau client / client123 (Client)",
      );
    }
    setIsLoading(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden">
      {/* Background Image via CSS */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/Background Kapal.png')` }}
      >
        {/* Dark blue overlay */}
        <div className="absolute inset-0 bg-[#0a1a3a]/70" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex w-full h-full">
        {/* Left — Login Card */}
        <div className="flex items-center justify-center px-8 py-10 w-full max-w-[480px] min-w-[340px]">
          <div className="w-full max-w-[400px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome Back 👋
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Login ke Fuel Management and Optimization System (SCI-FMOS)
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Role Toggle */}
              <div className="flex w-full rounded-lg overflow-hidden border border-gray-200 mb-6">
                <button
                  type="button"
                  onClick={() => setUserRole("internal")}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    userRole === "internal"
                      ? "bg-[#4A90D9] text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Internal
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole("client")}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    userRole === "client"
                      ? "bg-[#4A90D9] text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Client
                </button>
              </div>

              {/* Username */}
              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Username
                </label>
                <div className="flex items-stretch border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#4A90D9] focus-within:ring-1 focus-within:ring-[#4A90D9]/30 transition-all">
                  <div className="flex items-center justify-center px-3 bg-gray-50 border-r border-gray-300">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-white outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Password
                </label>
                <div className="flex items-stretch border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#4A90D9] focus-within:ring-1 focus-within:ring-[#4A90D9]/30 transition-all">
                  <div className="flex items-center justify-center px-3 bg-gray-50 border-r border-gray-300">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
                  </div>
                  <input
                    type={passVisible ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-white outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setPassVisible(!passVisible)}
                    className="px-3 bg-white text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {passVisible ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs">
                  {error}
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg text-white font-semibold text-sm transition-all duration-200 mt-2 ${
                  isLoading
                    ? "bg-[#4A90D9]/70 cursor-not-allowed"
                    : "bg-[#4A90D9] hover:bg-[#3a7bc8] active:scale-[0.98] shadow-lg shadow-blue-500/25"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Dummy credentials hint */}
              <div className="mt-4 p-3 bg-blue-50/80 border border-blue-200 rounded-lg text-xs text-blue-700">
                <p className="font-semibold mb-1">Dummy Login:</p>
                <p>Internal → admin / admin123</p>
                <p>Client → client / client123</p>
              </div>
            </form>
          </div>
        </div>

        {/* Right — Branding on Background */}
        <div className="hidden md:flex flex-1 flex-col items-start justify-center pl-16 pr-12">
          {/* Logos Row */}
          <div className="flex items-center gap-6 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Logo Danantara (Grey).png"
              alt="Danantara Indonesia"
              className="h-[40px] object-contain"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Sucofindo_Putih.svg"
              alt="Sucofindo"
              className="h-[55px] object-contain"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Logo Pelni.png"
              alt="Pelni"
              className="h-[50px] object-contain brightness-0 invert"
            />
          </div>

          {/* Title Text */}
          <div className="text-left max-w-lg">
            <h2 className="text-5xl font-extrabold text-white leading-tight mb-2">
              Fuel Management and Optimization System
            </h2>
            <p className="text-2xl font-semibold text-white/90 mb-4">
              SCI-FMOS
            </p>
            <p className="text-base text-white/60 leading-relaxed max-w-sm">
              Platform Terintegrasi Berbasis IOT untuk Monitoring, Analisis, dan Optimasi Pengelola Bahan Bakar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
