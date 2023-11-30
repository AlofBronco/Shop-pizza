//FOR SELECTORS!!!
let modal = document.querySelector(".modal");
let grid = document.querySelector(".grid");
let counter = 0;

//FOR SELECTORS!!!

function goBack() {
  window.location.href = "../html/index.html";
}

function showModal() {
  modal.style.display = "flex";
}

function modalHide() {
  modal.style.display = "none";
}

function uploadItem() {
  document.querySelector(".button-80").removeAttribute("onclick");
  document.querySelector(".button-80").setAttribute("onclick", "uploadItem();");

  counter++;

  let title = document.querySelector("#title");
  let price = document.querySelector("#price");
  let image = document.querySelector("#fileInput");
  let main = document.querySelector("main");

  let itemTitle = document.createElement("h1");
  itemTitle.textContent = title.value;

  let itemPrice = document.createElement("h2"); //CHANGE TO <P> IF NEEDED
  itemPrice.textContent = price.value;

  let itemImage = document.createElement("img");
  if (image.files[0]) {
    itemImage.src = URL.createObjectURL(image.files[0]);
  } else {
    console.error("No file selected");
  }

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Item";
  deleteButton.className = "delete-button";
  deleteButton.setAttribute("onclick", "deleteItem();");

  if (title.value == "" || price.value == "" || !image.files[0]) {
    alert("There is No Data");
    return;
  }

  let itemHolder = document.createElement("div");
  itemHolder.className = "item item" + counter;

  itemHolder.append(itemImage, itemTitle, itemPrice, deleteButton);

  grid.append(itemHolder);

  modal.style.display = "none";
  title.value = "";
  price.value = "";
  image.value = "";
}

function removeText() {
  document.querySelector(".positioning").remove();
}

function deleteItem() {
  var parentDiv = document.querySelector(".item");

  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }

  parentDiv.parentNode.removeChild(parentDiv);
}
