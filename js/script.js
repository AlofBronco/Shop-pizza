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
  let currentButton = document.querySelector(`#dot${currentIndex}`);
  currentButton.classList.remove("dot-active");

  currentIndex = (currentIndex + 1) % carouselItems.length;

  let afterButton = document.querySelector(`#dot${currentIndex}`);
  afterButton.classList.add("dot-active");

  updateCarousel();
}

function updateCarousel() {
  const translateValue = -currentIndex * 100;
  carouselContainer.style.transform = `translateX(${translateValue}%)`;
}

setInterval(nextSlide, 7000);

updateCarousel();

// JQUERY CODE =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

$(document).ready(function () {
  $(".button-group").on("click", ".button", function () {
    let item = $(this).closest(".item");

    let parentGroup = $(this).closest(".button-group");
    $(".button", parentGroup, item).removeClass("button-active");

    $(this).addClass("button-active");
  });

  $(".button-largest").on("click", function () {
    let item = $(this).closest(".item");

    $(".button-fluff", item).removeClass("button-active");

    let parentGroup = $(this).closest(".button-group");
    $(".button", parentGroup, item).removeClass("button-active");

    $(".button-fluff", item).css("cursor", "not-allowed");
    $(".button-fluff", item).prop("disabled", true);

    if (!$(".button-fluff", item).hasClass("button-active")) {
      $(".button", item).removeClass("button-active");
      $(".button-thin", item).addClass("button-active");
    }
  });

  $(".button-smaller").on("click", function () {
    let item = $(this).closest(".item");
    $(".button-fluff", item).prop("disabled", false);
    $(".button-fluff", item).css("cursor", "pointer");

    $(".button", item).removeClass("button-active");
    $(".button-fluff", item).addClass("button-active");
  });

  $(".dot").on("click", function () {
    let dotId = $(this).attr("id");
    let dotNum = parseInt(dotId[dotId.length - 1]);

    let currentButton = document.querySelector(`#dot${currentIndex}`);
    currentButton.classList.remove("dot-active");

    currentIndex = (dotNum + 6) % carouselItems.length;
    nextSlide();
  });
});

// JQUERY CODE =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
