import React, {useContext} from 'react';
import './ContactItem.css'
import {ContactCard} from "../contact-card/ContactCard";
import {ExpandedContactContext} from "../contact-list/ContactList";


export const ContactItem = ({contact}) => {
    const [selectedContact, setSelectedContact] = useContext(ExpandedContactContext);

    const show = contact === selectedContact;

    const handleClick = () => {
        const nextContact = selectedContact === contact ? undefined : contact
        setSelectedContact(nextContact)
    }

    return (
        <div>
            <li className={'ContactItem-li'}>
                <button className={'ContactItem'} onClick={handleClick}>
                    {contact.name.first},
                    <span className={'ContactItem-surname'}>{contact.name.last}</span>
                </button>
                {show && <ContactCard contact={contact}/>}
            </li>
        </div>
    )
}