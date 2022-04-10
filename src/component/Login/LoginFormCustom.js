import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth";
import isEmail from 'validator/lib/isEmail';
import { message } from 'antd';
const key = 'updatable';

export default function LoginFormCustom() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const validate = () => {
        if (isEmail(email) && password.length > 6) return true

        return false

    }

    const handleCustomLogin = () => {
        if (validate()) {
            message.loading({ content: 'Vui lòng đợi trong giây lát....', key });
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential)
                    message.success({ content: 'Đăng nhập thành công', key });

                })
                .catch((error) => {
                    message.error("Email không tồn tại !")
                });

        } else {
            if (password.length < 6) {
                message.error("Mật khẩu phải lớn hơn 6 kí tự !!")
            }

        }
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
                    type="password"
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


                <Link to="/register">
                    <button className="btn-green">
                        Đăng kí
                    </button>
                </Link>


            </div>
        </div>
    )
}
