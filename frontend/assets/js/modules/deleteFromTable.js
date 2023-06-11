import { deleteItem } from "../api.js"

export async function deleteFromTable(person) {
    await deleteItem(Number(person.children[0].innerHTML));
}