const fs = require("fs").promises;

const contactsPath = "./db/contacts.json";

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contact) => console.table(contact))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => contacts.find((contact) => +contact.id === +contactId))
    .then((contact) => console.table(contact))
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      const newId = contacts.length + 1;
      const newContact = { id: `${newId}`, name, email, phone };
      return fs.writeFile(
        contactsPath,
        JSON.stringify([...contacts, newContact])
      );
    })
    .then(console.log(`Contact named ${name} added`))
    .catch((err) => console.log(err.message));
}
function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      return fs.writeFile(
        contactsPath,
        JSON.stringify(
          contacts?.filter((contact) => +contact.id !== +contactId)
        )
      );
    })
    .then(console.log(`Contact with id ${contactId} removed`))
    .catch((err) => console.log(err.message));
}

module.exports = { listContacts, getContactById, addContact, removeContact };
