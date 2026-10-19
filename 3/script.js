const counterElement = document.getElementById("counter");
const messageElement = document.getElementById("message");
var counter = 10;
loadCount();

document.getElementById("btnPlus").addEventListener("click",increaseCount)
document.getElementById("btnMinus").addEventListener("click",decreaseCount)
document.getElementById("btnReset").addEventListener("click",resetCount)
document.getElementById("btnSave").addEventListener("click",saveCount)
document.getElementById("btnLoad").addEventListener("click",loadCount)

function showMessage(text){
    messageElement.innerHTML = text;
    setTimeout(()=>{ messageElement.innerHTML = ""; },4000);
}

function increaseCount() {
    counter++;
    counterElement.innerHTML = counter;
}

function decreaseCount() {
    counter--;
    if(counter < 0)
        counter = 0
    counterElement.innerHTML = counter;
}

function resetCount() {
    counter = 0;
    counterElement.innerHTML = counter;
}

function saveCount() {
    localStorage.setItem("counter", counter);
    showMessage("Saved!")
}

function loadCount() {
    let savedData = localStorage.getItem("counter");
    if (savedData) {
        counter = Number(savedData);
        counterElement.innerHTML = counter;
        showMessage("Loaded!");
    }
    else{
        showMessage("No data found!")
    }
}