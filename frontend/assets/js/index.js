import { newContactAdd } from "./modules/newContactAdd.js";
import { deletingAllNewContactsAdd } from "./modules/deletingAllNewContactsAdd.js";
import { addNewClients } from "./modules/addNewClients.js";
import { changeClients } from "./modules/changeClients.js";
import { sorting } from "./modules/sorting.js";
import { renderFilteredData } from "./modules/renderFilteredData.js";
import { startRender } from "./modules/startRender.js";
import { getItems, } from "./api.js";
import { deletingProgram } from "./modules/deletingProgram.js";



document.addEventListener("DOMContentLoaded", async () => {
    await startRender();
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
                await deletingProgram(item);
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

    document.querySelector(".titles").addEventListener("click", async (event) => {
        await sorting(event.target);
    })

    document.querySelector(".other_fields").children[0].addEventListener("input", async () => {
        await renderFilteredData(document.querySelector(".other_fields").children[0].value);
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
    await addNewClients();
})