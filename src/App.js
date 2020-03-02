import React, { useState } from 'react';
import AddContactForm from "./components/addContact/addContactForm";
import ContactItem from "./components/contactItem/ContactItem";
import './App.css';

const App = () => {

  const [contactList, setContactList] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const addContact = contact => {
    setContactList([...contactList, contact])
  }

  const deleteSingleContact = contactId => {
    const filtered = contactList.filter(item => item.id !== contactId);
    setContactList(filtered);
  }

  const setMultipleContacts = contact => {
    setSelectedContacts(contact)
  }

  const deleteMultipleContacts = () => {
    const newContactList = [...contactList];

    const filtered = contactList.filter(item => {
      return newContactList.includes(item.id)
    });

    setContactList(filtered)
    setSelectedContacts([]);
  }

  const renderContactList = () => {
    return (
      <div className="phonebook__contacts">
        <div className="phonebook__contacts__wrap">
          <ContactItem
            contacts={contactList}
            deleteSingle={deleteSingleContact}
            setMultiple={setMultipleContacts}
          />
        </div>
        <div className="delete-multiple-button">
          {selectedContacts.length !== 0 &&
            <button onClick={deleteMultipleContacts}>Delete Multiple</button>
          }
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="phonebook">
        <div className="phonebook__header">
          <h1><i class="fas fa-address-book"></i> Phone Book App</h1>
        </div>
        <div className="phonebook__form">
          <AddContactForm addContact={(contact) => addContact(contact)} />
        </div>
        {contactList.length !==0 && renderContactList()}
      </div>
    </React.Fragment>
  );
}

export default App;
