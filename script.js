import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https:www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL:
    "https://realtime-database-d-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "Shoppinglist");

const shoppingList = document.getElementById("shopping-list");

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let shoppingArray = Object.entries(snapshot.val());
    console.log(snapshot.val());
    clearShopping();
    for (let i = 0; i < shoppingArray.length; i++) {
      let currentItem = shoppingArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      // console.log(shoppingArray[i]);
      appendItemTo(currentItem);
    }
  } else {
    shoppingList.innerHTML = "No items here yet";
  }
});

function clearShopping() {
  shoppingList.innerHTML = "";
}
// const newItem = {
//   name: "Banana",
//   quantity: 5,
// // };

// const newItemRef = push(shoppingListInDB, newItem);

const buyButton = document.getElementById("add-button");
const inputBox = document.getElementById("input-field");

buyButton.addEventListener("click", function () {
  let inputValue = inputBox.value;
  // console.log("hello");
  push(shoppingListInDB, inputValue);
  clearInputField();
  // appendItemTo(inputValue); This is now appendItemTo(shoppingArray[i])
  // console.log(inputValue);
});

function clearInputField() {
  inputBox.value = "";
}

function appendItemTo(item) {
  let itemID = item[0];
  let itemValue = item[1];
  // shoppingList.innerHTML += `<li>${itemValue}</li>`;
  let newEl = document.createElement("li");
  newEl.setAttribute("class", "listI");
  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", function () {
    let dataLocation = ref(database, `Shoppinglist/${itemID}`);
    // console.log(itemID);
    remove(dataLocation);
  });
  shoppingList.appendChild(newEl);

  console.log(itemID);
}
