import React from 'react'
import firebase, { auth } from "../../firebase/config"
import { addDocument, createUser } from "../../firebase/services"
import { useNavigate } from "react-router-dom"
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
const FaceBookProvider = new firebase.auth.FacebookAuthProvider()

export default function LoginFormService() {

    const navigate = useNavigate()
    const handleLoginFace = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(FaceBookProvider)
        if (additionalUserInfo?.isNewUser) {
            const data = {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                ProviderId: additionalUserInfo.providerId,
            }
            createUser(data)
        }
        if (user) {
            navigate("/")
        }
    }

    const handleLoginGoogle = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(GoogleProvider)
        if (additionalUserInfo?.isNewUser) {
            const data = {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                ProviderId: additionalUserInfo.providerId,
            }
            createUser(data)
        }
        if (user) {
            navigate("/")
        }
    }
    return (
        <div className="login__form-service">

            <button
                className="login__form-btn btn-face"
                onClick={handleLoginFace}
            >
                Đăng nhập bằng FaceBook
            </button>
            <button
                className="login__form-btn btn-gg"
                onClick={handleLoginGoogle}

            >
                Đăng nhập bằng Google
            </button>
        </div>
    )
}
