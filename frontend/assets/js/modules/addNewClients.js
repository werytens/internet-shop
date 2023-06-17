import { validation } from "./validation.js";
import { getItems, createItem, deleteItem } from "../api.js";
import { deletingAllNewContactsAdd } from "./deletingAllNewContactsAdd.js";

export async function addNewClients() {
    const contactsNamesDict = {
        "Телефон": "phoneNumber",
        "Email": "email",
        "Facebook": "facebook",
        "VK": "vkontakte",
        "Другое": "other_contact"
    }


    let item = document.querySelector(".save_new_client").parentElement.parentElement;

    let inputs = item.children[2].querySelectorAll("input");
    let contacts = document.querySelectorAll(".new_contact_field");  

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
    
    let finishContacts = [];

    contactReadyForLoad.forEach(item => {
        if (item.split('"')[1] == "phoneNumber" && item.split(":")[1][1] == "8") {
            finishContacts.push(`"phoneNumber":"+7${item.slice(item.indexOf("8") + 1)}`)
        } else {
            finishContacts.push(item)
        }
    })
    

    let newClient = {
        id: (await getItems()).length + 1,
        fcs: `${inputs[0].value.trim()} ${inputs[1].value.trim()} ${inputs[2].value.trim()}`,
        createDate: new Date(),
        changeDate: new Date(),
        contacts: JSON.parse(`{${finishContacts.join(",")}}`)
    }

    let validCheck = validation(newClient);

    console.log(newClient)

    if (validCheck == true) {
        document.querySelector(".mnc_title").innerHTML = `Добавление клиента `;
        await createItem(newClient);
        inputs.forEach(item => item.value = "")
        document.querySelector(".modal_new_client").style.cssText = "display: none;";
        document.querySelector(".mac_back").style.cssText = "display: none;";  
        deletingAllNewContactsAdd();
        window.location.reload();
    } else {
        document.querySelector(".mnc_title").innerHTML = validCheck;
    }
}