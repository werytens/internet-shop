import { getItems } from "../api.js"
import { renderClients } from "./renderClients.js";
import { clearTitles } from "./clearTitles.js";
import { deleteAllItems } from "./deleteAllItems.js";

const table = document.querySelector("table");
const titlesForSorting = {
    "ID": "id",
    "Фамилия Имя Отчество": "FCS",
    "Дата и время создания": "createDate",
    "Последние изменения": "updateDate"
}

export async function sorting(target) {
    if (target.innerHTML.slice(0, 3) == "Дей" || target.innerHTML.slice(0, 3) == "Кон")
    return

    clearTitles(document.querySelector(".titles"));
    deleteAllItems();

    let allItems = await getItems();
    let newItems = [];

    if (target.dataset.sort != "sorted") {
        newItems = allItems.sort((a, b) => (a[titlesForSorting[target.innerHTML]] > b[titlesForSorting[target.innerHTML]] ? 1 : -1));
        target.dataset.sort = "sorted";
        target.innerHTML = `${target.innerHTML} <i class="fa-solid fa-arrow-down"></i>`;
    } else if (target.dataset.sort == "sorted") {
        newItems = allItems.sort((a, b) => (a[titlesForSorting[target.innerHTML]] > b[titlesForSorting[target.innerHTML]] ? 1 : -1)).reverse();
        target.dataset.sort = "rever-sesorted";
        target.innerHTML = `${target.innerHTML} <i class="fa-solid fa-arrow-up"></i>`;
    }
    renderClients(table, newItems);
}
