import React, { useRef, useEffect } from 'react'
import Message from './Message'
import Axios from 'axios'


/*async function setViewedApi( mynumber,contact) {
    var payload = {
        "mynumber" : mynumber,
        "contact" : contact
    }
    var url = 'http://localhost:8080/setread'
 return fetch(url, {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(payload)
 })
   .then(data => console.log(data))
}*/

function setViewed(mynumber,contact){
    console.log("Helo World")
    //var url = 'http://localhost:8080/setread?number='+ mynumber +"&contact="+ contact
    var url = 'http://108.60.134.228:8080/setread?number='+ mynumber +"&contact="+ contact
    const response= Axios(url);
            /*setData(response.data) */
    
}

export default function MessagesBox({ messages , user, contact_selected}) {
    console.log("Clicked on contact_selected")
    const endDiv = useRef(null)
    useEffect(() => {
        endDiv.current.scrollIntoView()
    }, [messages])

    return (
        <div className="chats">
            {messages
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((m) => (
                    <Message message={m} key={m.id}  user={user}/>
                ))}
            <div style={{ float: 'right', clear: 'both' }} ref={endDiv}></div>
            <span className="text">{setViewed(user, contact_selected.number)}</span>
         </div>
    )
}
