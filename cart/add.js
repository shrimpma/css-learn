// add to cart with

function addToCart(payload) {
//   $.post("/cart/add.js", payload, null, "json").success(function () {
//       window.location = "/cart";
//   });

  var $addToCartForm = $(this);
  var $addToCartBtn = $addToCartForm.find('.add_to_cart');
  $.post({
    url: '/cart/add.js',
    dataType: 'json',
    cache: false,
    type: 'post',
    data: payload,
    beforeSend: function() {
      $addToCartBtn.attr('disabled', 'disabled').addClass('disabled');
      $addToCartBtn.find('span').text("adding...");
    },
    success: function(itemData) {
        window.location = "/cart";
    },
    error: function(XMLHttpRequest) {
        var response = eval('(' + XMLHttpRequest.responseText + ')');
        response = response.description;
        console.log(response);
    }

    });
}
$(function () {
  $(".add_to_cart").on("click", function (e) {
    e.preventDefault();

    var items = [];

    var main_variant_id = $("select[name=id]").find(":selected").val();

    console.log(` main_id = ${main_variant_id}`);

    items.push({ quantity: $("#quantity").val(), id: main_variant_id });

    $(".buy-with-item:checked").map(function () {
      items.push({ quantity: 1, id: $(this).val() });
    });

    var payload = {};
    postdata["items"] = items;
    console.log(JSON.stringify(payload));
    addToCart(payload)
   
  });
});
