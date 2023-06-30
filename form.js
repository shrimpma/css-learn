$(".signup").on("click", function (e) {
  console.log("click me now  ");
  let salonform = $("#salonform");
  if (!salonform.hasClass("uk-open")) {
    salonform.addClass("uk-open");
    salonform.css("display", "block");
  } else {
    salonform.removeClass("uk-open");
    salonform.css("display", "none");
  }
});

$("button.uk-close").on("click", function () {
  salonform.classList.remove("uk-open");
  salonform.style.display = "none";
});
