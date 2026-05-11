import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export default function Auth() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ name: "Shwet", token: "abc123" });
    navigate("/Home");
  };

  return (
    <>
      <div className="text-2xl text-blue-700">Auth</div>
      <button onClick={handleLogin} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Login</button>
    </>
  )
}