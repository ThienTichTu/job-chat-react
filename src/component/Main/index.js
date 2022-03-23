import React, { useContext } from 'react'
import { auth } from "../../firebase/config"
import { AuthContext } from "../../context/AuthProvider"
export default function Main() {

    const { displayName, uid } = useContext(AuthContext)

    return (
        <div>
            Main page
            <button
                onClick={() => auth.signOut()}
            >
                log out

            </button>
            <h1>
                {displayName}
            </h1>
            <h2>
                {uid}
            </h2>
        </div>
    )
}
