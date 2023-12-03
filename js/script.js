function itemCreator() {
  window.location.href = "../html/pizza-creator.html";
}

function miniGame() {
  window.location.href = "../html/minigame.html";
}

// ITEM SLIDER: DO NOT TOUCH SOMETHING, BECAUSE IT CAN BREAKE

const carouselContainer = document.querySelector(".slider");
const carouselItems = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

function nextSlide() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
}

function updateCarousel() {
  const translateValue = -currentIndex * 100;
  carouselContainer.style.transform = `translateX(${translateValue}%)`;
}

setInterval(nextSlide, 7000);

updateCarousel();
