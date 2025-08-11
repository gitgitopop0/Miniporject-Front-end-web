const hamIcon = document.getElementById("hamIcon");
const mobilemenu = document.getElementById("mobileMenu");

hamIcon.addEventListener("click", () => {
  if( mobilemenu.style.display === "block"){
    mobilemenu.style.display = "none";
  }else{
    mobilemenu.style.display = "block";
  }
});

function myFunction(hamIcon) {
  hamIcon.classList.toggle("change");
}


const cartContainer = document.querySelector(".con-mycard");
const totalPriceElement = document.querySelector(".card-buy p");

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;

    let div = document.createElement("div");
    div.classList.add("my-card");

    div.innerHTML = `
      <div class="my-card-info">
          <img src="${item.img}" alt="${item.name}" />
          <div class="main-info">
              <h3>${item.name}</h3>
              <p>${item.price} THB</p>
          </div>
      </div>
      <div class="num">
          <div class="lob"><p class="btn-decrease" data-id="${item.id}">-</p></div>
          <h3>${item.qty}</h3>
          <div class="bog"><p class="btn-increase" data-id="${item.id}">+</p></div>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  totalPriceElement.textContent = `ยอดรวม ${total} ฿`;

  addEventListenersToButtons();
}

function addEventListenersToButtons() {
  document.querySelectorAll(".btn-increase").forEach((btn) => {
    btn.onclick = () => {
      let id = parseInt(btn.dataset.id);
      changeQty(id, 1);
    };
  });

  document.querySelectorAll(".btn-decrease").forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = parseInt(btn.dataset.id);
      changeQty(id, -1);
    });
  });
}

function changeQty(id, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find((i) => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty < 1) {
    cart = cart.filter((i) => i.id !== id);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.querySelector(".buy").addEventListener("click", () => {
  alert("ขอบคุณสำหรับการสั่งซื้อ!");
  localStorage.removeItem("cart");
  renderCart();
});

document.addEventListener("DOMContentLoaded", renderCart);