import React, { useState } from 'react'
import Loading from '../component/Loading'
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from "../firebase/config"
import useFireStore from "../hook/useFireStore"
export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const location = useLocation();
    const [isLoading, setIsLoading] = React.useState(true)
    const [user, setUser] = useState({})
    const [userCurrent, setUserCurrent] = useState({})
    const navigate = useNavigate()


    React.useEffect(() => {
        const unsupcibed = auth.onAuthStateChanged((data) => {
            if (data) {
                const { uid } = data

                setUser({ uid, isSnapshot: true })
                setIsLoading(false)
                if (location.pathname !== '/login') {

                    navigate(location.pathname)
                } else {
                    navigate('/')
                }

            } else {
                setIsLoading(false)
                setUser({})
                if (location.pathname === '/register') {
                    navigate('/register')
                } else {
                    navigate('/login')
                }
            }

        });
        return () => {
            unsupcibed()
        }
    }, [navigate, location.pathname])


    const userCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: user.uid,
        };

    }, [user])

    const user2 = useFireStore("users", userCondition)
    React.useEffect(() => {
        if (user2[0]) {
            setUserCurrent(user2[0])
        }
    }, [user2])


    return (
        <AuthContext.Provider value={{
            user,
            userCurrent
        }}>
            {
                isLoading ? <Loading /> : children
            }
        </AuthContext.Provider>
    )
}
