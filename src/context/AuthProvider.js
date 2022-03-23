import React, { useState } from 'react'
import Loading from '../component/Loading'
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from "../firebase/config"

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const location = useLocation();
    const [isLoading, setIsLoading] = React.useState(true)
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    React.useEffect(() => {

        const unsupcibed = auth.onAuthStateChanged((data) => {
            if (data) {
                const { uid, displayName } = data
                setUser({ displayName, uid, isSnapshot: true })
                setIsLoading(false)
                if (location.pathname !== '/login') {

                    navigate(location.pathname)
                } else {
                    navigate('/')
                }

            } else {
                setIsLoading(false)
                if (location.pathname === '/sign-in') {
                    navigate('/sign-in')
                } else {
                    navigate('/login')
                }
            }

        });
        return () => {
            unsupcibed()
        }
    }, [navigate, location.pathname])

    return (
        <AuthContext.Provider value={user}>
            {
                isLoading ? <Loading /> : children
            }
        </AuthContext.Provider>
    )
}
