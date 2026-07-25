    import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import api from "../services/api";

    function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
        const response = await api.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", response.data.token);

        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Login successful");

        navigate("/Home");
        } catch (error) {
        alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh"  }} 
        >
        <div className="card shadow p-4" style={{ width: "400px" }}>
            <h2 className="text-center mb-4">Login</h2>

            <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label className="form-label">Email</label>

                <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>

                <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="btn btn-warning w-100">Login</button>
            </form>
        </div>
        </div>
    );
    }

    export default Login;
