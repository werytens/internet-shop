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

    console.log(info.contacts)

    // newContactAdd(contactsInModal);
}