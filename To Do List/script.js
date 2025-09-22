const ITEM_CONTAINER = document.getElementById("items");
const ITEM_TEMPLATE = document.querySelector(".item-template");
const ADD_BUTTON = document.getElementById("add");
const CLEAR_BUTTON = document.getElementById("clear");
const DELETE_BUTTON = document.getElementById("delete");

function deleteItem(){
    items.pop();
    setItems(items);
    refreshList();
}



function clearCompletedItems(){
    items = items.filter(i => !i.completed);
    setItems(items);
    refreshList();
}

function addItem(){
    items.unshift({description: "", completed: false});
    setItems(items);
    refreshList();
}

function setItems(newItems) {
    items = newItems;
    saveItems(items);
}

let items = getItems();
refreshList();

function getItems() {
    const items = JSON.parse(localStorage.getItem("todo-items")) || [];
    return items;
}

function saveItems(items) {
    localStorage.setItem("todo-items", JSON.stringify(items));
}

function updateItem(item, key, value) {
    item[key] = value;
    setItems(items);
    refreshList();
}

function refreshList() {

    items.sort((a, b) => {
        if (a.completed)
            return 1;
        if (b.completed)
            return -1;

        return a.description < b.description ? -1 : 1;
    });

    ITEM_CONTAINER.innerHTML = " ";
    for (const item of items) {
        const itemElement = ITEM_TEMPLATE.content.cloneNode(true);
        const checkbox = itemElement.querySelector(".item-completed");
        const description = itemElement.querySelector(".item-description");
    
        checkbox.checked = item.completed;
        description.value = item.description;

        description.addEventListener("change", () => {
            updateItem(item, "description", description.value);
        });

        checkbox.addEventListener("change", () => {
            updateItem(item, "completed", checkbox.checked);
        });

        ITEM_CONTAINER.appendChild(itemElement);
    }

ADD_BUTTON.addEventListener("click", addItem);
CLEAR_BUTTON.addEventListener("click", clearCompletedItems);
DELETE_BUTTON.addEventListener("click", deleteItem);
}