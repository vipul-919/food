import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const register = () => {
        const { name, email, password, reEnterPassword } = user;
        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:9002/register", user)
                .then(res => {
                    alert(res.data.message);
                    navigate("/login");
                })
                .catch(error => {
                    alert("Error registering user. Please try again later.");
                    console.error("Error registering user:", error);
                });
        } else {
            alert("Invalid input");
        }
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange} />
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange} />
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange} />
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange} />
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/login")}>Login</div>
        </div>
    );
};

export default Register;
