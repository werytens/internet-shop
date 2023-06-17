import { getItems } from "../api.js";
import { renderClients } from "./renderClients.js";
import { deleteAllItems } from "./deleteAllItems.js";

const table = document.querySelector("table");

export async function renderFilteredData(filter) {
    if (filter.length == 0) {
        renderClients(table, await getItems());
        return
    } else {
        let filteredItems = [];

        (await getItems()).forEach(item => {
            if (item["FCS"].includes(filter))
            filteredItems.push(item);
        })

        deleteAllItems();
        renderClients(table, filteredItems);
        return
    }
}

