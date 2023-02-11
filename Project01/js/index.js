var products = [];
var shoppingCart = [];
window.onload = function () {
  var item1 = {
    ID: 1,
    Name: "Banana-MY",
    Description: "Banana from Malaysia",
    Price: 100,
    Image:
      "https://i0.wp.com/mrbanana.com.my/wp-content/uploads/2020/01/bananas.jpg",
  };

  var item2 = {
    ID: 2,
    Name: "Banana-Thailand",
    Description: "Banana from Thailand",
    Price: 200,
    Image: "https://cdn.shopify.com/s/files/1/0271/6634/3237/products/thai.png",
  };

  var item3 = {
    ID: 3,
    Name: "Banana-China",
    Description: "Banana from China",
    Price: 250,
    Image:"https://c8.alamy.com/comp/A9HPW9/chinese-banana-musa-cavendishii-banana-A9HPW9.jpg",
  };

  products = [item1, item2, item3];
  renderProducts();

  menuShop.onclick = function () {
    hideEveryDiv();
    document.getElementById("productsDisplay").style.display = "grid";
  };

  menuCart.onclick = function () {
    hideEveryDiv();
    renderShoppingCart();
    document.getElementById("cartDisplay").style.display = "unset";
  };

  menuAbout.onclick = function () {
    hideEveryDiv();
  };

  var modal = document.getElementById("itemModal");
  var close = document.getElementById("modalClose");

  close.onclick = function () {
    modal.style.display = "none";
  };
};

function hideEveryDiv() {
  document.getElementById("productsDisplay").style.display = "none";
  document.getElementById("cartDisplay").style.display = "none";
}

function renderProducts() {
  var productDiv = document.getElementById("productsDisplay");
  var itemRawHTML = "";
  for (var i = 0; i < products.length; i++) {
    itemRawHTML +=
      '<div id="item' +
      i +
      '" onclick="addItemToModal(' +
      products[i].ID +
      ')">';

    itemRawHTML +=
      '<img src="' + products[i].Image + '" width="150" height="150"/>';
    itemRawHTML += '<div class="productName">' + products[i].Name + "</div>";
    itemRawHTML +=
      '<div class="productDescription">' + products[i].Description + "</div>";
    itemRawHTML +=
      '<div class="productPrice">' + "RM " + products[i].Price + "</div>";
    itemRawHTML += "</div>";
  }
  productDiv.innerHTML = itemRawHTML;
}

function addToCart(itemID) {
  var existRecord = shoppingCart.filter((x) => x.id == itemID)[0];
  var input = document.getElementById("countInput");
  if (existRecord == undefined) {
    shoppingCart.push({ id: itemID, count: parseInt(input.value) });
  } else {
    existRecord.count += parseInt(input.value);
  }
  var modal = document.getElementById("itemModal");
  modal.style.display = "none";
}

function addItemToModal(itemID) {
  var modal = document.getElementById("itemModal");
  var modalBody = document.querySelector(".modal .modal-body");
  var rawHTML = "";

  var item = products.filter((x) => x.ID == itemID)[0];
  if (item == undefined) return false;
  else {
    rawHTML += '<div style="text-align:center">';
    rawHTML += '<img src="' + item.Image + '" width="250" height="250"/>';
    rawHTML += "<div>RM " + item.Price + "</div>";
    rawHTML += "</div>";
    rawHTML += "<br/>";
    rawHTML += "<br/>";
    rawHTML += '<div style="text-align:center">';
    rawHTML +=
      '<i onclick="countQTY(-1)" style="font-size: 30px" class="fa fa-minus-circle"></i>';
    rawHTML +=
      '<input value="1" id="countInput" disabled style="font-size: 30px;width: 50px;text-align: center;"/>';
    rawHTML +=
      '<i onclick="countQTY(1)" style="font-size: 30px" class="fa fa-plus-circle"></i>';
    rawHTML += "</div>";
    rawHTML += "<br/>";
    rawHTML += '<div style="text-align:center">';

    rawHTML +=
      '<button onclick="addToCart(' + item.ID + ')">Add to cart</button>';
    rawHTML += "</div>";
    modalBody.innerHTML = rawHTML;
  }

  modal.style.display = "unset";
}

function countQTY(number) {
  var input = document.getElementById("countInput");
  var inputValue = parseInt(input.value);
  input.value = inputValue + parseInt(number);
}

function renderShoppingCart() {
  var tableBody = document.querySelector("#tableCart tbody");
  var trRawHTML = "";
  for (var i = 0; i < shoppingCart.length; i++) {
    var thisCart = shoppingCart[i];
    var item = products.filter((x) => x.ID == thisCart.id)[0];

    trRawHTML += "<tr>";
    trRawHTML +=
      '<td><img width="250" height="250" src="' + item.Image + '"></td>';
    trRawHTML += "<td>" + item.Name + "</td>";
    trRawHTML += "<td>" + item.Price + "</td>";
    trRawHTML += "<td>" + thisCart.count + "</td>";
    trRawHTML += "<td>" + thisCart.count * item.Price + "</td>";
    trRawHTML += "</tr>";
  }

  tableBody.innerHTML = trRawHTML;
}
