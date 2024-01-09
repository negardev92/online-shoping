let allProducts = [
  {
    id: 1,
    title: "prodcut 1",
    price: 12,
    img: "Images/Album 1.png",
    count: 1,
  },
  { id: 2,
     title: "prodcut 2",
     price: 21,
     img: "Images/Album 2.png",
      count: 1 },
];

let userBasket = [];

const shopItemsContainer = document.querySelector(".shop-items");
const bastekProductsContainer = document.querySelector(".cart-items");
const removeAllProductsBtn = document.querySelector("#remove-all-products");
const cartTotalPriceElem = document.querySelector(".cart-total-price");

allProducts.forEach(function (product) {
  shopItemsContainer.insertAdjacentHTML(
    "beforeend",
    '<div class="shop-item"><span class="shop-item-title">' +
      product.title +
      '</span><img class="shop-item-image" src="' +
      product.img +
      '"><div class="shop-item-details"><span class="shop-item-price">' +
      product.price +
      '</span><button class="btn btn-primary shop-item-button" onclick="addProductToBasketArray(' +
      product.id +
      ')">ADD TO CART</button></div></div>'
  );
});

function addProductToBasketArray(productId) {
  console.log(productId);
  let mainProduct = allProducts.find(function (product) {
    return product.id === productId;
  });

  userBasket.push(mainProduct);
  console.log(userBasket);
  //fralkani basket
  basketProductsGenerator(userBasket);
  calcTotalPrice(userBasket);
}

function basketProductsGenerator(userBasketArray) {
  bastekProductsContainer.innerHTML = "";

  userBasketArray.forEach(function (product) {
    let basketProductContainer = document.createElement("div");
    basketProductContainer.classList.add("cart-row");

    let basketProductDetailsContainer = document.createElement("div");
    basketProductDetailsContainer.className = "cart-item cart-column";

    let basketProductImg = document.createElement("img");
    basketProductImg.setAttribute("src", product.img);
    basketProductImg.setAttribute("width", "100");
    basketProductImg.setAttribute("height", "100");
    basketProductImg.classList.add("cart-item-image");

    let basketProductTitleSpan = document.createElement("span");
    basketProductTitleSpan.classList.add("cart-item-title");
    basketProductTitleSpan.innerHTML = product.title;

    basketProductDetailsContainer.append(
      basketProductImg,
      basketProductTitleSpan
    );

    ///price basket
    let basketProductPriceSpan = document.createElement("span");
    basketProductPriceSpan.className = "cart-price cart-column";
    basketProductPriceSpan.innerHTML = product.price;
    //creat div
    let basketProductInputsContainer = document.createElement("div");
    basketProductInputsContainer.className = "cart-quantity cart-column";
    //creatinput
    let basketProductInput = document.createElement("input");
    basketProductInput.className = "cart-quantity-input";
    basketProductInput.value = product.count;
    basketProductInput.setAttribute("type", "number");
    basketProductInput.addEventListener("change", function () {
      updateProductCount(product.id, basketProductInput.value);
    });
    ///btn price-remove
    let basketProductRemoveBtn = document.createElement("button");
    basketProductRemoveBtn.className = "btn btn-danger";
    basketProductRemoveBtn.innerHTML = "Remove";
    basketProductRemoveBtn.addEventListener("click", function () {
      removeProductFromBasket(product.id);
    });
    //apend input-removebtn
    basketProductInputsContainer.append(
      basketProductInput,
      basketProductRemoveBtn
    );

    basketProductContainer.append(
      basketProductDetailsContainer,
      basketProductPriceSpan,
      basketProductInputsContainer
    );
    ///apend to basket all child
    bastekProductsContainer.append(basketProductContainer);
  });
}
function removeProductFromBasket(productId) {
  userBasket = userBasket.filter(function (product) {
    console.log(productId);
    return product.id !== productId;
  });

  basketProductsGenerator(userBasket);
}

removeAllProductsBtn.addEventListener("click", function () {
  userBasket = [];
  basketProductsGenerator(userBasket);
});
function calcTotalPrice(userBasketArray) {
  let totalPriceValue = 0;

  userBasketArray.forEach(function (product) {
    totalPriceValue += product.count * product.price;
  });

  cartTotalPriceElem.innerHTML = totalPriceValue;
}
function updateProductCount(productId, newCount) {
  console.log("product id: " + productId + " new count: " + newCount);

  userBasket.forEach(function (product) {
    if (product.id === productId) {
      product.count = newCount;
    }
  });
  calcTotalPrice(userBasket);
}
