import { renderClients } from "./modules/renderClients.js";
import { newContactAdd } from "./modules/newContactAdd.js";
import { deletingAllNewContactsAdd } from "./modules/deletingAllNewContactsAdd.js";
import { validation } from "./modules/validation.js";
import { deleteFromTable } from "./modules/deleteFromTable.js";
import { changeClients } from "./modules/changeClients.js";

import { getItems, createItem, deleteItem, updateItem } from "./api.js";
const table = document.querySelector("table");

document.addEventListener("DOMContentLoaded", async () => {
    if ((await getItems()).length == 0) {
        renderClients(table, [{
            id: 1,
            FCS: "Проверка Проверенкова Проверковна",
            createDate: new Date("2021-02-21T12:41:00"),
            updateDate: new Date("2021-02-21T12:41:00"),
            contacts: JSON.stringify({
                phoneNumber: "+79029877953",
                facebook: "facebook.link.123"
            })
        }]);

        await createItem({
            id: 1,
            fcs: "Проверка Проверенкова Проверковна",
            createDate: new Date("2021-02-21T12:41:00"),
            changeDate: new Date("2021-02-21T12:41:00"),
            contacts: {
                phoneNumber: "+79029877953",
                facebook: "facebook.link.123"
            }
        })
    } else {
        renderClients(table, await getItems());
    }
})


setTimeout(() => {
    document.querySelectorAll(".change_div").forEach(item => {
        item.addEventListener("click", async () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
            document.querySelector(".modal_add_client").style.cssText = "display: flex;";
            document.querySelector(".mac_back").style.cssText = "display: block;";  

            let itemId = Number(item.parentElement.parentElement.parentElement.children[0].innerHTML);
            (await getItems()).forEach(async el => {
                if (el.id == itemId) {
                    await changeClients(el);
                }
            })
        })
    })
    
    document.querySelectorAll(".delete_div").forEach( async (item) => {
        item.addEventListener("click", async () => {
            window.scrollTo({top: 0, behavior: 'smooth'});

            document.querySelector(".modal_delete_client").style.cssText = "display: flex;";
            document.querySelector(".mac_back").style.cssText = "display: block;";  

            document.querySelector(".delete_button_mdc").addEventListener("click", async () => {
                await deleteFromTable(item.parentElement.parentElement.parentElement);

                let itemForDeleteId = Number(item.parentElement.parentElement.parentElement.children[0].innerHTML);
                setTimeout(async () => {
                    (await getItems()).forEach(async (item) => {
                        if (item.id > itemForDeleteId) {
                            item.oldId = item.id;
                            item.id = item.oldId - 1;
                            item.contacts = JSON.parse(item.contacts)
                            await updateItem(item);
                        }
                    })
                }, 100)

                setTimeout(() => {
                    window.location.reload();
                }, 400)
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

        window.scrollTo({top: 0, behavior: 'smooth'});
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
})


