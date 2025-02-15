import { login } from "@/backend/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    try {
      await login({
        email: e.target.email.value,
        password: e.target.password.value,
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {error && <p>Error: {error}</p>}

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" required />

          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" required />

          <button type="submit">Login</button>
        </form>
      </div>

      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
