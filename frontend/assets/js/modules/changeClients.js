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
    if (contacts[0].length != 0) {
        contacts.forEach(item => {
            arrayForSelect.push(getIndexOfContact(item.split(":")[0].slice(1).slice(0, item.split(":")[0].slice(1).length - 1)) - 1)
            
            newContactAdd(contactsInModal);
        })
    }
    


    setSelected(arrayForSelect, info.contacts);

    document.querySelector('.modal_add_client').querySelector('.ready_button').addEventListener("click", async () => {
        const contactsNamesDict = {
            "Телефон": "phoneNumber",
            "Email": "email",
            "Facebook": "facebook",
            "VK": "vkontakte",
            "Другое": "other_contact"
        }

        let modal = document.querySelector('.modal_add_client');
        let contacts = modal.querySelectorAll(".new_contact_field");  
        let contactReadyForLoad = []

        try { contacts.forEach((item, index) => {
                for (let index in item.children[0].children[0].children) {
                    if (typeof item.children[0].children[0].children[index] == "object") {
                        if (item.children[0].children[0].children[index].dataset.selected == "selected") {
                            contactReadyForLoad.push(`"${contactsNamesDict[item.children[0].children[0].children[index].value]}":"${item.children[1].children[0].value}"`)
                        }
                    }
                }
            }
        )} catch (error) { null }

        let contactsValidation = contactReadyForLoad.join(":").split(":");
        let finishContacts = [];
        console.log(contactReadyForLoad)

        contactReadyForLoad.forEach(item => {
            if (item.split('"')[1] == "phoneNumber" && item.split(":")[1][1] == "8") {
                finishContacts.push(`"phoneNumber":"+7${item.slice(item.indexOf("8") + 1)}`)
            } else {
                finishContacts.push(item)
            }
        })


        let clientForUpdate = {
            id: info.id, 
            FCS: `${modal.children[2].children[0].children[1].value} ${modal.children[2].children[1].children[1].value} ${modal.children[2].children[2].children[1].value}`, 
            createDate: info.createDate, 
            updateDate: new Date(), 
            contacts: JSON.parse(`{${finishContacts.join(",")}}`), 
            oldId: info.id
        }

        await updateItem(clientForUpdate);
        window.location.reload();
    })
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

function setSelected(arrayForSelect, info) {
    let modalContacts = document.querySelector(".modal_add_client").querySelectorAll("select");

    try { modalContacts.forEach((select, index) => {
            select.selectedIndex = arrayForSelect[index];
            select.parentElement.parentElement.children[1].children[0].value = 
                info.slice(1).slice(0, info.length - 2).split(",")[index]
                .split(":")[1].slice(1).slice(0, info.slice(1)
                .slice(0, info.length - 2).split(",")[index].split(":")[1].length - 2)
        })
    } catch (error) { null }
}