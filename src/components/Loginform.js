import React from 'react'

const Loginform = (props) => {
    return (
        <div className="loginform">
            <form onSubmit={props.onsubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password"></input>
                </div>
                <div>
                    <button className="button">Login</button>
                </div>
            </form>
        </div>
    )
}

export  default Loginform ;