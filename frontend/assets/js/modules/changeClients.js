import { updateItem } from "../api.js";
import { newContactAdd } from "./newContactAdd.js";

export async function changeClients(data) {
    setInfoForModal(data);
} 

function setInfoForModal(info) {
    let modalFields = document.querySelector(".modal_add_client").children; 
    let contactsInModal = document.querySelector('.modal_add_client').querySelector(".contacts_in_modal");

    info.FCS.split(" ").forEach((text, index) => {
        modalFields[2].children[index].children[1].value = text;
    })

    let arrayForSelect = [];

    let contacts = (info.contacts.slice(1)).slice(0, (info.contacts.length - 2)).split(",");
    contacts.forEach(item => {
        arrayForSelect.push(getIndexOfContact(item.split(":")[0].slice(1).slice(0, item.split(":")[0].slice(1).length - 1)) - 1)
        
        newContactAdd(contactsInModal);
    })

    setSelected(arrayForSelect);
}

function getIndexOfContact(contactName) {
    const contactsNamesDict = {
        "Телефон": "phoneNumber",
        "Email": "email",
        "Facebook": "facebook",
        "VK": "vkontakte",
        "Другое": "other_contact"
    }

    let indexOfItem = 1;
    for (let index in contactsNamesDict) {
        if (contactsNamesDict[index] == contactName) {
            return indexOfItem;
        }    
        indexOfItem++
    }
}

function setSelected(arrayForSelect) {
    let modalContacts = document.querySelector(".modal_add_client").querySelectorAll("select");

    modalContacts.forEach((select, index) => {
        console.log(select.selectedIndex = arrayForSelect[index])
    })
}