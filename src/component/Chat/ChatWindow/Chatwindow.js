import React from 'react'
import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"
export default function Chatwindow() {
    return (
        <>
            <div className="chat__windown-header">
                <Header />
            </div>
            <div className="chat__windown-body">
                <Body />
            </div>
            <div className="chat__windown-footer">
                <Footer />
            </div>
        </>
    )
}
