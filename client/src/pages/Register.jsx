    import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import api from "../services/api";

    function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
        await api.post("/auth/register", {
            name,
            email,
            password,
        });

        alert("Account created successfully");

        navigate("/login");
        } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
        >
        <div className="card shadow p-4" style={{ width: "400px" }}>
            <h2 className="text-center mb-4"> Register</h2>

            <form onSubmit={handleRegister}>
            <div className="mb-3">
                <label className="form-label">Name</label>

                <input
                className="form-control"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>

                <input
                type="email"
                className="form-control"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>

                <input
                type="password"
                className="form-control"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="btn btn-warning w-100">Create Account</button>
            </form>
        </div>
        </div>
    );
    }

    export default Register;
