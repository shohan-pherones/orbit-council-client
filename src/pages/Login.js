import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form
      className="login-form flex flex-col gap-5 py-20 max-w-sm mx-auto"
      onSubmit={handleLogin}
    >
      <h2 className="section-title text-4xl text-sky-400 font-semibold mb-5">
        Log in
      </h2>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="email"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Email address
        </label>
        <input
          type="email"
          placeholder="hello@express.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="password"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Write a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <button
        type="submit"
        className="bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-50 duration-300"
        disabled={loading}
      >
        Log in
      </button>

      {error && (
        <p className="error bg-rose-500/10 p-5 rounded-lg border border-rose-500 text-rose-500">
          {error}
        </p>
      )}
    </form>
  );
};

export default Login;
