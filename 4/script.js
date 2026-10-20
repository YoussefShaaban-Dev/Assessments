const listElement = document.getElementById("list")
const messageElement = document.getElementById("message")
const txtItemElement = document.getElementById("txtItem")
const newItemCheckElement = document.getElementById("newItemCheck");
var listItems = [];
var newItemChecked = false;
let isDark = false;
loadData();

(function () {
    txtItemElement.addEventListener("keydown", function (event) {
        if (event.code == "Enter")
            addItem()

        alert(JSON.stringify(event))
    });

    /* Get Dark mode */
    const savedDarkMode = localStorage.getItem("dark-mode")
    console.log(savedDarkMode)
    if (savedDarkMode) {
        isDark = savedDarkMode == 1;
    }
    else {
        const darkModeMql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
        if (darkModeMql && darkModeMql.matches)
            isDark = false;
        else
            isDark = true
    }
    switchLightDark()
})()

function displayListItems() {
    let text = "";
    for (let i = 0; i < listItems.length; i++) {
        text += `<li class='item ${listItems[i].checked ? "checked" : ""}'><div ` + (listItems[i].checked ? "" : `onclick="completeItem(${i})"`) + `><i class="fa fa-check"></i>
                </div><span>${listItems[i].item}</span> <i class="fa fa-times" onclick='remove(${i})'></i></li>`;
    }
    listElement.innerHTML = text;
    localStorage.setItem("ToDoList", JSON.stringify(listItems))
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
    const value = txtItemElement.value;
    if (value) {
        listItems.push({ item: value, checked: newItemChecked });
        displayListItems();
        txtItemElement.value = "";
        switchNewItem(false)
        console.log(`New item added: ${value}`)
    }
}

function remove(index) {
    listItems.splice(index, 1)
    displayListItems()
}

function switchNewItem(value) {
    if (value != undefined)
        newItemChecked = value
    else
        newItemChecked = !newItemChecked;

    console.log(newItemChecked)
    if (newItemChecked)
        newItemCheckElement.classList.add("checked");
    else
        newItemCheckElement.classList.remove("checked")

}

function inputItem(event) {
    console.log(event)
}

function completeItem(index) {
    if (index >= 0 && index < listItems.length) {
        const item = listItems[index];
        item.checked = true;
        displayListItems();
    }
}

function switchLightDark(value = null) {
    if (value != null)
        isDark = value
    else
        isDark = !isDark;

    document.body.style.colorScheme = isDark ? "dark" : "light"
    localStorage.setItem("dark-mode", (isDark?2:1))
}