import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase,
         push,
         ref,
         remove,
         onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
const firebaseConfig = {
    databaseURL : "https://tracker11111-18e9c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
let referenceInDB = ref(database, "TRACKER")

onValue(referenceInDB, function(snapshot) {
    if (snapshot.exists()){
        console.log("It exists")
        let value = Object.values(snapshot.val())
        // renders(value)
    } else {
        console.log("fck you")
    }
  });
const ulEl = document.getElementById("ul-el")
const inputEl = document.getElementById("input-el")
let inputArray = []
let storage = JSON.parse(localStorage.getItem("TRACKER"))
if (storage) {
    inputArray = storage
}
document.getElementById("input-btn").addEventListener("click", function() {
    if (inputEl.value !== "") {
        inputArray.push(inputEl.value)
        localStorage.setItem("TRACKER", JSON.stringify(inputArray))
        renders(inputArray)
        push(referenceInDB, inputEl.value)
    }
    inputEl.value = ""
})
function renders(render) {
    let content = ""
    for (let i = 0; i < render.length; i++) {
    content += 
    `
        <li>
            <a href="${render[i]}" target="_blank">
                ${render[i]}
            </a>
        </li>
    `
    }
    ulEl.innerHTML = content
}
renders(inputArray)
document.getElementById("delete-btn").addEventListener("dblclick",function() {
    localStorage.clear()
    // remove(referenceInDB)
    ulEl.innerHTML = ""
    inputArray = []
})
document.getElementById("tab-btn").addEventListener("click", function() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        inputArray.push(tabs[0].url)
        renders(inputArray)
        localStorage.setItem("TRACKER", JSON.stringify(inputArray))
    })
})