import React from 'react'
import doubleCheck from '../assets/done_all.svg'
import Avatar from './Avatar'
import { Checkbox } from '@material-ui/core';


export default function ContactBox({ contact, setContactSelected, messages }) {
    /*console.log("ContactBox: "+ contact.name+ " :")*/
    console.log(messages)
    //const maxTs = Math.max(...messages.map((m) => m.date.getTime())) m.date = new Date(m.date)
    if(messages.length != 0){
    const maxTs = Math.max(...messages.map((m) => new Date(m.date).getTime()))
    var i = 0;
    var lastMsg= '';
    for(i=0; i < messages.length; i++){
            if(new Date(messages[i].date).getTime() === maxTs){
              lastMsg = messages[i]
              /*console.log("mesages date"+new Date(messages[i].date).getTime()+":::" +maxTs)  
              console.log(messages[i])*/
            }
          }
    //const lastMsg = messages.find((m) => new Date(m.date).getTime() === maxTs)
    lastMsg.date = new Date(lastMsg.date)
    console.log("lastMsg:"+ lastMsg.text)
    function truncate(text, length) {
        //console.log("text:",text)
        return text.length > length ? `${text.substring(0, length)} ...` : text
    }
    return (
        <div className="contact-box" onClick={() => setContactSelected(contact)}>
            <Avatar user={contact} />
            <div className="right-section">
                <div className="contact-box-header">
                    <h3 className="avatar-title">{contact.name}</h3>
                    <span className="time-mark">{lastMsg.date.toLocaleDateString()}</span>
                    <Checkbox/>
                </div>
                <div className="last-msg">
                    <img src={doubleCheck} alt="" className="icon-small" />
                    <span className="text">{truncate(lastMsg.text, 30)}</span>
                </div>
            </div>
        </div>
    )
}else{
    return (
        <div className="contact-box" onClick={() => setContactSelected(contact)}>
            <Avatar user={contact} />
            <div className="right-section">
                <div className="contact-box-header">
                    <h3 className="avatar-title">{contact.name}</h3>
                </div>
                <div className="last-msg">
                </div>
            </div>
        </div>
    )
    }
}
