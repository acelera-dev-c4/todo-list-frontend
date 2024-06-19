import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import Button from "../../components/Button";
import Loading from "../../components/Loading";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleButtonClick = async () => {
    try {
      setLoading(true);

      const params = {
        email,
        password,
      };
      await login(params);

    } catch (error) {
      console.log("error", error);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 p-5">
      {loading && <Loading />}

      <div className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col items-center p-5 gap-5 shadow-xl border border-zinc-200 bg-zinc-50 rounded-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <form className="w-full flex flex-col gap-4 items-center">
          <div className="w-full flex flex-col gap-2">
            <label className="text-base font-semibold">E-mail</label>

            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full h-10 px-4 rounded-md border border-zinc-300 outline-none"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-base font-semibold">Senha</label>

            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full h-10 px-4 rounded-md border border-zinc-300 outline-none"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <Button
            label="Entrar"
            onClick={handleButtonClick}
            disabled={loading}
            className="mt-4 w-full py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition duration-150 ease-in-out"
          />
        </form>
      </div>
    </div>
  );
}
