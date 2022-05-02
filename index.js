const submitBtn = document.querySelector(".submit-btn");
const formName = document.getElementById("name");
const formDate = document.getElementById("date");
const formAmount = document.getElementById("amount");
const form = document.getElementById("form");
const expenses = document.querySelector("#expenses");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

let items = [];
let labels = [];

function writeListItemLabels(label, color) {
  labels.push({
    label,
    color,
  });
  return labels;
}

function writeToShow(items) {
  expenses.innerHTML = "";

  items.forEach((item) => {
    expenses.innerHTML += `
<div class="expense" id="${item.info.id}">
  <div class="item">
    <div class="expense-name">
      <h4>${item.info.name}</h4>
      </div>
      <div class="expense-amount">
      <h4>R$ ${item.info.amount}</h4>
      </div>
      <div class="expense-date">
      <h4>${item.info.date}</h4>
    </div>
  <button class="del-btn">Deletar</button>
  <button class="open-modal">Editar</button>
  </div>
</div>`;
  });
}

function renderItemOnModal(obj) {
  let { name, date, amount, id } = obj;

  console.log(obj);

  modalContent.innerHTML += `
  <div class="modal-wrapper">
    <div class="expense-item" id=${id}>
      <div class="expense__name">
      <p>Name:</p>
      <span class="dClickName">${name}</span>
      </div>

      <div class="expense__amount">
      <p>Amount:</p>
      <span class="dClickAmount" >${amount}</span>
      </div>

  
      <div class="expense__date">
      <p>Date:</p>
      <span class="dClickDate"">${date}</span>
      </div>

      <button class="save-changes">Save</button>
   
    </div>


    <div class="expense-labels">
      <select class="expense-labels">
        <option class="item-label"></option>
        <input class="insert-label" type="text" placeholder="new label"/>
        <button class="add-new-label">Add</button>
        <button class="del-new-label">Delete</button>
      </select> 
    </div>
  </div>
  `;

  return modalContent;
}

function hideModal() {
  const closeModal = document.querySelector(".close-modal");

  modal.addEventListener("click", (event) => {
    let clickedElement = event.target;
    if (clickedElement.className === closeModal.className) {
      modalContent.innerHTML = ``;
      modal.classList.toggle("hide");
    }
  });
}

function addNewLabelToList() {
  modalContent.addEventListener("click", (event) => {
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

  modalContent.addEventListener("click", (event) => {
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

function sendItemObjectToModal() {
  expenses.addEventListener("click", (event) => {
    const clickedElement = event.target;

    if (clickedElement.className === "open-modal") {
      modal.classList.toggle("hide");

      let itemId = clickedElement.parentNode.parentNode.id;

      //let index = items.findIndex((element) => element.info.id === itemId);

      //console.log(index);
      //console.log(items);

      //console.log(items.findIndex((element) => element.info.id === "0"));

      items.forEach((item) =>
        item.info.id === itemId
          ? renderItemOnModal(item.info)
          : console.log("nop")
      );

      //renderItemOnModal(items.info.id[index]);

      //console.log(teste);

      //let toggleLabelButton = document.querySelector(".edit-btn");
      //toggleLabelButton.classList.remove("hide");

      //clickedElement.parentNode.classList.add("hide");
      //clickedElement.parentNode.previousElementSibling.classList.remove("hide");
    }
  });
}

function deleteItemFromList() {
  expenses.addEventListener("click", (event) => {
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

function doubleClickToEdit() {
  modalContent.addEventListener("dblclick", (event) => {
    const clickedElement = event.target;
    const storeOldElement = event.target.parentNode.parentNode;

    let index = items.findIndex((element) => element.id === storeOldElement.id);

    if (index >= 0) {
      let { name, date, amount } = items[index];

      if (clickedElement.className === "dClickName") {
        const getParentElement = clickedElement.parentNode;
        getParentElement.innerHTML = `
        <input type="text"  id="input-value" value="${name}">
        `;
      }

      if (clickedElement.className === "dClickDate") {
        const getParentElement = clickedElement.parentNode;
        getParentElement.innerHTML = `
        <input type="text" id="input-date" value="${date}">
        `;
      }

      if (clickedElement.className === "dClickAmount") {
        const getParentElement = clickedElement.parentNode;
        getParentElement.innerHTML = `
        <input type="text" id="input-amount" value="${amount}">
        `;
      }
    }
  });

  modalContent.addEventListener("click", (event) => {
    const clickedElement = event.target;
    const storeOldElement = event.target.parentNode.parentNode;

    if (clickedElement.className === "save-changes") {
      let nameValue;
      let dateValue;
      let amountValue;
      let findIndex = items.findIndex(
        (element) => element.id === clickedElement.parentNode.id
      );

      if (clickedElement.parentNode.querySelector(".expense__name input")) {
        nameValue = clickedElement.parentNode.querySelector(
          ".expense__name input"
        ).value;
      }

      if (clickedElement.parentNode.querySelector(".expense__date input")) {
        dateValue = clickedElement.parentNode.querySelector(
          ".expense__date input"
        ).value;
      }

      if (clickedElement.parentNode.querySelector(".expense__amount input")) {
        amountValue = clickedElement.parentNode.querySelector(
          ".expense__amount input"
        ).value;
      }
      console.log(items[findIndex].name);

      if (nameValue) items[findIndex].name = nameValue;
      if (dateValue) items[findIndex].name = dateValue;
      if (amountValue) items[findIndex].name = amountValue;

      console.log(items);
    }
  });
}

function getFormValues(e) {
  e.preventDefault();
  const name = formName.value;
  let date = formDate.value;
  const amount = formAmount.value;
  const color = "red";

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

  if (date === "") date = "00-00-0000";

  const newItem = {
    info: {
      name,
      date,
      amount,
      id,
      label: {
        color: "red",
        labels: ["comida", "carro"],
      },
    },
  };

  items.push(newItem);
  writeToShow(items);

  form.reset();
}

sendItemObjectToModal();
doubleClickToEdit();
hideModal();
addNewLabelToList();
deleteItemFromList();
submitBtn.addEventListener("click", getFormValues);
