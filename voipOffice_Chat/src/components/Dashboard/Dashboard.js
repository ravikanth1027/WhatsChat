/*import React from 'react';*/
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {contactsMessages, Message } from '../../generateFakeData'
import Avatar from '../Avatar'
import ContactBox from '../ContactBox'
import MessagesBox from '../MessagesBox'
import ChatInputBox from '../ChatInputBox'
import Search from '../Search'
import Welcome from '../Welcome'
/*import AddContact from '../contacts/AddContact'*/
import ManageApp from '../ManageApp'
import {ContactsData, MsgData} from '../../sample'
import PersonComponent from '../PersonComponent'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import appCom from '../../appCom'
import * as pageBase from '../../pageBase'

const delay = 5;
export default function Dashboard({user}) {
    const history = useHistory();
    if(user == null){
        history.push("/login");
    }
    const mainUser = useState(user)
    //console.log("Main user");
    //console.log(mainUser[0].split(',')[0])
    const [data, setData] = useState([])
    //console.log(data)
    const [msgStatus, setmsgStatus] = useState([])
    const [contactSelected, setContactSelected] = useState([])
    const [deleteContacts, setDeleteContacts] = useState({})
    const [currentMessages, setCurrentMessages] = useState([])
    const [message, setMessage] = useState('')
    const [search, setSearch] = useState('')
    const [filteredContacts, setFilterContacts] = useState([])
    const [show, setShow] = useState(false);
    
    useEffect(() => {
      fetchMessages();
    }, [])
    useEffect(() => {
        //console.log(data)
    }, [data])

	/*useEffect(() => {

        const interval = setInterval(() => {
            fetchMessages();
        console.log('This will run every 10 second!');
        }, 10000);
        return () => clearInterval(interval);
    }, []); */   

    const fetchMessages=async()=>{
        var url = pageBase.SERVICE_URL+'messages?number='+ mainUser[0].split(',')[0]
    const response=await Axios(url);
    //const response=await Axios('http://localhost:8080/sampletest?number='+ mainUser[0].split(',')[0]);
    //console.log(response.data)
    setData(response.data) 
  }
    const sendMessages=async(x)=>{
        var url = pageBase.SERVICE_URL+'sendtelnyx'
       const response_send=await Axios.post(url, x);
        console.log(response_send.data)
  }
    
    
    console.log(deleteContacts)

    useEffect(() => {
        const currContact = data.find((d) => d.contact.id === contactSelected.id)
        setCurrentMessages((currContact && currContact.messages) || [])
        filterContacts(data, search)
    }, [contactSelected, data, search])

    function pushMessage() {
        const index = data.findIndex((d) => d.contact.id === contactSelected.id)
        const newData = Object.assign([], data, {
            [index]: {
                contact: contactSelected,
                messages: [...data[index].messages, new Message(true, message, new Date())],
            },
        })
        //console.log("Index:  "+ data[index].contact.number)
        setData(newData)
        setMessage('')
        //console.log("After pushMessage")
        //var sender = "+"+mainUser[0]
        var sender = mainUser[0].split(',')[0]
        const x = {
            "text" : message,
            //"msg": message,
            "to": data[index].contact.number,
            "from": sender.trim()
        }
        sendMessages(x)

        
    }

    function filterContacts(data, search) {
        const result = data.filter(({ contact }) => {
            return !search || contact.name.toLowerCase().includes(search.toLowerCase())
        })
        setFilterContacts(result)
    }

    return (
        <div className="app">
            <aside>
                <header>
                    <Avatar user={mainUser[0].split(',')[1]} showName />
                </header>
                <Search search={search} setSearch={setSearch} />
                <ManageApp dataFromParent = {mainUser[0].split(',')[0]}/>
                <div className="contact-boxes">
                    {filteredContacts.map(({ contact, messages }) => (
                        <ContactBox
                            contact={contact}
                            key={contact.id}
                            setContactSelected={setContactSelected}
                            messages={messages}
                            mynumber = {mainUser[0].split(',')[0]}
                        />
                    ))}
                </div>
            </aside>
            {contactSelected.id ? (
                <main>
                    <header>
                        <Avatar user={contactSelected} showName />
                    </header>
                    <MessagesBox messages={currentMessages} user={mainUser[0].split(',')[0]} />
                    <ChatInputBox message={message} setMessage={setMessage} pushMessage={pushMessage} />
                </main>
            ) : (
                <Welcome />
            )}
        </div>
    )
}
