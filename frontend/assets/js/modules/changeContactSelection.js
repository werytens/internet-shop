export function changeContactSelection() {

    document.querySelectorAll(".dropdown_menu_contact").forEach(contact => {
        contact.children[0].children[0].dataset.selected = "selected";
        contact.children[0].addEventListener("click", () => {
            contact.children[0].querySelectorAll("option").forEach(item => {
                item.dataset.selected="unselected";
            })
    
            contact.children[0].options[contact.children[0].selectedIndex].dataset.selected="selected";
        })
    })
}