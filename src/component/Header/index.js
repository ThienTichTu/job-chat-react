import React from 'react'
import "./header.scss"
import UserNav from "./UserNav"

import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/config"
import {
    UsergroupAddOutlined,
    ProjectOutlined,
    WechatOutlined,
    UnorderedListOutlined,
    NotificationOutlined

} from "@ant-design/icons"
import { AuthContext } from "../../context/AuthProvider"

const isRenderHeader = WrappedComponent => props => { // curry
    const { user: { uid } } = React.useContext(AuthContext)
    return (
        <>
            {
                uid && <WrappedComponent
                    {...props}
                />
            }

        </>

    );
};

function Header() {


    return (
        <div className="main__header">
            <div className="main__header-nav">
                <NavLink to="/friends"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    <div className="main__header-item">
                        <UsergroupAddOutlined />
                        <span className="mr-10 block">
                            Bạn bè
                        </span>
                    </div>
                </NavLink>


                <NavLink to="/"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    <div className="main__header-item">
                        <ProjectOutlined />
                        <span className="mr-10 block">
                            Dự án
                        </span>
                    </div>
                </NavLink>

                <NavLink to="/chat">
                    <div className="main__header-item">
                        <WechatOutlined />
                        <span className="mr-10 block">
                            Tin nhắn
                        </span>
                    </div>
                </NavLink>

                <NavLink to="/myjob"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    <div className="main__header-item">
                        <UnorderedListOutlined />
                        <span className="mr-10 block">
                            Công việc của tôi
                        </span>
                    </div>
                </NavLink>
            </div>

            <div className="main__header-item notification"
                style={{ marginLeft: "auto " }}
            >
                <NotificationOutlined />
            </div>
            <UserNav />

        </div>
    )
}
export default isRenderHeader(Header)