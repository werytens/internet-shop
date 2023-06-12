const API_URL = "http://localhost:3000";

export async function getItems() {
    const resp = await fetch(API_URL);
    return await resp.json();
}

export async function createItem(text) {
    console.log(text);

    const resp = await fetch(API_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });

    return await resp.json();
}

export async function updateItem(text) {
    console.log(text);

    const resp = await fetch(API_URL, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });

    return await resp.json();
}

export async function deleteItem(id) {
    const resp = await fetch(`${API_URL}/?id=${id}`, { method: "DELETE" });
    return await resp.json();
}
