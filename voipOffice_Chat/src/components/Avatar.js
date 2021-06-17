import React from 'react'

export default function Avatar({ user, showName }) {
	if(user.name == null){
		return (
        <div className="avatar-component">
            <img className="avatar" src={user} alt="" />
            {showName && <h3 className="avatar-title">{user}</h3>}
        </div>
    )
	}else{
	return (
        <div className="avatar-component">
            <img className="avatar" src={user} alt="" />
            {showName && <h3 className="avatar-title">{user.name}</h3>}
        </div>
    )
	}	
}
