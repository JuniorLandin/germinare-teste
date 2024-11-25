"use client";

import { createJWT } from "@/functions/jwtToken";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Signup(){
  //Realizei um cadastro pelo localStorage com a validação para bater email e senha cadastrado.
  //Já que não tem back, decidi armazenar no localStorage
  //Poderia fazer com nextAuth, mas não achei na documentação algo que seja autenticação po user e password.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(password != confirmPassword){
      toast.warning("As senhas não coincidem. Por favor, tente novamente.");
      return
    }

    const payload = { name, email, password };
    const jwt = createJWT(payload);
    
    toast.success("Usuário cadastrado com sucesso!")
    // Armazenando os dados no localStorage
    localStorage.setItem("user", jwt);
    redirect("/");
  };

  return(
    <div className="flex w-full h-screen items-center justify-center flex-col">
        <h1 className="sm:text-7xl text-5xl">Germi<strong className="text-customOrange">nare</strong></h1>

        <section className="mt-6 flex flex-col items-center justify-center gap-4 sm:w-[600px] w-[90%]">
          <h1 className="text-xl text-white font-bold">Criando sua conta</h1>
          <form 
            className="text-white pb-4 text-lg flex flex-col w-[90%] gap-4"
            onSubmit={handleSubmit}
          >
            <input 
              type="text"
              required
              name="name"
              placeholder="Digite seu nome..."
              className="h-10 border border-gray-600 rounded-lg px-4 bg-gray-900 text-white placeholder-gray-200"
              value={name}
              onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
            />
            <input 
              type="email"
              required
              name="email"
              placeholder="Digite seu email..."
              className="h-10 border border-gray-600 rounded-lg px-4 bg-gray-900 text-white placeholder-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                required
                name="password"
                placeholder="**************"
                className="h-10 border border-gray-600 rounded-lg px-4 bg-gray-900 text-white placeholder-gray-200 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                onClick={() => setShowPassword(!showPassword)} // Alterna o estado de visibilidade da senha
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Alterna o ícone */}
              </button>
            </div>

            <div className="relative">
              <input 
                type={showConfirmPassword ? 'text' : 'password'}
                required
                name="confirmPassword"
                placeholder="**************"
                className="h-10 border border-gray-600 rounded-lg px-4 bg-gray-900 text-white placeholder-gray-200 w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Alterna o estado de visibilidade da senha
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Alterna o ícone */}
              </button>
            </div>

            <button
              type="submit"
              className="h-10 text-lg bg-customOrange text-white border-0 rounded-lg flex items-center justify-center hover:scale-105 transition-all duration-500"
            >
              Cadastrar
            </button>
          </form>

          <Link href="/" className="text-white">
            Já possui uma conta? Faça login.
          </Link>
        </section>
    </div>
  )
}