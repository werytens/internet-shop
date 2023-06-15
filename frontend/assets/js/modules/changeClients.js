import { updateItem } from "../api.js";
import { newContactAdd } from "./newContactAdd.js";

export async function changeClients(data) {
    setInfoForModal(data);
} 

function setInfoForModal(info) {
    const contactsNamesDict = {
        "Телефон": "phoneNumber",
        "Email": "email",
        "Facebook": "facebook",
        "VK": "vkontakte",
        "Другое": "other_contact"
    }

    let modalFields = document.querySelector(".modal_add_client").children; 
    let contactsInModal = document.querySelector('.modal_add_client').querySelector(".contacts_in_modal");

    info.FCS.split(" ").forEach((text, index) => {
        modalFields[2].children[index].children[1].value = text;
    })

    let contacts = (info.contacts.slice(1)).slice(0, (info.contacts.length - 2)).split(",");
    contacts.forEach(item => {
        console.log(item)
        newContactAdd(contactsInModal);
    })
}