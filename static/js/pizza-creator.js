// JQUERY CODE =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
$(document).ready(function () {
  $(".button-group").on("click", ".your-pizza-button", function () {
    let parentGroup = $(this).closest(".button-group");
    $(".your-pizza-button", parentGroup).removeClass("button-active");

    $(this).addClass("button-active");
  });

  $(".button-largest").on("click", function () {
    $(".button-fluff").removeClass("button-active");

    let parentGroup = $(this).closest(".button-group");
    $(".your-pizza-button", parentGroup).removeClass("button-active");

    $(".button-fluff").css("cursor", "not-allowed");
    $(".button-fluff").prop("disabled", true);

    if (!$(".button-fluff").hasClass("button-active")) {
      $(".your-pizza-button").removeClass("button-active");
      $(".button-thin").addClass("button-active");
    }
  });

  $(".button-smaller").on("click", function () {
    $(".button-fluff").prop("disabled", false);
    $(".button-fluff").css("cursor", "pointer");

    $(".your-pizza-button").removeClass("button-active");
    $(".button-fluff").addClass("button-active");
  });

  $(".ingredient-button").on("click", function () {
    $(".ingredient-button").removeClass("ingredient-active");

    $(this).addClass("ingredient-active");
  });

  $(".plus").on("click", function () {
    var counterValue = parseInt($(".ingredient-number").text());

    if (counterValue == 2) {
      $(".plus").css("cursor", "not-allowed");

      return;
    } else {
      $(".plus").css("cursor", "pointer");
    }

    counterValue++;

    $(".ingredient-number").text(counterValue);
  });

  $(".minus").on("click", function () {
    var counterValue = parseInt($(".ingredient-number").text());

    if (counterValue == 0) {
      $(".minus").css("cursor", "not-allowed");

      return;
    } else {
      $(".minus").css("cursor", "pointer");
    }

    counterValue--;

    $(".ingredient-number").text(counterValue);
  });
});

// JQUERY CODE =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
