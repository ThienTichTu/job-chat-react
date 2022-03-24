import React from 'react'

export default function FormProfile({ data, setData }) {


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
                    onChange={(e) => setData({ ...data, displayName: e.target.value })}
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
                    onChange={(e) => setData({ ...data, email: e.target.value })}
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
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
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
                    onChange={(e) => setData({ ...data, address: e.target.value })}
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
                    onChange={(e) => setData({ ...data, linkFace: e.target.value })}
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
                    onChange={(e) => setData({ ...data, linkInstagram: e.target.value })}
                />
            </div>
        </div>
    )
}
