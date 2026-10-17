document.addEventListener("DOMContentLoaded", (event) => {
    fetch("data.json")
    .then((data)=>{console.log(data)})
});