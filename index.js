const submitBtn = document.querySelector(".submit-btn");
const formName = document.getElementById("name");
const formDate = document.getElementById("date");
const formAmount = document.getElementById("amount");
const form = document.getElementById("form");
const expenses = document.querySelector("#expenses");
let items = [];
let labels = [];

function writeListItemLabels(label, color) {
  labels.push({
    label,
    color,
  });
  return labels;
}

function writeListItemObject(name, date, amount, id) {
  items.push({
    name,
    date,
    amount,
    id,
  });
  return items;
}

function writeToShow(name, date, amount, id) {
  expenses.innerHTML += `<div class="expense" id="${id}">
<div class="edit-input hide">
<input type="text" class="edit-input-list-btn"/>
<button class="edit-to-list-btn">Salvar</button>
</div>
<div class="item">
<div class="expense-name">
<h4>${name}</h4>
</div>
<div class="expense-amount">
<h4>R$ ${amount}</h4>
</div> 
<div class="expense-date">
<h4>${date}</h4>
</div>
<select class="expense-labels">
<option class="item-label">Food</option>
<input class="insert-label" type="text" placeholder="new label"/>
<button class="add-new-label">add</button>
<button class="del-new-label">add</button>
</select> 
<button class="del-btn">Deletar</button>
<button class="edit-btn">Editar</button>
</div>
</div>`;
}

function addNewLabelToList() {
  const getItems = document.querySelector("#expenses");

  getItems.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.className === "add-new-label") {
      let getInputValue = clickedElement.previousElementSibling.value;
      let newOption = new Option(getInputValue, getInputValue);

      clickedElement.parentNode
        .querySelector(".expense-labels")
        .appendChild(newOption);
      clickedElement.previousElementSibling.value = "";
    }
  });

  getItems.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.className === "del-new-label") {
      //let getInputValue = clickedElement.previousElementSibling.previousElementSibling.value;
      //let newOption = new Option(getInputValue, getInputValue);

      console.log(
        clickedElement.previousElementSibling.previousElementSibling.value
      );

      //clickedElement.parentNode
      //  .querySelector(".expense-labels")
      //  .appendChild(newOption);
      //clickedElement.previousElementSibling.previousElementSibling.value = "";
    }
  });
}

function editItemFromList() {
  const getItems = document.querySelector("#expenses");

  getItems.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.className === "edit-btn") {
      clickedElement.parentNode.classList.add("hide");
      clickedElement.parentNode.previousElementSibling.classList.remove("hide");
    }

    if (clickedElement.className === "edit-to-list-btn") {
      clickedElement.parentNode.nextElementSibling.classList.remove("hide");
      clickedElement.parentNode.classList.add("hide");

      let newExpenseName = clickedElement.parentNode.firstElementChild.value;

      clickedElement.parentNode.nextElementSibling.firstElementChild.innerHTML = `
        <h4>${newExpenseName}</h4>
      `;

      clickedElement.parentNode.firstElementChild.value = "";

      let index = items.findIndex(
        (element) => element.id === clickedElement.parentNode.parentNode.id
      );
      items[index].name = newExpenseName;
    }
  });
}

function deleteItemFromList() {
  const getItems = document.querySelector("#expenses");

  getItems.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.className === "del-btn") {
      let index = items.findIndex(
        (element) => element.id === clickedElement.parentNode.id
      );

      console.log(clickedElement.parentNode);
      console.log(clickedElement.parentNode.parentNode);

      items.splice(index, 1);
      clickedElement.parentNode.parentNode.remove();
    }
  });
}

function getFormValues(e) {
  e.preventDefault();
  const name = formName.value;
  const date = formDate.value;
  const amount = formAmount.value;

  if (name == "") {
    form.reset();
    return alert("Insert a valid name");
  }

  if (isNaN(amount) || amount == "") {
    form.reset();
    return alert("Insert a valid number");
  }

  // Generate random ID to each List Item
  let id = "id" + Math.random().toString(16).slice(2);

  writeListItemObject(name, date, amount, id);
  writeToShow(name, date, amount, id);

  form.reset();
}

addNewLabelToList();
editItemFromList();
deleteItemFromList();
submitBtn.addEventListener("click", getFormValues);
