import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import "./auth.css"

export function SignUp() {
  const navigate = useNavigate()
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return
    }
    try {
      setIsSubmitting(true);
      const res = await axios.post("http://localhost:3001/api/auth/signUp", {
        name, email, password
      });
      console.log('signUp', res.data)
      
      navigate("/signIn")
      
    } catch(err){
      const message = err?.response?.data?.error || "Sign up failed. Please try again."
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  };
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  return (
    <div className="auth-page">
      <h1 className="auth-title">Create account</h1>
      <form className="auth-form" onSubmit={onSubmit}>
         <label className="auth-label">
          Name{" "}
          <input
            className="auth-input"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      
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

        <label className="auth-label">
          Confirm password{" "}
          <input
            className="auth-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Sign up"}
        </button>
      </form>
      <div className="auth-footer">
        Already have an account ? <Link to="/signIn">Sign in</Link>
      </div>
    </div>
  );
}
