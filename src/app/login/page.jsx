"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isLogin ? "login" : "signup",
          phone,
          password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save to local storage
        localStorage.setItem("user", JSON.stringify({ phone, role: data.role }));
        
        // Redirect based on role or back to home
        if (data.role === 'admin') {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <div>
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
            <h2 className="text-center text-3xl font-black text-gray-900 tracking-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              {isLogin ? "Log in to access your dashboard" : "Sign up to easily track your applications"}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center justify-center text-center">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5 rounded-md">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all sm:text-sm"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all sm:text-sm"
                    placeholder="Confirm your password"
                  />
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="font-bold text-sm text-purple-600 hover:text-purple-500 transition-colors hover:underline"
            >
              {isLogin ? "New user? Create an account" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
