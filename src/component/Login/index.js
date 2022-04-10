import React from 'react'
import "./login.scss"
import LoginFormService from "./LoginFormService"
import LoginFormCustom from "./LoginFormCustom"
export default function Login() {
    return (
        <div className="login">
            <div className="login__container">
                <div className="login-logo">
                    <img src="../../../../../../metajob-logo.png" alt="" />
                </div>

                <div className="login__form">
                    <h1>Đăng nhập</h1>

                    <LoginFormCustom />
                    <span className="login__form-or">
                        Hoặc
                    </span>
                    <LoginFormService />
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
