import React, { useState } from 'react'
import "./signin.scss"
import { Link } from "react-router-dom";
import { createUser } from "../../firebase/services"
import { message } from 'antd';
import isEmail from 'validator/lib/isEmail';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config"
import { useNavigate } from "react-router-dom"
const key = 'updatable';
export default function Register() {
    const navigate = useNavigate()
    const [displayName, setDisplayName] = useState("")
    const [errEmail, setErrEmail] = useState("")
    const [errPass, setErrPass] = useState("")
    const [errName, setErrName] = useState("")
    const [password, setPassword] = useState("")


    const [email, setEmail] = useState("")

    const validate = () => {
        if (isEmail(email) && password.length > 6 && displayName.length > 0) return true

        if (!isEmail(email)) {

            setErrEmail("Email của bạn không hợp lệ !")
        }
        if (password.length <= 6) {
            setErrPass("Mật khẩu ngắn ( > 6)")
        }
        if (displayName.length === 0) {
            setErrName("Tên không được để trống")
        }
        return false

    }

    const handeRegiter = () => {
        if (validate()) {
            message.loading({ content: 'Đang đăng kí tài khoản cho bạn....', key });
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const { operationType, user } = userCredential
                    if (operationType === "signIn") {
                        const data = {
                            displayName: displayName,
                            email: user.email,
                            photoURL: user.photoURL,
                            uid: user.uid,
                            ProviderId: "EmailAndPassword",
                        }
                        createUser(data)
                        message.success({ content: 'Đăng kí thành công :>', key, duration: 2 });
                        navigate("/login")
                    } else {
                        setErrEmail("Email đã tồn tại vui lòng đăng kí email khác !")

                    }
                })
                .catch((error) => {
                    setErrEmail("Email đã tồn tại vui lòng đăng kí email khác !")
                    message.error({ content: 'Email đã tồn tại ', key, duration: 2 });

                });
        }
    }


    return (
        <div className="login">
            <div className="login__container">
                <div className="login-logo">
                    <img src="../../../../../../metajob-logo.png" alt="" />
                </div>

                <div className="login__form">
                    <h1 className="border-bot w-100 text-center p-bot-20">Đăng kí</h1>
                    <div className="signin__form-input">
                        <span>
                            Email:
                        </span>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setErrEmail("")
                            }}
                            style={{ border: "1px solib red" }}
                        />
                        <span className="mess_validate">{errEmail}</span>
                    </div>

                    <div className="signin__form-input">
                        <span>
                            Mật khẩu:
                        </span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setErrPass("")
                            }}
                        />
                        <span className="mess_validate">{errPass}</span>

                    </div>


                    <div className="signin__form-input">
                        <span>
                            Tên hiển thị:
                        </span>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => {
                                setDisplayName(e.target.value)
                                setErrName("")
                            }}
                        />
                        <span className="mess_validate">{errName}</span>

                    </div>
                    <div className="login__form-link"
                        style={{
                            marginTop: " 10px",
                            width: "80%"
                        }}
                    >
                        <Link to="/login">
                            <button className="btn-green"
                                style={{ width: "100%" }}
                            >
                                Quay lại đăng nhập
                            </button>
                        </Link>

                        <button
                            className="btn-blue"
                            style={{ marginLeft: "10px" }}
                            onClick={handeRegiter}
                        >
                            Đăng Kí
                        </button>
                    </div>

                </div>
            </div>
            <img
                className="login__backgound" src="../../../../../../left-bg.png" alt=""
                style={{ left: "0", bottom: "0" }}
            />
            <img className="login__backgound" src="../../../../../../right-bg.png" alt=""
                style={{ right: "0", bottom: "0" }}

            />
        </div>
    )
}
