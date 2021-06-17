/*const faker = require('faker')
var contactsArray = ""
let messagesArray = ""
let jsondata;
function getContacts(number) {
 fetch('http://localhost:8080/contacts?number='+number, {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json'
   },
   //body: JSON.stringify(credentials)
 })
   /*.then(data => data.json())*/
   .then(
    function(u){return u.json();}
    ).then(function(json){
        console.log(json)
        jsondata = json;
        return json;
    })
}


async function getMessages(number) {
 return fetch('http://localhost:8080/messages?number='+number, {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json'
   },
   //body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

class User {
    constructor() {
        this.id = faker.random.uuid()
        this.name = faker.name.findName()
        this.avatar = faker.internet.avatar()
    }
}
export class Message {
    constructor(isMainUser, msg, date) {
        this.id = faker.random.uuid()
        this.msg = msg || faker.lorem.words(faker.helpers.randomize([...Array(20).keys()]))
        this.isMainUser = isMainUser
        this.date = date || faker.date.recent()
    }
}

export const contacts = fetch('http://localhost:8080/contacts?number=8939668158', {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json'
   },
   //body: JSON.stringify(credentials)
 })
   /*.then(data => data.json())*/
   .then(
    function(u){return u.json();}
    ).then(function(json){
        console.log(json)
        jsondata = json;
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 


console.log(contacts)
/*contacts.then(function(result){
    console.log(result)
})*/
export let messages = getMessages("8939668158")
/*messages.then(function(result){
    console.log(result)
})*/

export const contactsMessages = []

contacts.map((contact) => {
    return {
        contact,
        messages: [...Array(50).keys()]
            .map((_, i) => {
                return (i + 1) % 2 === 0 ? new Message(true) : new Message(false)
            })
            .filter((m) => m.msg),
    }
})*/
