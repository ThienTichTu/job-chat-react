import React from 'react'

export default function FormProfile({ data, handleSetData }) {


    return (
        <div className="profile__form">
            <div className="profile__form-item" key={1}>
                <span
                    className="profile__form-lable"
                >
                    Tên</span>
                <input
                    type="text"
                    value={data.displayName}
                    onChange={(e) => {
                        const a = e.target.value
                        handleSetData({ ...data, displayName: a })
                    }}
                />

            </div>
            <div className="profile__form-item" key={2}>
                <span
                    className="profile__form-lable"
                >
                    Email:
                </span>
                <input
                    type="text"
                    value={data.email}
                    onChange={(e) => handleSetData({ ...data, email: e.target.value })}
                />
            </div>
            <div className="profile__form-item" key={3}>
                <span
                    className="profile__form-lable"
                >
                    Số điện thoại:
                </span>
                <input
                    type="text"
                    value={data.phone}
                    onChange={(e) => {
                        const a = e.target.value
                        handleSetData({ ...data, phone: a })
                    }}
                />
            </div>
            <div className="profile__form-item" key={4}>
                <span
                    className="profile__form-lable"
                >
                    Địa chỉ:
                </span>
                <input type="text"
                    value={data.address}
                    onChange={(e) => {
                        const a = e.target.value
                        handleSetData({ ...data, address: a })
                    }}
                />
            </div>
            <div className="profile__form-item" key={5}>
                <span
                    className="profile__form-lable"
                >
                    Link FaceBook:
                </span>
                <input
                    type="text"
                    value={data.linkFace}
                    onChange={(e) => {
                        const a = e.target.value
                        handleSetData({ ...data, linkFace: a })
                    }}
                />
            </div>
            <div className="profile__form-item" key={6}>
                <span
                    className="profile__form-lable"
                >
                    Link Twitter:
                </span>
                <input
                    type="text"


                />
            </div>
            <div className="profile__form-item" key={7}>
                <span
                    className="profile__form-lable"
                >
                    Link Instagram:
                </span>
                <input
                    type="text"
                    value={data.linkInstagram}
                    onChange={(e) => {
                        const a = e.target.value
                        handleSetData({ ...data, linkInstagram: a })
                    }}
                />
            </div>
        </div>
    )
}
