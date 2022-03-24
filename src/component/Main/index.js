import React, { useContext } from 'react'
import "./Main.scss"
import Header from "../Header"
import AuthContext from "../../context/AuthProvider"
export default function Main({ children }) {

    return (
        <div className="main">
            <Header />
            {children}
        </div>
    )
}
