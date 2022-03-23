import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginFormCustom() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleCustomLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <div className="login__form-custom">
            <div className="login__form-input">
                <span>
                    Email:
                </span>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="login__form-input">
                <span>
                    Password:
                </span>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="login__form-link">
                <button
                    className="btn-blue"
                    style={{ marginRight: "10px" }}
                    onClick={handleCustomLogin}
                >
                    Đăng nhập
                </button>


                <Link to="/sign-in">
                    <button className="btn-green">
                        Đăng kí
                    </button>
                </Link>


            </div>
        </div>
    )
}
