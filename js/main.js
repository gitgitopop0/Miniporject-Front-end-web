let slideIndex = 1;

function currentSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("myslides");

    if(n>slides.length){
        slideIndex=1;
    }
    if(n<1){
        slideIndex=slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

showSlides(slideIndex);

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

let foodmenu = [{
  id:1,
  img:'img/audrey-langlois-O7sxXNvZPZg-unsplash.jpg',
  name: 'ส้มตำ',
  price: 80,
  type: 'yam'

} , {
   id:2,
  img:'img/john-aledia-YiBV-s9nZfQ-unsplash.jpg',
  name: 'ผัดไท',
  price: 85,
  type: 'pad'
} ,{
   id:3,
  img:'img/max-griss-otLqpb9LK70-unsplash.jpg',
  name: 'ข้าวซอย',
  price: 60,
  type: 'sup'
} ,{
   id:4,
  img:'img/selasie-apeadu-v7RqUKFdZ0A-unsplash.jpg',
  name: 'ทอดปลา',
  price: 50,
  type: 'pad'
}];

let foodContainer = document.getElementById("foodcontainer");
let card = document.getElementById("card-main");
let cardImg = document.querySelector(".card-img img");
let cardName = document.querySelector(".card-info h3:first-child");
let cardDesc = document.querySelector(".card-info h3:last-child");
let exit = document.getElementById("exit");

function searchpro(param) {
  console.log(param);
  let foodItem =document.querySelectorAll(".food-menu");

  foodItem.forEach(item => {
    if(param === "all"){
      item.style.display = "block";
    }else{
      if(item.classList.contains(param)){
        item.style.display = "block";
      }else{
        item.style.display = "none";
      }
    }
  });

}

let btnAddToCart = document.getElementById("btnAddToCart");

let currentItem = null;

foodmenu.forEach((item) => {
  let foodDiv = document.createElement("div");
  foodDiv.classList.add("food-menu");
  foodDiv.classList.add(item.type);

  foodDiv.innerHTML = `
    <img src="${item.img}" alt="${item.name}" />
    <h2>${item.name}</h2>
    <h2 class="price">${item.price} THB</h2>
  `;

  foodDiv.addEventListener("click", () => {
    currentItem = item;
    cardImg.src = item.img;
    cardName.textContent = item.name;
    cardDesc.textContent = `ราคา ${item.price} ฿`;
    card.style.display = "block";
  });

  foodContainer.appendChild(foodDiv);
});

exit.addEventListener("click", () => {
  card.style.display = "none";
});

btnAddToCart.addEventListener("click", () => {
  if (!currentItem) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let found = cart.find((i) => i.id === currentItem.id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...currentItem, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(currentItem.name + " ถูกเพิ่มลงในตะกร้าแล้ว");
  card.style.display = "none";
});

let ourdercon = document.getElementById("ourder");

let ourderFood = [{
  id:1,
  img:"img/duong-ngan-l_T_qXBauO8-unsplash.jpg",
  name:"เซท ต้มยำ",
  info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, exercitationem?"
}, {
  id:2,
  img:"img/vicky-ng-NT5oqzp-050-unsplash.jpg",
  name:"เซท ผัดกระเพา",
  info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, exercitationem?"
}, {
  id:3,
  img:"img/thavatchai-samui-Ec3-1H0k3qY-unsplash.jpg",
  name:"เซท ปลาทอด",
  info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, exercitationem?"
}];

ourderFood.forEach((item)  => {
  let foodDiv = document.createElement("div");
  foodDiv.classList.add("ourder-main");
  foodDiv.innerHTML =`
    <img src="${item.img}">
    <h3>${item.name}</h3>
    <p>${item.info}</p>
    <p class="reads"><a href="">Read More</a></p>
  `;

  ourdercon.appendChild(foodDiv);
});

