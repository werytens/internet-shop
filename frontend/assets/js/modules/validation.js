export function validation(item) {
    let result = "Неверные данные: "

    result += checkFCS(item.fcs)

    if (result.split(": ")[1] == "") {
        return true
    } else { return result }
}

function checkFCS(FCS) {
    let checkResult = "";

    FCS.split(" ").forEach(item => {
        String(item).length < 2 ? checkResult = "Неверное заполнение ФИО." : null 
    })

    return checkResult
}

document.querySelectorAll(".fcs_input").forEach(item => item.addEventListener("input", () => {
    if (String(item.value)[String(item.value).length - 1] == " ") {
        item.value = item.value.slice(0, [String(item.value).length - 1])
    } 
    if (isNaN(Number(String(item.value)[String(item.value).length - 1])) == false) {
        item.value = item.value.slice(0, [String(item.value).length - 1])
    }
    if(String(item.value).length > 20) {
        item.value = item.value.slice(0, [String(item.value).length - 1])
    }
    if (/^[а-яА-Я]+$/.test(item.value) == false) {
        item.value = item.value.slice(0, [String(item.value).length - 1])
    }
}))
