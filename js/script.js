$(document).ready(function () {
  $("#button-header").on("click", function () {
    $(".modal").css("display", "flex");
  });

  $(".button-20").on("click", function () {
    $(".modal").css("display", "none");
  });
});
