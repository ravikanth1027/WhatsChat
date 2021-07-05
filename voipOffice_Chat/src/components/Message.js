import React from 'react'
import doubleCheck from '../assets/done_all.svg'

export default function Message({ message , user }) {
	/*console.log("In Message Js")
	console.log(user)*/
    return (
        <div className={`message ${message.to == user ? 'received' : 'sent'}`}
>            {message.text}
            <div className="metadata">
                <span className="date">{message.date.toLocaleString()}</span>
                {message.isMainUser && <img src={doubleCheck} alt="" className="icon-small" />}
            </div>
        </div>
    )
}
