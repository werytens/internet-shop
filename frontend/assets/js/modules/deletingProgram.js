import { getItems, updateItem } from "../api.js";
import { deleteFromTable } from "./deleteFromTable.js";

export async function deletingProgram(item) {
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
}