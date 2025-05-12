"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
// import LogoBlanc from "@/public/login-blanc.png";
// import LogoNoir from "@/public/login-noir.png";
import LogoBlanc from "@/public/logo-blanc.png";
import LogoNoir from "@/public/logo-noir.png";

export default function LoginPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Effet uniquement côté client pour éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de connexion à implémenter
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex min-h-screen lg:p-20">
      {/* Panneau gauche avec l'image */}
      <div className="hidden lg:block w-1/2 bg-secondary relative">
        <div className="absolute inset-0 flex items-center bg-primary justify-center p-8">
          {!mounted ? (
            <Image 
              src={LogoNoir} 
              alt="Kemet Logo"
              className="w-3/4 h-auto"
              priority
            />
          ) : (
            <Image 
              src={resolvedTheme === "dark" ? LogoBlanc : LogoNoir} 
              alt="Kemet Logo"
              className="w-3/4 h-auto"
              priority
            />
          )}
        </div>
      </div>

      {/* Panneau droit avec le formulaire */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          {/* Logo pour mobile et tablette */}
          <div className="lg:hidden flex justify-center">
            {!mounted ? (
              <Image 
                src={LogoNoir} 
                alt="Kemet Logo" 
                className="h-24 w-auto"
                priority
              />
            ) : (
              <Image 
                src={resolvedTheme === "dark" ? LogoBlanc : LogoNoir} 
                alt="Kemet Logo" 
                className="h-24 w-auto"
                priority
              />
            )}
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-6xl font-bold mb-4">Welcome back!</h1>
            <p className="text-secondary">
              Clarity gives you the blocks and components you need to create a truly professional website.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-secondary-foreground rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-secondary-foreground rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex max-sm:flex-col max-sm:items-start max-sm:space-y-2 items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-secondary border-secondary-foreground rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="text-secondary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md bg-secondary text-primary font-bold"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}