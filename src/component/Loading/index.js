import "./Loading.scss"
import React from 'react'

export default function Loading() {
    return (
        <>
            <div className="loading__container">
                <div className="lds-roller-container">
                    <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                </div>
            </div>
        </>
    )
}
