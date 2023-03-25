import React from 'react'

export default function Alert(props) {
    return (
        <div>
            <div className={`alert alert-danger alert-dismissible fade show`} role="alert">
                <strong>I am alert</strong>
            </div>
        </div>
    )
}
