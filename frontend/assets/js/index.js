import { renderClients } from "./modules/renderClients.js";
import { newContactAdd } from "./modules/newContactAdd.js";
import { deletingAllNewContactsAdd } from "./modules/deletingAllNewContactsAdd.js";
import { validation } from "./modules/validation.js";
import { deleteFromTable } from "./modules/deleteFromTable.js";

import { getItems, createItem, deleteItem } from "./api.js";

const table = document.querySelector("table");

document.addEventListener("DOMContentLoaded", async () => {
    let startItems = await getItems();

    if (startItems.length == 0) {
        let letStartArray = [
            {
                id: 0,
                fcs: "Проверка Проверенкова Проверковна",
                createDate: new Date("2021-02-21T12:41:00"),
                changeDate: new Date("2021-02-21T12:41:00"),
                contacts: {
                    phoneNumber: "+79029877953",
                    facebook: "facebook.link.123"
                }
            },
            {
                id: 1,
                fcs: "Проверок Провереников Проверковен",
                createDate: new Date("2021-02-21T12:41:00"),
                changeDate: new Date("2021-02-21T12:41:00"),
                contacts: {
                    phoneNumber: "+75245098344",
                    facebook: "facebook.link.124"
                }
            }
        ]

        renderClients(table, letStartArray);
    } else {
        renderClients(table, await getItems());
    }
})


setTimeout(() => {
    // document.querySelectorAll(".fa-square-phone").forEach(element => element.addEventListener("mouseover", () => {
    //     element.parentElement.querySelector(".phone_data").style.display = "block";
    // }))

    // document.querySelectorAll(".fa-facebook").forEach(element => element.addEventListener("mouseover", () => {
    //     element.parentElement.querySelector(".facebook_data").style.display = "block";
    // }))

    // document.querySelectorAll(".fa-square-phone").forEach(element => element.addEventListener("mouseleave", () => {
    //     element.parentElement.querySelector(".phone_data").style.display = "none";
    // }))

    // document.querySelectorAll(".fa-facebook").forEach(element => element.addEventListener("mouseleave", () => {
    //     element.parentElement.querySelector(".facebook_data").style.display = "none";
    // })) 

    document.querySelectorAll(".change_div").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector(".modal_add_client").style.cssText = "display: flex;";
            document.querySelector(".mac_back").style.cssText = "display: block;";  
        })
    })
    
    document.querySelectorAll(".delete_div").forEach( async (item) => {
        item.addEventListener("click", async () => {
            document.querySelector(".modal_delete_client").style.cssText = "display: flex;";
            document.querySelector(".mac_back").style.cssText = "display: block;";  

            document.querySelector(".delete_button_mdc").addEventListener("click", async () => {
                await deleteFromTable(item.parentElement.parentElement.parentElement);
                window.location.reload();
            })
        })
    })

    

    document.querySelector(".mac_cross").addEventListener("click", () => {
        document.querySelector(".modal_add_client").style.cssText = "display: none;";
        document.querySelector(".mac_back").style.cssText = "display: none;"; 

        deletingAllNewContactsAdd();
    })

    document.querySelector(".cancel_button_mdc").addEventListener("click", () => {
        document.querySelector(".modal_delete_client").style.cssText = "display: none;";
        document.querySelector(".mac_back").style.cssText = "display: none;";
    })

    document.querySelector(".delete_button").addEventListener("click", () => {
        document.querySelector(".modal_add_client").style.cssText = "display: none;";
        document.querySelector(".mac_back").style.cssText = "display: none;";  

        deletingAllNewContactsAdd();

        document.querySelector(".modal_delete_client").style.cssText = "display: block;";
        document.querySelector(".mac_back").style.cssText = "display: block;";
    })

    document.querySelector(".add_client_button").addEventListener("click", () => {
        document.querySelector(".modal_new_client").style.cssText = "display: flex;";
        document.querySelector(".mac_back").style.cssText = "display: block;";
    })

    document.querySelector(".mnc_cross").addEventListener("click", () => {
        document.querySelector(".modal_new_client").style.cssText = "display: none;";
        document.querySelector(".mac_back").style.cssText = "display: none;";  

        deletingAllNewContactsAdd();
    })
}, 200) 

// Contract Add Events

setTimeout(() => {
    document.querySelectorAll(".contact_add").forEach(item => 
        item.addEventListener("click", () => {
            newContactAdd(item.parentElement);
        })
    )

    document.querySelectorAll(".contact").forEach(item => 
        item.addEventListener("mouseover", () => {
            item.children[1].style.display = "block";
        })
    )

    document.querySelectorAll(".contact").forEach(item => 
        item.addEventListener("mouseleave", () => {
            item.children[1].style.display = "none";
        })
    )
}, 200)

document.querySelector(".save_new_client").addEventListener("click", async () => {
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

    let contactsValidation = contactReadyForLoad.join(":").split(":");
    
    let finishContacts = [];

    contactsValidation.forEach((item, index) => {
        if (item == '"phoneNumber"') {
            if (contactsValidation[index + 1].slice(1).slice(0, contactsValidation[index + 1].length - 2)[0] == "8") {
                finishContacts = contactReadyForLoad.join(",").replace(String(contactsValidation[index + 1].slice(1).slice(0, contactsValidation[index + 1].length - 2)), 
                `+7${contactsValidation[index + 1].slice(1).slice(0, contactsValidation[index + 1].length - 2).slice(1)}`)
                finishContacts = finishContacts.split(",")
            }
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
})