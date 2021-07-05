
const faker = require('faker')

class User {
    constructor() {
        this.id = faker.random.uuid()
        this.name = faker.name.findName()
        this.avatar = faker.internet.avatar()
    }
}
export class Message {
    constructor(isMainUser, text, date) {
        this.id = faker.random.uuid()
        this.text = text || faker.lorem.words(faker.helpers.randomize([...Array(20).keys()]))
        this.isMainUser = isMainUser
        this.date = date || faker.date.recent()
    }
}

export const mainUser = new User()

export const contacts = [...Array(5).keys()].map(() => new User())

console.log(contacts)

export const contactsMessages = contacts.map((contact) => {
    return {
        contact,
        messages: [...Array(5).keys()]
            .map((_, i) => {
                return (i + 1) % 2 === 0 ? new Message(true) : new Message(false)
            })
            .filter((m) => m.text),
    }
})

export default function print(){
    console.log("Hello wrorld")
}