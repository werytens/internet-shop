export function renderClients(table, array) {
    array.forEach((item, index) => {
        addNewClient(table, array.length, item, index)
    })
}

function addNewClient(table, allLength, item, index) {
    if (allLength != index) {
        renderClient(table, item)
        renderLine(table)
    } else {
        renderClient(table, item)
    }
}

function renderClient(table, item) {
    let tr = document.createElement("tr");
    tr.classList.add("user");

    let tdId = document.createElement("td");
    tdId.innerHTML = item.id;
    tdId.setAttribute("id", "id");
    tr.append(tdId);

    let tdFCS = document.createElement("td");
    tdFCS.innerHTML = item.fcs;
    tdFCS.setAttribute("id", "fcs");
    tr.append(tdFCS);

    let tdCreateDate = document.createElement("td");
    tdCreateDate.innerHTML = `${item.createDate.getUTCDate()}.${item.createDate.getUTCMonth() + 1}.${item.createDate.getFullYear()}
    <span class = "time_span">${item.createDate.getHours()}:${item.createDate.getMinutes()}</span>`;
    tdCreateDate.setAttribute("id", "create_date");
    tr.append(tdCreateDate);

    let tdChangeDate = document.createElement("td");
    tdChangeDate.innerHTML = `${item.changeDate.getUTCDate()}.${item.changeDate.getUTCMonth() + 1}.${item.changeDate.getFullYear()}
    <span class = "time_span">${item.changeDate.getHours()}:${item.changeDate.getMinutes()}</span>`;
    tdChangeDate.setAttribute("id", "change_date");
    tr.append(tdChangeDate);

    let tdContacts = document.createElement("td");
    tdContacts.setAttribute("id", 'td_contacts');

    // Нужно добавить ещё один внешний блок

    for (let index in item.contacts) {
        switch(index) {
            case "phoneNumber":
                tdContacts.innerHTML += `
                <div class = 'contact'>
                    <i class="fa-solid fa-square-phone"></i>
                    <span class = "data_set phone_data">${item.contacts[index]}</span>
                </div>
                 `; 
                break;
            case "facebook":
                tdContacts.innerHTML += `
                <div class = 'contact'>
                    <i class="fa-brands fa-facebook"></i>
                    <span class = "data_set facebook_data">${item.contacts[index]}</span>
                </div>
                 `;
                break;
        }
    }
    tr.append(tdContacts);

    let tdActions = document.createElement("td");
    tdActions.setAttribute("id", "actions");
    tdActions.innerHTML = `
    <div class = 'buttons_actions'>
        <div class="change_div">
            <i class="fa-solid fa-pencil"></i> Изменить
        </div>
        <div class="delete_div">
            <i class="fa-solid fa-xmark"></i> Удалить
        </div>
    </div>
    `;
    tr.append(tdActions);

    table.append(tr);
}

function renderLine(table) {
    let line = document.createElement('tr');
    line.classList.add("for_line");
    table.append(line) 
}
