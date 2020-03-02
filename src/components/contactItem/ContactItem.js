import React, { useState, useEffect } from "react";
import "./ContactItem.css";

const ContactItem = ({ contacts, setMultiple, deleteSingle }) => {

    const [checkboxes, setCheckBoxes] = useState([]);

    const checkBoxHandler = (event, id) => {
        if (event.target.checked) {
            setCheckBoxes([...checkboxes, id])
        } else {
            const newCheckboxes = [...checkboxes];
            const filtered = newCheckboxes.filter(item => {
                return item !== id
            });
            setCheckBoxes(filtered);
        }
    }

    useEffect(() => {
        setMultiple(checkboxes)
    }, [checkboxes]);

    const showFullNumber = (code, number) => {
        const fullNumber = `${code} ${number}`
        return (
            <span>
                <b>+</b> {fullNumber}
            </span>
        );
    }

    const deleteContact = id => {
        deleteSingle(id)
    }

    const renderContacts = () => {
        return contacts && contacts.map((contact, index) => {
            return (
                <div className="contact-card-wrap" key={index}>
                    <div className="contact-card-wrap__item">
                        <i class="fas fa-phone-square-alt"></i>
                    </div>
                    <div className="contact-card-wrap__item">
                        <p><b>{contact.firstname}{" "}{contact.lastname}</b></p>
                        <p>{showFullNumber(contact.code, contact.number)}</p>
                    </div>
                    <div className="contact-card-wrap__item">
                        <button onClick={() => deleteContact(contact.id)}>
                            <i class="far fa-trash-alt"></i>
                        </button>

                        <input
                            type="checkbox"
                            name={contact.id}
                            onChange={(event) => checkBoxHandler(event, contact.id)}
                            className="checkbox"
                        />
                    </div>
                </div>
            )
        })
    }

    return (
        <React.Fragment>
            <div className="contact-card">
                {renderContacts()}
            </div>
        </React.Fragment>
    )
}

export default ContactItem;