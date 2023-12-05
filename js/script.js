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

// JQUERY CODE =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

$(document).ready(function () {
  $(".button-group").on("click", ".button", function () {
    let parentGroup = $(this).closest(".button-group");
    $(".button", parentGroup).removeClass("button-active");

    $(this).addClass("button-active");
  });

  $(".button-largest").on("click", function () {
    $(".button-fluff").removeClass("button-active");

    let parentGroup = $(this).closest(".button-group");
    $(".button", parentGroup).removeClass("button-active");

    $(".button-fluff").css("cursor", "not-allowed");
    $(".button-fluff").prop("disabled", true);

    if (!$(".button-fluff").hasClass("button-active")) {
      $(".button").removeClass("button-active");
      $(".button-thin").addClass("button-active");
    }
  });

  $(".button-smaller").on("click", function () {
    $(".button-fluff").prop("disabled", false);
    $(".button-fluff").css("cursor", "pointer");

    $(".button").removeClass("button-active");
    $(".button-fluff").addClass("button-active");
  });
});

// JQUERY CODE =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
