import { getItems } from "../api.js";
import { renderClients } from "./renderClients.js";

const table = document.querySelector("table");

export async function startRender() {
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
}