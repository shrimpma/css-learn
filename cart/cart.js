$(document).ready(function () {
  $(".custom-add").on("click", function (e) {
    e.preventDefault();

    var varId = $(".varients_ids")
      .map(function () {
        return $(this).attr("data-varient");
      })
      .toArray();

    var varpro = $(".varients_ids")
      .map(function () {
        return $(this).attr("data-properties");
      })
      .toArray();

    var fruits = ["First Properties", "Secound Properties", "Third Properties"];

    var quan = $(".varients_ids")
      .map(function () {
        return $(this).val();
      })
      .toArray();

    var sentProducts = [];
    addToCart(varId, quan, varpro, sentProducts);

    function addToCart(varId, quan, varpro, sentProducts) {
      var ss = fruits.shift();
      var productId = varId.shift();
      // var varpro = varpro.shift();
      var qtyId = quan.shift();

      $.post(
        "/cart/add.js",
        {
          quantity: qtyId,
          id: productId,
          properties: {
            "Some prop": ss,
          },
        },

        null,
        "json"
      ).success(function () {
        sentProducts.push(productId);
        if (varId.length) {
          addToCart(varId, quan, varpro, sentProducts);
        } else {
          window.location = "/cart";
        }
      });
    }
  });
});
