const listElement = document.getElementById("list")
const messageElement = document.getElementById("message")
const txtItemElement = document.getElementById("txtItem")
var listItems = [];
loadData();

function displayListItems() {
    let text = "";
    for (let i = 0; i < listItems.length; i++) {
        text += `<li>${listItems[i]}<button onclick='remove(${i})'>x</button></li>`;
    }
    listElement.innerHTML = text;
    localStorage.setItem("ToDoList",JSON.stringify(listItems))
}

function showMessage(text) {
    messageElement.innerHTML = text;
    setTimeout(() => { messageElement.innerHTML = ""; }, 3000);
}


function loadData() {
    try {
        let savedData = JSON.parse(localStorage.getItem("ToDoList"));
        if (savedData && Array.isArray(savedData)) {
            listItems = savedData;
        }
        else {
            showMessage("Data Not found")
        }
        displayListItems();
    }
    catch (ex) {
        showMessage("Error on loading Data")
    }
}

function clearAll() {
    listItems = []
    displayListItems()
}


function addItem() {
    listItems.push(txtItemElement.value);
    displayListItems();
    txtItemElement.value = "";
}

function remove(index) {
    listItems.splice(index, 1)
    displayListItems()
}