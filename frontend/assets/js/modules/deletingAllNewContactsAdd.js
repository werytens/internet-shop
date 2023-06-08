export function deletingAllNewContactsAdd() {
    document.querySelectorAll(".new_contact_field").forEach(item => {
        item.remove();
    })
}
