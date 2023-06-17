export function clearTitles(block) {
    block.children[0].innerHTML = "ID";
    block.children[1].innerHTML = "Фамилия Имя Отчество";
    block.children[2].innerHTML = "Дата и время создания";
    block.children[3].innerHTML = "Последние изменения";
    block.children[4].innerHTML = "Контакты";
    block.children[5].innerHTML = "Действия";
}