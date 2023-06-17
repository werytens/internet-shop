export function renderClients(table, array) {
    array.forEach((item, index) => {
        addNewClient(table, array.length, item, index)
    })
}

function addNewClient(table, allLength, item, index) {
    if (allLength != index) {
        renderClient(table, item)
        // renderLine(table)
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
    tdFCS.innerHTML = item.FCS;
    tdFCS.setAttribute("id", "fcs");
    tr.append(tdFCS);

    let tdCreateDate = document.createElement("td");

    let datesCreate = [(new Date(item.createDate)).getUTCDate(), (new Date(item.createDate)).getUTCMonth() + 1, (new Date(item.createDate)).getFullYear()]
    let timesCreate = [(new Date(item.createDate)).getHours(), (new Date(item.createDate)).getMinutes()]

    String(datesCreate[0]).length == 1 ? datesCreate[0] = `0${datesCreate[0]}` : null;
    String(datesCreate[1]).length == 1 ? datesCreate[1] = `0${datesCreate[1]}` : null;

    String(timesCreate[0]).length == 1 ? timesCreate[0] = `0${timesCreate[0]}` : null;
    String(timesCreate[1]).length == 1 ? timesCreate[1] = `0${timesCreate[1]}` : null;
    
    
    tdCreateDate.innerHTML = `${datesCreate[0]}.${datesCreate[1]}.${datesCreate[2]}
    <span class = "time_span">${timesCreate[0]}:${timesCreate[1]}</span>`;
    tdCreateDate.setAttribute("id", "create_date");
    tr.append(tdCreateDate);

    let tdChangeDate = document.createElement("td");

    let datesUpdate = [new Date(item.updateDate).getUTCDate(), new Date(item.updateDate).getUTCMonth() + 1, new Date(item.updateDate).getFullYear()]
    let timesUpdate = [new Date(item.updateDate).getHours(), new Date(item.updateDate).getMinutes()]

    String(datesUpdate[0]).length == 1 ? datesUpdate[0] = `0${datesUpdate[0]}` : null;
    String(datesUpdate[1]).length == 1 ? datesUpdate[1] = `0${datesUpdate[1]}` : null;

    String(timesUpdate[0]).length == 1 ? timesUpdate[0] = `0${timesUpdate[0]}` : null;
    String(timesUpdate[1]).length == 1 ? timesUpdate[1] = `0${timesUpdate[1]}` : null;
    
    tdChangeDate.innerHTML = `${datesUpdate[0]}.${datesUpdate[1]}.${datesUpdate[2]}
    <span class = "time_span">${timesUpdate[0]}:${timesUpdate[1]}</span>`;
    tdChangeDate.setAttribute("id", "change_date");
    tr.append(tdChangeDate);

    let tdContacts = document.createElement("td");
    tdContacts.setAttribute("id", 'td_contacts');

    for (let index in JSON.parse(item.contacts)) {
        switch(index) {
            case "phoneNumber":
                tdContacts.innerHTML += `
                <div class = 'contact'>
                    <i class="fa-solid fa-square-phone"></i>
                    <span class = "data_set phone_data">${JSON.parse(item.contacts)[index]}</span>
                </div>
                 `; 
                break;
            case "facebook":
                tdContacts.innerHTML += `
                <div class = 'contact'>
                    <i class="fa-brands fa-facebook"></i>
                    <span class = "data_set facebook_data">${JSON.parse(item.contacts)[index]}</span>
                </div>
                 `;
                break;
            case "email":
                tdContacts.innerHTML += `
                <div class = 'contact'>
                <i class="fa-solid fa-envelope"></i>
                    <span class = "data_set email_data">${JSON.parse(item.contacts)[index]}</span>
                </div>
                 `;
                break;
            case "vkontakte":
                tdContacts.innerHTML += `
                <div class = 'contact'>
                    <i class="fa-brands fa-vk"></i>
                    <span class = "data_set vkontakte_data">${JSON.parse(item.contacts)[index]}</span>
                </div>
                 `;
                break;
            case "other_contact":
                tdContacts.innerHTML += `
                <div class = 'contact'>
                    <i class="fa-solid fa-circle-user"></i>
                    <span class = "data_set other_contact_data">${JSON.parse(item.contacts)[index]}</span>
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

// function renderLine(table) {
//     let line = document.createElement('tr');
//     line.classList.add("for_line");
//     table.append(line) 
// }