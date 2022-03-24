import React, { memo, useEffect } from 'react'
import { Avatar, Button } from "antd"

function AvatarProfile({ displayName, photoURL, onPreview }) {






    return (
        <div className="profile__avatar">
            <Avatar size={120}
                src={photoURL}
            >
                <span style={{ fontSize: '50px' }}>
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </span>
            </Avatar>
            <input type="file" id="avatar_update" onChange={(e) => onPreview(e)} />
            <Button type="dashed" danger style={{ marginTop: "10px" }}>
                <label htmlFor="avatar_update" style={{ cursor: "pointer" }}>
                    Tải ảnh
                </label>
            </Button>
            <div className="profile__avatar-name">
                <span>
                    {displayName}
                </span>
            </div>
        </div>
    )
}
export default memo(AvatarProfile)