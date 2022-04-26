const submitBtn = document.querySelector(".submit-btn");
const formName = document.getElementById("name");
const formDate = document.getElementById("date");
const formAmount = document.getElementById("amount");
const form = document.getElementById("form");
const expenses = document.querySelector("#expenses");
let items = [];

function createButtonsHandler() {
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");

  return editBtn;
}

function writeItemObj(name, date, amount, id) {
  items.push({
    name,
    date,
    amount,
    id,
  });
  return items;
}

function writeToShow(name, date, amount, id) {
  expenses.innerHTML += `
<div class="expense" id="${id}">
  <div class="edit-input hide">
    <input type="text" class="edit-input-list-btn"/>
    <button class="edit-to-list-btn">Salvar</button>
  </div>
  <div class="item">
      <div class="expense-name">
        <h4>${name}</h4>
      </div>

      <div class="expense-date">
        <h4>${date}</h4>
      </div>

      <div class="expense-amount">
        <h4>R$ ${amount}</h4>
      </div> 
      <div class="expense-labels">
        <h4>Food</h4>
      </div> 
    <button class="del-btn">Deletar</button>
    <button class="edit-btn">Editar</button>
  </div>
</div>`;
}

function editItemFromList() {
  const getItems = document.querySelector("#expenses");

  getItems.addEventListener("click", (event) => {
    //getItems.innerHTML = `
    //<input type="text" class="edit-from-list"/>
    //<button class="edit-from-list-btn">Salvar</button>

    //`;
    const getButton = event.target;
    if (getButton.className === "edit-btn") {
      getButton.parentNode.classList.add("hide");
      getButton.parentNode.previousElementSibling.classList.remove("hide");

      //let newExpenseName = document.querySelector(".edit-input").value;
      //let index = items.findIndex(
      //  (element) => element.id === getButton.previousElementSibling.id
      //);
      //items[index].name = newExpenseName;
    }

    if (getButton.className === "edit-to-list-btn") {
      getButton.parentNode.nextElementSibling.classList.remove("hide");
      getButton.parentNode.classList.add("hide");

      let newExpenseName = getButton.parentNode.firstElementChild.value;

      console.log(getButton.parentNode.nextElementSibling.firstElementChild);
      getButton.parentNode.nextElementSibling.firstElementChild.innerHTML = `
        <h4>${newExpenseName}</h4>
      `;

      getButton.parentNode.firstElementChild.value = "";

      let index = items.findIndex(
        (element) => element.id === getButton.parentNode.parentNode.id
      );
      items[index].name = newExpenseName;
    }
  });
}

function deleteItemFromList() {
  const getItems = document.querySelector("#expenses");

  getItems.addEventListener("click", (event) => {
    const getButton = event.target;
    if (getButton.className === "del-btn") {
      let index = items.findIndex(
        (element) => element.id === getButton.parentNode.id
      );

      console.log(getButton.parentNode);
      console.log(getButton.parentNode.parentNode);

      items.splice(index, 1);
      getButton.parentNode.parentNode.remove();
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

  let id = "id" + Math.random().toString(16).slice(2);

  writeItemObj(name, date, amount, id);
  writeToShow(name, date, amount, id);

  form.reset();
}

editItemFromList();
deleteItemFromList();
submitBtn.addEventListener("click", getFormValues);
