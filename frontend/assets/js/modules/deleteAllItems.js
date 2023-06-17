export function deleteAllItems() {
    document.querySelectorAll(".user").forEach(user => user.remove())
}