import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setIsSubmitting(true);
      await axios.post("http://localhost:3001/api/auth/signIn", {
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      const message =
        err?.response?.data?.error || "Sign in failed. Please try again";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="auth-page">
      <h1 className="auth-title">Create account</h1>
      <form className="auth-form" onSubmit={onSubmit}>

        <label className="auth-label">
          Email{" "}
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="auth-label">
          Password{" "}
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-submit" type="submit" disabled={isSubmitting}>
          {" "}
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className="auth-footer">
        New here ? <Link to="/signUp">Create an account</Link>
      </div>
    </div>
  );
}
