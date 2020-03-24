window.theme = window.theme || {};
window.slate = window.slate || {};

(function(e,f){var b={},g=function(a){b[a]&&(f.clearInterval(b[a]),b[a]=null)};e.fn.waitUntilExists=function(a,h,j){var c=this.selector,d=e(c),k=d.not(function(){return e(this).data("waitUntilExists.found")});"remove"===a?g(c):(k.each(a).data("waitUntilExists.found",!0),h&&d.length?g(c):j||(b[c]=f.setInterval(function(){d.waitUntilExists(a,h,!0)},500)));return d}})(jQuery,window);

Number.prototype.zeroPad = function() {
   return ('0'+this).slice(-2);
};

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

String.prototype.titleize = function() {
  var words = this.split("-");
  $.each(words, function(index, word) { words[index] = word[0].toUpperCase() + word.substring(1); });
  return words.join(" ");
};


String.prototype.capitalize = function() {
  var words = this.split(" ");
  $.each(words, function(index, word) { words[index] = word[0].toUpperCase() + word.substring(1); });
  return words.join(" ");
};

String.prototype.slug = function() {
  return this.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
};

String.prototype.handleize = function() {
  return this.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

function ISOvalid(str) {
  return !/[^\u0000-\u00ff]/g.test(str);
}

function BundleAdder() {
  var adding = false;
  var queue = [];

  /**
 * This function takes the same arguments as the /cart/add.js body
 * see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart
 * @param AddToCartPayload
 * @param callback
 */
  function addToCart(payload, callback) {
    $.ajax({
      method: 'POST',
      url: '/cart/add.js',
      dataType: 'json',
      data: payload,
      // processData: false,
      success: callback,
    });
  }

  // Recursive function to flush the queue
  function updateProducts(callback) {
    if (queue.length) {
      addToCart(queue.shift(), function () {
        updateProducts(callback);
      });
    } else {
      callback();
    }
  }

  /**
 * This function takes an array of the addToCart payload defined here
 * see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart
 * @param [AddToCartPayload]
 * @param callback
 */
  return function(products, callback) {
    // Add products to the queue
    if (adding) {
      throw new Error('Unable to add two bundles at once');
    }

    // We are now adding products
    adding = true;

    // Update the queue
    queue = products;

    updateProducts(function () {
      adding = false;
      $.ajax({
        method: 'GET',
        url: '/cart.js',
        dataType: 'json',
        success: callback,
      });
    });
  }
}


/**
 * This function allows javascript to use GET parameters in an easy format.
 *
 * @usage        Point a variable to QueryString. To access any
 *                parameter <variable>.<parameter>
 * @return        A completed object which contains the URL information.
 */
var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
  return query_string;
}();


function createCookie(name, value, minutes) {
  var expires;

  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = encodeURIComponent(name) + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}


/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

/**
 * a11y.pageLinkFocus
 *
 * For use when focus shifts to a container rather than a link
 * eg for In-page links, after scroll, focus shifts to content area so that
 * next `tab` is where user expects if focusing a link, just $link.focus();
 *
 * @param {JQuery} $element - The element to be acted upon
 */

/**
 * a11y.focusHash
 *
 * If there's a hash in the url, focus the appropriate element
 */

/**
 * a11y.bindInPageLinks
 *
 * When an in-page (url w/hash) link is clicked, focus the appropriate element
 */

/**
 * a11y.trapFocus
 *
 * Traps the focus in a particular container
 *
 * @param {object} options - Options to be used
 * @param {jQuery} options.$container - Container to trap focus within
 * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
 * @param {string} options.namespace - Namespace used for new focus event handler
 */

/**
 * a11y.removeTrapFocus
 *
 * Removes the trap of focus in a particular container
 *
 * @param {object} options - Options to be used
 * @param {jQuery} options.$container - Container to trap focus within
 * @param {string} options.namespace - Namespace used for new focus event handler
 */
theme.Sections=function Sections(){this.constructors={};this.instances=[];$(document).on('shopify:section:load',this._onSectionLoad.bind(this)).on('shopify:section:unload',this._onSectionUnload.bind(this)).on('shopify:section:select',this._onSelect.bind(this)).on('shopify:section:deselect',this._onDeselect.bind(this)).on('shopify:block:select',this._onBlockSelect.bind(this)).on('shopify:block:deselect',this._onBlockDeselect.bind(this))};theme.Sections.prototype=_.assignIn({},theme.Sections.prototype,{_createInstance:function(container,constructor){var $container=$(container);var id=$container.attr('data-section-id');var type=$container.attr('data-section-type');constructor=constructor||this.constructors[type];if(_.isUndefined(constructor)){return}if(!_.isFunction(constructor)){constructor = constructor[type] || constructor}
var instance=_.assignIn(new constructor(container),{id:id,type:type,container:container});this.instances.push(instance)},_onSectionLoad:function(evt){var container=$('[data-section-id]',evt.target)[0];if(container){this._createInstance(container)}},_onSectionUnload:function(evt){this.instances=_.filter(this.instances,function(instance){var isEventInstance=instance.id===evt.detail.sectionId;if(isEventInstance){if(_.isFunction(instance.onUnload)){instance.onUnload(evt)}}
return!isEventInstance})},_onSelect:function(evt){var instance=_.find(this.instances,function(instance){return instance.id===evt.detail.sectionId});if(!_.isUndefined(instance)&&_.isFunction(instance.onSelect)){instance.onSelect(evt)}},_onDeselect:function(evt){var instance=_.find(this.instances,function(instance){return instance.id===evt.detail.sectionId});if(!_.isUndefined(instance)&&_.isFunction(instance.onDeselect)){instance.onDeselect(evt)}},_onBlockSelect:function(evt){var instance=_.find(this.instances,function(instance){return instance.id===evt.detail.sectionId});if(!_.isUndefined(instance)&&_.isFunction(instance.onBlockSelect)){instance.onBlockSelect(evt)}},_onBlockDeselect:function(evt){var instance=_.find(this.instances,function(instance){return instance.id===evt.detail.sectionId});if(!_.isUndefined(instance)&&_.isFunction(instance.onBlockDeselect)){instance.onBlockDeselect(evt)}},register:function(type,constructor){this.constructors[type]=constructor;$('[data-section-type='+type+']').each(function(index,container){this._createInstance(container,constructor)}.bind(this))}});slate.a11y={pageLinkFocus:function($element){var focusClass='js-focus-hidden';$element.first().attr('tabIndex','-1').focus().addClass(focusClass).one('blur',callback);function callback(){$element.first().removeClass(focusClass).removeAttr('tabindex')}},focusHash:function(){var hash=window.location.hash;if(hash&&document.getElementById(hash.slice(1))){this.pageLinkFocus($(hash))}},bindInPageLinks:function(){$('a[href*=#]').on('click',function(evt){this.pageLinkFocus($(evt.currentTarget.hash))}.bind(this))},trapFocus:function(options){var eventName=options.namespace?'focusin.'+options.namespace:'focusin';if(!options.$elementToFocus){options.$elementToFocus=options.$container}
options.$container.attr('tabindex','-1');options.$elementToFocus.focus();$(document).off('focusin');$(document).on(eventName,function(evt){if(options.$container[0]!==evt.target&&!options.$container.has(evt.target).length){options.$container.focus();options.$elementToFocus.focus()}})},removeTrapFocus:function(options){var eventName=options.namespace?'focusin.'+options.namespace:'focusin';if(options.$container&&options.$container.length){options.$container.removeAttr('tabindex')}
$(document).off(eventName)}};





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.DynamicYield = (function() {
  var cache = {
    enabled: true,
    cart_data: {}
  }

  function _enabled() {
    return cache.enabled;
  }

  function _getFormattedPrice(cents) {
    return (cents / 100).toFixed(2);
  }
  
  function _getCurrency() {
    return "en-US";
  }

  function _getProductData(products) {
    if(_enabled()) {
      var data = [];

      $.each(products, function(index, product) {
        cache.cart_data[product.key] = product.quantity;

        data.push({
          productId: product.sku,
          quantity: product.quantity,
          itemPrice: _getFormattedPrice(product.subtotal),
        })
      });

      return data;
    }
  }






  function getCache() {
    return cache;
  }

  function cartChange(cart) {
    console.log("dy3", cart);
  }







  function syncCart() {
    if(_enabled()) {
      theme.Shopify.getCart().then(function(cart) {
        
        if(typeof DY.API != "undefined" && cart.products.length > 0) {
          DY.API("event", {
            name: "Sync cart",
            properties: {
              dyType: "sync-cart-v1",
              currency: _getCurrency(),
              cart: _getProductData(cart.products)
            }
          });
        }
      });
    }
  }

  function addToCart(line_item) {
    if(_enabled()) {
      var delta = 1;
      if(cache.cart_data[line_item.key]) {
        delta = line_item.quantity - cache.cart_data[line_item.key];
      }
      else {
        cache.cart_data[line_item.key] = 0;
      }

      if(delta < 0) { delta = 1; }
      cache.cart_data[line_item.key] += delta;

      if(typeof DY.API != "undefined") {
        DY.API("event", {
          name: "Add to Cart",
          properties: {
            dyType: "add-to-cart-v1",
            value: _getFormattedPrice(line_item.final_price),
            currency: _getCurrency(),
            productId: line_item.sku,
            quantity: delta
          }
        });
      }      
    }    
  }

  function removeFromCart(line_item) {
    console.log("dy4");
    if(_enabled()) {

    }
  }


  return {
    getCache: getCache,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    syncCart: syncCart,
    cartChange: cartChange
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Shopify = (function() {
  var cache = {
    show_sister: true,
    automatic_product_enabled: false
  }

  function getProduct(handle) {
    return getProducts([handle]);
  }

  function formatMoney(money) {
    return "$"+(money / 100).toFixed(2).replace(".00", "");
  }

  function addItem(params) {
    var promise = new Promise(function(resolve) {
      var params = {
        type: "POST",
        url: "/cart/add.js",
        data: params,
        dataType: "json",
        complete: function(response) {
          resolve(response);
        }
      };
    });

    promise.then(function(response) {      
    });

    return promise;
  }

  function addItems(variants) {
    var data = { updates: {} };
    var total_quantity = 0;

    var promise = new Promise(function(resolve) {
      theme.Shopify.getCart().then(function(response) {
        $.each(variants, function(index, id) {
          quantity = 1;

          $.each(response.products, function(index, product) {
            if(product.variant_id == id) {
              quantity += product.quantity;
              return false;
            }
          });

          data.updates[id] = quantity;
        });

        var params = {
          type: "POST",
          url: "/cart/update.js",
          data: data,
          dataType: "json",
          complete: resolve
        };
        $.ajax(params);
      });
    });

    promise.then(function(response) {
      console.log("dy1", response);
      theme.Shopify.showSisterUpsell(response);
      theme.SideCart.buildProductList(response);
      theme.SideCart.openSideCart();
      theme.SideCart.countdownClose();
    });

    return promise;
  }

  // add to cart
  function addItemFromForm(e) {
    $form = $(this);
    e.preventDefault();

    var promise = new Promise(function(resolve) {
      var params = {
        type: "POST",
        url: "/cart/add.js",
        data: $(e.target).serialize(),
        dataType: "json",
        complete: resolve
      };
      $.ajax(params)
    });

    //$(this).append('<p class="added-to-cart" role="status"><span class="visually-hidden">Item added to bag</span></p>');
    //setTimeout(function() {
    //  $('.added-to-cart').remove();
    //}, 3000);

    promise.then(function(response) {
      $form.find("[name='submit']").val("ADDED!").focus();
      setTimeout(function() {
        $form.find("[name='submit']").val("add to bag");
      }, 2000);
      
      theme.DynamicYield.addToCart(response);
      theme.Shopify.showSisterUpsell(response);
      theme.SideCart.buildProductList(response);
      theme.SideCart.openSideCart();
      theme.SideCart.countdownClose();
    });
  }

  function autoAddProduct() {
    return new Promise(function(resolve) {
      if(theme.Shopify.isAutomaticProductEnabled()) {
        $.get("/cart?view=json", function(r) {
          var cart = JSON.parse(r);

          var promo_product_count = 0;
          var trigger_product_count = 0;

          $.each(cart.products, function(index, product) {
          });
          
          resolve();  
        });
      }
      else {
        resolve();
      }
    });
  }

  function isAutomaticProductEnabled() {
    return cache.automatic_product_enabled;
  }

  function getProducts(handles) {
    var product_list = [];
    if(typeof handles[0] == "object") {
      $.each(handles, function(index, product) {
        product_list.push(product.handle);
      });
    }
    else {
      product_list = handles;
    }

    promises = product_list.map(function(handle) {
      return new Promise(function(resolve) {
        $.ajax({
          type: "GET",
          url: "/products/"+handle,
          data: {
            view: "json"
          },
          success: function(result) {
            try {
              resolve(JSON.parse(result));
            }
            catch(e) {
              console.error(e);
              resolve(false);
            }
          },
          error: function(result) {
            console.error("Cannot find product: "+handle);
            resolve(false);
          }
        });
      });
    });

    return Promise.all(promises);
  }

  function preloadImages(image_list) {
    var newimages=[], loadedimages=0;
    var postaction=function(){};
    var image_list=(typeof image_list!="object")? [image_list] : image_list;

    function imageloadpost() {
        loadedimages++
        if (loadedimages==image_list.length){
            postaction(newimages) //call postaction and pass in newimages array as parameter
        }
    }
    for (var i=0; i<image_list.length; i++){
        newimages[i]=new Image()
        newimages[i].src=image_list[i]
        newimages[i].onload=function(){
            imageloadpost()
        }
        newimages[i].onerror=function(){
            imageloadpost()
        }
    }

    return { //return blank object with done() method
      done:function(f) {
        postaction=f || postaction //remember user defined callback functions to be called when images load
      }
    }
  }
  

  function getSizedImageUrl(src, size) {
    if(size === null) {
      return src;
    }

    if(src.indexOf("data:image") > -1) {
      return src;
    }

    if (size === 'master') {
      return removeProtocol(src);
    }

    var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

    if (match !== null) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return removeProtocol(prefix[0] + '_' + size + suffix);
    }

    return null;
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }

  function getCart() {
    return new Promise(function(resolve) {
      $.get("/cart?view=json", function(r) {
        resolve(JSON.parse(r));
      });
    });
  }

  function changeCartItemQuantity(row, quantity) {
    if(row.indexOf("byop:") > -1) {
      var data = { updates: [] };
      var id = row.replace("byop:", "");

      var promise = new Promise(function(resolve) {
        theme.Shopify.getCart().then(function(response) {
          $.each(response.products, function(index, product) {
            data.updates[index] = product.quantity;

            $.each(product.discounts, function(i, discount) {
              if(discount.indexOf(id) > -1) {
                data.updates[index] -= 1;
                return false;
              };
            });
          });

          var params = {
            type: "POST",
            url: "/cart/update.js",
            data: data,
            dataType: "json",
            complete: resolve
          };
          $.ajax(params);
        });
      });

      promise.then(function(response) {
        console.log("dy2", response);
        theme.BYOP.minusByopCount();
      });

      return promise;
    }
    else {
      var promise = new Promise(function(resolve) {
        var params = {
          type: "POST",
          url: "/cart/change.js",
          data: "quantity="+quantity+"&line="+row,
          dataType: "json",
          complete: resolve
        };
        $.ajax(params)
      });

      promise.then(function(response) {
        theme.DynamicYield.cartChange(response);
      });

      return promise;
    }
  }

  function loadImage(path, callback) {
    new Image().src = path;

    if (callback) {
      callback();
    }
  }

  function showSisterUpsell(line_item) {
    if(!cache.show_sister) {
      return false;
    }

    $.each(theme.sister_list, function(index, data) {
      if(data.types) {
        if(data.types.indexOf(line_item.product_type) > -1) {
          if(data.excluded && data.excluded.indexOf(line_item.handle) > -1) {}
          else {
            buildSisterUpsell(data.product_data);
            return false;
          }
        }
      }
      else if(data.handles) {
        if(data.handles.indexOf(line_item.handle) > -1) {
          buildSisterUpsell(data.product_data);
          return false;
        }
      }
    });
  }

  function buildSisterUpsell(product_data) {
    cache.show_sister = false;

    theme.Shopify.getProduct(product_data.handle).then(function(products) {
      if(!products) {
        console.warn("Can't find: " + product_data.handle);
        return false;
      }

      var $string = $(theme.Product.getUpsellProductString(products[0], true));
      $string.find(".product-details__upsell-info--title").html(product_data.text);

      $.fancybox.open($string);
    });
  }


  return {
    addItems: addItems,
    getCart: getCart,
    getProduct: getProduct,
    getProducts: getProducts,
    getSizedImageUrl: getSizedImageUrl,
    addItemFromForm: addItemFromForm,
    formatMoney: formatMoney,
    changeCartItemQuantity: changeCartItemQuantity,
    loadImage: loadImage,
    preloadImages: preloadImages,
    showSisterUpsell: showSisterUpsell,
    autoAddProduct: autoAddProduct,
    isAutomaticProductEnabled: isAutomaticProductEnabled
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.SideCart = (function() {
  var cache = {
    $header: $(".side-cart__header"),
    $body: $(".side-cart__container"),
    $footer: $(".side-cart__info"),
    $side_cart: $("[data-section-type='SideCart']"),
    $banner: $(".side-cart__header--banner"),
    $close: $(".side-cart__header--close"),
    $title: $(".side-cart__header--title"),
    $subtotal: $(".side-cart__info--subtotal span"),
    $container: $(".side-cart__container"),
    countdown: null,
    lock_cart: false,
    open: false
  }

  var selectors = {
    product: ".side-cart__product",
    product_remove: ".side-cart__product-details--remove",
    product_quantity: ".side-cart__product-quantity--input",
    product_increment: ".side-cart__product-quantity--increment",
    product_decrement: ".side-cart__product-quantity--decrement",
    product_price: ".side-cart__product-details--price",
    byop_container: ".side-cart__byop",
    byop_toggle: ".side-cart__show-children--button",
    upsell_container: ".side-cart__upsell-container"
  }

  var classes = {
    show_byop: "side-cart__byop--visible"
  }

  function getCache() {
    return cache;
  }

  function SideCart() {
    cache.$close.on("click", function() { closeSideCart(true) });
    cache.$side_cart.on("mouseover", removeCountdown);

    $(document).on("click", selectors.product_remove, handleRemoveProductClick);
    $(document).on("change", selectors.product_quantity, handleProductQuantityChange);
    $(document).on("click", selectors.product_increment, handleIncrementProductClick);
    $(document).on("click", selectors.product_decrement, handleDecrementProductClick);

    $(document).on("click", selectors.byop_toggle, handleByopToggle);

    buildProductList();
    
    setInterval(function() {
      if(cache.open) {
      	var correction = cache.$header.height() + cache.$footer.height();
      	cache.$body.css("max-height", "calc(100% - "+(correction+30)+"px");
      }
    }, 2000);
  }

  function handleProductQuantityChange() {
    if(!cache.lock_cart) {
      cache.lock_cart = true;
      var row = $(this).attr("data-row");
      var quantity = parseInt($(this).val()) >= 0 ? parseInt($(this).val()) : 0;

      theme.Shopify.changeCartItemQuantity(row, quantity).then(function(response) {
        cache.lock_cart = false;
        buildProductList();
      });
    }
  }

  function handleIncrementProductClick() {
    if(!cache.lock_cart) {
      cache.lock_cart = true;
      var $target = $(this).prev();
      var row = $target.attr("data-row");
      var quantity = parseInt($target.val()) + 1;

      theme.Shopify.changeCartItemQuantity(row, quantity).then(function(response) {
        cache.lock_cart = false;
        buildProductList();
      });
    }
  }

  function handleDecrementProductClick() {
    if(!cache.lock_cart) {
      cache.lock_cart = true;
      var $target = $(this).next();
      var row = $target.attr("data-row");
      var quantity = ((parseInt($target.val()) - 1) >= 0 ? (parseInt($target.val()) - 1) : 0);

      theme.Shopify.changeCartItemQuantity(row, quantity).then(function(response) {
        cache.lock_cart = false;
        buildProductList();
      });
    }
  }

  function handleRemoveProductClick() {
    if(!cache.lock_cart) {
      cache.lock_cart = true;
      var row = $(this).attr("data-row");

      theme.Shopify.changeCartItemQuantity(row, 0).then(function(response) {
        cache.lock_cart = false;
        buildProductList();
      });
    }
  }

  function handleByopToggle() {
    $(this).parent().parent().next().toggleClass(classes.show_byop);
  }

  function buildUpsellBanner(cart) {
    var show_mascara = -1000;
    var show_queenie = 0;

    $.each(cart.products, function(index, line_item) {
      if(line_item.tags.indexOf("#.trigger:mascaraupsell") > -1) {
        show_mascara += 1;
      }

      if(line_item.handle == "whatever") {
        show_queenie += 1;
      }
      else if(line_item.handle == "queenie") {
        show_queenie -= 999;
      }
      else if(line_item.handle == "black-on-black") {
        show_mascara -= 999;
      }
    });

    if(show_mascara > 0) {
      cache.$banner.html(" \
        <form action='/cart/add' method='POST'> \
          <input type='hidden' name='id' value='"+(theme.settings.environment == "stg" ? 19527634223207 : 21294934851666)+"' /> \
          <button class='text-link'> \
            <img src='https://cdn.shopify.com/s/files/1/1338/0845/files/mascara_minicart-01.jpg?10188652782635499305' alt='Finish off your look with Mascara' /> \
          </button> \
        </form>");
    }
    else if(show_queenie > 0) {
      cache.$banner.html(" \
        <form action='/cart/add' method='POST'> \
          <input type='hidden' name='id' value='"+(theme.settings.environment == "stg" ? 30269553901671 : 30345570156626)+"' /> \
          <button class='text-link'> \
            <img src='https://cdn.shopify.com/s/files/1/1338/0835/files/Lash_Upsell_-_Mini_Cart_Banner.jpg?435799' alt='You want lashes with that? Only $8' /> \
          </button> \
        </form>");
    }
    else {      
      //cache.$banner.html(" \
      //  <a class='text-link' href='/collections/eye-palettes'> \
      //    <img src='https://cdn.shopify.com/s/files/1/1338/0845/files/MINI_CART.jpg?75893' alt='$12 Shadow Palettes' /> \
      //  </a>");
      cache.$banner.html("");
    }
  }

  function buildProductList(line_item) {
    theme.Shopify.autoAddProduct().then(function() {
      theme.Shopify.getCart().then(function(cart) {
        var items = "";
        var byop_palettes = {};
  
        theme.Header.updateCartCount(cart.quantity);
        buildUpsellBanner(cart);
  
        if(cart.products.length == 0) {
          items += " \
            <div class='side-cart__product side-cart__product--empty'> \
              <label>Your bag is empty</label> \
            </div>";
        }
        else {
          $.each(cart.products, function(index, product) {
            byop_code = false;
  
            $.each(product.discounts, function(index, discount_code) {
              if(discount_code.indexOf("BYOP") > -1) {
                byop_code = discount_code.replace("BYOP:", "");
              }
            });
  
            if(byop_code) {
              if(typeof byop_palettes[byop_code] == "undefined") {
                byop_palettes[byop_code] = {
                  price: 0,
                  palette: "",
                  items: $("<div class='cartitem__bundle-products' />")
                }
              }
  
              if(product.properties.palette_size) {
                byop_palettes[byop_code].price += product.subtotal;
                byop_palettes[byop_code].palette = " \
                  <div class='side-cart__product side-cart__product--byop' data-byop='"+byop_code+"' data-handle='"+product.handle+"'> \
                    <div class='side-cart__product-image'> \
                      <img src='"+product.image+"' alt='' /> \
                    </div><div class='side-cart__product-details'> \
                      <div class='side-cart__product-details--badge'> \
                        <img src='https://cdn.shopify.com/s/files/1/1338/0835/files/badge-byoppromo-final.png?2091440464018000978' alt='#BYOP PROMO' /> \
                      </div> \
                      <label class='side-cart__product-details--title'>"+product.title+"</label> \
                      <label class='side-cart__product-details--type'>"+product.type+"</label> \
                      <label class='side-cart__product-details--price' tabindex='0'></label> \
                      <div class='side-cart__show-children'> \
                        <button class='text-link side-cart__show-children--button'> \
                          Inside Bundle \
                        </button> \
                      </div> \
                      <button class='side-cart__product-details--remove' data-row='byop:"+byop_code+"'> \
                        <img src='https://cdn.shopify.com/s/files/1/1338/0835/files/icon-close.svg?11699190567998258922' alt='Remove BYOP from cart' /> \
                      </button> \
                    </div> \
                    <div class='side-cart__byop'> \
                      <label class='side-cart__byop--title'>Inside Your Bundle</label> \
                    </div> \
                  </div>";
                items += byop_palettes[byop_code].palette;                                
              }
              else {
                byop_palettes[byop_code].price += product.subtotal;
  
                byop_palettes[byop_code].items.append(" \
                  <div class='side-cart__byop-child' data-handle='"+product.handle+"'> \
                    <div class='side-cart__product-image'> \
                      <img src='"+product.image+"' alt='' /> \
                    </div><div class='side-cart__product-details'> \
                      <label class='side-cart__product-details--title'>"+product.title+"</label> \
                      <label class='side-cart__product-details--type'>"+product.type+"</label> \
                    </div> \
                  </div>");
              }
            }
            else {
              items += " \
                <div class='side-cart__product' data-handle='"+product.handle+"' data-row='"+(index+1)+"'> \
                  <div class='side-cart__product-image'> \
                    <img src='"+product.image+"' alt='' /> \
                  </div><div class='side-cart__product-details'> \
                    <label class='side-cart__product-details--title'>"+product.title+"</label> \
                    <label class='side-cart__product-details--type'>"+product.type+"</label> \
                    <label class='side-cart__product-details--price' tabindex='0'> \
                      "+(product.final_price != product.sale_price?"<span class='visually-hidden'>Original Price:</span><span class='price--sale'>"+theme.Shopify.formatMoney(product.sale_price)+"</span>":"")+" \
                      <span class='visually-hidden'>Final Price:</span>"+theme.Shopify.formatMoney(product.final_price)+" \
                    </label> \
                    <div class='side-cart__product-quantity'> \
                      <button data-row='"+(index+1)+"' class='side-cart__product-quantity--decrement' field='quantity'> \
                        <img src='https://cdn.shopify.com/s/files/1/1338/0835/files/icon-minus.svg?8342380176482341839' alt='Decrement Quantity' /> \
                      </button> \
                      <input data-row='"+(index+1)+"' min='1' type='text' name='quantity' class='side-cart__product-quantity--input' value='"+product.quantity+"' /> \
                      <button data-row='"+(index+1)+"' class='side-cart__product-quantity--increment' field='quantity'> \
                        <img src='https://cdn.shopify.com/s/files/1/1338/0835/files/icon-plus.svg?8342380176482341839' alt='Increment Quantity' /> \
                      </button> \
                    </div> \
                    <button class='side-cart__product-details--remove' data-row='"+(index+1)+"'> \
                      <img src='https://cdn.shopify.com/s/files/1/1338/0835/files/icon-close.svg?11699190567998258922' alt='Remove "+product.title+" from cart' /> \
                    </button> \
                  </div> \
                </div>";
            }
          });
        }
  
        cache.$container.html(items);
        cache.$subtotal.text(theme.Shopify.formatMoney(cart.total_price));
  
        $.each(byop_palettes, function(byop_id, data) {
          var $byop_container = $(selectors.product+"[data-byop='"+byop_id+"']");
  
          var $children = $byop_container.find(selectors.byop_container);
          var $price = $byop_container.find(selectors.product_price);
  
          $children.append(data.items);
          $price.html(theme.Shopify.formatMoney(data.price));
        });
      });
    });
  }

  function openSideCart(activate_modal) {
    if(activate_modal) {
      theme.Global.openModal();
    }

    cache.$side_cart.show();
    cache.$side_cart.animate({
      right: "0%"
    }, 300, function() {
      if(activate_modal) {
        slate.a11y.trapFocus({
          $container: cache.$side_cart,
          $elementToFocus: cache.$title,
          namespace: "side_cart"
        });
      }
    });
    
    cache.open = true;
  }

  function closeSideCart(from_button) {
    theme.Global.closeModal();

    cache.$side_cart.animate({
      right: "-100%"
    }, 300, function() {
      cache.$side_cart.hide();
    });

    slate.a11y.removeTrapFocus({
      $container: cache.$side_cart,
      namespace: "side_cart"
    });

    if(from_button) {
      theme.Header.focusCart();
    }
    
    cache.open = false;
  }

  function countdownClose() {
    cache.countdown = setTimeout(function(){
      closeSideCart();
    },3000);
  }

  function removeCountdown() {
    clearInterval(cache.countdown);
  }

  return {
    getCache: getCache,
    SideCart: SideCart,
    openSideCart: openSideCart,
    closeSideCart: closeSideCart,
    buildProductList: buildProductList,
    countdownClose: countdownClose
  };
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Cart = (function() {
  var cache = {
    $subtotal: $(".cart-total__subtotal--value"),
    $container: $(".cart-table"),

    lock_cart: false
  };

  var selectors = {
    product_row: ".cart-table__body",
    product_remove: ".cart-table__remove",
    product_quantity: ".cart-table__product-quantity--input",
    product_increment: ".cart-table__product-quantity--increment",
    product_decrement: ".cart-table__product-quantity--decrement",
    product_price: ".cart-table__subtotal"
  };

  function Cart() {
    buildProductList();

    $(document).on("click", selectors.product_remove, handleRemoveProductClick);
    $(document).on("change", selectors.product_quantity, handleProductQuantityChange);
    $(document).on("click", selectors.product_increment, handleIncrementProductClick);
    $(document).on("click", selectors.product_decrement, handleDecrementProductClick);
  }

  function handleProductQuantityChange() {
    if(!cache.lock_cart) {
      cache.lock_cart = true;
      var row = $(this).attr("data-row");
      var quantity = parseInt($(this).val()) >= 0 ? parseInt($(this).val()) : 0;

      theme.Shopify.changeCartItemQuantity(row, quantity).then(function(response) {
        cache.lock_cart = false;
        buildProductList();
      });
    }
  }

  function handleIncrementProductClick() {
    if(!cache.lock_cart) {
      cache.lock_cart = true;
      var $target = $(this).prev();
      var row = $target.attr("data-row");
      var quantity = parseInt($target.val()) + 1;

      theme.Shopify.changeCartItemQuantity(row, quantity).then(function(response) {
        cache.lock_cart = false;
        buildProductList();
      });
    }
  }

  function handleDecrementProductClick() {
    if(!cache.lock_cart) {
      cache.lock_cart = true;
      var $target = $(this).next();
      var row = $target.attr("data-row");
      var quantity = ((parseInt($target.val()) - 1) >= 0 ? (parseInt($target.val()) - 1) : 0);

      theme.Shopify.changeCartItemQuantity(row, quantity).then(function(response) {
        cache.lock_cart = false;
        buildProductList();
      });
    }
  }

  function handleRemoveProductClick() {
    if(!cache.lock_cart) {
      cache.lock_cart = true;
      var row = $(this).attr("data-row");

      theme.Shopify.changeCartItemQuantity(row, 0).then(function(response) {
        cache.lock_cart = false;
        buildProductList();
      });
    }
  }

  function buildProductList() {
    theme.Shopify.getCart().then(function(cart) {
      var items = "";
      var byop_palettes = {};

      theme.Header.updateCartCount(cart.quantity);



      if(cart.products.length == 0) {
        items += " \
          <tr class='cart-table__header cart-table__row'> \
            <th class='cart-table__col cart-table__col--empty'>Your cart is currently empty</th> \
          </tr>";
      }
      else {
        items += " \
          <tr class='cart-table__header cart-table__row'> \
            <th class='cart-table__col cart-table__col--1' scope='col'>PRODUCTS \
            </th><th class='cart-table__col cart-table__col--2' scope='col'>PRICE \
            </th><th class='cart-table__col cart-table__col--3' scope='col'>QTY \
            </th><th class='cart-table__col cart-table__col--4' scope='col'>TOTAL \
            </th><th class='cart-table__col cart-table__col--5' scope='col'><span class='visually-hidden'>Remove Action</span> \
            </th> \
          </tr>";

        $.each(cart.products, function(index, product) {
          byop_code = false;

          $.each(product.discounts, function(index, discount_code) {
            if(discount_code.indexOf("BYOP") > -1) {
              byop_code = discount_code.replace("BYOP:", "");
            }
          });

          if(byop_code) {
            if(typeof byop_palettes[byop_code] == "undefined") {
              byop_palettes[byop_code] = {
                price: 0,
                palette: "",
                items: $("<div class='cartitem__bundle-products' />")
              }
            }

            if(product.properties.palette_size) {
              byop_palettes[byop_code].palette = " \
                <tr class='cart-table__body cart-table__row' data-byop='"+byop_code+"'> \
                  <td class='cart-table__col cart-table__col--1'> \
                    <div class='cart-table__image'> \
                      <img src='"+product.image+"' alt='' /> \
                    </div><div class='cart-table__product-details'> \
                      <label class='cart-table__product-details--title'>"+product.title+"</label> \
                      <label class='cart-table__product-details--type'>Build Your Own Palette</label> \
                    </div> \
                  </td><td class='cart-table__col cart-table__col--2'> \
                  </td><td class='cart-table__col cart-table__col--3'> \
                  </td><td class='cart-table__col cart-table__col--4'> \
                    <label class='cart-table__mobile-label showmobile'>Total</label> \
                    <label class='cart-table__subtotal'></label> \
                  </td><td class='cart-table__col cart-table__col--5'> \
                    <button class='cart-table__remove' data-row='byop:"+byop_code+"'> \
                      <img src='https://cdn.shopify.com/s/files/1/1338/0835/files/icon-close.svg?11699190567998258922' alt='Remove "+product.title+" from cart' /> \
                    </button> \
                  </td> \
                </tr>";

              items += byop_palettes[byop_code].palette;
            }
            else {
              byop_palettes[byop_code].price += product.subtotal;
            }
          }
          else {
            items += " \
              <tr class='cart-table__body cart-table__row'> \
                <td class='cart-table__col cart-table__col--1'> \
                  <div class='cart-table__image'> \
                    <a href='"+product.url+"'> \
                      <img src='"+product.image+"' alt='' /> \
                    </a> \
                  </div><div class='cart-table__product-details'> \
                    <label class='cart-table__product-details--title'>"+product.title+"</label> \
                    <label class='cart-table__product-details--type'>"+product.type+"</label> \
                  </div> \
                </td><td class='cart-table__col cart-table__col--2'> \
                  <label class='cart-table__mobile-label'>Price</label> \
                  <label class='cart-table__price'> \
                    "+theme.Product.createPriceDisplay(product)+" \
                  </label> \
                </td><td class='cart-table__col cart-table__col--3'> \
                  <label class='cart-table__mobile-label'>Qty</label> \
                  <div class='cart-table__product-quantity'> \
                    <button data-row='"+(index+1)+"' class='cart-table__product-quantity--decrement' field='quantity'> \
                      <img src='https://cdn.shopify.com/s/files/1/1338/0835/files/icon-minus.svg?8342380176482341839' alt='Decrement Quantity' /> \
                    </button> \
                    <input data-row='"+(index+1)+"' min='1' type='text' name='quantity' class='cart-table__product-quantity--input' value='"+product.quantity+"' /> \
                    <button data-row='"+(index+1)+"' class='cart-table__product-quantity--increment' field='quantity'> \
                      <img src='https://cdn.shopify.com/s/files/1/1338/0835/files/icon-plus.svg?8342380176482341839' alt='Increment Quantity' /> \
                    </button> \
                  </div> \
                </td><td class='cart-table__col cart-table__col--4'> \
                  <label class='cart-table__mobile-label'>Total</label> \
                  <label class='cart-table__subtotal'> \
                    "+(product.original_subtotal != product.subtotal?"<span class='visually-hidden'>Original Product Subtotal</span><span class='price--sale'>"+theme.Shopify.formatMoney(product.original_subtotal)+"</span>":"")+" \
                    <span class='visually-hidden'>Product Subtotal</span>"+theme.Shopify.formatMoney(product.subtotal)+" \
                  </label> \
                </td><td class='cart-table__col cart-table__col--5'> \
                  <button class='cart-table__remove' data-row='"+(index+1)+"'> \
                    <img src='https://cdn.shopify.com/s/files/1/1338/0835/files/icon-close.svg?11699190567998258922' alt='Remove "+product.title+" from cart' /> \
                  </button> \
                </td> \
              </tr>";
          }
        });
      }

      cache.$container.html(items);
      cache.$subtotal.text(theme.Shopify.formatMoney(cart.total_price));

      $.each(byop_palettes, function(byop_id, data) {
        var $byop_container = $(selectors.product_row+"[data-byop='"+byop_id+"']");

        var $price = $byop_container.find(selectors.product_price);
        $price.html(theme.Shopify.formatMoney(data.price));
      });
    });
  }

  return {
    Cart: Cart
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Wishlist = (function() {
  var cache = {
    $wishlist_parent: $(".page__wishlist"),

    list_id: theme.settings.parameters.has("wishlist") ? theme.settings.parameters.get("wishlist") : null,
    force_show: false,
    mutation_interval: null,
    wishlist_queue: [],
    product_end: false,
    wishlist_api: theme.settings.environment == "live" ? "https://cp-wishlists-prod.azurewebsites.net/api" : "https://cp-wishlists-dev.azurewebsites.net/api",

    product_list: []
  }

  var selectors = {
    wishlist: ".wishlist__action",
    wishlist_container: ".wishlist__container",
    share_input: ".wishlist__share--input",

    product_container: ".wishlist__products",
    buy_all: ".wishlist__addall--button"
  };

  var classes = {
    wishlist_added: ".wishlist__action--added"
  }

  function getCache() {
    return cache;
  }

  function shouldShowProduct(product) {
    if(!product || product.tags.indexOf("#.hidden:wishlist") > - 1 || product.tags.indexOf("#.hidden:true") > -1) {
      return false;
    }

    return true;
  }

  function Wishlist() {
    buildWishlistPage();

    $(document).on("click", selectors.buy_all, buyAllWishlistItems);
  }

  function buyAllWishlistItems(e) {
    e.preventDefault();
    theme.Shopify.addItems(cache.product_list);
  }

  function buildWishlistPage() {
    if(cache.list_id) {
      getWishlistData(cache.list_id).then(function(response) {
        if(response.length > 0) {
          cache.$wishlist_parent.html(" \
            <div class='wishlist__title'> \
              <h1>"+response[0].wishlist_name+"</h1> \
            </div> \
            <div class='wishlist__addall'> \
              <button class='btn wishlist__addall--button'>Add Wishlist to bag</button> \
            </div> \
            <div class='act-wishlist__header'> \
              <label class='act-wishlist__header--title'>Products</label> \
              <label class='act-wishlist__header--count'>&#40; "+response.length+" items &#41;</label> \
            </div> \
            <div class='wishlist__products'></div>");

          $.each(response, function(index, wishlist_data) {
            theme.Shopify.getProduct(wishlist_data.handle).then(function(product) {
              var $product = theme.Product.createProductListing(product[0], false);
              $(selectors.product_container).append($product);

              if(product[0].available) {
                cache.product_list.push(product[0].variant_id);
              }
            });
          });
        }
        else {
          cache.$wishlist_parent.html(" \
            <div class='wishlist__empty'> \
              Wishlist does not exist \
            </div>");
        }
      });
    }
  }

  function init() {
    $(selectors.wishlist_container).each(addToWishlistQueue);
    $(document).arrive(selectors.wishlist_container, addToWishlistQueue);

    $(document).on("click", selectors.wishlist, bindWishlistButton);

    if(typeof theme.customer != "undefined") {
      getDefaultListId();
    }
    else {
      cache.force_show = true;
      $(selectors.wishlist_container).show();
    }
  }

  function getDefaultListId() {
    $.ajax({
      url: cache.wishlist_api+"/lists",
      method: "GET",
      data: {
        customer_id: theme.customer.id
      },
      complete: function(r) {
        if(r.status == 200) {
          var data = JSON.parse(r.responseText);
          cache.list_id = data.wishlists[0][0].list_id;
        }

        processWishlistQueue();
        cache.mutation_interval = setInterval(processWishlistQueue, 3000);
      }
    });
  }

  function forceProcessQueue() {
    processWishlistQueue();
  }

  function processWishlistQueue() {
    var queue_data = cache.wishlist_queue.splice(0, 10);

    if(queue_data.length > 0 && theme.customer) {
      $.ajax({
        url: cache.wishlist_api+"/lists/products/exist",
        method: "POST",
        data: JSON.stringify({
          customer_id: theme.customer.id,
          product_handles: queue_data
        }),
        complete: function(r) {
          if(r.status == 200) {
            var data = JSON.parse(r.responseText);
            $.each(data, function(handle, added) {
              if(theme.settings.pathname.indexOf("/account") > -1 || added) {
                $(selectors.wishlist_container+"[data-handle='"+handle+"'] .wishlist__action").addClass("wishlist__action--added");
              } else {
                $(selectors.wishlist_container+"[data-handle='"+handle+"'] .wishlist__action").addClass("wishlist__action--empty");
              }
              $(selectors.wishlist_container+"[data-handle='"+handle+"']").show();
            });
          }
        }
      });      
    }
  }

  function addToWishlistQueue() {
    var handle = $(this).attr("data-handle");

    if($(this).find(selectors.wishlist__action).length == 0 && typeof handle != "undefined") {
      if(theme.settings.pathname == "/account" || theme.settings.pathname == "/account/") {
        var $wishlist_button = $("<div/>").html(" \
          <button class='wishlist__action wishlist__action--x'> \
            <div class='wishlist__image'> \
              <span class='visually-hidden'>Remove from wishlist</span> \
              <img src='https://cdn.shopify.com/s/files/1/1338/0845/files/icon-close.svg?84265' /> \
            </div> \
          </button>").contents();
      }
      else {
        var $wishlist_button = $("<div/>").html(" \
          <button class='wishlist__action "+(typeof theme.customer == "undefined" ? 'wishlist__action--login' : 'wishlist__action--empty')+"'> \
            <div class='wishlist__image'> \
              <span class='visually-hidden'>Add to wishlist</span> \
              "+getWishlistSVG()+" \
            </div> \
          </button>").contents();
      }

      $(this).prepend($wishlist_button);
      cache.wishlist_queue.push(handle);

      if(cache.force_show) {
        $(this).show();
      }
    }
  }

  function getWishlistEndpoint() {
    return cache.wishlist_api;
  }

  function getWishlistSVG() {
    return "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='-6 0 158 130' style='enable-background:new 0 0 146 130;' xml:space='preserve'> \
    <g><path class='st0' d='M134.5,11.6c-15.4-15.5-40.3-15.5-55.6,0L73,17.6l-5.9-5.9c-15.4-15.5-40.3-15.5-55.6,0c-15.4,15.5-15.4,40.7,0,56.2l5.9,6h0L38,94.6L73,130l0,0l0,0l35.2-35.6l20.3-20.6l0,0l5.9-5.9C149.8,52.3,149.8,27.2,134.5,11.6z' /></g> \
  </svg>"
  }

  function changeWishlistProduct($targets, handle) {
    $targets.each(function() {
      var $new_target = $(this).clone(true);
    
      $new_target.attr("data-handle", handle);
      $new_target.empty();
    
      $(this).replaceWith($new_target);
    });
  }

  function bindWishlistButton(e) {
    if($(this).parent().is('[data-wishlist-handle]')) {
      var handle = $(this).parent().attr("data-wishlist-handle");
    }
    else {
      var handle = $(this).parent().attr("data-handle");  
    }
    
    var $element = $(this);

    if($(this).hasClass("wishlist__action--added")) {
      e.preventDefault();

      $.ajax({
        url: cache.wishlist_api+"/lists/"+cache.list_id+"/products/"+handle,
        method: "DELETE",
        contentType: 'application/json',
        complete: function(r) {
          if(r.status == 200) {
            $element.removeClass("wishlist__action--added");
            $element.addClass("wishlist__action--empty");

            if(theme.settings.pathname.indexOf("/account") > -1) {
              $("[data-wishlist-handle='"+handle+"']").parent().remove();
            }
          }
        }
      });
    }
    else if($(this).hasClass("wishlist__action--empty")) {
      e.preventDefault();

      $.ajax({
        url: cache.wishlist_api+"/lists/products/",
        method: "POST",
        data: JSON.stringify({
          "shop_id": "colourpop",
          "customer_id": theme.customer.id,
          "list_id": cache.list_id,
          "handle": handle,
          "wishlist_name": theme.customer.firstName+"'s wishlist"
        }),
        complete: function(r) {
          if(r.status == 200) {
            var data = JSON.parse(r.responseText);
            cache.list_id = data.list_id;
            $element.removeClass("wishlist__action--empty");
            $element.addClass("wishlist__action--added");
          }
        }
      });
    }
    else if($(this).hasClass("wishlist__action--login")) {
      window.location.href = "/account/login?q=wishlist&return_to="+theme.settings.pathname;
    }
  }

  function clearWishlistQueue() {
    clearInterval(cache.mutation_interval);
  }

  function updateWishListIcon(handle) {
    var $ele = $(selectors.wishlist_container+"[data-handle='"+handle+"'] .wishlist__action");

    if(typeof theme.customer != "undefined") {
      $.ajax({
        url: cache.wishlist_api+"/lists/products/exist",
        method: "POST",
        data: JSON.stringify({
          customer_id: theme.customer.id,
          product_handles: [handle]
        }),
        complete: function(r) {
          if(r.status == 200) {
            var data = JSON.parse(r.responseText);
            $.each(data, function(handle, added) {
              if(theme.settings.pathname.indexOf("/account") > -1 || added) {
                $ele.removeClass("wishlist__action--empty").addClass("wishlist__action--added");
              } else {
                $ele.removeClass("wishlist__action--added").addClass("wishlist__action--empty");
              }
            });
          }
        }
      });
    }
  }

  function getWishlistProducts(list_id) {
    return new Promise(function(resolve) {
      var params = {
        url: cache.wishlist_api+"/lists"+(list_id ? "/"+list_id : ""),
        method: "GET",
        data: {
          customer_id: theme.customer.id
        },
        complete: function(r) {
          if(r.status == 200) {
            var data = JSON.parse(r.responseText);

            if(data.wishlists.length > 0) {
              resolve(data.wishlists[0]);
            }
          }

          resolve([]);
        }
      };
      $.ajax(params)
    });
  }

  function shareWishlist(e) {
    e.preventDefault();

    var url = theme.settings.origin+"/pages/wishlist?wishlist="+cache.list_id;

    var string = " \
      <div class='wishlist__share'> \
        <label class='wishlist__share--title'>Share your wishlist</label> \
        <div class='wishlist__share--form'> \
          <input class='wishlist__share--input' value='"+url+"' /> \
          <button class='btn btn--secondary wishlist__share--button'>COPY</button> \
        </div> \
        <div class='wishlist__share-facebook'> \
          <button class='btn wishlist__share-facebook--button'>Share on Facebook</button> \
        </div> \
      </div>";

    $.fancybox.open(string);
  }

  function shareOnFacebook(e) {
    e.preventDefault();

    FB.ui({
      method: 'share',
      href: theme.settings.origin+"/pages/wishlist?wishlist="+cache.list_id
    }, function(response){});
  }

  function copyShareInput(e) {
    e.preventDefault();

    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(selectors.share_input).val()).select();
    document.execCommand("copy");
    $temp.remove();
  }

  function getWishlistData(list_id) {
    return new Promise(function(resolve) {
      var params = {
        url: cache.wishlist_api+"/lists/"+list_id,
        method: "GET",
        complete: function(r) {
          if(r.status == 200) {
            var data = JSON.parse(r.responseText);
            resolve(data);
          }

          resolve([]);
        }
      };
      $.ajax(params);
    });
  }

  return {
    init: init,
    Wishlist: Wishlist,
    getCache: getCache,
    clearWishlistQueue: clearWishlistQueue,
    updateWishListIcon: updateWishListIcon,
    getWishlistEndpoint: getWishlistEndpoint,
    getWishlistProducts: getWishlistProducts,
    shouldShowProduct: shouldShowProduct,
    shareWishlist: shareWishlist,
    shareOnFacebook: shareOnFacebook,
    copyShareInput: copyShareInput,
    changeWishlistProduct: changeWishlistProduct,
    forceProcessQueue: forceProcessQueue
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.CrispAPI = (function() {
  var cache = {
    collection_template: "json",
    search_template: "json",

    products_per_page: 24,
    products_per_preview: 5
  }

  function initializeCrisp(type, handle) {
    if(type == "collection") {
      if(!handle) {
        console.error("CRISP: Invalid Collection Handle");
      }
      else {
        return Crisp.Collection({
          handle: handle,
          template: cache.collection_template,
        });
      }
    }
    else if(type == "search") {
      return Crisp.Search({
        query: '',
        template: cache.search_template,
        exact: false,
        types: ['product']
      });
    }

    return false;
  }

  function getSearchResults(crisps, value, preview) {
    //if(typeof window.didyoumean[search_val] != "undefined")
    //  search_val = window.didyoumean[search_val];

    if(preview) {
      crisps.setQuery(decodeURIComponent(value));
      return crisps.preview({
        number: cache.products_per_preview
      });
    }
    else {
      return crisps.getNext({
        number: cache.products_per_page
      })
    }
  }


  function initializeCrispFilters(filters) {
    // filters format: {
    //   "name": <string>,
    //   "children": {
    //     name: <string>,
    //     context: <jquery>,
    //     filter: function(payload) {
    //       - true: show
    //       - false: skip
    //     }
    //   }
    // }

    return Crisp.Filter({
      global: [
        function(payload) {
          return (payload.tags.indexOf('hidden-collection') === -1 && payload.tags.indexOf('hidden-true') === -1);
        },
      ],
      filters: filters
    });
  }


  function getProducts(crisp) {
    return crisp.getNext({
      number: cache.products_per_page
    })
  }

  return {
    initializeCrisp: initializeCrisp,
    getProducts: getProducts,
    initializeCrispFilters: initializeCrispFilters,
    getSearchResults: getSearchResults
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Global = (function() {
  var cache = {
    $body: $("body"),
    $container: $(".page-container"),
    $modal: $(".modal"),
    $owl_carousels: $(".owl-carousel:not(.owl-manual)"),
    $modal_save: $(".modal__saving"),
    $modal_text: $(".modal__saving-text"),

    $technology_match_image: $(".techpic"),

    $automatic_product_carousel: $("[data-carousel-product-list]")
  }

  var selectors = {
    add_to_cart_forms: "form[action='/cart/add']:not(.noAjax)",
    owl_carousels: ".owl-carousel:not(.owl-manual)",
    quickview: ".btn--quickview"
  }

  var classes = {
    navigation_toggle: "open-navigation",
    scrolled: "scrolled",
    search_toggle: "open-search",
    filter_toggle: "filters-open"    
  }

  function Global() {
    cache.owl_settings = theme.owl_carousel;

    cache.$container.on('click', closeSearch);
    cache.$modal.on("click", closeAllOpenPopups);

    $(document).on("click", selectors.quickview, showQuickView);

    $(document).on("submit", selectors.add_to_cart_forms, theme.Shopify.addItemFromForm);

    $(window).on("scroll", function(e) {
      if($(this).scrollTop() > 0) {
        cache.$body.addClass(classes.scrolled);
      } else {
        cache.$body.removeClass(classes.scrolled);
      }
    });    

    if(cache.$technology_match_image.length > 0) {
      cache.$technology_match_image.on("click", technologyNavigate);
    }

    cache.$automatic_product_carousel.each(buildProductCarousel);

    cache.$owl_carousels.each(initializeOwlCarousel);
    $(document).arrive(selectors.owl_carousels, initializeOwlCarousel);
  }

  function buildProductCarousel() {
    var $container = $(this);
    var product_list = $container.attr("data-carousel-product-list").split(",");
  
    if(product_list != "") {
      theme.Shopify.getProducts(product_list).then(function(products) {
        if(theme.settings.pathname.indexOf("/disney") > -1) {
          $container.append(theme.Product.createProductCarousel(products, false));
        }
        else {
          $container.append(theme.Product.createProductCarousel(products, true));
        }
      });
    }
  }

  function showQuickView(e) {
    e.preventDefault();

    var handle = $(this).attr("data-product-handle");

    theme.Shopify.getProduct(handle).then(function(products) {
      theme.Product.createProductQuickview(products[0]);
    });
  }

  function technologyNavigate(e) {
    e.preventDefault();
        
    var half = $(this).height() / 2;
    var width = $(this).width();
    
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;
        
    if(y > half) {
      if(x > 0 && x < (width / 3)) window.location.href = "/products/no-filter-foundation-stix";
      else if((x > (width / 3)) && (x < (width / 3 * 2))) window.location.href = "/products/no-filter-matte-foundation";
      else window.location.href = "/products/no-filter-concealer";
    }
  }

  function initializeOwlCarousel() {
    if(typeof $(this).attr("data-special") != "undefined") {
      if($(this).attr("data-special") == "marquee") {
        $(this).owlCarousel({
          autoplay: 7000,
          autoplayTimeout: 7000,
          center: true,
          loop: false,
          animateOut: 'slideOutUp',
          animateIn: 'flipInX',
          mouseDrag: false,
          nav: false,
          dots: false,
          items: 1
        });
      }
    }
    else {
      $(this).owlCarousel({
        autoplayTimeout: 7000,
        navText: cache.owl_settings.default.navText,
        lazyLoad: ($(this).is("[data-lazy]") ? true : cache.owl_settings.default.lazyLoad),
        loop: ($(this).is("[data-loop]") ? true : cache.owl_settings.default.loop),
        margin: ($(this).is("[data-margin]") ? parseInt($(this).attr("data-margin")) : cache.owl_settings.default.margin) ,
        nav: ($(this).is("[data-nav]") ? parseInt($(this).attr("data-nav")) : cache.owl_settings.default.nav),
        dots: ($(this).is("[data-dots]") ? parseInt($(this).attr("data-dots")) : cache.owl_settings.default.dots),
        autoWidth: ($(this).is("[data-autowidth]") ? true : cache.owl_settings.default.autoWidth),
        center: ($(this).is("[data-center]") ? true : cache.owl_settings.default.center),
        autoplay: ($(this).is("[data-autoplay]") ? true : cache.owl_settings.default.autoPlay),
        reponsive: {
          0: { items: ($(this).is("[data-mobile]") ? parseInt($(this).attr("data-mobile")) : ($(this).is("[data-desktop]") ? parseInt($(this).attr("data-desktop")) : 1)) },
          767: { items: ($(this).is("[data-tablet]") ? parseInt($(this).attr("data-tablet")) : ($(this).is("[data-mobile]") ? parseInt($(this).attr("data-mobile")) : ($(this).is("[data-desktop]") ? parseInt($(this).attr("data-desktop")) : 1))) },
          1280: { items: ($(this).is("[data-desktop]") ? parseInt($(this).attr("data-desktop")) : 1) }
        },

        onInitialized: function(event) {
          var dataset = event.target.dataset;

          if(dataset.startposition !== undefined) {
            setTimeout(function() {
              $(event.currentTarget).trigger("to.owl.carousel", parseInt(dataset.startposition));
            }, 100);
          }
        }
      });
    }
  }

  function openModal() {
    cache.$modal_save.hide();
    cache.$modal.show();
    cache.$modal.animate({
      opacity: "0.5"
    }, 300);
  }

  function closeModal() {
    cache.$modal_save.hide();
    cache.$modal.animate({
      opacity: "0"
    }, 100, function() {
      cache.$modal.hide();
    });
  }

  function closeAllOpenPopups() {
    theme.Navigation.closeNavigation();
    theme.SideCart.closeSideCart();
    closeModal();
    closeSearch();
  }

  function closeSearch() {
    cache.$body.removeClass(classes.search_toggle);
  }

  function openSearch() {
    cache.$body.addClass(classes.search_toggle);
  }

  function toggleNavigation() {
    cache.$body.toggleClass(classes.navigation_toggle);

    if(cache.$body.hasClass(classes.navigation_toggle)) {
      theme.Navigation.openNavigation();
    }
    else {
      theme.Navigation.closeNavigation();
    }
  }

  function toggleFilters() {
    cache.$body.toggleClass(classes.filter_toggle);
  }

  function closeNavigation() {
    cache.$body.removeClass(classes.navigation_toggle);
  }

  function showLoadingSpinner(string) {
    openModal();
    cache.$modal_save.show();
    cache.$modal_text.html(string);
  }

  function closeLoadingSpinner() {
    closeModal();
    cache.$modal_save.hide();
  }

  return {
    Global: Global,
    openModal: openModal,
    closeModal: closeModal,
    toggleNavigation: toggleNavigation,
    openSearch: openSearch,
    closeSearch: closeSearch,
    closeNavigation: closeNavigation,
    closeAllOpenPopups: closeAllOpenPopups,
    toggleFilters: toggleFilters,
    showLoadingSpinner: showLoadingSpinner,
    closeLoadingSpinner: closeLoadingSpinner
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Header = (function() {
  var cache = {
    $header_container: $(".header"),
    $hamburger: $(".header__hamburger"),
    $search: $(".search-button"),
    $search_container: $(".header__search-container"),
    $search_input: $(".header__search-bar--input"),
    $search_close: $(".header__search-bar--close"),
    $header: $("[data-section-type='Header']"),
    $cart: $(".cart-button"),
    $cart_count: $(".cart-button__count"),
    $navigation: $(".header__navigation"),

    crisps: null
  }

  var selectors = {
    search_dropdown: ".header__search-dropdown"
  }

  function Header() {
    cache.crisps = theme.CrispAPI.initializeCrisp("search");

    cache.$hamburger.on("click", handleHamburgerClick);
    cache.$search.on("click", handleSearchButtonClick);
    //cache.$cart.on("mouseenter", handleCartButtonHover);
    cache.$cart.on("click", handleCartButtonClick);

    //cache.$search_input.on("keypress", submitSearch);
    //  if(e.which == 13) {
    //    e.preventDefault();
    //    window.location.href = "/search?q=" + $(this).val();
    //  }
    //});

    //cache.$search_input.keyup(showSearchDropdown);

    cache.$search_close.on("click", function() {
      closeSearchBox(true);
    });
  }

  function getHeight() {
    return cache.$header_container.outerHeight();
  }

  function showSearchDropdown(e) {
    var search_value = $(this).val().toLowerCase();

    if(search_value.length >= 2)
    {
      var product_list = theme.CrispAPI.getSearchResults(cache.crisps, search_value, true);

      product_list.then(function(products) {
        if(products.length > 0) {
          if($(selectors.search_dropdown).length == 0) {
            var $dropdown = $("<div/>").html("<div class='header__search-dropdown'></div>").contents();
          }
          else {
            var $dropdown = $(selectors.search_dropdown);
          }

          $dropdown.empty();
          $.each(products, function(index, product) {
            if(!theme.Search.shouldShowProduct(product)) {
              return true;
            }

            $dropdown.append(theme.Product.createSearchPreview(product));
          });

          if($dropdown.children().length == 0) {
            $(selectors.search_dropdown).remove();
          }
          else {
            $dropdown.append(" \
              <div class='header__search-dropdown--cta'> \
                <a class='btn' href='/search?q="+search_value+"'>VIEW ALL RESULTS</a> \
              </div>");
            cache.$search_container.append($dropdown);
          }
        }
      });
    }
    else {
      $(selectors.search_dropdown).remove();
    }
  }

  function updateCartCount(count) {
    cache.$cart_count.text(count);
  }

  function closeSearchBox(button) {
    theme.Global.closeSearch();

    slate.a11y.removeTrapFocus({
      $container: cache.$search_container,
      namespace: "searchbar"
    });

    if(button) {
      cache.$search.focus();
    }
  }

  function handleSearchButtonClick(e) {
    e.preventDefault();

    theme.Global.closeAllOpenPopups();
    theme.Global.openSearch();

    slate.a11y.trapFocus({
      $container: cache.$search_container,
      $elementToFocus: cache.$search_input,
      namespace: "searchbar"
    });
  }

  function handleCartButtonHover() {
    theme.SideCart.openSideCart();
  }

  function handleCartButtonClick(e) {
    theme.SideCart.openSideCart(true);
  }

  function handleHamburgerClick() {
    theme.Global.toggleNavigation();
  }

  function resetHamburger() {
    theme.Global.closeNavigation(false);
  }

  function focusHamburger() {
    cache.$hamburger.focus();
  }

  function focusCart() {
    cache.$cart.focus();
  }

  return {
    Header: Header,
    resetHamburger: resetHamburger,
    focusHamburger: focusHamburger,
    focusCart: focusCart,
    updateCartCount: updateCartCount,
    getHeight: getHeight
  };
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Navigation = (function() {
  var cache = {
    $navigation: $("[data-section-type='Navigation']"),
    $close: $(".navigation--close"),
    $container: $(".navigation__list--links"),
  }

  var selectors = {
    open_sub_navigation: ".navigation__list--show-more"
  }

  function Navigation() {
    cache.navigation_data = navigation_data;

    $(document).on("click", selectors.open_sub_navigation, openSubNavigation);

    cache.$close.on("click", function() {
      closeNavigation(true)
    });
  }

  function openSubNavigation(e) {
    var option = $(this).attr("data-navigation-handle");
    buildNavigationList(option);
  }

  function buildNavigationList(option) {
    var string = "";
    if(option == "") {
      $.each(cache.navigation_data, function(handle, data) {
        if(data.children.length > 0) {
          string += "<button class='text-link navigation__list--show-more' data-navigation-handle='"+handle+"'><li class='navigation__list--header'>"+data.title+"</li></button>"
        }
        else {
          string += "<a href='"+data.link+"'><li class='navigation__list--header'>"+data.title+"</li></a>"
        }
      });
    }
    else {
      $.each(cache.navigation_data[option].children, function(index, data) {
        string += "<a href='"+data.link+"'><li class='navigation__list--header'>"+data.title+"</li></a>"
      });

      string += "<button class='text-link navigation__list--show-more' data-navigation-handle=''><li class='navigation__list--back'>Back</li></button>"
    }
    
    cache.$container.html(string);

    cache.$navigation.find(".navigation__list--header").first().parent().focus();
  }

  function openNavigation() {
    buildNavigationList("");

    theme.Global.openModal();

    cache.$navigation.show();
    cache.$navigation.animate({
      left: "0%"
    }, 300, function() {
      slate.a11y.trapFocus({
        $container: cache.$navigation,
        $elementToFocus: cache.$navigation.find(".navigation__list--header").first(),
        namespace: "navigation"
      });
    });
  }

  function closeNavigation(from_button) {
    theme.Global.closeModal();

    cache.$navigation.animate({
      left: "-30%"
    }, 300, function() {
      cache.$navigation.hide();
    });

    slate.a11y.removeTrapFocus({
      $container: cache.$navigation,
      namespace: "navigation"
    });

    theme.Header.resetHamburger();

    if(from_button) {
      theme.Header.focusHamburger();
    }
  }

  return {
    Navigation: Navigation,
    openNavigation: openNavigation,
    closeNavigation: closeNavigation
  };
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Footer = (function() {
  var cache = {
  }

  function Footer() {
    if(typeof KlaviyoSubscribe != "undefined") {
      KlaviyoSubscribe.attachToForms("#footer__signup", {
        hide_form_on_success: false,
        success: function($form) {
          window.location.href= "/pages/thank-you"
        },
        error: function($form) {
          console.error("error");
        },
        extra_properties: {
          $source: 'FooterEmailSignUp'
        }
      });
    }
  }

  return Footer;
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Collection = (function() {
  var cache = {
    settings: null,

    crisp: null,
    crisp_filter: null,

    $wrapper: $(".cp__content--wrap"),

    $product_container: $(".listing"),
    product_list: [],

    $listing_title: $(".listing-title h1"),

    filter_value: theme.settings.parameters.has("q") ? decodeURIComponent(theme.settings.parameters.get("q")).toLowerCase() : "",
    filter_data: null,
    $filters_container: $(".listing-filters__selectors"),
    filters_logic: [],
    selected_filters: [],
    $filter_open: $(".listing-filters__actions button"),

    $accordion: $(".listing-accordion__container"),
    $accordion_title: $(".listing-accordion__title"),

    $signup_form: $(".listing-navigation__signup-form")
  }

  var selectors = {
    product_listing: ".product__listing",
    product_listing_end: ".product__listing--end",
    product_listing_empty: ".product__listing--empty",
    collection_banner: ".listing-title__image",

    filters_container: ".listing-filters__container",
    filter: ".filter-group__filter--checkbox",
    filter_count: ".filter-group__title--number",
    filter_parent: ".listing-filters__group",
    filter_group: ".filter-group__action--filters",
    filter_toggle: ".filter-group__title",
    filter_container: ".filter-group__actions",
    filter_apply: ".filter-group__action--apply",
    filter_clear: ".filter-group__action--clear",

    tabs_container: ".listing-filters__tags",
    tab: ".listing-filters__tag",

    signup_form: ".listing-navigation__signup-form"
  }

  function Collection() {
    cache.settings = collection_settings;
    cache.filter_data = collection_filters;

    cache.crisp = theme.CrispAPI.initializeCrisp("collection", theme.settings.collection_handle);
    buildCollectionFilters();
    cache.crisp_filter = theme.CrispAPI.initializeCrispFilters(cache.filters_logic);
    setFiltersByHistory();

    cache.$listing_title.on("click", scrollToProducts);

    cache.$filter_open.on("click", toggleFilters);
    $(document).on("click", selectors.filter_toggle, toggleFilterDropdown);
    $(document).on("click", selectors.filter_apply, applyFilters);
    $(document).on("click", selectors.filter_clear, clearFilters);

    $(document).on("click", selectors.tab, removeFilterViaTab);

    window.onpopstate = setFiltersByHistory;

    if(cache.$accordion.length > 0) {
      cache.$accordion_title.on("click", toggleCollectionAccordion);
    }

    if(cache.$signup_form.length > 0) {
      if(typeof KlaviyoSubscribe != "undefined") {
        KlaviyoSubscribe.attachToForms(selectors.signup_form, {
          hide_form_on_success: false,
          success: function($form) {
            var string = " \
              <div class='listing-navigation__signup-complete'> \
                <label class='listing-navigation__signup-complete--title'>"+$form.attr("data-complete-title")+"</label> \
                <label class='listing-navigation__signup-complete--subtitle'>"+$form.attr("data-complete-subtitle")+"</label> \
              </div>";
            $(selectors.signup_form).parent().html(string);
          },
          extra_properties: {
            $source: cache.$signup_form.attr("data-source")
          }
        });
      }
    }

    $(window).on("scroll", function(e) {
      var headerHeight = $('[data-section-id="theme_v4_header"]')[0].offsetHeight;
      var filterHeight = 34;

      if($(selectors.filters_container).length > 0) {
        if(window.pageYOffset >= (filterHeight + headerHeight)) {
          $('body').addClass('sticky');
        } else {
          $('body').removeClass('sticky');
        }
      }
    });

    setTimeout(function() {
      $(window).bind("scroll", checkLocationOnScroll);
    }, 2000);
  }


  function toggleCollectionAccordion() {
    cache.$accordion.toggleClass("listing-accordion__container--open");
  }


  function checkLocationOnScroll() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      $(window).unbind("scroll", checkLocationOnScroll);
      getProducts();

      setTimeout(function() {
        $(window).bind("scroll", checkLocationOnScroll);
      }, 500);
    }
  }


  function scrollToProducts() {
    $('html, body').animate({
      scrollTop: cache.$product_container.offset().top - 180
    }, 500);
  }


  function toggleFilters(e) {
    e.preventDefault();
    theme.Global.toggleFilters();
  }

  function updateFilters(update_history) {
    cache.crisp_filter.setQuery(cache.selected_filters.join(","));

    $(selectors.filter_parent).each(function() {
      var filter_count = $(this).find(":checked").length;
      $(this).find(selectors.filter_count).html((filter_count > 0 ? "("+filter_count+")" : ""));
    });

    if(update_history) {
      history.pushState({ "filters": cache.crisp_filter.getQuery() }, "colourpop", "?q="+cache.crisp_filter.getQuery());
    }

    cache.crisp.setFilter(cache.crisp_filter.fn());
    buildFilterTags();
    resetProducts();
    getProducts();
  }

  function removeFilterViaTab() {
    var filter = $(this).attr("data-filter");
    $(selectors.filter).filter("[value='"+filter+"']").prop("checked", false);
    applyFilters();
  }

  function buildFilterTags() {
    $(selectors.tabs_container).empty();

    $.each(cache.selected_filters, function(index, filter) {
      $(selectors.tabs_container).append(" \
        <button class='listing-filters__tag btn btn--secondary' data-filter='"+filter+"'> \
          <span class='visually-hidden'>Remove filter: </span>"+filter+" \
          <img src='//cdn.shopify.com/s/files/1/1338/0835/files/icon-close-white.png?333801' alt='' /> \
        </button>");
    });
  }

  function applyFilters() {
    cache.selected_filters = [];
    $(selectors.filter).filter(":checked").each(function() {
      cache.selected_filters.push($(this).val());
    });

    updateFilters(true);
    hideFilterDropdown();
  }

  function clearFilters() {
    $(selectors.filter).prop("checked", false);
    cache.selected_filters = [];

    updateFilters(true);
    hideFilterDropdown();
  }

  function setFiltersByHistory() {
    $(selectors.filter).prop("checked", false);

    if (history.state != null) {
      if('filters' in history.state && history.state.filters !== "") {
        cache.selected_filters = history.state.filters.split(',');
      }
    }
    else if(cache.filter_value != "") {
      cache.selected_filters = [cache.filter_value];
    }
    else {
      cache.selected_filters = [];
    }

    $.each(cache.selected_filters, function(index, filter) {
      $(selectors.filter).filter("[value='"+filter+"']").prop("checked", true);
    });

    updateFilters(false);
  }

  function hideFilterDropdown() {
    var $target = $(selectors.filter_container).filter(".open");

    slate.a11y.removeTrapFocus({
      $container: $target,
      namespace: "filter"
    });

    $target.removeClass("open");
    $target.prev().focus();
  }

  function toggleFilterDropdown() {
    var $target = $(this).next();

    if($target.hasClass("open")) {
      $target.removeClass("open");

      slate.a11y.removeTrapFocus({
        $container: $target,
        namespace: "filter"
      });
      $(this).focus();
    }
    else {
      $(selectors.filter_container).removeClass("open");
      $target.addClass("open");

      slate.a11y.trapFocus({
        $container: $target,
        $elementToFocus: $target.find("input").first(),
        namespace: "filter"
      });
    }
  }

  function buildCollectionFilters() {
    var data = cache.filter_data.default;
    if(cache.filter_data[theme.settings.collection_handle]) {
      data = cache.filter_data[theme.settings.collection_handle];
    }

    if(Object.keys(data).length == 0) {
      $(selectors.filters_container).hide();
    }
    else {
      $(selectors.filters_container).show();
    }

    $.each(data, function(group, filters) {
      var children = [];

      var $group = $("<div/>").html(" \
        <div class='listing-filters__group' data-group='"+group+"'> \
          <button class='filter-group__title select'> \
            <span class='visually-hidden'>Toggle Filters: </span>"+group+" \
            <span class='visually-hidden'>Current Selected "+group+" filters:</span> \
            <span class='filter-group__title--number'></span> \
          </button> \
          <div class='filter-group__actions'> \
            <div class='filter-group__action--filters'></div> \
            <div class='filter-group__action--buttons'> \
              <button class='filter-group__action--apply btn'>APPLY</button> \
              <button class='filter-group__action--clear btn btn--secondary'>Clear</button> \
            </div> \
          </div> \
        </div> \
        ").contents();

      var $filter_container = $group.find(selectors.filter_group);

      $.each(filters, function(index, filter) {
        var filter_handle = filter.slug();
        if(filter_handle == 'crme') { filter_handle = 'creme'; }

        $filter = $("<div/>").html(" \
        <div class='filter-group__filter'> \
          <input data-group='"+group+"' id='"+group+"-"+filter_handle+"' class='filter-group__filter--checkbox visually-hidden' type='checkbox' value='"+filter_handle+"' /> \
          <label data-group='"+group+"' data-filter='"+filter_handle+"' for='"+group+"-"+filter_handle+"' class='filter-group__filter--label'><span class='visually-hidden'>Refine by "+group+": </span>"+filter+"</label> \
        </div>").contents();

        $filter_container.append($filter);

        children.push({
          name: filter_handle,
          context: $filter,
          filter: function(payload) {
            var rounded_rating = Math.round(payload.rating);
            return ((filter_handle == "" ) || (payload.tags.indexOf(filter_handle) !== -1) || (filter.indexOf(rounded_rating) > -1));
          }
        });
      });

      cache.filters_logic.push({ title: group, children: children });
      cache.$filters_container.append($group);

      if(group == "finish" && (theme.settings.collection_handle == "lip-gloss" || theme.settings.collection_handle == "liquid-lipsticks" || theme.settings.collection_handle == "lippie-stix" || theme.settings.collection_handle == "lux-lipstick")) {
        cache.$filters_container.append(" \
          <div class='listing-filters__info'> \
            <a data-fancybox href='#finish_popup'> \
              <img src='https://cdn.shopify.com/s/files/1/1338/0835/files/question-mark.png?165590' alt='View Filter Info'> \
            </a> \
          </div>");
      }
    });
  }



  function getProducts() {
    var product_list = theme.CrispAPI.getProducts(cache.crisp);
    var has_content_blocks = false;

    if(typeof cache.settings.content_blocks[theme.settings.collection_handle] != "undefined") {
      has_content_blocks = true;
      var content = cache.settings.content_blocks[theme.settings.collection_handle];
    }

    product_list.then(function(response) {
      if(response.length == 0) {
        if($(selectors.product_listing).length > 0) {
          if($(selectors.product_listing_end).length < 1) {
            cache.$product_container.append(" \
              <div class='product__listing--end'> \
                <label>No more products to show</label> \
              </div>");
          }
        }
        else {
          if($(selectors.product_listing_empty).length < 1) {
            cache.$product_container.append(" \
              <div class='product__listing--empty'> \
                <label>No one is home, come back later :)</label> \
              </div>");
          }
        }
      }
      else {
        $.each(response, function(index, product) {
          var $product = theme.Product.createProductListing(product, true);

          cache.product_list.push(product.handle);
          cache.$product_container.append($product);

          if(has_content_blocks) {
            if(content[cache.product_list.length]) {
              var $content_string = $string.clone();

              if(content[cache.product_list.length].link == "") {
                $content_string.prepend(" \
                  <div class='product__listing-content--image'> \
                    <img src='"+content[index].image+"' alt='"+content[index].alt+"' /> \
                  </div>");
              } else {
                $content_string.prepend(" \
                  <div class='product__listing-content--image'> \
                    <a href='"+content[index].link+"'> \
                      <img src='"+content[index].image+"' alt='"+content[index].alt+"' /> \
                    </a> \
                  </div>");
              }

              cache.$product_container.append($content_string);
            }
          }
        });

        var api = new Yotpo.API(yotpo);
        api.refreshWidgets();
      }
    });
  }

  function resetProducts() {
    cache.crisp.clearOffset();
    cache.product_list = [];
    cache.$product_container.children().remove();
  }



  function getCollectionSettings() {
    return cache.settings;
  }

  function hasImageOverride(handle) {
    if(cache.settings.image_overrides[theme.settings.collection_handle]) {
      if(cache.settings.image_overrides[theme.settings.collection_handle][handle]) {
        return true;
      }
    }

    return false;
  }

  return {
    Collection: Collection,
    getProducts: getProducts,
    getCollectionSettings: getCollectionSettings,
    hasImageOverride: hasImageOverride
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Search = (function() {
  var cache = {
    crisps: null,
    $product_container: $(".listing"),
    product_list: [],
    search_value: theme.settings.parameters.has("q") ? decodeURIComponent(theme.settings.parameters.get("q")).toLowerCase() : ""
  }

  var selectors = {
    product_listing: ".product__listing",
  }

  function Search() {
    if(cache.search_value != "") {
      cache.crisps = theme.CrispAPI.initializeCrisp("search");
      cache.crisps.setQuery(cache.search_value);
      getSearchProducts();

      setTimeout(function() {
        $(window).bind("scroll", checkLocationOnScroll);
      }, 2000);
    }
    else {
      showEmptySearchResults();
    }
  }

  function checkLocationOnScroll() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      $(window).unbind("scroll", checkLocationOnScroll);
      getSearchProducts();

      setTimeout(function() {
        $(window).bind("scroll", checkLocationOnScroll);
      }, 500);
    }
  }

  function shouldShowProduct(product) {
    if(product.tags.indexOf("#.hidden:search") > - 1 || product.tags.indexOf("#.hidden:true") > -1) {
      return false;
    }

    return true;
  }

  function showEmptySearchResults() {
    cache.$product_container.html(" \
      <div class='product__listing--empty'> \
        <label>No one is home, try another search :)</label> \
      </div>");
  }

  function showEndOfSearchResults() {
    if($(".product__listing--empty").length == 0) {
      cache.$product_container.append(" \
        <div class='product__listing--empty'> \
          <label>You've reached the end! Try another search :)</label> \
        </div>");
    }    
  }

  function getSearchProducts() {
    var product_list = theme.CrispAPI.getSearchResults(cache.crisps);

    product_list.then(function(response) {
      if(response.length == 0) {
        if($(selectors.product_listing).length > 0) {
          showEndOfSearchResults();
        }
        else {
          showEmptySearchResults();
        }
      }
      else {
        $.each(response, function(index, product) {
          if(!shouldShowProduct(product)) {
            return true;
          }

          var $product = theme.Product.createProductListing(product, false);

          cache.product_list.push(product.handle);
          cache.$product_container.append($product);
        });

        var api = new Yotpo.API(yotpo);
        api.refreshWidgets();
      }
    });
  }

  return {
    Search: Search,
    getSearchProducts: getSearchProducts,
    shouldShowProduct: shouldShowProduct
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Product = (function() {
  var cache = {
    $details_container: $(".product-details"),
    $floating_container: $(".product-details__floating"),

    $story_container: $(".product-story"),
    
    selected_product: "",

    $wishlist: $(".wishlist__container--product"),

    $group_input: $(".product-actions__packaging--input"),    

    $title: $(".product-details__title"),
    $type: $(".product-details__type"),
    $price: $(".product-details__price"),
    $description: $(".product-details__description--text"),

    $form: $(".product-details__actions"),

    $complete_your_look: $(".product-complete__container"),
    $complete_your_look_container: $(".product-complete"),

    $images: $(".product-images__carousel"),

    $upsell_container: $(".product-details__upsell"),
    $upsell_banner: $(".banner-upsell"),

    $tumblr: $(".product-masonry"),

    $dot_container: $(".product-images__dots"),
    active_dot: 0,

    $quantity_box: $(".product-actions__quantity--input"),
    $quantity_up: $(".product-actions__quantity--up"),
    $quantity_down: $(".product-actions__quantity--down"),

    $social_container: $(".product-details__social"),

    mvp_undertone: "",
    mvp_skintone: "",
    mvp_show_button: true,

    has_story: false
  }

  var selectors = {
    action_button: ".product-actions__buttons",

    dots: ".product-images__dot",
    product_images_desktop: ".product-images__carousel--desktop .product-image",
    
    floating_container: ".product-details__floating",
    product_right_container: ".product-details__right",

    wishlist: ".wishlist__container--product",

    oos_container: ".product-oos__container",
    oos_button: ".product-actions__buttons--out-of-stock a",
    oos_submit: ".product-oos__button",
    oos_variant: ".product-oos__variant",
    oos_email: ".product-oos__email",
    oos_checkbox: ".product-oos__checkbox",

    upsell: ".product-details__upsell-container",
    upsell_banner: ".banner-upsell",

    ingredients: ".product-story__ingredients",

    shade_description: ".product-details__mvp-description",
    
    mvp_container: ".product-details__mvp",
    mvp_filter_container: ".product-details__mvp-filters",
    mvp_filter_dropdowns: ".product-details__mvp-filter--dropdown",
    mvp_filter_input: ".product-details__mvp-filter--input input",
    mvp_filter_undertone: ".product-details__mvp-filter--dropdown[data-filter-type='undertone']",
    mvp_filter_skintone: ".product-details__mvp-filter--dropdown[data-filter-type='skintone']",
    mvp_group: ".product-details__mvp-group",
    mvp_block: ".product-details__mvp-swatch",
    mvp_input: ".product-details__mvp-swatch--input",
    mvp_group_input: ".product-actions__packaging--input",
    mvp_group_selected: ".product-actions__packaging--input:checked",
    mvp_input_selected: ".product-details__mvp-swatch--input:checked",
    mvp_selected_label: ".product-details__mvp-selected--label",
    mvp_selected_swatch: ".product-details__mvp-selected--swatch",
    mvp_swatch_container: ".product-details__mvp-swatches",
    mvp_swatch_toggle: ".product-details__mvp-toggle",

    children_container: ".product-details__children",
    children_carousel: ".product-details__children-carousel",

    story_container: ".product-story__container",
    story_desktop_tabs: ".product-story__desktop-tabs",
    story_mobile_tabs: ".product-story__mobile-tab",
    story_desktop_tab: ".product-story__desktop-tab",
    story_mobile_tab: ".product-story__mobile-tab",
    story_child: ".product-story__children",
    story_title: ".product-story__block-title:not(.text-link)",

    ulta_trigger: ".store-location__trigger",
    ulta_input: ".ulta__locator--input",
    ulta_stores: ".ulta__stores-list",
    ulta_store: ".ulta__store"
  }

  function setSelectedProduct(handle) {
    cache.selected_product = handle;
  }

  function getSelectedProduct() {
    return cache.pdp_data.product_data[cache.selected_product];
  }

  function fetchProductData(handle, cb) {
    var handle = handle || cache.selected_product;    

    if(cache.pdp_data.product_data[handle] && cache.pdp_data.product_data[handle].variant_id) {
      $.each(cb, function(index, foo) {
        foo(cache.pdp_data.product_data[handle]);
      })
    }
    else {
      theme.Shopify.getProduct(handle).then(function(products) {
        if(!cache.pdp_data.product_data[products[0].handle]) {
          cache.pdp_data.product_data[products[0].handle] = {};
        }

        var product_data = cache.pdp_data.product_data[products[0].handle];

        product_data.handle = products[0].handle;
        product_data.vendor = products[0].vendor;
        product_data.id = products[0].id;
        product_data.title = products[0].title;
        product_data.type = products[0].type;
        product_data.sku = products[0].sku;
        product_data.header_description = products[0].header_description;
        product_data.description = products[0].description;
        product_data.shade_description = products[0].shade_description;
        product_data.child_description = products[0].child_description;
        
        product_data.type_description = products[0].type_description;
        product_data.application_tips = products[0].application_tips;
        product_data.ingredients = products[0].ingredients;
        product_data.video = products[0].video;
        
        product_data.upsell_text = products[0].upsell_text;
        product_data.upsell_description = products[0].description;

        product_data.available = products[0].available;
        product_data.preview = products[0].preview;

        product_data.variant_id = products[0].variant_id;
        product_data.show_oos_email = products[0].show_oos_email;

        product_data.images = products[0].images;

        product_data.sale_price = products[0].sale_price;
        product_data.original_price = products[0].original_price;
        product_data.value_price = products[0].value_price;

        if(products[0].upsell) {
          product_data.upsell = products[0].upsell;
        }

        if(products[0].children) {
          product_data.children = products[0].children;
        }
         
        fetchProductData(products[0].handle, cb);
      });
    }
  }

  function calculateFloatingPosition() {
    var container_height = cache.$details_container.height();
    var header_height = theme.Header.getHeight();
    var distance_from_top = $(this).scrollTop();

    $(selectors.floating_container).each(function() {
      var floating_height = $(this).height();      

      if($(this).hasClass("product-images__dots")) {
        floating_height += 360;
      }

      if((floating_height) + distance_from_top - header_height + 40 > container_height) {
        $(this).addClass("bottom-reached");
      }
      else {
        $(this).removeClass("bottom-reached");
      }
    });
  }

  function Product(container) {
    cache.subtype = $(container).attr("data-section-subtype");

    cache.pdp_data = pdp_data;

    cache.selected_product = theme.settings.product_handle;

    cache.swatch_type = "grid";

    $(window).on("scroll", checkViewportImage);

    cache.$quantity_down.on("click", decreaseQuantity);
    cache.$quantity_up.on("click", increaseQuantity);

    //if(cache.$floating_container.length > 0) {
      $(window).on("scroll", calculateFloatingPosition);
      $(window).trigger("scroll");
    //}

    if(cache.pdp_data.template == "simple") {
      createDefaultForm();
    }
    else if(cache.pdp_data.template == "group") {
      cache.$group_input.on("change", handleGroupChange);
      cache.$group_input.filter("[checked]").last().trigger("change");
    }
    else if(cache.pdp_data.template == "mvp") {
      if(cache.pdp_data.has_pan) {
        buildMVPGroup();
        $(document).on("change", selectors.mvp_group, handleMVPGroupChange);  

        if($(selectors.mvp_group_input).length > 0) {
          $(document).on("change", selectors.mvp_group_input, handleMVPGroupChange);  
        }
      }

      $(document).on("change", selectors.mvp_input, handleMVPChange);
      $(document).on("change", selectors.mvp_filter_input, selectMVPFilter);
      $(document).on("click", selectors.mvp_swatch_toggle, toggleMVPFilters);

      if(cache.pdp_data.undertones) {
        $(document).on("change", selectors.mvp_filter_undertone, applyMVPUndertoneFilter);
        buildMVPFilters(cache.pdp_data.undertones, "undertone");
        $(selectors.mvp_swatch_toggle).show();
      }

      if(cache.$group_input.length > 0) {
        cache.$group_input.on("change", handleGroupChange);
        cache.$group_input.first().trigger("change");
      }

      if(cache.pdp_data.skintones) {
        $(document).on("change", selectors.mvp_filter_skintone, applyMVPSkintoneFilter);
        buildMVPFilters(cache.pdp_data.skintones, "skintone");
        $(selectors.mvp_swatch_toggle).show();
      }
      else {
        cache.mvp_show_button = false;
      }

      buildMVPSwatches();

      if($(selectors.mvp_input_selected).length > 0) {
        $(selectors.mvp_input_selected).change();
      }
      else {
        handleMVPChange();
      }
    }

    $(document).on("click", selectors.oos_button, showOOS);
    $(document).on("click", selectors.oos_submit, submitOOS);

    if($(selectors.ulta_trigger).length > 0) {
      getCustomerLocation();
      $(document).on("click", selectors.ulta_trigger, buildUltaStoreLocator);
      $(document).on("keypress", selectors.ulta_input, getAddressLocation);
      $(document).on("click", selectors.ulta_store, triggerMarker);
    }
        
    $(document).on("click", selectors.ingredients, showIngredients);

    $(document).on("click", selectors.story_title, toggleStoryRow);
    $(document).on("change", selectors.story_mobile_tab, showChildStory);
    $(document).on("click", selectors.story_desktop_tab, showChildStory);

    if(cache.$tumblr.length > 0) {
      cache.$tumblr.masonry({
        itemSelector: '.product-masonry--block',
        columnWidth: '.masonry-sizer',
        percentPosition: true,
        gutter: 10
      });

      cache.$tumblr.imagesLoaded().progress(function() {
        cache.$tumblr.masonry('layout');
      });
    }

    return true;
  }

  function decreaseQuantity(e) {
    e.preventDefault();

    var current_quantity = parseInt(cache.$quantity_box.val());

    if(current_quantity <= 1) {
      cache.$quantity_box.val(1);
    }
    else {
      cache.$quantity_box.val(current_quantity - 1);
    }
  }

  function increaseQuantity(e) {
    e.preventDefault();

    cache.$quantity_box.val(parseInt(cache.$quantity_box.val()) + 1);    
  }

  function checkViewportImage() {
    $(selectors.product_images_desktop).each(function() {
      if($(this).isInViewport()) {
        var position = $(this).attr("data-position");
        if(cache.active_dot != position) {
          cache.active_dot = position;
          $(selectors.dots).removeClass("product-images__dot--active");
          $(selectors.dots).filter("[data-position='"+position+"']").addClass("product-images__dot--active");
        }
        
        return false;
      }
    });
  }

  function toggleMVPFilters(e) {
    e.preventDefault();

    if(cache.swatch_type == "grid") {
      cache.swatch_type = "carousel";
    }
    else {
      cache.swatch_type = "grid";
    }

    buildMVPSwatches();
  }

  function selectMVPFilter() {
    var filter_type = $(this).attr("data-filter-type");
    $(selectors.mvp_filter_dropdowns).filter("[data-filter-type='"+filter_type+"']").val($(this).val()).change();
  }

  function submitOOS() {
    var email = $(selectors.oos_email).val();
    var variant = $(selectors.oos_variant).val();
    var signup = $(selectors.oos_checkbox).prop("checked");

    if(email == "") {
      $(selectors.oos_email).focus();
    }
    else {
      var data = {
        "email": email,
        "variant": variant,
        "signup": signup
      }
  
      $.ajax({
        url: "https://colourpop-usps.azurewebsites.net/api/HttpTriggerKlaviyoBIS",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        complete: function(r) {
          $(selectors.oos_container).html(" \
            <div class='product-oos__success'> \
              <div class='product-oos__success--message'> \
                <span>You're on the list!</span>We'll let you know when this baby's back! \
              </div> \
            </div>");
          
          setTimeout(function() {
            $.fancybox.close();
          }, 3000);
        }
      });
    }
  }

  function showOOS() {
    var product = getSelectedProduct();

    var string = " \
      <div class='product-oos__container'> \
        <label class='product-oos__title'>"+product.title+"</label> \
        <p class='product-oos__text'>Sign up to be notified the minute this baby is back in stock!</p> \
        <input type='hidden' class='product-oos__variant' value='"+product.variant_id+"' /> \
        <input type='email' placeholder='Email' class='product-oos__email' value='' /> \
        <button type='submit' class='btn btn-secondary product-oos__button'>LMK WHEN IT'S BACK</button> \
		    <label class='product-oos__label'> \
          <input type='checkbox' class='product-oos__checkbox' checked=''> \
          Add me to your email list. \
        </label> \
      </div>";

      $.fancybox.open(string, {
        type: "inline",
        touch: false
      });
  }

  function showIngredients() {
    var product_handle = $(this).attr("data-product-handle");

    theme.Shopify.getProduct(product_handle).then(function(products) {
      var string = " \
        <div class='ingredients-popup'> \
          <label class='ingredients-popup__title'>Ingredients</label> \
          <label class='ingredients-popup__product'>"+products[0].title+"</label> \
          <p class='ingredients-popup__ingredients'>"+products[0].ingredients+"</p> \
        </div>";

      $.fancybox.open(string);
    });
  }

  function buildMVPGroup() {
    cache.$form.prepend(" \
      <div class='product-actions__packaging'> \
        <label class='product-actions__packaging--title'>Packaging:</label> \
        <ul class='product-actions__packaging--container'> \
          <li class='product-actions__packaging--block'> \
            <input class='product-actions__packaging--input' id='package-compact' checked='checked' type='radio' name='group' value='compact' /> \
            <label class='product-actions__packaging--label' for='package-compact'>Compact</label> \
          </li><li class='product-actions__packaging--block'> \
            <input class='product-actions__packaging--input' id='package-pan' type='radio' name='group' value='pan' /> \
            <label class='product-actions__packaging--label' for='package-pan' class='product-actions__packaging--option'>Pan <span class='visually-hidden'>only</span></label> \
          </li> \
        </ul> \
      </div>");
  }

  function buildMVPSwatches() {
    var found = false;
    var start_position = 0;

    $(selectors.mvp_container).remove();

    $.each(cache.pdp_data.product_data, function(handle, product_data) {
      if(cache.selected_product == handle) {
        found = true;
      }

      if(!found) {
        start_position += 1;
      }
    });

    var $swatches = $("<div class='product-details__mvp product-details__mvp--"+cache.pdp_data.type+"'> \
      <div class='product-details__mvp-selected'> \
        Selected:  \
        <span class='product-details__mvp-selected--swatch' style='background:"+(cache.pdp_data.product_data[cache.selected_product] ? cache.pdp_data.product_data[cache.selected_product].hex : "")+"'></span> \
        <label class='product-details__mvp-selected--label'>"+(cache.pdp_data.product_data[cache.selected_product] ? cache.pdp_data.product_data[cache.selected_product].title : "")+"</label> \
      </div><div class='product-details__mvp-description'>"+(cache.pdp_data.product_data[cache.selected_product] ? cache.pdp_data.product_data[cache.selected_product].shade_description : "")+"</div> \
      <div class='product-details__mvp-swatches "+(cache.swatch_type == "carousel" ? "owl-carousel owl-theme" : "")+"' "+(cache.swatch_type == "carousel" ? "data-nav data-autoWidth data-startPosition='"+(found ? start_position: 0)+"'" : "")+"></div> \
      "+(cache.mvp_show_button ? "<button class='text-link product-details__mvp-toggle'><!--via css--></button>" : ""));
    
    if(cache.pdp_data.skintones && cache.swatch_type == "grid") {
      var $groups = {};
      $.each(cache.pdp_data.skintones, function(index, skintone) {
        $groups[skintone] = $("<div class='product-details__mvp-group' data-skintone='"+skintone+"'> \
          <label class='product-details__mvp-group--title'>"+skintone+"</label> \
        </div>");
      });
    }

    $.each(cache.pdp_data.product_data, function(handle, product_data) {
      //if(cache.swatch_type == "carousel") {
        if(cache.mvp_undertone != "" && product_data.undertone.indexOf(cache.mvp_undertone) == -1) {
          return true;
        }

        if(cache.mvp_skintone != "" && product_data.skintone != cache.mvp_skintone) {
          return true;
        }
      //}

      var swatch_string = "<div class='product-details__mvp-swatch' "+(product_data.skintone ? "data-product-skintone='"+product_data.skintone+"'" : "")+" "+(product_data.undertone ? "data-product-undertone='"+product_data.undertone.join(",")+"'" : "")+"> \
        <input id='swatch-"+handle+"' class='product-details__mvp-swatch--input visually-hidden' value='"+handle+"' type='radio' name='product' "+((cache.selected_product == handle) ? "checked='checked'" : "")+" /> \
        <label class='product-details__mvp-swatch--label' for='swatch-"+handle+"'> \
          <img src='"+(product_data.swatch.indexOf("shopify.com") > -1 ? product_data.swatch : (cl.url(theme.cloudinary.multi_variant+product_data.swatch)))+"' alt='"+handle+"' /> \
        </label> \
      </div>";

      if($groups) {
        $groups[product_data.skintone].append(swatch_string);
      }
      else {
        $swatches.find(".product-details__mvp-swatches").append(swatch_string);
      }
    });

    if($groups) {
      $.each($groups, function(skintone, $group) {
        $swatches.find(".product-details__mvp-swatches").append($group);
      });
    }

    if($(selectors.mvp_filter_container).length > 0) {
      $(selectors.mvp_filter_container).last().after($swatches);
    }
    else {
      cache.$form.prepend($swatches);
    }    

    if($(selectors.mvp_swatch_container).hasClass("owl-carousel")) {
      $(selectors.mvp_swatch_container).trigger("to.owl.carousel", $(selectors.mvp_input_selected).parent().parent().index());
    }
  }

  function buildMVPFilters(filters, type) {
    var $container = $("<div class='product-details__mvp-filters'><label class='product-details__mvp-filters--title'>"+type+":</label></div>");
    var $dropdown = $("<select class='product-details__mvp-filter--dropdown' data-filter-type='"+type+"'><option value=''>All</option></select>");
    var $inputs = $("<div class='product-details__mvp-filter--inputs'><div class='product-details__mvp-filter--input'><input class='visually-hidden' type='radio' data-filter-type='"+type+"' name='mvp-filter-"+type+"' value='' id='mvp-filter-"+type+"-all' checked='checked' /><label for='mvp-filter-"+type+"-all'>all</label></div></div>");

    if(type == "undertone") {
      $container.append("<a href='#undertone-popup' data-fancybox class='undertone__show-popup'><span class='visually-hidden'>What's my undertone</span>?</a>");
    }

    $.each(filters, function(index, filter) {
      $dropdown.append("<option value='"+filter+"'>"+filter+"</option>");
      $inputs.append("<div class='product-details__mvp-filter--input'><input class='visually-hidden' data-filter-type='"+type+"' type='radio' name='mvp-filter-"+type+"' value='"+filter+"' id='mvp-filter-"+type+"-"+filter+"' /><label for='mvp-filter-"+type+"-"+filter+"'>"+filter+"</label></div>")
    });

    $container.append($dropdown);
    $container.append($inputs);

    cache.$form.prepend($container);
  }

  function handleMVPGroupChange() {
    $(selectors.mvp_input_selected).trigger("change");
  }

  function handleMVPChange(e) {
    if(e) {
      cache.selected_product = $(this).val();
    }

    if(cache.pdp_data.upsell_type == "foundation" || cache.pdp_data.type == "no-filter-matte-foundation" || cache.pdp_data.type == "no-filter-foundation-stix") {
      theme.Foundation.buildFoundationUpsell(cache.$story_container, false);
    } 

    // CHANGE: THIS SHOULD LOOK AT THE SETTINGS PRODUCT
    if($(selectors.mvp_group_selected).length > 0) {
      if($(selectors.mvp_group_selected).val() == "pan") {
        cache.selected_product = cache.pdp_data.product_data[cache.selected_product].pan;
        //cache.selected_product = cache.selected_product.replace("-compact", "");
      }
    }

    fetchProductData(cache.selected_product, [
      updateSelectedSwatch,
      updatePrice,
      updateTitle,
      updateDescription,
      buildUpsellProduct,
      buildProductCTA,
      buildImageSlide,
      buildCompleteYourLook,
      changeWishlistHandle,
      changeIngredientHandle,
      buildChildren,
      buildProductStory
    ]);
  }  

  function createDefaultForm() {
    fetchProductData(cache.selected_product, [
      buildProductCTA,
      buildUpsellProduct,
      buildCompleteYourLook,
      buildChildren,
      buildProductStory
    ]);
  }

  function handleGroupChange() {
    cache.selected_product = $(this).val();

    fetchProductData(cache.selected_product, [
      updatePrice,
      buildProductCTA,
      buildImageSlide,
      buildUpsellProduct,
      buildCompleteYourLook,
      changeWishlistHandle,
      buildChildren,
      buildProductStory
    ]);
  }



  function buildProductStory(product) {
    cache.$story_container.empty();
    cache.has_story = false;
    
    if(product.children && product.children.length > 0) {
      var promises = product.children.map(function(child_data) {
        return new Promise(function(resolve) {
          theme.Shopify.getProduct(child_data.handle).then(function(products) {
            resolve({ product: products[0], use_mini_kit: child_data.useminikit });
          });
        });
      });

      cache.$story_container.append(" \
        <div class='product-story__mobile-tabs'> \
          <select class='product-story__mobile-tab'> \
          </select> \
        </div> \
        <ul class='product-story__desktop-tabs' aria-hidden='true'> \
        </ul>");
    }
    else {
      var promises = [theme.Shopify.getProduct(product.handle)];
    }

    cache.$story_container.append(" \
      <div class='product-story__container'> \
      </div>");

    Promise.all(promises).then(function(products) {
      $.each(products, function(index, product_data) {
        var product = (product_data.length ? product_data[0] :product_data.product);

        if($(selectors.story_mobile_tabs).length > 0) {
          $(selectors.story_mobile_tabs).append("<option value='"+product.handle+"'>"+product.title+"</option>");
        }
        
        if($(selectors.story_desktop_tabs).length > 0) {
          $(selectors.story_desktop_tabs).append(" \
            <li data-vendor='"+product.vendor+"' class='product-story__desktop-tab' role='tab' aria-selected='false' aria-controls='"+product.handle+"-box' style='width: "+(100/products.length)+"%' data-child-handle='"+product.handle+"'> \
              <button class='text-link' href='#story_"+product.handle+"'> \
                "+product.title+" \
              </button> \
            </li>");
        }

        if(product.vendor == "fourth ray beauty") {
          var string = " \
            <div data-vendor='"+product.vendor+"' aria-labelledby='"+product.handle+"-tab' role='tabpanel' "+(index == 0 ? "" : "style='display:none;'")+" id='"+product.handle+"-box' class='product-story__children' data-child-handle='"+product.handle+"'> \
              <div class='product-story__block'> \
                <div class='product-story__block-row'> \
                  <div class='product-story__block-title'>"+product.type+"</div> \
                  <div class='product-story__block-description product-story__block-description--type'> \
                    "+product.description+" \
                    "+((product_data.use_mini_kit && product.mini_kit_net_weight) ? "<p><b>Net Weight&nbsp;</b> "+product.mini_kit_net_weight+"</p>" : (product.net_weight ? "<p><b>Net Weight&nbsp;</b> "+product.net_weight+"</p>" : ""))+" \
                  </div> \
                </div>";

          if(product.function_icons && product.function_icons.length > 0) {
            cache.has_story = true;
            
            string += " \
                <div class='product-story__block-row product-story__block-row--badges'>";
            $.each(product.function_icons, function(index, icon) {
              string += " \
                  <div class='product-story__block-badge'> \
                    <img class='product-story__block-badge--image' src='"+icon.image+"' alt='' /> \
                    <label class='product-story__block-badge--label'>"+icon.title+"</label> \
                  </div>";
            });
            string += " \
                </div>";
          }

          string += " \
            <div class='product-story__block-row hidetablet'> \
              <a class='product-story__block-title text-link product-story__ingredients' href='#view-ingredients' data-product-handle='"+product.handle+"'> \
                ingredients \
              </a> \
            </div> \
            <div class='product-story__block-row showtablet'> \
              <div class='product-story__block-title'>ingredients</div> \
              <div class='product-story__block-description product-story__block-description--type'>"+product.ingredients+"</div> \
            </div>";
          
          if(product.ingredient_icons && product.ingredient_icons.length > 0) {
            cache.has_story = true;

            var ingredient_popup = " \
              <div class='fancybox__markup'>";

            string += "<div class='product-story__block-row product-story__block-row--ingredients'>";
            $.each(product.ingredient_icons, function(index, icon) {
              string += "<div class='product-story__block-ingredient'> \
                <a data-fancybox href='#"+icon.handle+"'> \
                  <img class='product-story__block-ingredient--image' src='"+icon.image+"' alt='' /> \
                  <label class='product-story__block-ingredient--label'>"+icon.title+"</label> \
                </a> \
              </div>";

              ingredient_popup += " \
                <div id='"+icon.handle+"' class='popup__ingredient'> \
                  <div class='popup__ingredient--image'> \
                    <img src='"+icon.image+"' alt='' /> \
                  </div><div class='popup__ingredient--content'> \
                    <label class='product__ingredient--name'>"+icon.title+"</label> \
                    <p>"+icon.description+"</p> \
                  </div> \
                </div>";
            });
            string += "</div>";
            ingredient_popup += "</div>";

            $(selectors.story_container).after(ingredient_popup);
          }

          string += "</div><div class='product-story__block'>";

          if(product.video && product.video != "") {
            cache.has_story = true;

            string += " \
              <div class='product-story__block-row product-story__block-row--video'> \
                <div class='product-story__block-video'> \
                  <iframe src='https://www.youtube.com/embed/"+product.video+"?autoplay=0&cc_load_policy=1&showinfo=0&controls=1&mute=1&loop=1&playlist=oNBev2z04mo&html5=1' frameborder='0' allowfullscreen></iframe> \
                </div> \
              </div>";
          }

          if(product.application_tips && product.application_tips != "") {
            cache.has_story = true;
            
            string += " \
              <div class='product-story__block-row'> \
                <div class='product-story__block-title'>application tips</div> \
                <div class='product-story__block-description product-story__block-description--application'>"+product.application_tips+"</div> \
              </div>";
          }

          string += "</div>";

          if(product.video && product.video != "") {
            string += " \
              <div class='product-story__block product-story__block--video'> \
                <div class='product-story__block-row open'> \
                  <div class='product-story__block-video'> \
                    <iframe src='https://www.youtube.com/embed/"+product.video+"?autoplay=1&cc_load_policy=1&showinfo=0&controls=1&mute=1&loop=1&playlist=oNBev2z04mo&html5=1' frameborder='0' allowfullscreen></iframe> \
                  </div> \
                </div> \
              </div>";     
          }

          string += "</div> \
            </div>";
        }
        else {
          var string = " \
          <div data-vendor='"+product.vendor+"' aria-labelledby='"+product.handle+"-tab' role='tabpanel' "+(index == 0 ? "" : "style='display:none;'")+" id='"+product.handle+"-box' class='product-story__children' data-child-handle='"+product.handle+"'> \
              <div class='product-story__block'>";
              if(product.badges) {
                cache.has_story = true;
                string += "<div class='product-story__block-row product-story__block-row--badges'>";
                $.each(product.badges, function(index, badge_info) {
                  string += " \
                      <div class='product-story__block-badge'> \
                        <img class='product-story__block-badge--image' src='"+badge_info.image+"' alt='' /> \
                        <label class='product-story__block-badge--label'>"+badge_info.title+"</label> \
                      </div>";
                });
                string += "</div>";
              }
              
              if(product.type_description && product.type_description != "") {
                cache.has_story = true;
                string += " \
                  <div class='product-story__block-row'> \
                    <div class='product-story__block-title'>"+product.type+"</div> \
                    <div class='product-story__block-description product-story__block-description--type'> \
                      "+product.type_description+" \
                      "+((product_data.use_mini_kit && product.mini_kit_net_weight) ? "<p><b>Net Weight&nbsp;</b> "+product.mini_kit_net_weight+"</p>" : (product.net_weight ? "<p><b>Net Weight&nbsp;</b> "+product.net_weight+"</p>" : ""))+" \
                    </div> \
                  </div>";
              }

              if(product.ingredients && product.ingredients != "") {
                cache.has_story = true;
                string += " \
                  <div class='product-story__block-row hidetablet'> \
                    <a class='product-story__block-title text-link product-story__ingredients' href='#view-ingredients' data-product-handle='"+product.handle+"'> \
                      ingredients \
                    </a> \
                  </div> \
                  <div class='product-story__block-row showtablet'> \
                    <div class='product-story__block-title'>ingredients</div> \
                    <div class='product-story__block-description product-story__block-description--type'>"+product.ingredients+"</div> \
                  </div>";
              }
              
              string += "</div><div class='product-story__block'>";

              if(product.video && product.video != "") {
                cache.has_story = true;
                string += " \
                  <div class='product-story__block-row product-story__block-row--video'> \
                    <div class='product-story__block-video'> \
                      <iframe src='https://www.youtube.com/embed/"+product.video+"?autoplay=1&cc_load_policy=1&showinfo=0&controls=1&mute=1&loop=1&playlist=oNBev2z04mo&html5=1' frameborder='0' allowfullscreen></iframe> \
                    </div> \
                  </div>";
              }

              if(product.application_tips && product.application_tips != "") {
                cache.has_story = true;
                string += " \
                  <div class='product-story__block-row'> \
                    <div class='product-story__block-title'>application tips</div> \
                    <div class='product-story__block-description product-story__block-description--application'>"+product.application_tips+"</div> \
                  </div>";
              }

              string += "</div>";

              if(product.video && product.video != "") {
                string += " \
                  <div class='product-story__block product-story__block--video'> \
                    <div class='product-story__block-row open'> \
                      <div class='product-story__block-video'> \
                        <iframe src='https://www.youtube.com/embed/"+product.video+"?autoplay=1&cc_load_policy=1&showinfo=0&controls=1&mute=1&loop=1&playlist=oNBev2z04mo&html5=1' frameborder='0' allowfullscreen></iframe> \
                      </div> \
                    </div> \
                  </div>";
              }
          string += " \
              </div>";
        }
        
        $(selectors.story_container).append(string);

        $(selectors.story_desktop_tab).first().click();
      });

      if(cache.has_story) {
        $(selectors.story_container).show();
        $(selectors.story_container).children().first().show();
      }
      else {
        $(selectors.story_container).remove();
      }
    });
  }


  function applyMVPUndertoneFilter() {
    var undertone = $(this).val();
    cache.mvp_undertone = undertone;

    if(cache.swatch_type == "grid" && $(window).width() > theme.settings.breakpoint.tablet) {
      $(selectors.mvp_block).each(function() {
        if($(this).attr("data-product-undertone").indexOf(undertone) > -1 || undertone == "") {
          $(this).css("display", "inline-block");
        }
        else {
          $(this).hide();
        }
      });
    }
    else {
      buildMVPSwatches();  
    }
  }

  function applyMVPSkintoneFilter() {
    var skintone = $(this).val();
    cache.mvp_skintone = skintone;
    
    if(cache.swatch_type == "grid" && $(window).width() > theme.settings.breakpoint.tablet) {
      $(selectors.mvp_group).each(function() {
        if($(this).attr("data-skintone") == skintone || skintone == "") {
          $(this).css("display", "inline-block");
        }
        else {
          $(this).hide();
        }
      });
    }
    else {
      buildMVPSwatches();  
    }
  }

  function changeIngredientHandle(product) {
    $(selectors.ingredients).attr("data-product-handle", cache.selected_product);
  }

  function getUpsellProductString(product) {
    var upsell = " \
      <form action='/cart/add' method='post' class='product-details__upsell-container'> \
        <div class='product-details__upsell-image'> \
          <img class='visible' src='"+theme.Shopify.getSizedImageUrl(product.images[0], "720x1080")+"' alt=''> \
        </div><div class='product-details__upsell-info'> \
          <label class='product-details__upsell-info--title'>"+cache.pdp_data.product_data[cache.selected_product].upsell_text+"</label> \
          <label class='product-details__upsell-info--product'>"+product.title+"</label> \
          <div class='product-details__upsell-info--description'>"+product.description+"</div> \
          <label class='product-details__upsell-info--price'> \
            "+theme.Product.createPriceDisplay(product)+" \
          </label>";
    
    if(product.preview) {
      upsell += "<input type='submit' class='btn' value='Use Code: GETBLENDT' disabled />";
    }
    else if(product.available) {
      upsell += " \
        <input type='hidden' id='id' name='id' value='"+product.variant_id+"' /> \
        <input type='hidden' id='quantity' name='quantity' value='1' /> \
        <input type='submit' class='btn' value='Add to Bag' />";
    }
    else {
      upsell += "<input type='submit' class='btn' value='SOLD OUT' disabled />";
    }
    
    upsell += " \
        </div> \
      </form>";

    return upsell;
  }

  function buildUpsellProduct(product, string_only) {
    if(string_only) {
      return getUpsellProductString(product);
    }

    if(product["loose-powder"] || product["pressed-powder"] || product["concealer"]) {
      theme.Foundation.showFoundationUpsell();

      if(product["loose-powder"]) {
        theme.Foundation.selectFoundationUpsell("loose-powder", product["loose-powder"][0]);
      }

      if(product["pressed-powder"]) {
        theme.Foundation.selectFoundationUpsell("pressed-powder", product["pressed-powder"][0]);
      }

      if(product["concealer"]) {
        theme.Foundation.selectFoundationUpsell("concealer", product["concealer"][0]);
      }
    }
    else {
      theme.Foundation.hideFoundationUpsell();
    }

    if(product.upsell) {
      theme.Shopify.getProduct(product.upsell).then(function(products) {
        var product = products[0];

        if(!product) {
          console.warn("Cannot find: "+ product.upsell);
          return true;
        }

        if(cache.$upsell_banner.length > 0) {
          var string = " \
            <div class='banner-upsell__container'> \
              <div class='banner-upsell__background'>";
              if(product.handle == "body-kabuki") {
                string += "<picture> \
                  <source media='(min-width: 1025px)' srcset='https://cdn2.shopify.com/s/files/1/1338/0835/files/sol-upsell-brush-desktop.jpg?402833' /> \
                  <source media='(min-width: 768px)' srcset='https://cdn2.shopify.com/s/files/1/1338/0835/files/sol-upsell-brush-tabletmobile.jpg?403129' /> \
                  <source media='(min-width: 0px)' srcset='https://cdn2.shopify.com/s/files/1/1338/0835/files/sol-upsell-brush-tabletmobile.jpg?403129' /> \
                  <img src='https://cdn2.shopify.com/s/files/1/1338/0835/files/sol-upsell-brush-desktop.jpg?402833' alt=''> \
                </picture>";
              }
              else 
              {
                string += "<picture> \
                  <source media='(min-width: 1025px)' srcset='https://cdn2.shopify.com/s/files/1/1338/0835/files/sol-upsell-dryoil-desktop.jpg?403129' /> \
                  <source media='(min-width: 768px)' srcset='https://cdn2.shopify.com/s/files/1/1338/0835/files/sol-upsell-dryoil-tabletmobile.jpg?403129' /> \
                  <source media='(min-width: 0px)' srcset='https://cdn2.shopify.com/s/files/1/1338/0835/files/sol-upsell-dryoil-tabletmobile.jpg?403129' /> \
                  <img src='https://cdn2.shopify.com/s/files/1/1338/0835/files/sol-upsell-dryoil-desktop.jpg?403129' alt=''> \
                </picture>";            
              }
            string += "</div> \
              <div class='banner-upsell__content'> \
                <div class='banner-upsell__block'> \
                  <label class='banner-upsell__content--subtitle'>"+(product.upsell_text ? product.upsell_text : 'The Perfect Pair')+"</label> \
                  <label class='banner-upsell__content--title'>"+product.title+"</label> \
                  <label class='banner-upsell__content--price'> \
                    "+theme.Product.createPriceDisplay(product)+" \
                  </label> \
                  <p class='banner-upsell__content--description'>"+product.upsell_description+"</p> \
                  <form class='banner-upsell__content--form' action='/cart/add' method='POST'> \
                    <input type='hidden' name='id' value='"+product.variant_id+"' /> \
                    <input type='hidden' name='quantity' value='1' />";
          if(product.available) {
            string += "<input class='banner-upsell__content--submit' type='submit' value='add to bag' />";
          }
          else {
            string += "<input class='banner-upsell__content--submit' disabled type='submit' value='out of stock' />";
          }
          string += "</form> \
                </div> \
              </div> \
            </div>"
                
          cache.$upsell_banner.html(string);
        }
        else {
          var upsell = getUpsellProductString(product);
          
          if($(selectors.upsell).length > 0) {
            $(selectors.upsell).replaceWith(upsell);
          }
          else {
            cache.$upsell_container.append(upsell);
          }
        }
      });
    }
    else {
      cache.$upsell_container.empty();
    }
  }

  function buildProductCTA(product) {
    $(selectors.action_button).remove();

    if(product.preview) {
      ga('send', 'event', 'Preview Product', 'view', product.sku, (product.sale_price / 100).toFixed(0), {
        nonInteraction: true
      });
      
      cache.$form.append(" \
        <div class='product-actions__buttons product-actions__buttons--preview'> \
          <input type='submit' class='btn' value='Use Code: GETBLENDT' disabled /> \
        </div>");
    }
    else if(product.available) {
      cache.$form.append(" \
        <div class='product-actions__buttons product-actions__buttons--available'> \
          <input type='hidden' id='id' name='id' value='"+product.variant_id+"' /> \
          <input type='submit' class='btn' value='Add to Bag' /> \
        </div>");
    }
    else if(product.show_oos_email) {
      ga('send', 'event', 'OOS Product', 'view', product.sku, (product.sale_price / 100).toFixed(0), {
        nonInteraction: true
      });
      
      cache.$form.append(" \
        <div class='product-actions__buttons product-actions__buttons--out-of-stock'> \
          <a href='#show-oos' class='btn'>EMAIL ME <span class='visually-hidden'>When back in stock</span></a><input type='submit' class='btn' value='SOLD OUT' disabled /> \
        </div>");
    }
    else {
      ga('send', 'event', 'OOS Product', 'view', product.sku, (product.sale_price / 100).toFixed(0), {
        nonInteraction: true
      });
      
      cache.$form.append(" \
        <div class='product-actions__buttons product-actions__buttons--unavailable'> \
          <input type='submit' class='btn' value='SOLD OUT' disabled /> \
        </div>");
    }
  }

  function buildImageSlide(product) {
    var image_string = "";
    var dots_string = "";
    var image_list = [];

    $.each(product.images, function(index, src) {
      if(cache.subtype == "solbody" && (index == product.images.length - 1)) {
        return false;
      }
      
      image_list.push(src);
      image_string += " \
        <div class='product-image' data-src='"+src+"' data-position='"+index+"'> \
          <span class='visually-hidden'>Click to view original size Image</span> \
          <img src='"+src+"' alt='' /> \
        </div>";

      if(product.images.length > 1) {
        dots_string += "<span class='product-images__dot "+(index == cache.active_dot ? "product-images__dot--active" : "")+"' data-position='"+index+"'></span>";
      	$(selectors.product_right_container).addClass("product-details__floating");
      }
      else {
        $(selectors.product_right_container).removeClass("product-details__floating");
      }
    });

    theme.Shopify.preloadImages(image_list).done(function(images) {
      cache.$dot_container.html(dots_string);

      cache.$images.each(function() {
        if($(this).hasClass("owl-carousel")) {
          cache.$images.trigger("replace.owl.carousel", image_string);
          cache.$images.trigger("to.owl.carousel", 0);
          cache.$images.trigger("refresh.owl.carousel");
        }
        else {
          $(this).html(image_string);
        }
      });      
    });
  }

  function updateSelectedSwatch(product) {
    $(selectors.mvp_selected_label).html(product.title);
    $(selectors.mvp_selected_swatch).css("background", product.hex);
    $(selectors.shade_description).html(product.shade_description);

    if($(window).width() < theme.settings.breakpoint.desktop && !$(selectors.mvp_swatch_container).hasClass("owl-carousel") && cache.pdp_data.skintones) {
      cache.swatch_type = "carousel";
      buildMVPSwatches();
    }
  }

  function updatePrice(product) {
    if(!product) {
      product = getSelectedProduct();
    }

    cache.$price.html(createPriceLabel(product));
  }

  function updateTitle(product) {
    if(!product) {
      product = getSelectedProduct();
    }

    if(cache.$type.length == 0) {
      cache.$title.html(product.type);
    }
    else {
      cache.$title.html(product.title);
    }
  }

  function updateDescription(product) {
   if(!product) {
      product = getSelectedProduct();
    }

    cache.$description.html(product.header_description);
    cache.$description.append("<span class='product-details__description--shade'>"+product.description+"</span>");
    //if(product.shade_description != "" && cache.pdp_data.template != "mvp") {
    //  cache.$description.append("<span class='product-details__description--shade'>"+product.shade_description+"</span>");
    //}
  }

  function buildCompleteYourLook(product) {
    cache.$complete_your_look.empty();
    
    jQuery.getJSON("/recommendations/products.json?product_id="+product.id, function(response) {
      theme.Shopify.getProducts(response.products).then(function(products) {
        cache.$complete_your_look.append(createProductCarousel(products));
        cache.$complete_your_look_container.show();
      });
    });
  }

  function buildChildren(product) {
    if(cache.pdp_data.vendor != "colourpop") {
      return;
    }
    
    if(product.children && product.children.length > 0) {
      if($(selectors.children_container).length == 0) {
        cache.$social_container.after(" \
          <div class='product-details__children'> \
            <label class='product-details__children-title'>Inside the Bundle <span> ("+product.children.length+" items)</span></label> \
            <div class='product-details__children-carousel owl-carousel owl-theme' data-desktop='3' data-tablet='3' data-mobile='2' data-nav></div> \
          </div>");
      }
      else {
        $(selectors.children_carousel).empty();
      }

      var promises = product.children.map(function(child_data) {
        return new Promise(function(resolve) {
          theme.Shopify.getProduct(child_data.handle).then(function(products) {
            resolve({ product: products[0], use_mini_kit: child_data.useminikit });
          });
        });
      });
  
      Promise.all(promises).then(function(products) {
        $.each(products, function(index, product_data) {
          if(!product_data.product) {
            return true;
          }

          var string = " \
            <div class='product-details__children-carousel-item'> \
              <a href='"+product_data.product.url+"'> \
                <img class='product-details__children-carousel-item--image' src='"+(product_data.use_mini_kit ? product_data.product.mini_image : product_data.product.images[0])+"' /> \
              </a> \
              <div class='product-details__children-carousel-item--info'> \
                <label class='product-details__children-carousel-item--title'>"+product_data.product.title+"</label> \
                <label class='product-details__children-carousel-item--type'>"+product_data.product.type+"</label> \
                <p class='product-details__children-carousel-item--description'>"+product_data.product.shade_description+"</p> \
              </div> \
            </div>";

          $(selectors.children_carousel).trigger("add.owl.carousel", string);
          $(selectors.children_carousel).trigger("refresh.owl.carousel");
        });
      });
    }
    else {
      $(selectors.children_container).remove();
    }
  }

  function changeWishlistHandle(product) {
    theme.Wishlist.changeWishlistProduct($(selectors.wishlist), cache.selected_product);
    theme.Wishlist.forceProcessQueue();
  }

  function toggleStoryRow() {
    $(this).parent().toggleClass("open");
  }

  function showChildStory() {
    if($(this).is("select")) {
      var child_handle = $(this).val();
    }
    else {
      var child_handle = $(this).attr("data-child-handle");
    }

    if(!$(this).hasClass("active")) {
      $(selectors.story_desktop_tab).attr("aria-selected", false);
      $(selectors.story_desktop_tab).removeClass("active");
      $(selectors.story_desktop_tab).filter("[data-child-handle='"+child_handle+"']").addClass("active");
      $(selectors.story_desktop_tab).filter("[data-child-handle='"+child_handle+"']").attr("aria-selected", true);

      $(selectors.story_child).hide();
      $(selectors.story_child).filter("[data-child-handle='"+child_handle+"']").show();
    }
  }

  function createProductCarousel(products, remove_loop) {
    var string = "<div class='owl-carousel owl-theme owl-carousel--collection' data-autoWidth "+(remove_loop ? "" : "data-loop")+" data-nav data-desktop='6'>";
    $.each(products, function(index, product) {
      if(product) {
        string += createProductCard(product, true, index);
      }
    });
    string += "</div>";

    return string;
  }

  function createProductCard(product, return_string, index) {
    if(!product.sale_price) {
      var prices = getPrice(product);

      product.sale_price = prices.sale_price;
      product.original_price = prices.original_price;
      product.value_price = prices.value_price;
    }

    var string = "<div aria-labelledby='listing-title-"+product.id+"' aria-describedby='listing-description-"+product.id+"' class='owl-carousel__item owl-carousel__item--product' data-handle='"+product.handle+"'> \
      <div class='carousel-product'>";

      console.log(product);

    if(product.top_banner) { 
      if(theme.badges[product.top_banner]) {
        string += " \
          <div class='product__listing-banner "+(theme.badges[product.top_banner].circle ? "product__listing-banner--circular" : void 0)+"'> \
            <img src='"+theme.badges[product.top_banner].image+"' alt='"+theme.badges[product.top_banner].title+"' /> \
          </div>"; 
      }
      else {
        console.warn("Cannot find badge: "+product.top_banner);
      }
    }
    
    string += " \
        <div class='carousel-product__image'> \
          <a href='"+product.url+"'>";
    if(index > 3) {
      string += "<img class='owl-lazy' data-src='"+theme.Shopify.getSizedImageUrl(product.images[0], ($(window).width() < theme.settings.breakpoint.desktop ? "480x" : "340x"))+"' alt='"+product.title+"' />"
    }
    else {
      string += "<img src='"+theme.Shopify.getSizedImageUrl(product.images[0], ($(window).width() < theme.settings.breakpoint.desktop ? "480x" : "340x"))+"' alt='"+product.title+"' />"
    }
    string += " \
          </a> \
        </div> \
        <div class='carousel-product__info'> \
          <div class='wishlist__container wishlist__container--carousel' data-handle='"+product.handle+"'></div> \
          <label class='carousel-product__info--title' id='listing-title-"+product.id+"'>"+product.title+"</label> \
          <label class='carousel-product__info--type'>"+product.type+"</label> \
          <label class='carousel-product__info--price'> \
            "+createPriceDisplay(product)+" \
          </label>";
          if(theme.settings.pathname == "/" || true) {
            string += "<p class='carousel-product__info--description'> \
              "+product.display_description+" \
            </p>";
          }
          string += "<div class='carousel-product__info--rating'> \
            <div class='yotpo bottomLine' data-product-id='"+product.id+"'></div> \
          </div> \
        </div> \
        <div class='carousel-product__action' data-handle='"+product.handle+"'>";
        if(isParentProduct(product)) {
          if(product.handle == "sunset-blvd-1" || product.handle == "flaming-hot" || product.handle == "dreamhouse" || product.handle == "blue-lagoon") {
            string += "<a href='/pages/create-your-own-palette' class='btn product__listing-actions--parent'>build your own palette</a>";
          }
          else if(product.handle == "rose-quartz-signature-look" || product.handle == "citrine-signature-look" || product.handle == "family-jewels-signature-look" || product.handle == "aquamarine-signature-look") {
            string += "<a href='/pages/"+product.handle+"' class='btn product__listing-actions--parent'>get the look</a>";
          }
          else {
            string += "<a href='"+product.url+"' class='btn product__listing-actions--parent'>CHOOSE YOUR SHADE</a>";
          }
        }
        else if(isPreviewProduct(product)) {
          string += "<a href='"+product.url+"' class='btn btn--secondary product__listing-actions--preview'>COMING SOON</a>";
        }
    	else if((theme.settings.collection_handle == "sailor-moon-makeup-collaboration" || theme.settings.collection_handle == "disney-mulan-makeup-collection") && !product.available) {
          string += " \
            <form class='carousel-product__action--form' method='post' action='/cart/add'> \
              <input disabled='disabled' class='btn' type='submit' name='submit' value='Email Me' /> \
            </form>";
        }
        else {
          string += " \
            <form class='carousel-product__action--form' method='post' action='/cart/add'> \
              <input type='hidden' name='id' value='"+product.variant_id+"' /> \
              <input type='hidden' name='quantity' value='1' /> \
              <input "+(product.available ? '' : 'disabled="disabled"')+" class='btn' type='submit' name='submit' value='"+(product.available ? 'ADD TO BAG' : 'OUT OF STOCK')+"' /> \
            </form>";
        }
        string += " \
        </div> \
      </div> \
    </div>";

    if(return_string) {
      return string;
    }

    var $string = $('<div/>').html(string).contents();
    return $string;
  }

  function getPrice(product) {
    var sale_price = product.price;
    var original_price = product.price;
    var value_price = product.value_price;

    $.each(product.tags, function(index, tag) {
      if(tag.substring(0,2) == "#.") {
        if(tag.indexOf("#.price:") > -1) {
          var new_price = tag.replace("#.price:", "");
          sale_price = parseInt(new_price);
        }

        if(tag.indexOf("#.promo-price:") > -1) {
          var new_price = tag.replace("#.promo-price:", "");
          sale_price = parseInt(new_price);
        }
      } else {
        return false;
      }
    });

    return {
      original_price: original_price,
      sale_price: sale_price,
      value_price: value_price
    }
  }

  function createSearchPreview(product) {
    return " \
      <a href='"+product.url+"'> \
        <div class='search-preview'> \
          <div class='search-preview__image'> \
            <picture aria-hidden='true'> \
              <source media='(min-width: "+theme.settings.breakpoint.tablet+"px)' srcset='"+theme.Shopify.getSizedImageUrl(product.images[0], "720x1080")+"' /> \
              <source media='(min-width: 0px)' srcset='"+theme.Shopify.getSizedImageUrl(product.images[0], "608x914")+"' /> \
              <img class='visible' src='"+theme.Shopify.getSizedImageUrl(product.images[0], "720x1080")+"' alt=''> \
            </picture> \
          </div><div class='search-preview__content'> \
            <label class='search-preview__content--title'>"+product.title+"</label> \
            <label class='search-preview__content--type'>"+product.type+"</label> \
          </div> \
        </div> \
      </a>";
  }

  function createProductListing(product, show_wishlist, extra_data) {
    var string = "<div aria-labelledby='listing-title-"+product.id+"' aria-describedby='listing-description-"+product.id+"' class='product__listing "+(!show_wishlist ? "product__listing--no-quickview" : "")+"' data-id='"+product.variant_id+"' data-product-sku='"+product.sku+"' data-handle='"+product.handle+"'>";
    if(theme.settings.pathname.indexOf("/account") > -1) {
      string += "<div class='wishlist__container wishlist__container--listing' data-wishlist-handle='"+extra_data.wishlist_handle+"' data-handle='"+product.handle+"'></div>";
    }
    string += " \
        <a class='product__listing-images' href='"+product.url+"'> \
          <div class='product__listing-images--container'>";

    $.each(product.images, function(index, image) {
      if(index == 0) {
        if(theme.collection_handle && theme.Collection.hasImageOverride(theme.collection_handle)) {
          string += " \
            <picture> \
              <source media='(min-width: "+theme.settings.breakpoint.tablet+"px)' srcset='"+cache.image_overrides[theme.collection_handle][product.handle]+"' /> \
              <source media='(min-width: 0px)' srcset='"+cache.image_overrides[theme.collection_handle][product.handle]+"' /> \
              <img class='visible' src='"+cache.image_overrides[theme.collection_handle][product.handle]+"' alt='"+product.title+"'> \
            </picture>";
          return true;
        }
      }
  
      string += " \
        <picture aria-hidden='true'> \
          <source media='(min-width: "+theme.settings.breakpoint.tablet+"px)' srcset='"+theme.Shopify.getSizedImageUrl(image, "680x")+"' /> \
          <source media='(min-width: 0px)' srcset='"+theme.Shopify.getSizedImageUrl(image, "360x")+"' /> \
          <img class='visible' src='"+theme.Shopify.getSizedImageUrl(image, "360x")+"' alt='"+product.title+"'> \
        </picture>";
  
      if(index == 1 || $(window).width() < theme.settings.breakpoint.desktop) {
        return false;
      }
    });    


    string += " \
          </div> \
        </a> \
        <div class='product__listing-content'>";
        if(product.type != "E-Gift Card" && theme.settings.pathname.indexOf("/account") == -1) {
          string += "<div class='wishlist__container wishlist__container--listing' data-handle='"+product.handle+"'></div>";
        }
        string += " \
          <label id='listing-title-"+product.id+"' class='product__listing-content--title'>"+product.title+"</label>";

        if(product.type != "E-Gift Card") {
          string += " \
          <label class='product__listing-content--type'>"+product.type+"</label>";
        }
    
        if(product.type == "E-Gift Card") {
          string += "<label class='product__listing-content--price'> \
            <span class='visually-hidden'>Sale Price</span> $15 - $75 \
          </label>";
    	  } else if(product.handle == "sunset-blvd-1" || product.handle == "flaming-hot" || product.handle == "dreamhouse" || product.handle == "blue-lagoon") {
        } else {
          string += " \
            <label class='product__listing-content--price'> \
              "+createPriceDisplay(product)+" \
            </label>";
        }
          
          //<p class='product__listing-content--description'>"+product.description+"</p>";
          //if(product.shade_description != "") {
          //  string += "<p class='product__listing-content--shade-description'>"+product.shade_description+"</p>";
          //}          
          //string += "<p class='product__listing-content--promo'>THIS IS A TEST PROMO MESSAGE</p>";
    if(product.type != "E-Gift Card" && theme.settings.collection_handle != "colourpop-crushes") {
      string += "<div class='yotpo bottomLine' data-product-id='"+product.id+"'></div>";
    }
    string += " \
        </div> \
        <div class='product__listing-actions'>";

    if(product.type == "E-Gift Card") {
      string += "<a href='/products/"+product.handle+"' class='btn btn--secondary product__listing-actions--parent'>choose amount</a>";
    }
    else if(isParentProduct(product)) {
      if(product.handle == "sunset-blvd-1" || product.handle == "flaming-hot" || product.handle == "dreamhouse" || product.handle == "blue-lagoon") {
        string += "<a href='/pages/create-your-own-palette' class='btn product__listing-actions--parent'>build your own palette</a>";
      }
      else if(product.handle == "rose-quartz-signature-look" || product.handle == "citrine-signature-look" || product.handle == "family-jewels-signature-look" || product.handle == "aquamarine-signature-look") {
        string += "<a href='/pages/"+product.handle+"' class='btn product__listing-actions--parent'>get the look</a>";
      }
      else {
        string += "<a href='"+product.url+"' class='btn product__listing-actions--parent'>CHOOSE YOUR SHADE</a>";
      }
    }
    else if(isPreviewProduct(product)) {
      string += "<a href='"+product.url+"' class='btn btn--secondary product__listing-actions--preview'>Use Code: GETBLENDT</a>";
    }
    else if((theme.settings.collection_handle == "disney-mulan-makeup-collection" || theme.settings.collection_handle == "sailor-moon-makeup-collaboration") && !product.available) {
      string += "<a href='"+product.url+"' class='btn btn--secondary product__listing-actions--parent'>email me</a>";
    }  
    else {
      string += " \
        <form method='post' action='/cart/add'> \
          <input type='hidden' name='id' value='"+product.variant_id+"' /> \
          <input type='hidden' name='quantity' value='1' /> \
          <input "+(product.available ? '' : 'disabled="disabled"')+" class='btn' type='submit' name='submit' value='"+(product.available ? 'ADD TO BAG' : 'OUT OF STOCK')+"' />"+(show_wishlist ? "<button class='btn btn--quickview' data-product-handle='"+product.handle+"'>QUICKVIEW</button>" : "")+" \
        </form>";
    }
    string += " \
        </div> \
      </div>";

    var $string = $('<div/>').html(string).contents();

    if(product.top_banner) {
      if(theme.badges[product.top_banner]) {
        $string.prepend(" \
          <div class='product__listing-banner "+(theme.badges[product.top_banner].circle ? "product__listing-banner--circular" : void 0)+"'> \
            <img src='"+theme.badges[product.top_banner].image+"' alt='"+theme.badges[product.top_banner].title+"' /> \
          </div> \
        ");
      }
      else {
        console.warn("Cannot find badge: "+product.top_banner);
      }
    }

    return $string;
  }

  function isPreviewProduct(product) {
    if(product.tags.indexOf("preview-true") > -1) {
      return true;
    }
    return false;
  }

  function isParentProduct(product) {
    if(theme.parent_product_handles.indexOf(product.handle) > -1) {
      return true;
    }
    return false;
  }

  function createPriceLabel(product) {
    return " \
      <label class='product-details__price--sale' tabindex='0'> \
        "+createPriceDisplay(product)+" \
      <label>";
  }

  function createPriceDisplay(product) {
    if(product.sale_price != product.original_price) {
      return "<span class='visually-hidden'>Original Price:</span><span class='price--sale'>"+theme.Shopify.formatMoney(product.original_price)+"</span><span class='visually-hidden'>Sale Price:</span> "+theme.Shopify.formatMoney(product.sale_price);
    }
    else if(product.value_price && (product.sale_price != product.value_price)) {
      return "<span class='visually-hidden'>Sale Price:</span>"+theme.Shopify.formatMoney(product.sale_price)+" <span class='price--value'>(valued at: "+theme.Shopify.formatMoney(product.value_price)+")</span>";
    }
    else {
      return theme.Shopify.formatMoney(product.sale_price);
    }
  }

  function createProductQuickview(product) {
    var string = "<div class='quickview' tabindex='0' data-id='"+product.variant_id+"' data-handle='"+product.handle+"'> \
        <div class='quickview__images'> \
          <div class='quickview__carousel owl-carousel owl-theme' data-dots data-desktop='1' data-mobile='1.5' data-center>";
            $.each(product.images, function(index, image) {
              string += " \
                <div class='quickview__image'> \
                  <picture aria-hidden='true'> \
                    <source media='(min-width: "+theme.settings.breakpoint.tablet+"px)' srcset='"+theme.Shopify.getSizedImageUrl(image, "720x1080")+"' /> \
                    <source media='(min-width: 0px)' srcset='"+theme.Shopify.getSizedImageUrl(image, "608x914")+"' /> \
                    <img class='visible' src='"+theme.Shopify.getSizedImageUrl(image, "720x1080")+"' alt=''> \
                  </picture> \
                </div>";
            });
        string += " \
          </div> \
        </div><div class='quickview__content'> \
          <div class='wishlist__container' data-handle='"+product.handle+"'></div> \
          <label class='quickview__content--type'>"+product.type+"</label> \
          <label class='quickview__content--title'>"+product.title+"</label> \
          <div class='quickview__content--description'>"+product.description+"</div>";
          if(product.shade_description != "") {
            string += "<p class='quickview__content--shade-description'>"+product.shade_description+"</p>";
          }
          string += " \
          <label class='quickview__content--price'> \
            "+createPriceDisplay(product)+" \
          </label> \
          <div class='yotpo bottomLine' data-product-id='"+product.id+"'></div> \
          <div class='quickview__actions'>";
      if(isParentProduct(product)) {
        if(product.handle == "sunset-blvd-1" || product.handle == "flaming-hot" || product.handle == "dreamhouse" || product.handle == "blue-lagoon") {
          string += "<a href='/pages/create-your-own-palette' class='btn quickview__actions--parent'>build your own palette</a>";
        }
        else if(product.handle == "rose-quartz-signature-look" || product.handle == "citrine-signature-look" || product.handle == "family-jewels-signature-look" || product.handle == "aquamarine-signature-look") {
          string += "<a href='/pages/"+product.handle+"' class='btn quickview__actions--parent'>get the look</a>";
        }
        else {
          string += "<a href='"+product.url+"' class='btn quickview__actions--parent'>CHOOSE YOUR SHADE</a>";
        }
      }
      else if(isPreviewProduct(product)) {
        string += "<a href='"+product.url+"' class='btn btn--secondary quickview__actions--preview'>Use Code: GETBLENDT</a>";
      }
      else {
        string += " \
          <form method='post' action='/cart/add'> \
            <input type='hidden' name='id' value='"+product.variant_id+"' /> \
            <input type='hidden' name='quantity' value='1' /> \
            <input "+(product.available ? '' : 'disabled="disabled"')+" class='btn' type='submit' name='submit' value='"+(product.available ? 'ADD TO BAG' : 'OUT OF STOCK')+"' /> \
          </form>";
      }
      string += " \
          </div> \
        </div> \
      </div>";

    var $string = $('<div/>').html(string).contents();

    $.fancybox.open($string, {
      afterShow: function() {
        setTimeout(function() {
          var api = new Yotpo.API(yotpo);
          api.refreshWidgets();
        },300);
      }
    });
  }


  function getCustomerLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      cache.customer_latitude = position.coords.latitude;
      cache.customer_longitude = position.coords.longitude;
    });
  }

  function getAddressLocation(e) {
    if(e.which == 13) {
      e.preventDefault();

      if(!cache.geocoder) {
        cache.geocoder = new google.maps.Geocoder();
      }
      
      cache.geocoder.geocode({'address': $(this).val()}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
          buildStoreList(results[0].geometry.location.lng(), results[0].geometry.location.lat());
        }        
      });
    }
  }


  function buildStoreList() {
    $.each(theme.ulta_locations, function(index, store) {
      if(index == 2 && !cache.customer_latitude) return false;
      if(index == 3 && cache.customer_latitude) return false;
    });
  }


  function buildStoreList(longitude, latitude) {
    var store_list = [];
    $(selectors.ulta_stores).empty();

    if(longitude && latitude) {
      store_list = findClosestMarkers(latitude, longitude);
    }
    else if(cache.customer_latitude && cache.customer_longitude) {
      store_list = findClosestMarkers(cache.customer_latitude, cache.customer_longitude);
    }
    else {
      store_list = findClosestMarkers();
    }

    $.each(store_list, function(index, store) {
      if(store.pointer) store = store.pointer;
      var $element = $("<li class='ulta__store' tabindex='0' data-store-index='"+store.index+"' role='button'> \
          <label class='ulta__store--title'>"+store.name+"</label> \
          <p class='ulta__store--address'> \
            "+store.address+"<br/> \
            "+store.city+", "+store.state+" \
          </p> \
        </li>");
      store.$target = $element;      
      $(selectors.ulta_stores).append($element);

      if(index == 0) {
        cache.map.setCenter(new google.maps.LatLng(store.latitude, store.longitude));
      }
    });
  }


  function buildUltaStoreLocator() {
    ga('send', 'event', 'CTA click', 'click', "Ulta Store Locator Trigger");
    
    var string = " \
      <div class='ulta__container'> \
        <div class='ulta__header'> \
          <h2 class='ulta__title'>COLOR MATCH IN PERSON AT ULTA</h2> \
          <p class='ulta__subtitle'>Find an ulta store near you!</p> \
        </div> \
        <div class='ulta__content'> \
          <div class='ulta__map-spacer'> \
            <div class='ulta__map' id='ulta__map'></div> \
          </div><div class='ulta__stores'> \
            <div class='ulta__locator'> \
              <input class='ulta__locator--input' type='text' placeholder='search city, state, zip code' value='' /> \
            </div> \
            <ul class='ulta__stores-list'> \
            </ul> \
          </div> \
        </div> \
      </div>";

    $.fancybox.open(string, { "touch": false, });
    
    cache.map = new google.maps.Map(
      document.getElementById('ulta__map'),
      { zoom: 10, center: new google.maps.LatLng((cache.customer_latitude ? cache.customer_latitude : theme.ulta_locations[0].latitude), (cache.customer_longitude ? cache.customer_longitude : theme.ulta_locations[0].longitude)) }
    );

    cache.infowindow = new google.maps.InfoWindow();

    $.each(theme.ulta_locations, function(index, store) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(store.latitude, store.longitude),
        map: cache.map
      });

      store.marker = marker;
      store.index = index;

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          cache.infowindow.setContent(" \
            <div class='maps-info'> \
              <label class='maps-info__title'>"+store.name+"</label> \
              <p class='maps-info__address'> \
                "+store.address+"<br/> \
                "+store.city+", "+store.state+" \
              </p> \
            </div>");
          cache.infowindow.open(cache.map, marker);

          cache.map.setCenter(marker.getPosition());
          buildStoreList(marker.getPosition().lng(), marker.getPosition().lat());

          store.$target.focus();
        }
      })(marker, i));

      google.maps.event.addListener(cache.map, "click", function(event) {
        cache.infowindow.close();
      });
    });

    setTimeout(buildStoreList(), 1);
  }

  function triggerMarker() {
    var store_index = $(this).attr("data-store-index");
    google.maps.event.trigger(theme.ulta_locations[store_index].marker, 'click');
  }

  function findClosestMarkers(longitude, latitude) {
    function sort_distances(a, b) {
      if (a.distance > b.distance) return 1;
      if (b.distance > a.distance) return -1;
    
      return 0;
    }

    if(longitude, latitude) {
      var distances = [];
      var store_list = [];

      $.each(theme.ulta_locations, function(index, store) {
        var distance = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(store.latitude, store.longitude),
          new google.maps.LatLng(longitude, latitude)
        );

        distances.push({
          distance: distance,
          pointer: store
        });
      });

      distances.sort(sort_distances);

      return distances.slice(0, 4);
    }
    else {
      return theme.ulta_locations.slice(0, 20);
    }
  }


  return {
    Product: Product,
    createProductCard: createProductCard,
    createProductListing: createProductListing,
    isParentProduct: isParentProduct,
    isPreviewProduct: isPreviewProduct,
    createSearchPreview: createSearchPreview,
    getPrice: getPrice,
    setSelectedProduct: setSelectedProduct,
    getSelectedProduct: getSelectedProduct,
    createProductCarousel: createProductCarousel,
    createProductQuickview: createProductQuickview,
    getUpsellProductString: getUpsellProductString,
    createPriceDisplay: createPriceDisplay,
    findClosestMarkers: findClosestMarkers
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Account = (function() {
  var data = {
    carousel_options: theme.owl_carousel.default
  };
  var cache = {
    orders: [],

    $wishlist_container: $(".act-wishlist__container"),
    $share_wishlist: $(".act-wishlist__header--share"),

    $profile_container: $(".act-profile"),
    $profile_edit: $(".act-info__edit-box--profile a"),
    $profile_save: $(".act-save__profile--save"),
    $profile_cancel: $(".act-save__profile--cancel"),

    $shades_container: $(".act-container--shades"),
    $shades_carousel: $(".act-carousel__you-may-like"),

    $order_history_more: $(".order-history__showmore"),
    $order_history_tr: $(".order-history__body tr"),
    order_history_default: 5,

    reorder_location: 0,
    reorder_keys: [],
    $reorder_parent: $(".order-history__reorder"),
    $reorder_container: $(".order-history__reorder-container"),
    $reorder_show_more: $(".order-history__reorder--show-more"),

    recomendation: {
      "foundation": "no-filter-matte-foundation",
      "foundation-stix": "no-filter-foundation-stix",
      "concealer": "no-filter-concealer",
      "pressed-powder": "no-filter-sheer-matte-pressed-powder",
      "loose-powder": "no-filter-loose-setting-powder",
      "brow-boss-pencil": "brow-boss-pencil",
      "brow-boss-gel": "brow-boss-gel",
      "precision-brow-pencil": "precision-brow-pencil",
      "precision-brow-colour": "precision-brow-colour"
    },

    priority: {
      "precision-brow-colour": false,
      "precision-brow-pencil": false,
      "brow-boss-gel": false,
      "brow-boss-pencil": false,
      "loose-powder": false,
      "pressed-powder": false,
      "concealer": false,
      "foundation-stix": false,
      "foundation": false
    }
  };

  var classes = {
    profile_edit: "act-profile--edit-profile",
    shade_edit: "act-shades--edit"
  };

  var selectors = {
    wishlist_remove: ".wishlist__remove",
    share_button: ".wishlist__share--button",

    facebook_share: ".wishlist__share-facebook--button",

    profile_inputs: "[data-profile]",

    shade_container: ".act-shades",
    shade_title: ".act-shades__title",
    shade_current: ".act-shades__title--current",
    shade_save: ".act-save__shades--save",
    shade_dropdowns: ".act-shades__dropdowns",
    reorder_single_product: ".re-order__products--single",
  };


  function swapPage(page) {
    $("[data-page]").hide();
    $("[data-page='"+page+"']").show();

    $(".act-nav__link").attr("aria-selected", false);
    $(".act-nav__link").removeClass("active");
    $(".act-nav__link[data-navigation='"+page+"']").addClass("active");
    $(".act-nav__link[data-navigation='"+page+"']").attr("aria-selected", true);

    $(".act-nav__dropdown").val(page);
    history.pushState({}, "colourpop", "?q=" + page);

    setTimeout(function() {
      cache.$shades_carousel.trigger("to.owl.carousel");
    }, 700);
  }


  function Account() {
    cache.account_data = account_data;

    cache.$share_wishlist.on("click", theme.Wishlist.shareWishlist);
    theme.Wishlist.getWishlistProducts().then(function(response) {
      $.each(response, function(index, wishlist_product) {
        theme.Shopify.getProduct(wishlist_product.handle).then(function(response) {
          var product = response[0];
          if(theme.Wishlist.shouldShowProduct(product)) {
            var $product = theme.Product.createProductListing(product, false, { "wishlist_handle": wishlist_product.handle });
            cache.$wishlist_container.append($product);
          }
        });
      });
    });

    $(document).on("click", selectors.share_button, theme.Wishlist.copyShareInput);
    $(document).on("click", selectors.facebook_share, theme.Wishlist.shareOnFacebook);




    cache.$profile_edit.on("click", toggleProfileEditForms);
    cache.$profile_cancel.on("click", toggleProfileEditForms);
    cache.$profile_save.on("click", saveProfileForms);




    buildShadeSection();

    resetProductRecomendations();
    populateYouMayLikeSection();

    $(document).on("click", selectors.shade_title, toggleShadeEditForms);
    $(document).on("click", selectors.shade_save, saveShadeForms);


    getOrderInformation().then(function(data) {
      cache.orders = data.orders;

      if(cache.orders.length > 0) {
        generateUniqueProductList();
        buildNextReorderRow();
        cache.$reorder_parent.show();
      }
    });

    cache.$order_history_more.on("click", showMoreOrders);
    cache.$reorder_show_more.on("click", buildNextReorderRow);


    $(".act-nav__dropdown").change(function(e) {
      e.preventDefault();
      $(".act-nav__link[data-navigation='"+$(this).val()+"']").click();
    });
  
    $(".act-nav__link").click(function(e) {
      e.preventDefault();
  
      if($(this).attr("data-navigation") != $("[data-page]:visible"))
        swapPage($(this).attr("data-navigation"));
    });
  
    $("[data-page]").ready(function() {
      if(typeof QueryString.q != "undefined" && QueryString.q != "") {
        $(".act-nav__link[data-navigation='"+QueryString.q+"']").click();
      } else {
        $(".act-nav__link[data-navigation]").first().click();
      }
    });
  }


  function generateUniqueProductList() {
    var seen_products = [];
    cache.unique_products = {};

    $.each(cache.orders, function(index, order) {
      $.each(order.products, function(j, product) {
        if(seen_products.indexOf(product.handle) == -1 && theme.Search.shouldShowProduct(product)) {
          if(!cache.unique_products[order.date]) {
            cache.unique_products[order.date] = [];
          }

          cache.unique_products[order.date].push(product);
          seen_products.push(product.handle);
        }
      });      
    });

    cache.reorder_keys = Object.keys(cache.unique_products);
  }


  function getOrderInformation() {
    return new Promise(function(resolve) {
      var params = {
        url: "/account?view=orders",
        method: "GET",
        complete: function(r) {
          if(r.status == 200) {
            var data = JSON.parse(r.responseText);
            resolve(data);
          }

          resolve({ "orders": [] });
        }
      };
      $.ajax(params);
    });
  }



  function buildNextReorderRow() {
    var string = " \
      <div class='order-history__reorder-block'> \
        <div class='act-info__name order-history__reorder-date act-info__edit-box'> \
          "+cache.reorder_keys[cache.reorder_location]+" \
        </div> \
        <div class='order-history__reorder-products'>";    
          $.each(cache.unique_products[cache.reorder_keys[cache.reorder_location]], function(index, product) {
            string += " \
              <div class='order-history__reorder-product'> \
                <div class='order-history__reorder-product--image'> \
                  <img src='"+product.image+"' alt='' /> \
                </div><div class='order-history__reorder-product--spacer'> \
                  <div class='order-history__reorder-product-info'> \
                    <div class='order-history__reorder-product-info--description'> \
                      <span class='act-info__name'>"+product.title+"</span> \
                      <span class='act-info__info'>"+product.type+"</span> \
                    </div><div class='order-history__reorder-product-info--price'> \
                      "+theme.Shopify.formatMoney(product.sale_price)+" \
                    </div> \
                  </div><div class='order-history__reorder-product-info--actions'> \
                    <div class='order-history__reorder-product-info--review'> \
                      <a class='text-link' href='"+product.url+"'>WRITE A REVIEW</a> \
                    </div><div class='order-history__reorder-product-info--form'>";
                      if(theme.Product.isParentProduct(product)) {
                        if(product.handle == "sunset-blvd-1" || product.handle == "flaming-hot" || product.handle == "dreamhouse" || product.handle == "blue-lagoon") {
                          string += "<a href='/pages/create-your-own-palette' class='btn product__listing-actions--parent'>build your own palette</a>";
                        }
                        else if(product.handle == "rose-quartz-signature-look" || product.handle == "citrine-signature-look" || product.handle == "family-jewels-signature-look" || product.handle == "aquamarine-signature-look") {
                          string += "<a href='/pages/"+product.handle+"' class='btn product__listing-actions--parent'>get the look</a>";
                        }
                        else {
                          string += "<a href='"+product.url+"' class='btn product__listing-actions--parent'>CHOOSE YOUR SHADE</a>";
                        }
                      }
                      else if(theme.Product.isPreviewProduct(product)) {
                        string += "<a href='"+product.url+"' class='btn btn--secondary product__listing-actions--preview'>COMING SOON</a>";
                      }
                      else {
                        string += " \
                          <form method='post' action='/cart/add'> \
                            <input type='hidden' name='id' value='"+product.variant_id+"' /> \
                            <input type='hidden' name='quantity' value='1' /> \
                            <input "+(product.available ? '' : 'disabled="disabled"')+" class='btn' type='submit' name='submit' value='"+(product.available ? 'ADD TO BAG' : 'OUT OF STOCK')+"' /> \
                          </form>";
                      }
                string += " \
                    </div> \
                  </div> \
                </div> \
              </div>";
          });
      string += " \
        </div> \
      </div>";

    cache.$reorder_container.append(string); 

    cache.reorder_location++;
    if(cache.reorder_location == cache.reorder_keys.length) {
      cache.$reorder_show_more.hide();
    }
  }


  function toggleProfileEditForms(e) {
    e.preventDefault();
    cache.$profile_container.toggleClass(classes.profile_edit);
  }

  function saveProfileForms(e) {
    e.preventDefault();

    var data = {};
    var month = "";
    var day = "";

    $(selectors.profile_inputs).each(function() {
      var field = $(this).attr("data-profile");

      if($(this).is("select")) {
        if(field == "month") {
          month = $(this).val();
        }
        else if(field == "day") {
          day = $(this).val();
        }
      }
      else {
        if($(this).is(":checked")) {
          data[field] = $(this).val();
        }
      }
    });

    if(month != "" && day != "") {
      var d = new Date();
      data["birthday"] = d.getFullYear()+"-"+month+"-"+parseInt(day).zeroPad()+" 23:59:59";
    }

    if(!$.isEmptyObject(data)) {
      data["custid"] = theme.customer.id

      $.ajax({
        url: 'https://cpim-prod.azurewebsites.net/api/JScustomerTags',
        method: "POST",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        beforeSend: theme.Global.showLoadingSpinner("Saving..."),
        complete: function(r) {
          if(typeof _learnq != "undefined") {
            _learnq.push(['identify', {
              '$email' : theme.customer.email,
              'Birthday' : data.birthday || "",
              'Skintone' : data.skintone || "",
              'Undertone' : data.undertone || "",
              'Hair Color' : data.hair_color || "",
              'Eye Color' : data.eye_color || "",
              'Skin Type' : data.skin_type || ""
            }]);
          }

          window.location.reload();
        }
      });
    }
  }




  function buildShadeSection() {
    $.each(cache.account_data.shade_data, function(type, data) {
      var string = " \
        <div class='act-shades act-shades--"+type+"' data-group='"+type+"'> \
          <div class='act-shades__title'> \
            <label class='act-shades__title--label'>"+type+"</label> \
            <div class='act-shades__title--current'>";

      $.each(data, function(key, handle) {
        if(handle == "") {
          string += "<span>No Shades Selected</span>";
        } else if(product_data[handle] && product_data[handle].title) {
          string += "<span>"+product_data[handle].title+"</span>";
        }
      });

      string += " \
            </div> \
          </div> \
          <div class='act-shades__forms'>";

      $.each(data, function(key, handle) {
        string += " \
            <div class='act-shades__form'> \
              <span class='act-info__name'>"+shade_data[key].title+"</span> \
              <select name='"+key+"' class='act-dropdown act-shades__dropdowns' data-group='"+type+"' data-type='"+key+"'> \
                <option value=''>"+shade_data[key].title+"</option>";
        $.each(shade_data[key].product_data, function(product) {
          if(typeof product_data[product] == "undefined") {
            console.warn("Can't find: " + product);
            return true;
          }
          string += "<option "+((product == handle) ? "selected='selected'" : "")+" value='"+product+"'>"+product_data[product].title+"</option>";
        });
        string += " \
              </select> \
              <a target='_blank' class='btn btn-secondary' href='"+cache.account_data.shade_buttons[key].url+"'>"+cache.account_data.shade_buttons[key].text+"</a> \
            </div>";
      });

      string += " \
            <div class='act-save__shades'> \
              <button data-group='"+type+"' class='btn btn-main act-save__shades--save'>Save Changes</button> \
            </div> \
          </div> \
        </div>";

      cache.$shades_container.append(string);
    });
  }

  function toggleShadeEditForms(e) {
    e.preventDefault();
    $(this).parent().toggleClass(classes.shade_edit);
  }

  function saveShadeForms(e) {
    e.preventDefault();

    var data = {};

    var group = $(this).attr("data-group");
    var $dropdowns = $(selectors.shade_dropdowns+"[data-group='"+group+"']")

    $dropdowns.each(function() {
      var handle = $(this).val();

      if(handle != "") {
        var type = $(this).attr("data-type");
        data[type] = handle;
      }
    });

    if(!$.isEmptyObject(data)) {
      data["custid"] = theme.customer.id

      $.ajax({
        url: 'https://cpim-prod.azurewebsites.net/api/JScustomerTags',
        method: "POST",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        beforeSend: theme.Global.showLoadingSpinner("Saving..."),
        complete: function(r) {
          var json = JSON.parse(r.responseText);

          $.each(account_data.shade_data, function(section, data) {
            $.each(data, function(type, handle) {
              if(typeof json[type] != "undefined") {
                account_data.shade_data[section][type] = json[type];
              }
            });
          });

          $.each(cache.shade_data, function(section, data) {
            $.each(data, function(type, handle) {
              if(typeof json[type] != "undefined") {
                cache.shade_data[section][type] = json[type];
              }
            });
          });

          theme.Global.closeLoadingSpinner();

          resetProductRecomendations();
          populateYouMayLikeSection();

          closeOpenShadeForms();
        }
      });
    }
  }

  function closeOpenShadeForms() {
    $(selectors.shade_container).each(function() {
      if($(this).hasClass(classes.shade_edit)) {
        $(this).removeClass(classes.shade_edit);
      }
    });

    rebuildCurrentShades();
  }

  function rebuildCurrentShades() {
    $(selectors.shade_container).each(function() {
      var group = $(this).attr("data-group");      
      var $current = $(this).find(selectors.shade_current);

      var string = "";

      $.each(account_data.shade_data[group], function(product_type, product_handle) {
        if(product_handle == "") {
          string += "<span>No Shades Selected</span>";
        } else if(product_data[product_handle]) {
          string += "<span>"+product_data[product_handle].title+"</span>";
        }
      });

      $current.html(string);
    });
  }



  function populateYouMayLikeSection() {
    var product_list = [];

    $.each(cache.recomendation, function(type, handle) {
      product_list.push(handle);
    });

    $.each(cache.account_data.profile_upsell, function(type) {
      if(cache.account_data.profile_data[type] != "") {
        $.each(cache.account_data.profile_upsell[type][cache.account_data.profile_data[type]], function(index, handle) {
          product_list.push(handle);
        });
      }
    });

    theme.Shopify.getProducts(product_list).then(function(response) {
      var string = "";
      $.each(response, function(index, product) {
        if(product) {
          string += theme.Product.createProductCard(product, true, index);
        }
      });

      cache.$shades_carousel.trigger("replace.owl.carousel", string);
      cache.$shades_carousel.trigger('refresh.owl.carousel');

      var api = new Yotpo.API(yotpo);
      api.refreshWidgets();
    });
  }

  function resetProductRecomendations() {
    cache.recomendation = {
      "foundation": "no-filter-matte-foundation",
      "foundation-stix": "no-filter-foundation-stix",
      "concealer": "no-filter-concealer",
      "pressed-powder": "no-filter-sheer-matte-pressed-powder",
      "loose-powder": "no-filter-loose-setting-powder",
      "brow-boss-pencil": "brow-boss-pencil",
      "brow-boss-gel": "brow-boss-gel",
      "precision-brow-pencil": "precision-brow-pencil",
      "precision-brow-colour": "precision-brow-colour"
    };

    $.each(cache.shade_data, function(section, data) {
      $.each(data, function(type, handle) {
        if(handle != "") {
          cache.priority[type] = handle;
          delete cache.recomendation[type];
        } else {
          cache.priority[type] = false;
        }
      });
    });

    $.each(cache.priority, function(type, handle) {
      if(handle !== false) {
        $.each(shade_data[type].product_data[handle].account_data, function(product_type, product) {
          if(cache.priority[product_type] == false && typeof cache.recomendation != "undefined") {
            cache.recomendation[product_type] = product;
          }
        });
      }
    });
  }




  function removeEmptyReorders() {
    cache.$reorder_block.each(function(i, div) {
      if($(this).find(selectors.reorder_single_product).length == 0) {
        $(this).remove();
      }
    });
  }

  function showMoreOrders(e) {
    var tr_size = cache.$order_history_tr.length;
    cache.order_history_default = ( cache.order_history_default + 5 <= tr_size) ? cache.order_history_default + 5 : tr_size;

    $(".order-history__body tr:lt("+cache.order_history_default+")").show();
    if(cache.order_history_default == tr_size){
      cache.$order_history_more.hide();
    }
  }

  function showMoreReorders(e) {
    var tr_size = cache.$reorder_block.length;
    cache.reorder_default = ( cache.reorder_default + 2 <= tr_size) ? cache.reorder_default + 2 : tr_size;

    $(".re-order .re-order__block:lt("+cache.reorder_default+")").show();
    if(cache.reorder_default == tr_size){
      cache.$reorder_more.hide();
    }
  }


  return {
    Account: Account
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Login = (function() {
  var cache = {
    $show_reset: $(".form__info--show-reset"),
    $show_login: $(".form__info--show-login"),

    $container_login: $(".login__container--login"),
    $container_reset: $(".login__container--reset"),

    query: theme.settings.parameters.has("q") ? theme.settings.parameters.get("q").toLowerCase() : "",
    return_to: theme.settings.parameters.has("return_to") ? theme.settings.parameters.get("return_to").toLowerCase() : ""
  };

  function Login() {
    cache.$show_reset.on("click", showPasswordReset);
    cache.$show_login.on("click", showLogin);

    if(cache.query == "wishlist") {
      cache.$container_login.find(".login__title").after(" \
        <p class='login__description'> \
          Oops! We noticed you had a heart on one of our products! Please Log In or Create an Account to add items to your Wishlist. \
        </p>");
    }

    if(cache.return_to != "") {
      $("[name='return_to']").val(cache.return_to);
    }
  }

  function showPasswordReset(e) {
    e.preventDefault();

    cache.$container_login.hide();
    cache.$container_reset.css("display", "inline-block");
  }

  function showLogin(e) {
    e.preventDefault();

    cache.$container_reset.hide();
    cache.$container_login.css("display", "inline-block");
  }



  return {
    Login: Login
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.DisneyQuiz = (function() {
  var cache = {
    $done: $(".disney__finish-button"),
    $inputs : $(".disney__answer [type='radio']"),
    $finish: $(".disney__finish")
  };

  var selectors = {
    result: ".disney__princess",
    inputsChecked : ".disney__answer [type='radio']:checked",
    share: ".share__button",
    question: ".disney__container"
  }

  function DisneyQuiz() {
    if(theme.settings.pathname == "/pages/disney-villains-quiz") {
      generateQuizData("villains");
    }
    else if(theme.settings.pathname == "/pages/disney-designer-quiz") {
      generateQuizData("princess");
    }
    else if(theme.settings.pathname == "/pages/monochromatic-palette-quiz") {
      generateQuizData("monochrome");
    }
    else if(theme.settings.pathname == "/pages/frozen-quiz") {
      generateQuizData("frozen");
    }

    cache.$done.on("click", getResult);

    cache.$inputs.change(function() {
      var top = $(this).closest(selectors.question).next().position().top;

      $("html, body").animate({
        scrollTop: top - 90
      });
    });

    $(document).on("click", selectors.share, submitAndShare);
  }


  function getResult(e) {
    e.preventDefault();

    $(selectors.result).parent().remove();

    var length = 0;
    var total = [...Array(cache.results.length)].map((_, i) => 0);

    $(selectors.inputsChecked).each(function() {
      var question = $(this).attr("name");
      var answerNumber = $(this).val();

      var result = cache[question][answerNumber];

      cache.answers[question] = true;

      total = total.map(function(question_number, answer_index) {
        return question_number + result[answer_index];
      });

      length++;
    });


    if(length == Object.keys(cache.answers).length) {
      var result = total.indexOf(Math.max(...total));

      var string = " \
        <article class='disney__container'> \
          <div class='disney__princess'>";
      if(cache.results[result].url) {
        string += "<a href='"+cache.results[result].url+"'>";
      }
      string += " \
            <picture> \
              <source media='(min-width: 669px)' srcset='"+cache.results[result].desktop_image+"'' /> \
              <source media='(min-width: 0px)' srcset='"+cache.results[result].mobile_image+"'' /> \
              <img src='"+cache.results[result].mobile_image+"' alt='"+cache.results[result].description+"' /> \
            </picture>";
      if(cache.results[result].url) {
        string += "</a>";
      }
      string += " \
          </div> \
        </article>";

      cache.$finish.append(string);
    } else {
      $.each(cache.answers, function(question, answer) {
        if(!answer) {
          var top = $("input[name='"+question+"']").closest(selectors.question).position().top;

          $("html, body").animate({
            scrollTop: top - 90
          });

          return false;
        }
      });
    }
  }


  function submitAndShare(e) {
    e.preventDefault();

    var index = $(this).attr("data-index");

    shareOverrideOGMeta(window.location.href, cache.results_title, cache.results[index].description, cache.results[index].facebook_image);

    return false;
  }

  function shareOverrideOGMeta(overrideLink, overrideTitle, overrideDescription, overrideImage) {
    FB.ui({
      method: 'share_open_graph',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
        object: {
          'og:url': overrideLink,
          'og:title': overrideTitle,
          'og:description': overrideDescription,
          'og:image': overrideImage
        }
      })
    },
    function (response) {
      // Action after response
    });
  }

  function generateQuizData(type) {
    if(type == "princess") {
      cache.answers = {
        question1: false,
        question2: false,
        question3: false,
        question4: false,
        question5: false,
        question6: false,
        question7: false,
        question8: false
      };
      cache.question1 = [[1,0,1,0,0,1],[0,1,0,1,1,0]];
      cache.question2 = [[0,0,1,0,0,0],[0,1,0,0,0,0],[1,0,0,0,0,0],[0,0,0,0,0,1],[0,0,1,1,0,0]];
      cache.question3 = [[0,1,0,1,1,0],[1,0,1,0,0,1]];
      cache.question4 = [[1,0,0,1,1,0],[0,1,1,0,0,1]];
      cache.question5 = [[0,0,0,0,1,0],[1,0,1,0,0,0],[0,1,0,0,0,0],[0,0,0,1,0,0],[0,0,0,0,0,1]];
      cache.question6 = [[0,0,1,0,0,0],[0,0,0,0,0,1],[0,0,0,1,0,0],[1,0,0,0,0,0],[0,0,0,0,1,0],[0,1,0,0,0,0]];
      cache.question7 = [[1,0,0,0,0,0],[0,0,1,0,0,0],[0,0,0,0,1,0],[0,1,0,0,0,0],[0,0,0,0,0,1],[0,0,0,1,0,0]];
      cache.question8 = [[0,0,0,0,0,1],[0,0,0,0,1,0],[0,1,0,0,0,0],[0,0,1,0,0,0],[1,0,0,0,0,0],[0,0,0,1,0,0]];

      cache.results_title = "Guess which Disney Princess I am!";

      cache.results = [
        {
          "result": "belle",
          "desktop_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_auto,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-belle-desktop.jpg",
          "mobile_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_auto,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-belle-mobile.jpg",
          "facebook_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_1200,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-belle-1200x600.jpg",
          "description": "You’re most like Belle! You’re empathetic and sensitive, and you tend to bring out the best in the people you know. Nothing beats getting lost in a good book, and love to let your imagination run wild!"
        },
        {
          "result": "ariel",
          "desktop_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_auto,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-ariel-desktop.jpg",
          "mobile_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_auto,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-ariel-mobile.jpg",
          "facebook_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_1200,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-ariel-1200x600.jpg",
          "description": "You’re most like Ariel! You tend to follow your heart and seek adventure no matter where you are. Your risk taking attitude and natural talents will take you far!"
        },
        {
          "result": "tiana",
          "desktop_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_auto,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-tiana-desktop.jpg",
          "mobile_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_auto,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-tiana-mobile.jpg",
          "facebook_image": "https://colourpop-com-res.cloudinary.com/image/upload/v1541102574/colourpop/Shopify/Quizzes/designer-disney-quiz/result-tiana-1200x600.jpg",
          "description": "You’re most like Tiana! You know the meaning of hard work and perseverance. Nothing can stop you from achieving your dreams!"
        },
        {
          "result": "snowhite",
          "desktop_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_auto,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-snowhite-desktop.jpg",
          "mobile_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_auto,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-snowhite-mobile.jpg",
          "facebook_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_1200,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-snowwhite-1200x600.jpg",
          "description": "You’re most like Snow White! You have a kind heart and love to take care of those around you. Your compassion shows in your love for the outdoors and animals. You’re a classic princess through and through!"
        },
        {
          "result": "cinderella",
          "desktop_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_auto,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-cinderella-desktop.jpg",
          "mobile_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_auto,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-cinderella-mobile.jpg",
          "facebook_image": "https://colourpop-com-res.cloudinary.com/image/upload/v1541102574/colourpop/Shopify/Quizzes/designer-disney-quiz/result-cinderella-1200x600.jpg",
          "description": "You’re most like Cinderella! You’re optimistic and very empathetic, and that only adds to your determination for following your dreams! You’re an extremely hard worker that is creative and passionate."
        },
        {
          "result": "jasmine",
          "desktop_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_auto,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-jasmine-desktop.jpg",
          "mobile_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_auto,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-jasmine-mobile.jpg",
          "facebook_image": "https://colourpop-com-res.cloudinary.com/image/upload/q_auto,f_auto/w_1200,dpr_auto/colourpop/Shopify/Quizzes/designer-disney-quiz/result-jasmine-1200x600.jpg",
          "description": "You’re most like Jasmine! You’re headstrong and know exactly what you want out of life. You’re free spirited and love exploring new and exciting places."
        },
      ];
    }
    else if(type == "villains") {
      cache.answers = {
        question1: false,
        question2: false,
        question3: false,
        question4: false,
        question5: false,
        question6: false,
        question7: false
      };
      cache.question1 = [[1,1,1,0,0,0],[0,0,0,1,1,1]];
      cache.question2 = [[0,0,0,0,0,1],[0,1,0,0,0,0],[1,0,0,0,0,0],[0,0,1,0,0,0],[0,0,0,0,1,0],[0,0,0,1,0,0]];
      cache.question3 = [[0,0,0,0,0,1],[1,0,0,0,0,0],[0,0,0,0,1,0],[0,1,0,0,0,0],[0,0,0,1,0,0],[0,0,1,0,0,0]];
      cache.question4 = [[1,1,1,0,0,0],[0,0,0,1,1,1]];
      cache.question5 = [[0,1,0,0,1,1],[1,0,1,1,0,0]];
      cache.question6 = [[0,0,1,0,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1],[0,0,0,1,0,0],[0,1,0,0,0,0],[1,0,0,0,0,0]];
      cache.question7 = [[0,0,0,1,1,0],[1,0,0,0,0,1],[0,1,1,0,1,0]];
      cache.results_title = "Guess which Disney Villain I am!";
      cache.results = [
        {
          "result": "queen",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-evilqueen.jpg?21918",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-evilqueen-m.jpg?21918",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-evilqueen.jpg?21918",
          "description": "You're most like the evil Queen! Your sensitive nature can sometimes get in the way of your day-to-day, and sometimes jealousy can rear its ugly head. No worries though, you're much more powerful than you think!"
        },
        {
          "result": "maleficent",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-maleficent.jpg?21918",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-maleficent-m.jpg?21918",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-maleficent.jpg?21918",
          "description": "You're most like maleficent! You're independent and have a hard time answering to authority. Your hard exterior is intimidating to others, but you have a soft spot for your furry (or feathery) friends!"
        },
        {
          "result": "cruella",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-cruella.jpg?21918",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-cruella-m.jpg?21918",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-cruella.jpg?21918",
          "description": "You're most like Cruella! You've got a do-whatever-it-takes attitude, your ambition and drive is almost too much for others to handle! Sure you're a little impulsive, but your risk taking and adventure seeking help you make the most out of life."
        },
        {
          "result": "hades",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-hades.jpg?45136",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-hades-m.jpg?45136",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-hades.jpg?21918",
          "description": "You're most like Hades! You're ambitious and competitive and will do whatever it takes to be number one! Your insecurities can get in the way, but your quick wit and sense of humor help you brush them off."
        },
        {
          "result": "ursula",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-ursula.jpg?21918",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-ursula-m.jpg?21918",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-ursula.jpg?21918",
          "description": "You're most like Ursula! Some people may call you selfish, but you know exactly what you want, what's the harm in that? You love helping others with their goals too, but it's not your fault if they can't live up to their end of the bargain!"
        },
        {
          "result": "facilier",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-drfacilier.jpg?21918",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-drfacilier-m.jpg?21918",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/disney_villain_results-drfacilier.jpg?21918",
          "description": "You're most like Dr. Facilier! You're smart with an entrepreneurial spirit, and you're not afraid to use the tricks up your sleeve to get ahead. You can't think of anything worse than failure, and you try your hardest to never reach that point."
        },
      ];
    }
    else if(type == "monochrome") {
      cache.answers = {
        question1: false,
        question2: false,
        question3: false,
        question4: false,
        question5: false,
        question6: false,
        question7: false,
      };
      cache.question1 = [[0,0,0,1,0,0,0],[0,0,1,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,1],[0,1,0,0,0,0,0],[0,0,0,0,1,0,0],[0,0,0,0,0,1,0]];
      cache.question2 = [[1,0,0,1,0,0,0],[0,0,0,0,0,1,1],[0,1,1,0,1,0,0]];
      cache.question3 = [[0,0,0,1,0,1,0],[1,0,0,0,0,0,1],[0,1,1,0,0,0,0],[0,0,0,0,1,0,0]];
      cache.question4 = [[1,0,0,0,0,0,0],[0,0,1,0,0,0,1],[0,1,0,0,1,0,0],[0,0,0,1,0,1,0]];
      cache.question5 = [[0,1,0,1,0,1,1],[1,0,1,0,1,0,0]];
      cache.question6 = [[0,0,0,0,0,0,1],[1,0,0,0,0,0,0],[0,0,1,0,0,0,0],[0,1,0,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,1,0,0],[0,0,0,0,0,1,0]];
      cache.question7 = [[0,0,0,0,0,0,1],[1,0,0,0,0,0,0],[0,0,0,1,0,0,0],[0,1,0,0,0,0,0],[0,0,1,0,0,0,0],[0,0,0,0,0,1,0],[0,0,0,0,1,0,0]];
      cache.results_title = "Guess which Monochrome Palette I am!";
      cache.results = [
        {
          "url": "/products/blue-moon",
          "result": "blue-moon",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-blue_moon-d_12286742-0e92-452e-8958-fafe64d73ade.jpg?v=1580862987",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-blue_moon-m_e4e42263-1e2a-495e-b638-0f3f6e0dd789.jpg?v=1580862988",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-blue_moon-d.jpg?428061",
          "description": "You give off a peaceful and serene vibe to those around you. You love to have order in your life and you don’t care for surprises. That means that you stick to what you know and the chances of you stepping outside your social circle is almost as rare as a Blue Moon"
        },
        {
          "url": "/products/lilac-you-a-lot",
          "result": "lilac-you-a-lot",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-lilac_you_a_lot-d.jpg?v=1580862988",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-lilac_you_a_lot-m.jpg?v=1580862988",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-its_my_pleasure-d.jpg?428061",
          "description": "Your charismatic, free spirit vibe is what attracts others to you. You are understanding, compassionate, and everyone’s number one cheerleader. People are always coming to you for help. You find yourself telling people, 'It’s My Pleasure,' when they thank you for your helping hand."
        },
        {
          "url": "/products/mint-to-be-green-eyeshadow-palette",
          "result": "mint-to-be-green-eyeshadow-palette",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-mint_to_be-d.jpg?v=1580862988",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-mint_to_be-m.jpg?v=1580862988",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-just_my_luck-d.jpg?428061",
          "description": "You are a team player and loyal by nature. Whether it is consoling your sister or hyping up your bestie, you are sincere in everything you do. You are an amazing listener and make the BEST friend. You’ve got everyone thinking it’s 'Just My Luck' to have you in their life. "
        },
        {
          "url": "/products/going-coconuts-eyeshadow-palette",
          "result": "going-coconuts-eyeshadow-palette",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-going_coconuts-d.jpg?v=1580862987",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-going_coconuts-m.jpg?v=1580862988",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-main_squeeze-d.jpg?428061",
          "description": "As a natural born leader, you are practical, punctual, and efficient in everything you do! People look to you to get the job done. You love the spotlight and are willing to work for it. But it isn’t hard for you, since people love being around your positive and joyful energy! You’re the Main Squeeze."
        },
        {
          "url": "/products/strawberry-shake-eyeshadow-palette",
          "result": "strawberry-shake-eyeshadow-palette",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-strawberry_shake-d.jpg?v=1580862988",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-strawberry_shake-m.jpg?v=1580862988",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-ooh_lala-d.jpg?428061",
          "description": "Oh you fancy huh? You tend to have a reserved exterior, but first impressions aren’t everything! Once you open up to others you show them your true self! You see the good in everyone with your optimistic outlook on life. You love to give to others but find yourself being like 'Ooh La La' when it is reciprocated. "
        },
        {
          "url": "/products/baby-got-peach-eyeshadow-palette",
          "result": "baby-got-peach-eyeshadow-palette",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-baby_got_peach-d.jpg?v=1580862987",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-baby_got_peach-m.jpg?v=1580862988",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-orange_you_glad-d.jpg?428061",
          "description": "You are a social butterfly, babe! Being around others is your vibe -- you are kind, warm, and optimistic! Having the freedom to adventure wherever and whenever your heart desires is what you thrive on. You might even find yourself yelling 'Orange You Glad?'"
        },
        {
          "url": "/products/uh-huh-honey",
          "result": "uh-huh-honey",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-uh_huh_honey-d.jpg?v=1580862988",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-uh_huh_honey-m_7fb0d73c-4449-42e6-a021-c5fbaaba5a90.jpg?v=1580928366",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/palette-uhhuh_honey-d.jpg?428061",
          "description": "You’re a popular one, babe! You are always caught day-dreaming and imagining how sweet things could be. Some might describe you as a melting pot with the perfect amount of sophistication and sense of humor. You’ve got everyone saying Uh-Huh Honey."
        },
      ];
    }
    else if(type == "frozen") {
      cache.answers = {
        question1: false,
        question2: false,
        question3: false,
        question4: false,
        question5: false
      };
      cache.question1 = [[0,1],[1,0]];
      cache.question2 = [[1,0],[0,1]];
      cache.question3 = [[0,1],[1,0]];
      cache.question4 = [[1,0],[0,1]];
      cache.question5 = [[1,0],[0,1]];

      cache.results_title = "Some sort of text!";
      cache.results = [
        {
          "url": "/products/elsas-disney-makeup-collection-kit",
          "result": "elsa",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/Quiz-Answer-Elsa_3ff0a9c3-fcc0-4a19-92b1-9aa13f879247.jpg?441636",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/Quiz-Answer-Elsa-m_b50d4df0-92b2-42f6-965f-eae69729b94c.jpg?441636",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/Quiz-Answer-Elsa-m_b50d4df0-92b2-42f6-965f-eae69729b94c.jpg?441636",
          "description": "You are independent and brave by nature! Your adventure seeking personality will always lead you to your next adventure. Just remember, if anyone tries to bring you down, you just have to let it go!"
        },
        {
          "url": "/products/anna-disney-makeup-collection-kit",
          "result": "anna",
          "desktop_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/Quiz-Answer-anna_d18a14a9-1607-4227-a02f-8c5ca0ba85f1.jpg?441636",
          "mobile_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/Quiz-Answer-anna-m_b7fd3429-4090-4acc-946f-a5bf605ee07b.jpg?441636",
          "facebook_image": "https://cdn.shopify.com/s/files/1/1338/0835/files/Quiz-Answer-anna-m_b7fd3429-4090-4acc-946f-a5bf605ee07b.jpg?441636",
          "description": "You are free-spirited, loving, and you believe the best in everyone! Your optimistic view on life and love of teamwork, will let you fall in love to the point you complete each other’s sandwiches!"
        }        
      ];
    }
  }


  return {
    DisneyQuiz: DisneyQuiz
  }
})();







/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Foundation = (function() {
  var selectors = {
    upsell_block: ".foundation-upsell__block",
    upsell_container: "[data-section-type='FoundationUpsell']",
    upsell_selector: ".foundation__block-form--radio",
    upsell_dropdown_trigger: ".foundation__block-form--selected",
    upsell_dropdown: ".foundation__block-form--dropdown-options",
    upsell_text: ".foundation__block-form--value",
    upsell_swatch: ".foundation__block-form--swatch",
    upsell_form: ".foundation__block-form",
    upsell_id: ".foundation__block-form--id",
    upsell_submit: ".foundation__block-form--submit"
  }

  function Foundation() {
    bindFoundationUpsell();
  }

  function showFoundationUpsell() {
    $(selectors.upsell_container).show();
  }

  function hideFoundationUpsell() {
    $(selectors.upsell_container).hide();
  }
        
  function scrollToContainer() {
    $('html, body').animate({
      scrollTop: $(selectors.upsell_container).offset().top - 110
    }, 500); 
  }

  function buildFoundationUpsellBlock(type) {
    if(type == "concealer") {
      var data = concealer_data;
    }
    else if(type == "loose-powder") {
      var data = loose_powder_data;
    }
    else if(type == "pressed-powder") {
      var data = pressed_powder_data;
    }

    var string = "<div class='foundation-upsell__block' data-upsell-type='"+type+"'> \
        <a href='/products/"+data.parent+"'> \
          <div class='foundation__block-image'> \
            <img src='"+data.default_image+"' alt='"+data.title+"' /> \
          </div> \
        </a> \
        <div class='foundation__block-info'> \
          <label class='foundation__block-info--subtitle'>"+data.subtitle+"</label> \
          <label class='foundation__block-info--title'>"+data.title+"</label> \
          <p class='foundation__block-info--description'>"+data.description+"</p> \
        </div> \
        <form action='/cart/add' class='foundation__block-form'> \
          <input class='foundation__block-form--id' type='hidden' name='id' value='' /> \
          <input type='hidden' name='quantity' value='1' /> \
          <label class='foundation__block-form--text'>Based on your selected color:</label>  \
          <div class='foundation__block-form--dropdown' aria-hidden='false'> \
            <button class='foundation__block-form--selected' aria-hidden='true'> \
              <span class='visually-hidden'>Currently Selected Shade:</span> \
              <span class='foundation__block-form--swatch'></span> \
              <span class='foundation__block-form--value'>Choose an option</span> \
            </button> \
            <ul class='foundation__block-form--dropdown-options'>";

          $.each(data.product_data, function(handle, data) {
            string += " \
              <li class='foundation__block-form--dropdown-option'> \
                <label for='foundation_upsell_"+type+"_"+handle+"'> \
                  <input id='foundation_upsell_"+type+"_"+handle+"' class='foundation__block-form--radio' type='radio' name='foundation_upsell_"+type+"' data-product-hex='"+data.hex+"' value='"+handle+"' /> \
                  <span class='foundation__block-form--swatch' style='background-color:"+data.hex+"'></span> \
                  <span class='foundation__block-form--value'>"+handle.titleize()+"</span> \
                </label> \
              </li>";
          });
      string += " \
            </ul> \
          </div> \
          <input class='btn foundation__block-form--submit' disabled='disabled' type='submit' name='submit' value='CHOOSE AN OPTION'> \
        </form> \
      </div>";

    return string;
  }

  function buildFoundationUpsell($container, show) {
    if($(selectors.upsell_container).length > 0) {

    }
    else if($container) {
      var string = " \
        <section style='"+(!show ? "display:none;" : "" )+"' class='nopadding' data-section-type='FoundationUpsell'> \
          <article class='foundation-upsell'> \
            <div class='foundation-upsell__title'> \
              <label class='heading__text-stroke'>COLOUR MATCHED BY COLOURPOP</h1> \
            </div> \
            <div class='foundation-upsell__content'>" +
              buildFoundationUpsellBlock('concealer')+
              buildFoundationUpsellBlock('loose-powder')+
              buildFoundationUpsellBlock('pressed-powder')+" \
            </div> \
          </article> \
        </section>";

      $container.after(string);

      bindFoundationUpsell();
    }
  }

  function bindFoundationUpsell() {
    $(document).on("click", selectors.upsell_selector, handleUpsellSelection);
    $(document).on("click", selectors.upsell_dropdown_trigger, openUpsellDropdown);
  }

  function openUpsellDropdown(e) {
    e.preventDefault();
    $(this).next().show();
  }

  function handleUpsellSelection() {
    var $context = $(this);
    var handle = $context.val();
    var hex = $context.attr("data-product-hex");

    theme.Shopify.getProduct(handle).then(function(products) {
      var product = products[0];
      var $dropdown = $context.closest(selectors.upsell_dropdown);
      var $trigger = $dropdown.prev();
      var $form = $context.closest(selectors.upsell_form);

      $trigger.find(selectors.upsell_text).text(product.title);
      $trigger.find(selectors.upsell_swatch).css("background-color", hex);

      if(product.available) {
        $form.find(selectors.upsell_id).val(product.variant_id);
        $form.find(selectors.upsell_submit).prop("disabled", false).val("ADD TO BAG");
      }
      else {
        $form.find(selectors.upsell_id).val("");
        $form.find(selectors.upsell_submit).prop("disabled", true).val("OUT OF STOCK");
      }

      $dropdown.hide();
    });
  }

  function selectFoundationUpsell(type, handle) {
    console.log(type, handle);
    $(selectors.upsell_block).filter("[data-upsell-type='"+type+"']").show();
    $("#foundation_upsell_"+type+"_"+handle).prop("checked", true).click();
  }

  return {
    Foundation: Foundation,
    buildFoundationUpsell: buildFoundationUpsell,
    selectFoundationUpsell: selectFoundationUpsell,
    showFoundationUpsell: showFoundationUpsell,
    hideFoundationUpsell: hideFoundationUpsell,
    scrollToContainer: scrollToContainer
  }
})();






/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.FindYourMatch = (function() {
  var cache = {
    $parent_container: $('[data-section-type="FindYourMatch"]'),

    $type: $('[data-dropdown-type="type"]'),
    $brand: $('[data-dropdown-type="brand"]'),
    $shade: $('[data-dropdown-type="shade"]'),

    $product_container: $(".findyour__single-recomendation"),

    $info_block: $(".findyour__info"),
    $info_title: $(".findyour__info-title"),
    $info_content: $(".findyour__info-description"),
    $info_link: $(".findyour__info .btn"),

    product_data: ""
  };

  var selectors = {
    view_more: ".findyour__product-upsell",
    upsell: "[data-section-type='complete-your-look']"
  }

  function FindYourMatch() {
    cacheData();

    buildTypeList();

    cache.$type.on("change", buildBrandList);
    cache.$brand.on("change", buildShadeList);
    cache.$shade.on("change", displayProduct);

    theme.Foundation.buildFoundationUpsell(cache.$parent_container, false);

    $(document).on("click", selectors.view_more, function(e) {
      theme.Foundation.showFoundationUpsell();

      var handle = e.target.dataset.productHandle;
      var product_data = cache.product_data.product_data[handle];

      theme.Foundation.selectFoundationUpsell("loose-powder", product_data["loose-powder"][0]);
      theme.Foundation.selectFoundationUpsell("pressed-powder", product_data["pressed-powder"][0]);
      theme.Foundation.selectFoundationUpsell("concealer", product_data["concealer"][0]);
      theme.Foundation.scrollToContainer();
    });
  }

  function cacheData() {
    cache.type_data = find_your_match_type_data;
    cache.dropdown_data = find_your_match_dropdown_data;
  }


  function buildTypeList() {
    cache.$type.html("<option value=''>Select Product Type</option>");
    // Data found in sections/page_find-your-match
    $.each(cache.dropdown_data, function(type) {
      cache.$type.append("<option value='"+type+"'>"+type+"</option>");
    });
  }

  function buildShadeList() {
    var type = cache.$type.val();
    var brand = $(this).val();

    cache.$shade.html("<option value=''>Select Shade</option>");
    if(brand == "") {
      cache.$shade.prop("disabled", true);
    }
    else {
      cache.$shade.prop("disabled", false);

      $.each(cache.dropdown_data[type][brand], function(shade) {
        cache.$shade.append("<option value='"+shade+"'>"+shade+"</option>");
      });
    }

    cache.$shade.change();
  }

  function buildBrandList() {
    var type = $(this).val();

    cache.$brand.html("<option value=''>Select Brand</option>");
    if(type == "") {
      cache.$brand.prop("disabled", true);
      cache.$info_block.hide();
    }
    else {
      if(type == "Liquid Foundation") {
        cache.product_data = foundation_data;
      }
      else if(type == "Foundation Stick") {
        cache.product_data = foundation_stix_data;
      }
      else if(type == "Tinted Moisturizer") {
        cache.product_data = skin_tint_data;
      }
      else if(type == "Creamy Concealer") {
        cache.product_data = creamy_concealer_data;
      }

      cache.$brand.prop("disabled", false);

      cache.$info_title.html(cache.type_data[type].title);
      cache.$info_content.html(cache.type_data[type].content);
      cache.$info_link.html(cache.type_data[type].button).attr("href", cache.type_data[type].url);

      cache.$info_block.show();

      $.each(cache.dropdown_data[type], function(brand) {
        cache.$brand.append("<option value='"+brand+"'>"+brand+"</option>");
      });
    }

    cache.$brand.change();
  }

  function displayProduct() {
    var type = cache.$type.val();
    var brand = cache.$brand.val();
    var shade = cache.$shade.val();

    if(shade == "") {
      cache.$product_container.hide();
      theme.Foundation.hideFoundationUpsell();
    }
    else {
      cache.$product_container.empty();

      $.each(cache.dropdown_data[type][brand][shade], function(handle, match_description) {
        theme.Shopify.getProduct(handle).then(function(products) {
          var product = products[0];

          var string = " \
            <div class='findyour__product'> \
              <div class='findyour__product--image'> \
                <img src='"+product.images[0]+"' alt='' /> \
                <img class='findyour__product--swatch' src='"+(cache.product_data.product_data[handle].swatch.indexOf("cdn.shopify") > -1 ? cache.product_data.product_data[handle].swatch : (cl.url(theme.cloudinary.multi_variant+cache.product_data.product_data[handle].swatch)))+"' alt='' /> \
              </div><div class='findyour__product-info'> \
                <label class='findyour__product-info--type'>"+product.type+"</label> \
                <label class='findyour__product-info--title'>"+product.title+"</label> \
                <p class='findyour__product-info--description'>"+product.description+"</p> \
                "+((product.shade_description != "") ? "<p class='findyour__product-info--shade-description'>"+product.shade_description+"</p>" : "")+"\
                <hr /> \
                <p class='findyour__product-info--match-description'>"+match_description+"</p> \
              </div> \
              <form class='findyour__product-info--form' action='/cart/add'> \
                <input type='hidden' name='id' value='"+product.variant_id+"' /> \
                <input type='hidden' name='quantity' value='1' /> \
                <button class='btn' "+(product.available ? "" : "disabled='disabled'")+"> \
                  "+(product.available ? "Add to Bag - <span class='findyour__product-info--price'>"+theme.Shopify.formatMoney(product.sale_price)+"</span>" : "Out of stock")+" \
                </button> \
              </form>";
              if(cache.product_data.upsell_type && cache.product_data.upsell_type == "foundation") {
                string += "<button class='text-link findyour__product-upsell' data-product-handle='"+product.handle+"'>View Related Products</button>";
              }
          string += " \
            </div>";

          cache.$product_container.append(string);
          cache.$product_container.show();

          $('html, body').animate({
            scrollTop: cache.$product_container.offset().top - 110
          }, 500);
        });
      });
    }
  }

  return {
    FindYourMatch: FindYourMatch
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.BrowsByEndLook = (function() {
  var cache = {
    $look_container: $(".browslook__images"),
    $product_blocks: $(".browslook__product-swatches")
  };

  var selectors = {
    product_shade_description: ".browslook__product-shade-description",
    product_description: ".browslook__product-description",
    product_price: ".browslook__product-price",
    product_image: ".browslook__product-image",
    product_id: ".browslook__product-form--input",

    container: ".browslook__block",

    swatch: ".browslook__swatch",

    product_blotch: ".browslook__product-shade--image",
    product_shade: ".browslook__product-shade--color",
    before: ".browslook__images--before",
    after: ".browslook__images--after",

    form_submit: ".browslook__product-form .btn"
  }

  function BrowsByEndLook() {
    cache.$look_container.twentytwenty();

    buildSwatches();

    $(selectors.swatch).on("click", handleSwatchSelect);

    $("[data-product-handle='soft-black-gel']").click();
    $("[data-product-handle='auburn']").click();
    $("[data-product-handle='bangin-brunette-pencil']").click();
    $("[data-product-handle='honey-blonde']").click();
  }

  function handleSwatchSelect(e) {
    var handle = $(this).attr("data-product-handle");
    var $context = $(this);

    theme.Shopify.getProduct(handle).then(function(products) {
      var product = products[0];

      if(product.type == "Brow Boss Pencil") {
        var mvp_data = brow_boss_pencil_data;
      }
      else if(product.type == "Brow Boss Gel") {
        var mvp_data = brow_boss_gel_data;
      }
      else if(product.type == "Precision Brow Pencil") {
        var mvp_data = precision_brow_pencil_data
      }
      else if(product.type == "Precision Brow Colour") {
        var mvp_data = precision_brow_colour_data;
      }

      var $parent = $context.closest(selectors.container);

      $parent.find(selectors.swatch).removeClass("browslook__swatch--selected");
      $context.addClass("browslook__swatch--selected");

      $parent.find(selectors.product_shade).html(product.title);
      $parent.find(selectors.product_image).attr("src", product.images[0]);
      $parent.find(selectors.product_price).html(theme.Shopify.formatMoney(product.sale_price));
      $parent.find(selectors.product_description).html(mvp_data.description);
      $parent.find(selectors.product_shade_description).html(product.shade_description);

      $parent.find(selectors.product_id).val(product.variant_id);

      $parent.find(selectors.before).attr("src", cl.url(theme.cloudinary.multi_variant+mvp_data.product_data[handle].before, { width: 380, crop: "scale" }));
      $parent.find(selectors.after).attr("src", cl.url(theme.cloudinary.multi_variant+mvp_data.product_data[handle].after, { width: 380, crop: "scale" }));
      $parent.find(selectors.product_blotch).attr("src", cl.url(theme.cloudinary.multi_variant+mvp_data.product_data[handle].blotch, { width: 300, crop: "scale" }));

      if(product.available)
        $parent.find(selectors.form_submit).prop("disabled", false).val("Add to Cart");
      else
        $parent.find(selectors.form_submit).prop("disabled", true).val("Out of Stock");

      $(window).resize();
    });
  }

  function buildSwatches() {
    cache.$product_blocks.each(function() {
      var product_type = $(this).attr("data-product-type");

      if(product_type == "brow-boss-pencil") {
        var data = brow_boss_pencil_data;
      }
      else if(product_type == "brow-boss-gel") {
        var data = brow_boss_gel_data;
      }
      else if(product_type == "precision-brow-pencil") {
        var data = precision_brow_pencil_data;
      }
      else if(product_type == "precision-brow-colour") {
        var data = precision_brow_colour_data;
      }

      var string = " \
        <div class='browslook__swatches'>";
        $.each(data.product_data, function(handle, product_data) {
          if(handle == "clear") {
            return true;
          }
          string += "<button class='browslook__swatch text-link' data-product-handle='"+handle+"'> \
                <img src='"+cl.url(theme.cloudinary.multi_variant+product_data.swatch, { width: 40, crop: "scale" })+"' alt='"+product_data.shade+"' /> \
              </button>";
        });
      string += "</div>";

      $(this).append(string);
    });
  }

  return {
    BrowsByEndLook: BrowsByEndLook
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.BrowsByShade = (function() {
  var cache = {
    $container_select: $(".brows-by-shade__container"),
    $container_result: $(".brows-by-shade__upsell"),

    $selector: $("#brows-by-shade__slider-star-controller"),

    $slider: $(".brows-by-shade__slider"),
    $slider_block: $(".brows-by-shade__slider-block"),
    $slider_block_light: $(".brows-by-shade__slider-block[data-shade-skintone='light'] .brows-by-shade__slider--container"),
    $slider_block_medium: $(".brows-by-shade__slider-block[data-shade-skintone='medium'] .brows-by-shade__slider--container"),
    $slider_block_dark: $(".brows-by-shade__slider-block[data-shade-skintone='dark'] .brows-by-shade__slider--container"),
    $carousel: $(".brows-by-shade__carousel"),
    $star: null,

    $select_shade_button: $("#select-shade"),

    $product_container: $(".brows-by-shade__products"),
    $product_back: $(".brows-by-shade__back-text a"),
    $product_back_image: $(".brows-by-shade__back-image img"),
    $product_back_shade: $(".brows-by-shade__back-selected--shade"),

    $match_brand: $(".match-by-shade__dropdown--brand"),
    $match_shade: $(".match-by-shade__dropdown--shade"),
    $match_product_container: $(".match-by-shade__complete")
  };

  var selectors = {
    shade_carousel: ".brows-by-shade__carousel",
    owl_center: ".owl-item.active.center"
  }

  function BrowsByShade() {
    cacheShadeData();

    buildSlider();
    buildCarousel();

    cache.$selector.on("change", handleShadeChange);

    cache.$select_shade_button.on("click", function() {
      showShadeData(cache.$selector.val());
    });

    cache.$product_back.on("click", showShadeSelection);

    populateMatchBrandDropdown();
    cache.$match_brand.on("click", populateMatchShadeDropdown);
    cache.$match_shade.on("click", buildMatchProduct);
  }

  function populateMatchBrandDropdown() {
    $.each(cache.match_data, function(brand, data) {
      cache.$match_brand.append("<option value='"+brand+"'>"+brand+"</option>");
    });
  }

  function populateMatchShadeDropdown() {
    var brand = $(this).val();
    
    cache.$match_shade.html("<option value=''>Select Shade</option>");
    if(brand != "") {
      $.each(cache.match_data[brand], function(shade, data) {
        cache.$match_shade.append("<option value='"+shade+"'>"+shade+"</option>");
      });
    }
  }

  function buildMatchProduct() {
    var brand = cache.$match_brand.val();
    var shade = $(this).val();

    if(shade == "") {
      cache.$match_product_container.removeClass("visible");
    }
    else {
      theme.Shopify.getProducts(cache.match_data[brand][shade].handle).then(function(products) {
        var string = "<label class='match-by-shade__title'>Based on your selection we recommend...</label>";

        $.each(products, function(index, product_data) {
          string += "<div class='match-by-shade__product'> \
              <img class='match-by-shade__product--image' src='"+product_data.images[0]+"' alt='' /><div class='match-by-shade__product--info'> \
                <label class='match-by-shade__product--title'>"+product_data.title+"</label> \
                <label class='match-by-shade__product--type'>"+product_data.type+"</label> \
                <p class='match-by-shade__product--description'>"+product_data.shade_description+"</p> \
              </div> \
              <form class='match-by-shade__product--form' action='/cart/add'> \
                <input type='hidden' name='id' value='"+product_data.variant_id+"' /> \
                <input type='hidden' name='quantity' value='1' /> \
                <button class='btn "+(product_data.available ? "" : "disabled")+"'> \
                  "+(product_data.available ? "Add to Bag - <span class='match-by-shade__product--price'>"+theme.Shopify.formatMoney(product_data.sale_price)+"</span>" : "Out of stock")+" \
                </button> \
              </form> \
            </div>";
        });

        cache.$match_product_container.html(string);
      });
    }
  }

  function showShadeSelection(e) {
    e.preventDefault();

    cache.$container_result.hide();
    cache.$container_select.fadeIn("fast");

    $('html, body').animate({
      scrollTop: 0
    }, 300);
  }

  function cacheShadeData() {
    cache.shade_data = brows_by_shade_shade_data;
    cache.match_data = brows_by_shade_match_data;
  }

  function showShadeData(shade) {
    var shade_data = cache.shade_data[shade];

    cache.$product_container.empty();

    cache.$product_back_image.attr("src", cl.url(theme.cloudinary.multi_variant+shade_data.swatch, { width: 40, crop: "scale" }));
    cache.$product_back_shade.html(shade_data.title);

    theme.Shopify.getProducts(shade_data.products).then(function(products) {
      $.each(products, function(index, product) {
        var $product = theme.Product.createProductListing(product, false);
        cache.$product_container.append($product);
      });

      cache.$container_select.hide();
      cache.$container_result.fadeIn("fast");

      $('html, body').animate({
        scrollTop: 0
      }, 300);
    });
  }

  function handleShadeChange() {
    var star_location = cache.$star.slider("value");
    var length = $(this).children().length;

    if((this.selectedIndex + 1) != Math.floor((star_location / (100 / length)) + 1)) {
      cache.$star.slider("value", (((this.selectedIndex) * (100 / length)) + 1));
    }

    cache.$carousel.trigger('to.owl.carousel', this.selectedIndex);
  }

  function buildSlider() {
    $.each(cache.shade_data, function(shade, shade_data) {
      if(shade_data.shade == "light") {
        var $container = cache.$slider_block_light;
      }
      else if(shade_data.shade == "medium") {
        var $container = cache.$slider_block_medium;
      }
      else if(shade_data.shade == "dark") {
        var $container = cache.$slider_block_dark;
      }

      $container.append("<button class='brows-by-shade__slider--button' data-shade='"+shade+"' style='background:"+shade_data.hex+"'></button>");
    });

    cache.$star = $("<div id='slider'></div>").slider({
      slide: function(event, ui) {
        var length = cache.$selector.children().length
        var val = Math.floor((ui.value / (100 / length)) + 1);
        val = val > length ? length : val;

        cache.$selector[0].selectedIndex = val - 1;
        cache.$selector.change();
      }
    });
    cache.$slider.prepend(cache.$star);
  }

  function buildCarousel() {
    var string = "";

    $.each(cache.shade_data, function(shade, shade_data) {
      string += " \
        <div class='brows-by-shade__carousel-item' data-shade='"+shade+"'> \
          <div class='brows-by-shade__carousel-item--split'> \
            <div class='brows-by-shade__item-shade--hair'> \
              <img src='"+cl.url(theme.cloudinary.multi_variant+shade_data.hair)+"' alt='' /> \
            </div> \
            <label class='brows-by-shade__item-shade--subtitle'>Your hair color:</label> \
            <label class='brows-by-shade__item-shade--title'>"+shade_data.color+"</label> \
          </div><div class='brows-by-shade__carousel-item--split'> \
            <div class='brows-by-shade__item-shade--swatch'> \
              <img src='"+cl.url(theme.cloudinary.multi_variant+shade_data.swatch, { width: 400, crop: "scale" })+"' alt='' /> \
            </div> \
            <label class='brows-by-shade__item-shade--subtitle'>We recommend shade:</label> \
            <label class='brows-by-shade__item-shade--title'>"+shade_data.title+"</label> \
          </div> \
        </div>";
    });

    cache.$carousel.trigger('replace.owl.carousel', string);
    cache.$carousel.trigger('to.owl.carousel', 0);
    cache.$carousel.trigger('refresh.owl.carousel');

    cache.$carousel.on('dragged.owl.carousel', function(event) {
      var shade = $(selectors.owl_center).find("[data-shade]").attr("data-shade");
      cache.$selector.val(shade).change();
    });
  }

  return {
    BrowsByShade: BrowsByShade
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.FindYourShade = (function() {
  var cache = {
    $container: $(".shade-finder__container"),

    $header_container: $(".shade-finder__header"),
    $subtitle: $(".shade-finder__header--subtitle"),
    $title: $(".shade-finder__header .heading__text-stroke"),

    total_products: 0,
    products: {},
    current_type: "",
    current_undertone: "",

    filter_container: $(".shade-finder__filter-container"),

    $product_type_desktop: $(".shade-finder__type--desktop"),

    $undertone_container: $(".shade-finder__undertones"),

    $shade_container: $(".shade-finder__slider--container"),

    $slider: $(".shade-finder__slider"),
    $slider_container: $(".shade-finder__slider--container"),
    $star: null,

    $carousel_container: $(".shade-finder__carousel-container"),
    $shade_finder_container: $(".shade-finder__slider-container"),

    $carousel: $(".shade-finder__carousel"),

    $form_add: $(".shade-finder__form--add"),
    $form_id: $(".shade-finder__form--id"),
    $form_price: $(".shade-finder__form--price"),
    $form_submit: $(".shade-finder__form--submit")
  };

  var selectors = {
    popup: "#shade-finder__popup",
    popup_button: ".shade-finder__popup-type",

    undertone: ".shade-finder__undertone",

    product_type_desktop: ".shade-finder__type--desktop",
    product_type_mobile: ".shade-finder__type--mobile",

    carousel_centered: ".owl-item.center",
    carousel_uncentered: ".owl-item:not(.center)",
    carousel_item: ".shade-finder__carousel-item",

    product_selector: ".shade-finder__slider--button",

    gallery_main_image: ".shade-finder__box-image img",
    gallery_text: ".shade-finder__box-instagram",
    gallery_button: ".shade-finder__gallery--block"
  }

  var classes = {
    product_type_selected: "shade-finder__type--active",
    undertone_selected: "shade-finder__undertone--active"
  }

  function FindYourShade() {
    theme.Foundation.buildFoundationUpsell(cache.$container, false);

    showProductTypePopup();
    $(document).on("click", selectors.popup_button, selectProductType);
    $(document).on("change", selectors.product_type_mobile, selectProductType);

    cache.$product_type_desktop.on("click", populateProductTypeData);

    $(document).on("click", selectors.carousel_uncentered, goToSlide);

    $(document).on("click", selectors.undertone, selectUndertone);

    $(document).on("click", selectors.gallery_button, switchGalleryImage);
  }


  function switchGalleryImage() {
    var $parent = $(this).closest(selectors.carousel_item);
    var $image = $(this).find("img");
    
    $parent.find(selectors.gallery_button).removeClass("selected");
    $(this).addClass("selected");

    $parent.find(selectors.gallery_main_image).attr("src", $image.attr("src"));
    $parent.find(selectors.gallery_text).html($image.attr("alt"));
  }


  function selectUndertone() {
    $(selectors.undertone).removeClass(classes.undertone_selected);
    $(this).addClass(classes.undertone_selected);

    var undertone = $(this).attr("data-undertone");
    cache.current_undertone = undertone;

    buildCarousel();
    buildSlider();
  }

  function buildUndertones() {
    cache.$undertone_container.empty();

    cache.$undertone_container.append("<button class='btn shade-finder__undertone shade-finder__undertone--active' data-undertone=''>All</button>");
    $.each(cache.type_data.undertones, function(index, undertone) {
      cache.$undertone_container.append("<button class='btn shade-finder__undertone' data-undertone='"+undertone+"'>"+undertone+"</button>");
    });
  }



  function showProductTypePopup() {
    $.fancybox.open({
      src  : selectors.popup,
      type : 'inline'
    });
  }

  function populateProductTypeData() {
    cache.current_undertone = "";

    if(!$(this).hasClass(classes.product_type_selected)) {
      cache.$product_type_desktop.removeClass(classes.product_type_selected);
      $(this).addClass(classes.product_type_selected);

      var product_type = $(this).attr("data-product-type");
      cache.current_type = product_type;

      cache.$carousel_container.attr("data-product-type", cache.current_type);
      cache.$shade_finder_container.attr("data-product-type", cache.current_type);
      cache.$carousel.attr("data-product-type", cache.current_type);
      cache.$header_container.attr("data-product-type", cache.current_type);

      if(product_type == "foundation") {
        cache.type_data = foundation_data;
      }
      else if(product_type == "concealer") {
        cache.type_data = concealer_data;
      }
      else if(product_type == "foundation-stix") {
        cache.type_data = foundation_stix_data;
      }
      else if(product_type == "skin-tint") {
        cache.type_data = skin_tint_data;
      }
      else if(product_type == "creamy-concealer") {
        cache.type_data = creamy_concealer_data;
      }

      if(cache.type_data.undertones) {
        cache.$undertone_container.parent().show();
      }
      else {
        cache.$undertone_container.parent().hide();
      }

      if(cache.type_data.page_title) {
        cache.$title.html(cache.type_data.page_title);
        cache.$subtitle.html(cache.type_data.page_subtitle);
      }
      else {
        cache.$title.html("find your shade");
        cache.$subtitle.html("based on your skin");
      }
      
      
      buildUndertones();
      buildCarousel();
      buildSlider();
    }
  }

  function selectProductType() {
    var product_type = $(this).attr("data-product-type") || $(this).val();
    $(selectors.product_type_desktop).filter("[data-product-type='"+product_type+"']").click();

    $.fancybox.close();
  }



  function updateProductData() {
    setTimeout(function() {
      var $target = $(selectors.carousel_centered).find("[data-product-handle]");

      var handle = $target.attr("data-product-handle");
      var index = $target.attr("data-product-index");

      var product = cache.products[handle];
      var product_data = cache.type_data.product_data[handle];

      cache.$form_id.val(product.variant_id);
      cache.$form_price.html(theme.Shopify.formatMoney(product.sale_price));

      if(product.available) {
        cache.$form_submit.prop("disabled", false);
        cache.$form_add.html("add to bag");
      }
      else {
        cache.$form_submit.prop("disabled", true);
        cache.$form_add.html("out of Stock");
      }

      if(cache.type_data.upsell_type == "foundation") {
        theme.Foundation.showFoundationUpsell();
        theme.Foundation.selectFoundationUpsell("loose-powder", product_data["loose-powder"][0]);
        theme.Foundation.selectFoundationUpsell("pressed-powder", product_data["pressed-powder"][0]);
        theme.Foundation.selectFoundationUpsell("concealer", product_data["concealer"][0]);
      }
      else {
        theme.Foundation.hideFoundationUpsell();
      }      
    }, 1);
  }



  function goToSlide(e) {
    e.preventDefault();
    
    cache.$carousel.trigger('to.owl.carousel', $(this).index());
    cache.$star.slider("value", (($(this).find("[data-product-handle]").attr("data-product-index") * (100 / cache.total_products)) + 1));    

    updateProductData();
  }

  function buildSlider() {
    cache.total_products = 0;
    cache.$slider_container.empty();
    if(cache.$star) {
      cache.$star.remove();
    }

    $.each(cache.type_data.product_data, function(handle, product_data) {
      cache.$slider_container.append("<button \
        "+((cache.current_undertone != "" && product_data.undertone.indexOf(cache.current_undertone) == -1) ? "disabled='disabled'" : "")+" \
        class='shade-finder__slider--button' \
        data-product-undertone='"+(product_data.undertone ? product_data.undertone.join(",") : '')+"' \
        data-product-handle='"+handle+"' \
        data-product-index='"+cache.total_products+"' \
        style='background:"+product_data.hex+"'> \
          <span class='visually-hidden'>Select Shade: "+handle+"</span> \
        </button>");

      cache.total_products += 1;
    });

    cache.$star = $("<div id='slider'></div>").slider({
      create: function(event, ui) {
        $(this).slider('value', 50);
      },
      slide: function(event, ui) {
        var val = Math.floor((ui.value / (100 / cache.total_products)) + 1);
        val = val > cache.total_products ? cache.total_products : val;

        if($("[data-product-index='"+(val-1)+"']").length > 1) {
          cache.$carousel.trigger("to.owl.carousel", $(selectors.carousel_item).filter("[data-product-index='"+(val-1)+"']").parent().index());
          updateProductData();//cache.$carousel.trigger("dragged.owl.carousel");
        }
      }
    });
    cache.$slider.prepend(cache.$star);
  }

  function buildCarousel() {
    var string = "";
    var product_list = [];

    $.each(cache.type_data.product_data, function(handle, product_data) {
      product_list.push(handle);
    });

    theme.Shopify.getProducts(product_list).then(function(products) {
      var total_products_that_match_filter = 0;

      $.each(products, function(index, product) {
        if(!product) {
          return true;
        }
        var product_data = cache.type_data.product_data[product.handle];

        cache.products[product.handle] = product;

        if(cache.current_undertone != "" && product_data.undertone.indexOf(cache.current_undertone) == -1) {
          return true;
        }

        if(cache.type_data.display && cache.type_data.display == "burts") {
          string += " \
            <div class='shade-finder__carousel-item shade-finder__box' data-product-index='"+index+"' data-product-handle='"+product.handle+"' data-variant-id='"+product.variant_id+"' data-product-available='"+product.available+"' data-product-undertone='"+(product_data.undertone ? product_data.undertone.join(",") : '')+"'> \
              <div class='shade-finder__box--outer'> \
                <div class='shade-finder__box--inner'> \
                  <label class='shade-finder__box-title'><span>"+product.title+"<span></label> \
                  <div class='shade-finder__box-image'> \
                    <img src='"+product_data.gallery[0].image+"' alt='' /> \
                    <label class='shade-finder__box-instagram'>"+product_data.gallery[0].instagram+"</label> \
                  </div>";
              if(product_data.gallery.length > 1) {
                string += " \
                  <div class='shade-finder__gallery'>";
                for(var i = 0; i < product_data.gallery.length; ++i) {
                  string += "<button class='text-link shade-finder__gallery--block "+(i == 0 ? 'selected' : '')+"'> \
                      <span class='visually-hidden'>Expand model image</span> \
                      <img src='"+product_data.gallery[i].image+"' alt='"+product_data.gallery[i].instagram+"' /> \
                    </button>";
                }
                string += "</div>";
              }
              string += " \
                  <div class='shade-finder__box-product'> \
                    <div class='shade-finder__box-product--image' style='background: "+product_data.hex+";'> \
                    </div><div class='shade-finder__box-product--content'> \
                      <label class='shade-finder__box-product--title'>"+product.title+"</label> \
                      <p class='shade-finder_box-product--description'>"+product.shade_description+"</p> \
                    </div> \
                    <a class='btn btn--secondary' href='"+product.url+"'>select shade</a> \
                  </div> \
                </div> \
              </div> \
            </div>";
        }
        else {
          string += " \
            <div class='shade-finder__carousel-item shade-finder__default' data-product-index='"+index+"' data-product-handle='"+product.handle+"' data-variant-id='"+product.variant_id+"' data-product-available='"+product.available+"' data-product-undertone='"+product_data.undertone.join(",")+"'> \
              <div class='shade-finder__carousel-item--image'> \
                <div class='wishlist__container' data-handle='"+product.handle+"'></div> \
                <a href='"+product.url+"'> \
                  <img src='"+cl.url(theme.cloudinary.foundation+product_data.full_swatch, { width: 380, crop: "scale" })+"' alt='' /> \
                </a> \
              </div> \
              <div class='shade-finder__carousel-item--content'> \
                <label class='shade-finder__carousel-item--title'>"+product.title+"</label> \
                <p class='shade-finder__carousel-item--description'>"+product.shade_description+"</p> \
              </div> \
            </div>";
        }
        
        total_products_that_match_filter += 1
      });

      cache.$carousel.off("dragged.owl.carousel");
      cache.$carousel.on('dragged.owl.carousel', function() {
        var $target = $(selectors.carousel_centered).find("[data-product-handle]");
        var index = $target.attr("data-product-index");
      
        cache.$star.slider("value", ((index * (100 / cache.total_products)) + 1));
        updateProductData();
      });

      cache.$carousel.trigger('replace.owl.carousel', string);
      cache.$carousel.trigger('to.owl.carousel', Math.round((total_products_that_match_filter / 2) - 1));
      cache.$carousel.trigger('refresh.owl.carousel');
      cache.$carousel.trigger('dragged.owl.carousel');
    });
  }


  return {
    FindYourShade: FindYourShade
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.HomepageCollection = (function() {
  var cache = {};

  var selectors = {}

  function HomepageCollection(container) {
    var product_list = $(container).attr("data-product-list").split(",");

    if(product_list != "") {
      theme.Shopify.getProducts(product_list).then(function(products) {
        $(container).append(theme.Product.createProductCarousel(products, true)); 
      });
    }
  }


  return HomepageCollection
})();



/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.HomepageTakeover = (function() {
  var cache = {
    $hero: $(".takeover-banners--a"),
    $banner_b: $(".takeover-banners--b"),
    $collection: $(".takeover-collection--a")
  };

  var selectors = {}

  function HomepageTakeover(container) {
    cache.$hero.click(function(e) {
      e.preventDefault();
    
      if(!$(this).parent().is("a")) {
        $("html, body").animate({
          scrollTop: cache.$collection.offset().top - 120
        });
      }
    });
  }

  return HomepageTakeover;
})();






/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.ZodiacQuiz = (function() {
  var cache = {
    $month: $(".zodiac__birthday--month"),
    $day: $(".zodiac__birthday--day"),
    $dropdown: $(".zodiac__birthday select")
  };

  function ZodiacQuiz() {
    cache.$month.change(function(e) {
      var month = $(this).val();
      if(month != "") {
        var days = daysInMonth("2018", parseInt(month)+1);

        cache.$day.find("option").each(function() {
          var day = parseInt($(this).val());
          if(day <= days || day == Number.NaN)
            $(this).show();
          else
            $(this).hide();
        });

        scrollToSign();
      }
    });

    cache.$day.change(function(e) {

      scrollToSign();
    });
  }

  function daysInMonth (year, month) {
    return new Date(year, month, 0).getDate();
  }

  function scrollToSign() {
    var month = $(".zodiac__birthday--month").val();
    var day = $(".zodiac__birthday--day").val();

    if(month != "" && day != "") {
      var now = new Date("2018", month, day);
      var start = new Date("2018", 0, 0);
      var diff = now - start;
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.floor(diff / oneDay);

      if(day >= 80 && day <= 109) var sign = "aries";
      else if(day >= 110 && day <= 140) var sign = "taurus";
      else if(day >= 141 && day <= 171) var sign = "gemini";
      else if(day >= 172 && day <= 203) var sign = "cancer";
      else if(day >= 204 && day <= 234) var sign = "leo";
      else if(day >= 235 && day <= 265) var sign = "virgo";
      else if(day >= 266 && day <= 295) var sign = "libra";
      else if(day >= 296 && day <= 325) var sign = "scorpio";
      else if(day >= 326 && day <= 355) var sign = "sagittarius";
      else if((day >= 356 && day <= 366) || (day >= 0 && day <= 19)) var sign = "capricorn";
      else if(day >= 20 && day <= 49) var sign = "aquarius";
      else if(day >= 50 && day <= 79) var sign = "pisces";

      $("html, body").animate({
        scrollTop: $("[data-zodiac='"+sign+"']").position().top - 90
      });

      $(".zodiac__birthday--month").val("");
      $(".zodiac__birthday--day").val("");
    }
  }

  return ZodiacQuiz;
})();






/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.EmailSignup = (function() {
  var cache = {
    $phone: $("#phone"),
    $email: $("#emailsignup")
  };

  function EmailSignup() {
    cache.$phone.intlTelInput({
      "allowDropdown": true,
      "initialCountry": "us",
      "separateDialCode": true
    });

    cache.$email.submit(function(){
      var code = $('.selected-dial-code').text();
      var number = cache.$phone.val();
      
      if(number.indexOf('+') < 0) {
        var phone = code + number;
        cache.$phone.val(phone);
      }
    });
  }

  return EmailSignup;
})();




/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Solbody = (function() {
  var cache = {
    $masonry: $(".solbody__masonry")
  };

  function Solbody() {
    cache.$masonry.masonry({
      itemSelector: '.solbody__masonry-block',
      columnWidth: '.masonry-sizer',
      percentPosition: true,
      gutter: 10
    });

    cache.$masonry.imagesLoaded().progress(function() {
      cache.$masonry.masonry('layout');
    });
  }

  return Solbody;
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Looks = (function() {
  var cache = {
    $accordion_title: $(".looks__accordion-title"),
    $accordion_container: $(".looks__accordion-container"),
    $quickview: $(".looks__accordion--quick-view")
  };

  function Looks() {
    cache.$accordion_title.on("click", toggleAccordion);
    cache.$quickview.on("click", showProductQuickview);
  }

  function toggleAccordion() {
    cache.$accordion_container.toggleClass("looks__accordion-container--open");
  }

  function showProductQuickview() {
    var handle = $(this).attr("data-product-handle");

    theme.Shopify.getProduct(handle).then(function(products) {
      theme.Product.createProductQuickview(products[0]);
    });
  }

  return Looks;
})();





/**
 * 
 * 
 * 
 * 
 */
window.theme = window.theme || {};
theme.SlideSignup = (function() {
  var selectors = {
    section: ".slideSignup",
    container: ".signup-slideup",
    phone: "#signup-slideup-phone-alternate",
    phone_real: "#signup-slideup-phone",
    close: ".signup-slideup__close",
    form: ".signup-slideup__form",
    submit: ".signup-slideup__form-block--submit",
    cancel: ".signup-slideup__form-block--cancel"
  }

  function init() {
    cache = cache_data;
    getSignupId();

    if(showSlideSignup()) {
      buildSlideSignup();
      $(document).on("click", selectors.close, closeSlideSignup);
      $(document).on("click", selectors.cancel, closeSlideSignup);

      $(document).on("click", selectors.container, openSlideSignupMobile);
      
      if(typeof KlaviyoSubscribe != "undefined") {
        KlaviyoSubscribe.attachToForms(selectors.form, {
          hide_form_on_success: true,
          success: function($form) {
            $(selectors.container).html(" \
              <p class='signup-slideup__complete'> \
                You're on the list! <span>Check your email inbox for your 10% off code</span>\
              </p>");

            setTimeout(function() {
              $(selectors.container).removeClass("signup-slideup--open");
              setTimeout(function() {
                $(selectors.container).remove();
              }, 1000);
            }, 3000);
          },
          extra_properties: {
            $source: 'emailslideup'
          }
        });
      }
    }
  }

  function openSlideSignupMobile() {
    $(selectors.container).addClass("signup-slideup--show");
  }

  function closeSlideSignup(e) {
    e.preventDefault();
    $(selectors.container).remove();
  }

  function getSignupId() {
    if(theme.page_handle == "solbody" || (theme.product && theme.product.brand == "solbody")) {
      cache.klaviyo_id = cache.solbody_id;
    }
    else {
      cache.klaviyo_id = cache.colourpop_id;
    }
  }

  function showSlideSignup() {
    if(theme.customer && theme.customer.email == "alex@satel.ca") return true;

    if(theme.settings.page_handle == "frozen-2-sign-up" || (theme.settings.collection_handle == "safiya-nygaard-makeup" && true)) {
      return false; 
    }
    if(!readCookie("subscribe")) {
      return true;
    }
    else {
      return false;
    }
  }

  function buildSlideSignup() {
    var string = " \
      <div class='signup-slideup'> \
        <div class='signup-slideup__container'> \
          <button class='text-link signup-slideup__close'><img src='"+(cache.button ? "https://cdn2.shopify.com/s/files/1/1338/0835/files/icon-close-blk.svg?401941" : "https://cdn.shopify.com/s/files/1/1338/0835/files/icon-close-white.png?434469")+"' alt='close signup popup' /></button> \
          <div class='signup-slideup__content'> \
            <label class='signup-slideup__content--subtitle'>Get exclusive access &</label> \
            <label class='signup-slideup__content--title'>10% off</label> \
	        <label class='signup-slideup__content--subtitle'>when you sign up for our newsletter!</label> \
          </div><form action='//manage.kmail-lists.com/subscriptions/subscribe' method='POST' name='mc-embedded-subscribe-form' class='signup-slideup__form'> \
            <input class='signup-slideup__klaviyo-id' type='hidden' name='g' value='"+cache.klaviyo_id+"' /> \
            <div class='signup-slideup__form-block'> \
              <label class='signup-slideup__form-block--label' for='signup-slideup-email'>Email Address</label> \
              <input class='signup-slideup__form-block--input' id='signup-slideup-email' type='email' name='email' placeholder='janedoe@colourpop.com' /> \
            </div> \
            <div class='signup-slideup__form-block'> \
              <input class='btn "+(cache.button ? 'btn--secondary' : '')+" signup-slideup__form-block--submit' type='submit' name='subscribe' value='Yes, I want 10% off!' /> \
	          <a href='#close' class='signup-slideup__form-block--cancel'>I’ll pay full price</a> \
            </div> \
            <p class='signup-slideup__fine-print'> \
              By entering your email address you will receive promotional updates. Consent is not a condition of purchase. <a href='/pages/privacy-policy'>View Privacy Policy</a>. 10% off discount eligible for first time customers only. Discount requires a minimum order of $20. Exclusions apply. Your code will be sent via email. \
            </p> \
          </form> \
        </div> \
      </div>";

    $(selectors.section).append(string);

    setTimeout(function() {
      $(selectors.container).addClass("signup-slideup--open");
      createCookie("subscribe", "x", 7776000000);
    }, 5000);
  }

  return {
    init: init,
    showSlideSignup: showSlideSignup,
    buildSlideSignup: buildSlideSignup
  }
})();






/**
 * 
 * 
 * 
 * 
 */
window.theme = window.theme || {};
theme.Addresses = (function() {
  var cache = {
    $address: $(".edit_address")
  };

  var selectors = {
    country: ".address_country",
    province: ".address_province",
    province_container: ".address_container"
  }

  function Addresses() {
    cache.$address.each(function() {
      var country_id = $(this).find(selectors.country).attr("id");
      var province_id = $(this).find(selectors.province).attr("id");
      var province_container_id = $(this).find(selectors.province_container).attr("id");
      
      new Shopify.CountryProvinceSelector(country_id, province_id, {hideElement: province_container_id});  
    });
  }

  return Addresses;
})();





/**
 * 
 * 
 * 
 * 
 */
window.theme = window.theme || {};
theme.BYOP = (function() {
  var cache = {
    current_view: "#load",

    byop_count: 0,

    max_space: 24,
    available_space: 24,
    current_type: "eyes",
    current_size: "large",

    $container: $(".byop__container"),
    $navigation: $(".byop__navigation--link"),

    selected_swatches: {
      "eyes": [],
      "cheeks": []
    },
    filters: [],
    products: {
      list: [],
      data: {}
    }
  };

  var selectors = {
    swatch_container: ".byop__swatch-container",
    swatch: ".byop__swatch",
    swatches: ".byop__swatches",
    swatch_type_selector: ".byop__swatch-swapper",
    swatch_type_selector_selected: ".byop__swatch-swapper.active",
    swatch_selector: ".byop__swatch--image",
    swatch_group: ".byop__swatch-grouping",
    swatch_title: ".byop__swatch-grouping--title",
    swatch_group_eyes: ".byop__swatch-grouping--eyes",
    swatch_group_cheeks: ".byop__swatch-grouping--cheeks",

    see_more: ".byop__swatch--more",
    see_more_container: ".byop-more__container",
    see_more_close: ".byop-more__close",
    see_more_add: ".byop-more__add",

    remaining: ".byop__remaining",

    size: ".byop__sizes--button",
    size_selector: ".byop__popup--button",
    
    palette: ".byop__palette",
    palette_container: ".byop__palette-container",
    palette_swatches: ".byop__palette-swatch",
    palette_swatches_eyes: ".byop__palette-swatch--eyes",
    palette_swatches_cheeks: ".byop__palette-swatch--cheeks",
    palette_mobile_toggle: ".byop__palette-container__mobile-open",

    palette_selectors: ".byop__palette-selectors",
    palette_selectors_container: ".byop__palette-selectors--container",
    add: ".byop__add",

    filter_toggle: ".byop__filter-toggle",
    filter_container: ".byop__filters",
    filter_tags_container: ".byop__tags",
    filter_tag: ".byop__tag",
    filter_apply: ".byop__filters-button--apply",
    filter_clear: ".byop__filters-button--clear",
    filter: ".byop__filters-option--input",
    filter_checked: ".byop__filters-option--input:checked",

    social_container: ".byop__palette-social",
    social_button: ".byop__palette-social__content--button",
    social_palette: ".byop__palette-social__palette"
  };

  function getCache() {
    return cache;
  }

  function BYOP() {
    getProductData();

    $(document).on("click", selectors.swatch_selector, selectSwatch);
    $(document).on("click", selectors.see_more_add, selectSwatch);
    
    $(document).on("click", selectors.palette_swatches, removeSwatch);
    $(document).on("click", selectors.palette_mobile_toggle, toggleMobilePalette);    

    $(document).on("click", selectors.swatch_title, toggleSwatchGrouping);
    $(document).on("click", selectors.swatch_type_selector, selectSwatchType);

    $(document).on("click", selectors.see_more, buildSeeMore);
    $(document).on("click", selectors.see_more_close, closeSeeMore);

    $(document).on("click", selectors.size, selectSize);
    $(document).on("click", selectors.size_selector, updateSize);

    $(document).on("click", selectors.filter_toggle, toggleFilters);
    $(document).on("click", selectors.filter_apply, updateFilters);
    $(document).on("click", selectors.filter_clear, clearFilters);
    $(document).on("click", selectors.filter_tag, removeFilter);

    $(document).on("click", selectors.add, addPaletteToBag);

    $(document).on("click", selectors.social_button, updateSocialView);

    cache.$navigation.on("click", navigateToPage);

    $.each(theme.cart, function(index, product) {
      if(byop_palette_data.small.indexOf(product.handle) > -1 && product.price <= 600) {
        addByopCount();
      }

      if(byop_palette_data.large.indexOf(product.handle) > -1 && product.price <= 600) {
        addByopCount();
      }
    });

    changeView();
  }

  function addByopCount() {
    cache.byop_count += 1;
  }

  function minusByopCount() {
    cache.byop_count -= 1;
  }

  function navigateToPage(e) {
    e.preventDefault();
    var requested_view = $(this).attr("data-navigation");

    if(cache.current_view != requested_view) {
      if(requested_view == "#customize") {
        changeView(requested_view);
      }
      else if(requested_view == "#add" && ((cache.current_view == "#customize" && cache.available_space == 0) || (cache.current_view == "#social"))) {
        changeView(requested_view);
      }
    }
  }

  function changeView(view) {
    if(!view) view = "";
    if(cache.current_view != view) {
      cache.current_view = view;

      $.fancybox.close();

      if(view == "" || view == "#customize") {
        $(selectors.swatch_container).remove();
        $(selectors.social_container).remove();
        $(selectors.palette_selectors).remove();

        $(selectors.palette_mobile_toggle).html("open palette view");

        setPage("customize");
        getProductData([buildPaletteView, buildSwatchSelectors, selectSwatchType, buildFilterTags]);
      }
      else if(view == "#add") {
        $(selectors.social_container).remove();
        $(selectors.palette_selectors).remove();

        $(selectors.palette_mobile_toggle).html("go back to build palette");

        setPage("add");
        getProductData([buildPaletteView, buildPaletteSelectors]);
      }
      else if(view == "#social") {
        $(selectors.palette_selectors).remove();
        $(selectors.palette_container).remove();

        setPage("social");
        getProductData([buildSocialView]);
      }
    }  
  }

  function getProductData(callbacks) {
    $.each(byop_swatch_data, function(type, group) {
      $.each(group, function(title, swatches) {
        $.each(swatches, function(handle, swatch) {
          handle = handle.replace("@", "");
          if(!cache.products.data[handle]) {
            cache.products.list.push(handle);
            cache.products.data[handle] = {
              "found": false,
              "swatch": swatch,
              "group": group,
              "type": type,
              "size": (type == "eyes" ? 1 : 4),
              "handle": handle
            }
          }
        });
      });
    });

    theme.Shopify.getProducts(cache.products.list).then(function(products) {
      $.each(products, function(index, product) {
        if(product) {
          cache.products.data[product.handle].found = true;
          cache.products.data[product.handle].available = product.available;
          cache.products.data[product.handle].title = product.title;
          cache.products.data[product.handle].id = product.variant_id;
          cache.products.data[product.handle].shade_description = product.shade_description;
          cache.products.data[product.handle].tags = product.tags;
        }
      });

      cache.products.list = [];

      $.each(callbacks, function(index, cb) {
        cb();
      });
    });
  }
  
  function getProductHandle(target) {
    if(typeof $(target).attr("data-product-handle") != "undefined") {
      return $(target).attr("data-product-handle");
    }
    else if($(target).parent().length > 0) {
      return getProductHandle($(target).parent());
    }
    else {
      return false;
    }
  }

  function setPage(type) {
    cache.$container.attr("data-page-type", type);
    cache.$navigation.removeClass("active");
    cache.$navigation.filter("[data-navigation='#"+type+"']").addClass("active");
  }




  function toggleMobilePalette(e) {
    e.preventDefault();

    if(cache.current_view == "" || cache.current_view == "#customize") {
      $(selectors.palette_container).toggleClass("open");
    }
    else if(cache.current_view == "#add") {
      changeView("#customize");
    }
  }

  function updateSocialView(e) {
    e.preventDefault();

    $(selectors.social_button).removeClass("active");
    $(this).addClass("active");

    $(selectors.social_palette).attr("data-view-type", $(this).attr("data-view-type"));
  }

  function closeSeeMore(e) {
    if(e) {
      e.preventDefault();
    }

    $(selectors.see_more_container).remove();
  }

  function addPaletteToBag(e) {
    e.preventDefault();
    var $button = $(this);

    var random_string = Math.random().toString(36).substring(7);
    var shadows = [];
    var palette = cache.products.data[$(this).attr("data-palette-handle")].id;

    $.each(cache.selected_swatches, function(type, swatches) {
      $.each(swatches, function(index, swatch) {
        shadows.push(cache.products.data[swatch].id);
      });
    });

    var palette = [{
      "id": palette,
      "quantity": 1,
      "properties": {
        "palette_id": random_string,
        "palette_shadows": shadows,
        "palette_size": ""+cache.selected_swatches.cheeks.length+"c"+cache.selected_swatches.eyes.length+"e"
      }
    }];

    buildAddingPopup();

    BundleAdder()(palette, function() {
      setTimeout(function() {
        theme.Shopify.addItems(shadows).then(function() {
          theme.BYOP.changeView("#social");
          theme.BYOP.addByopCount();
        });
      }, 300);
    });
  }

  function removeFilter(e) {
    e.preventDefault();
    cache.filters.splice(cache.filters.indexOf($(this).attr("data-filter")), 1);
    updateFilters();
  }

  function updateFilters(e) {
    if(e) {
      e.preventDefault();
      cache.filters = [];
    }

    $(selectors.filter_checked).each(function() {
      cache.filters.push($(this).val());
    });

    buildSwatchSelectors(true);
    buildFilterTags();
    $(selectors.swatch_type_selector_selected).click();
    $.fancybox.close();

    if(e) {
      $(selectors.filter_toggle).focus();
    }

    $('html, body').animate({
      scrollTop: 10
    }, 300);
  }

  function clearFilters(e) {
    if(e) {
      e.preventDefault();
    }

    cache.filters = [];
    $(selectors.filter_checked).each(function() {
      $(this).prop("checked", false);
    });
  }

  function updateSize(e) {
    if(typeof $(this).attr("data-palette-size") != "undefined") {
      var size = $(this).attr("data-palette-size");

      if(size == "small") {
        var max_space = 12;
      }
      else if(size == "large") {
        var max_space = 24;
      }

      cache.max_space = max_space;
      cache.available_space = max_space;
      cache.current_size = size;

      clearPalette();
      $(selectors.palette).attr("data-palette-size", size);
      $(selectors.size).removeClass("active");
      $(selectors.size).filter("[data-palette-size='"+size+"']").addClass("active");      
    }

    $.fancybox.close();
  }  

  function selectSize(e) {
    e.preventDefault();

    var size = $(this).attr("data-palette-size");

    if(cache.current_size != size) {
      buildSizePopup(size);
    }
  }

  function clearPalette() {
    $.each(cache.selected_swatches, function(type, handles) {
      $.each(handles, function(index, handle) {
        activateSwatch(handle);
      });
    });

    cache.selected_swatches.eyes = [];
    cache.selected_swatches.cheeks = [];
    $(selectors.palette).empty();
    changeView("#customize");
    updateRemaining();
  }

  function updateRemaining() {
    if(cache.current_type == "eyes") {
      var text = "Fill up to "+cache.available_space+" eye shadows";
    }
    else if(cache.current_type == "cheeks") {
      if(cache.current_size == "small") {
        if(cache.available_space >= 8 && cache.selected_swatches.cheeks.length == 0) { var cheeks = 2 }
        else if(cache.available_space >= 4 && cache.selected_swatches.cheeks.length == 1) { var cheeks = 1 }
        else { var cheeks = 0 }
      }
      else {
        var cheeks = Math.floor(cache.available_space / 4);
      }
      
      var text = "Fill up to "+cheeks+" cheeks";
    }

    $(selectors.remaining).html(text);
  }

  function activateSwatch(handle) {
    $(selectors.swatch).filter("[data-product-handle='"+handle+"']").find(selectors.swatch_selector).prop("disabled", false);
    $(selectors.see_more_add).filter("[data-product-handle='"+handle+"']").prop("disabled", false).html("add to palette");
  }

  function deactivateSwatch(handle) {
    $(selectors.swatch).filter("[data-product-handle='"+handle+"']").find(selectors.swatch_selector).prop("disabled", true);
    $(selectors.see_more_add).filter("[data-product-handle='"+handle+"']").prop("disabled", true).html("added");
  }

  function toggleSwatchGrouping() {
    $(this).parent().toggleClass("open");
  }

  function selectSwatchType(e) {
    if(e) {
      $(selectors.swatch_type_selector).removeClass("active");
      $(this).addClass("active");
      $(selectors.swatch_group).removeClass("open");

      var type = $(this).attr("data-product-type");
      cache.current_type = type;
      updateRemaining();

      if(type == "eyes") {
        $(selectors.swatch_group_eyes).show();
        $(selectors.swatch_group_cheeks).hide();

        $(selectors.swatch_group_eyes).first().find(selectors.swatch_title).click();
      }
      else if(type == "cheeks") {
        $(selectors.swatch_group_eyes).hide();
        $(selectors.swatch_group_cheeks).show();

        $(selectors.swatch_group_cheeks).first().find(selectors.swatch_title).click();
      }
    }
    else {
      $(selectors.swatch_type_selector).first().click();
    }
  }

  function removeSwatch(e) {
    e.preventDefault();

    $swatch = $(this);

    $swatch.attr("aria-label", "Removed from palette");

    var product_handle = getProductHandle(this);
    var product_data = cache.products.data[product_handle];

    cache.available_space += product_data.size;
    cache.selected_swatches[product_data.type].splice(cache.selected_swatches[product_data.type].indexOf(product_handle), 1);
    
    setTimeout(function() {
      $swatch.remove();
      theme.BYOP.activateSwatch(product_handle);
      theme.BYOP.calculateSwatchPositions();
      theme.BYOP.changeView("#customize");
    }, 100);    
  }  

  function selectSwatch(e) {  
    e.preventDefault();

    $swatch = $(this);

    var product_handle = getProductHandle(this);
    var product_data = cache.products.data[product_handle];

    if(product_data.size <= cache.available_space && cache.selected_swatches[product_data.type].indexOf(product_handle == -1) && ((cache.available_space >= 4 && cache.selected_swatches.cheeks.length < 2 && cache.current_size == "small" && product_data.type == "cheeks") || product_data.type == "eyes" || cache.current_size == "large")) {
      cache.selected_swatches[product_data.type].push(product_handle);

      cache.available_space -= product_data.size;
      $(selectors.palette).append(buildPaletteSwatch(product_data));

      $swatch.attr("aria-label", "Added to palette");
      setTimeout(function() {
        $swatch.removeAttr("aria-label");
      }, 2000);

      setTimeout(function() {
        theme.BYOP.deactivateSwatch(product_handle);
      }, 100);
      
      calculateSwatchPositions();
    }

    if(cache.available_space == 0) {
      changeView("#add");
    }
  }

  function calculateSwatchPositions() {
    $(selectors.palette_swatches_eyes).each(function(index, e) {
      if(cache.max_space == 24) {
        var ix = ((index + 1) - (Math.floor((index + 1) / 13) * 12)) - 1;
        var x = Math.ceil(((ix) + 1) / 2);
        if(x % 2 == 0) { x += 1; }
        x = ix - x + 1;
        
        var y = Math.floor(index / 2) % 2;
        if(index > 11) { y += 2; }
                
        $(this).css("top", "calc((25% * "+y+") + (10px / "+(y + 1)+"))");
        $(this).css("left", "calc((100% / 6 * "+x+") + (10px / 6 * "+(6-x)+"))");
      }
      else {
        if(index < 4) {
          var x = index;

          $(this).css("top", "10px");
          $(this).css("left", "calc((100% / 4 * "+x+") + (10px / 4 * "+(4-x)+"))");
        }
        else {
          var x = + Math.floor(index / 4) + (Math.floor(index / 4) - 1);
          if(index % 2 == 0) { x -= 1; }

          var y = Math.floor(index / 2) % 2;
          if(index > 11) { y += 2; }

          $(this).css("top", "calc((33% * "+(y + 1)+") + (10px / "+(y + 1)+"))");
          $(this).css("left", "calc((100% / 4 * "+x+") + (10px / 4 * "+(4-x)+"))");
        }
      }
    });

    $(selectors.palette_swatches_cheeks).each(function(index, e) {
      if(cache.max_space == 24) {
        var x = index % 3;
        var y = Math.floor(index / 3);
                        
        $(e).css("bottom", "calc((50% * "+y+") + (10px / "+(y + 1)+"))");
        $(e).css("right", "calc((100% / 3 * "+x+") + (10px / 3 * "+(3-x)+"))");
      }
      else {
        var x = index % 2;
        $(e).css("bottom", "10px");
        $(e).css("right", "calc((100% / 2 * "+x+") + (10px / 2 * "+(2-x)+"))");
      }
    });

    updateRemaining();
  }

  function fillPalette() {
    $(selectors.palette).html(buildPaletteSwatch());
    calculateSwatchPositions();
    updateRemaining();
  }

  function toggleFilters(e) {
    if(e) {
      e.preventDefault();
    }

    buildFilters();
  }
  


  function buildSocialView() {
    var string = " \
      <div class='byop__palette-social'> \
        <div class='byop__palette-social__logo'> \
          <img src='//cdn.shopify.com/s/files/1/1338/0835/t/39/assets/logo.svg?6830523516656068258' alt='' /> \
        </div> \
        <div class='byop__palette-social__palette' data-view-type='swatch' data-palette-size='"+cache.current_size+"'> \
          <div class='byop__palette-social__swatches'>";
    
    var counter = 0;
    $.each(cache.selected_swatches, function(type, swatches) {
      
      $.each(swatches, function(index, swatch) {
        var product_data = cache.products.data[swatch];

        string += "<div style='background-image: url("+product_data.swatch+");' class='byop__palette-social__swatch byop__palette-social__swatch--"+product_data.type+"'> \
            <label class='byop__palette-social__swatch--label'>"+product_data.title+"</span> \
          </div>";

        if(product_data.type == "eyes") {
          counter += 1;
        }
        else {
          counter += 4;
        }

        if(counter % 4 == 0 && ((counter != 24 && cache.current_size == "large") || (counter != 12 && cache.current_size == "small"))) {
          string += "</div><div class='byop__palette-social__swatches'>";
        }
      });
    });
    
    string += " \
          </div> \
        </div> \
        <div class='byop__palette-social__content'> \
          <label class='byop__palette-social__content--title'>#ColourPopxYou</label> \
          <div class='byop__palette-social__content--buttons'> \
            <button class='btn text-link byop__palette-social__content--button active' data-view-type='swatch'>View Shades</button> \
            <button class='btn text-link byop__palette-social__content--button' data-view-type='title'>View Shade Names</button> \
          </div> \
          <label class='byop__palette-social__content--subtitle'> \
            You can collab with us! \
          </label> \
          <p class='byop__palette-social__content--text'> \
            Share your palette with us! Just take a screenshot of this page & use the hashtag #ColourPopxYou for a chance to be featured on our site! \
          </p> \
        </div> \
      </div>";

    cache.$container.append(string);
  }

  function buildAddingPopup() {
    var string = " \
      <div class='byop__popup'> \
        <label class='byop__popup--title'>Loading...</label> \
        <p class='byop__popup--content'>BRB! Adding your palette to your bag!</p> \
        <div class='byop__popup--loading'></div> \
      </div>";

    $.fancybox.open(string);
  }

  function buildFilters() {  
    var string = " \
      <div class='byop__filters'> \
        <h2 class='visually-hidden byop__filters__title'>Choose Filters</h2>";
    $.each(byop_filter_data[cache.current_type], function(group_title, filters) {
      string += " \
          <div class='byop__filters-group'> \
            <label class='byop__filters-group--title'>"+group_title+"</label> \
            <div class='byop__filters-options'>";        

      $.each(filters, function(index, filter) {
        string += " \
              <div class='byop__filters-option'> \
                <input "+(cache.filters.indexOf(filter) > -1 ? "checked='checked'" : "")+" type='checkbox' id='filter-"+filter+"' class='visually-hidden byop__filters-option--input' value='"+filter+"' /> \
                <label for='filter-"+filter+"' class='btn byop__filters-option--label'>"+filter+"</label> \
              </div>";
      });

      string += " \
            </div> \
          </div>";
    });

    string += " \
          <div class='byop__filters-buttons'> \
            <button class='btn byop__filters-button--apply'>Apply</button> \
            <button class='btn btn--secondary byop__filters-button--clear'>Clear</button> \
          </div> \
        </div> \
      </div>";

    $.fancybox.open(string);
  }

  function buildSizePopup() {
    var string = " \
      <div class='byop__popup'> \
        <label class='byop__popup--title'>OOPS!</label> \
        <p class='byop__popup--content'>Choosing a new palette size will remove all selected items!</p>";
      if(cache.current_size == "large") {
        string += " \
          <button class='byop__popup--button btn' data-palette-size='small'>Switch to a Small Palette $24<span>(12 Shadows or 2 Cheeks + 4 Shadows)</span></button> \
          <button class='byop__popup--button btn'>Continue creating a Large Palette $45<span>(24 Shadows or 6 Cheeks or a combination)</span></button>"
      }
      else {
        string += " \
          <button class='byop__popup--button btn' data-palette-size='large'>Switch to a Large Palette<span>(24 Shadows or 6 Cheeks or a combination)</span></button> \
          <button class='byop__popup--button btn'>Continue creating a Small Palette<span>(12 Shadows or 2 Cheeks + 4 Shadows)</span></button>"
      }
    string += " \
      </div>";

    $.fancybox.open(string);
  }
  
  function buildPaletteSwatch(product_data) {
    var string = "";

    if(product_data) {
      string += " \
        <button style='background-image: url("+product_data.swatch+");' class='byop__palette-swatch byop__palette-swatch--"+product_data.type+" text-link' data-product-handle='"+product_data.handle+"'> \
          <span class='visually-hidden'>Remove "+product_data.title+" from palette</span> \
        </button>";
    }
    else {
      $.each(cache.selected_swatches.eyes, function(index, swatch) {
        var product_data = cache.products.data[swatch];

        string += " \
          <button style='background-image: url("+product_data.swatch+");' class='byop__palette-swatch byop__palette-swatch--"+product_data.type+" text-link' data-product-handle='"+product_data.handle+"'> \
            <span class='visually-hidden'>Remove "+product_data.title+" from palette</span> \
          </button>";
      });

      $.each(cache.selected_swatches.cheeks, function(index, swatch) {
        var product_data = cache.products.data[swatch];

        string += " \
          <button style='background-image: url("+product_data.swatch+");' class='byop__palette-swatch byop__palette-swatch--"+product_data.type+" text-link' data-product-handle='"+product_data.handle+"'> \
            <span class='visually-hidden'>Remove "+product_data.title+" from palette</span> \
          </button>";
      });
    }

    return string;
  }  

  function buildSeeMore(e) {
    e.preventDefault();

    closeSeeMore();

    var product_handle = $(this).parent().attr("data-product-handle");
    var product = cache.products.data[product_handle];

    var button_message = "add to palette";
    if(!product.available) button_message = "Out of stock";
    if(cache.selected_swatches[product.type].indexOf(product.handle) > -1) button_message = "Added";

    var string = "<div class='byop-more__container'> \
        <button class='byop-more__close'><i class='fa fa-times'></i><span class='visually-hidden'>Close</span></button> \
        <div class='byop-more__info'> \
          <img class='byop-more__image' src='"+product.swatch+"' alt='' /> \
          <label class='byop-more__title'>"+product.title+"</label> \
          <p class='byop-more__description'>"+product.shade_description+"</p> \
          <button "+(button_message != "add to palette" ? "disabled='disabled'" : '')+" class='btn byop-more__add' data-product-handle='"+product.handle+"'>"+button_message+"</button> \
        </div> \
      </div>";

    $(this).parent().append(string);
  }
  
  function buildSwatchSelectors(only_swatches) {
    var swatch_string = "";
    var string = " \
      <div class='byop__swatch-container'> \
        <div class='byop__swatch-options'> \
          <button class='byop__swatch-swapper text-link' data-product-type='eyes'>Fill eye shadow</button> \
          <button class='byop__swatch-swapper text-link' data-product-type='cheeks'>Fill cheek</button> \
          <button class='byop__filter-toggle btn'>filter</button> \
        </div> \
        <div class='byop__tags'></div>";

    $.each(byop_swatch_data, function(type, group) {
      $.each(group, function(title, swatches) {
        swatch_string += " \
          <div class='byop__swatch-grouping byop__swatch-grouping--"+type+"'> \
            <label class='byop__swatch-grouping--title' data-swatch-count=''>"+title+"</label> \
            <div class='byop__swatches' data-swatch-group='"+title+"'>";

        $.each(swatches, function(handle, swatch) {
          handle = handle.replace("@", "");
          if(cache.products.data[handle] && cache.products.data[handle].found) {
            var has_filter = cache.filters.length == 0;

            $.each(cache.filters, function(index, filter) {
              if(cache.products.data[handle].tags.indexOf(filter.handleize()) > -1) {
                has_filter = true;
                return false;
              }
            });

            if(has_filter) {
              swatch_string += "<div class='"+(cache.products.data[handle].available ? "" : "byop__swatch--oos")+" byop__swatch byop__swatch--"+type+"' data-product-handle='"+handle+"' data-product-type='"+type+"'> \
                  <button "+((cache.products.data[handle].available && cache.selected_swatches[type].indexOf(handle) == -1) ? "" : "disabled='disabled'")+" class='byop__swatch--image text-link' style='background-image: url("+swatch+");'> \
                    <span class='visually-hidden'>Add product to palette: "+cache.products.data[handle].title+"</span> \
                  </button> \
                  <label class='byop__swatch--title'>"+cache.products.data[handle].title+"</label> \
                  <button class='byop__swatch--more text-link'>More Info</button> \
                </div>";
            }
          }
        });

        swatch_string += " \
            </div> \
          </div>";
      });
    });

    string += " \
        "+swatch_string+" \
      </div>";

    if(only_swatches) {
      $(selectors.swatch_group).remove();
      $(selectors.swatch_container).append(swatch_string);
    }
    else {
      cache.$container.append(string);
    }

    $(selectors.swatches).each(function() {
      if($(this).children().length == 0) {
        $(this).parent().remove();
      }
    });


    if(cache.filters.length > 0) {
      $(selectors.swatches).each(function() {
        $(this).prev().attr("data-swatch-count", $(this).children().length).addClass("show-count");
      });  
    }
    else {
      $(selectors.swatch_title).removeClass("show-count");
    }
  }

  function buildPaletteSelectors() {
    $(selectors.swatch_container).remove();

    cache.$container.append(" \
      <div class='byop__palette-selectors'> \
        <label class='byop__palette-selectors--title'>Ta-da! Your Palette is done!</label> \
        <p class='byop__palette-selectors--subtitle'>Choose an empty palette to complete your BYOP</p> \
        <div class='byop__palette-selectors--container'></div> \
      </div>");

    theme.Shopify.getProducts(byop_palette_data[cache.current_size]).then(function(products) {
      $.each(products, function(index, product) {
        if(product == "") {
          return true;
        }    

        cache.products.data[product.handle] = {
          id: product.variant_id,
          title: product.title
        }

        var string = " \
          <div aria-labelledby='listing-title-"+product.id+"' aria-describedby='listing-description-"+product.id+"' class='product__listing' data-id='"+product.variant_id+"' data-product-sku='"+product.sku+"' data-handle='"+product.handle+"'> \
            <div class='product__listing-images'> \
              <div class='product__listing-images--container'>";
    
            $.each(product.images, function(index, image) {
              string += " \
                  <picture aria-hidden='true'> \
                    <source media='(min-width: "+theme.settings.breakpoint.tablet+"px)' srcset='"+theme.Shopify.getSizedImageUrl(image, "680x")+"' /> \
                    <source media='(min-width: 0px)' srcset='"+theme.Shopify.getSizedImageUrl(image, "360x")+"' /> \
                    <img class='visible' src='"+theme.Shopify.getSizedImageUrl(image, "360x")+"' alt='"+product.title+"'> \
                  </picture>";
          
                if(index == 1 || $(window).width() < theme.settings.breakpoint.desktop) {
                  return false;
                }
            });
    
        string += " \
              </div> \
            </div> \
            <div class='product__listing-content'> \
              <label id='listing-title-"+product.id+"' class='product__listing-content--title'>"+product.title+"</label> \
              <label class='product__listing-content--type'>"+product.type+"</label> \
            </div> \
            <div class='product__listing-actions'>";
        if(cache.byop_count > 1) {
          string += " \
              <button data-palette-handle='"+product.handle+"' disabled='disabled' class='btn byop__add'> \
                limit 2 per order \
              </button>";
        }
        else {
          string += " \
              <button data-palette-handle='"+product.handle+"' "+(product.available ? '' : 'disabled="disabled"')+" class='btn byop__add'> \
                "+(product.available ? 'ADD TO BAG' : 'OUT OF STOCK')+"\
              </button>";
        }
              
        string += " \
            </div> \
          </div>";

        $(selectors.palette_selectors_container).append(string);
      });     
      
      $('html, body').animate({
        scrollTop: 10
      }, 300);
    });
  }

  function buildPaletteView() {
    if($(selectors.palette_container).length == 0) {
      cache.$container.append(" \
        <div class='byop__palette-container open'> \
          <div class='byop__palette-container__mobile-open'>Open palette view</div> \
          <label class='byop__remaining'></label> \
          <div class='byop__palette' data-palette-size='"+cache.current_size+"'></div> \
          <div class='byop__sizes'> \
            <button class='byop__sizes--button text-link "+(cache.current_size == 'small' ? 'active' : '')+"' data-palette-size='small'>Small Palette<br/>$24</button> \
            <button class='byop__sizes--button text-link "+(cache.current_size == 'large' ? 'active' : '')+"' data-palette-size='large'>Large Palette<br/>$45</button> \
          </div> \
        </div>");

      fillPalette();
    }
  }

  function buildFilterTags() {
    var string = "";

    $.each(cache.filters, function(index, filter) {
      string += "<button class='byop__tag text-link' data-filter='"+filter+"'> \
          <span class='visually-hidden'>Remove Filter:</span>\
          "+filter+" \
        </button>";
    });
    

    $(selectors.filter_tags_container).html(string);
  }

  return { 
    BYOP: BYOP,
    getCache: getCache,
    changeView: changeView,
    addByopCount: addByopCount,
    minusByopCount: minusByopCount,
    deactivateSwatch: deactivateSwatch,
    activateSwatch: activateSwatch,
    calculateSwatchPositions: calculateSwatchPositions,
    changeView: changeView
  };
})();





/**
 * 
 * 
 * 
 * 
 */
window.theme = window.theme || {};
theme.Category = (function() {
  var cache = {
    $tabs: $("[data-tab]"),
    $blocks: $("[data-block-name]")
  };

  function Category() {
    if(cache.$blocks.length > 0) {
      cache.$tabs.on("click", function(e) {
        e.preventDefault();

        var tab = $(this).attr("data-tab");

        $('html, body').animate({
          scrollTop: cache.$blocks.filter("[data-block-name='"+tab+"']").offset().top - 180
        }, 500);
      });
    }
  }

  return Category;
})();





/**
 *
 *
 * 
 *
 */
window.theme = window.theme || {};
theme.Policy = (function() {
  var cache = {
    $scroll_links: $(".policy a[href]")    
  };

  function Policy(container) {
    cache.$scroll_links.on("click", scrollToSection);
  }

  function scrollToSection(e) {
    if($(this).attr("href").indexOf("#") > -1) {
      e.preventDefault();

      $('html, body').animate({
        scrollTop: $($(this).attr("href")).offset().top - 180
      }, 500);
    }
  }

  return Policy;
})();






/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.Quiz = (function() {
  var cache = {
    results: {},
    $banner: $(".quiz__banner"),
    $navigation: $(".quiz__navigation-container"),
    
    $container: $(".quiz__container")
  };
  var selectors = {
    answer: ".quiz__answer",
    navigation_links: ".quiz__navigation--link",
  };

  function Quiz() {
    if(theme.settings.pathname == "/pages/fortune-teller-quiz") {
      generateQuizData("valentines");
    }

    buildNavigation();
    buildQuiz("valentines", "init");

    $(document).on("click", selectors.answer, handleAnswerClick);
  }

  function handleAnswerClick(e) {
    e.preventDefault();

    var type = $(this).attr("data-quiz-type");
    var target = $(this).attr("data-answer-target");

    if(target.indexOf("/") > -1) {
      window.top.location.href = target;
    }
    else {
      buildQuiz(type, target);
    }
  }



  function setNavigation(navigation) {
    $(selectors.navigation_links).attr("data-selected", "false");
    $(selectors.navigation_links).filter("[data-navigation-option='"+navigation+"']").attr("data-selected", "true");
  }

  function buildNavigation() {
    $.each(cache.quiz_data.navigation, function(index, navigation) {
      cache.$navigation.append("<div class='quiz__navigation'><button disabled data-selected='"+(index == 0 ? 'true' : 'false')+"' data-navigation-option='"+navigation+"' class='text-link quiz__navigation--link'>"+navigation+"</div>");
    });
  }




  function buildQuiz(type, target) {
    var data = cache.quiz_data[target],
        $question = $("<div class='quiz__question' data-navigation-option='"+data.navigation+"'></div>"),
        $answers = $("<div class='quiz__answers' data-navigation-option='"+data.navigation+"'></div>");

    setNavigation(data.navigation);

    if(type == "valentines") {
      $question.append("<div class='quiz__question-content'><label class='quiz__question-content--subtitle'>"+data.navigation+"</label><h2 class='quiz__question-content--title'>"+data.title+"</h2></div>");

      $.each(data.answers, function(index, answer) {
        $answers.append("<button data-selected='"+((cache.results[data.navigation] && cache.results[data.navigation] == answer.target) ? 'true' : 'false')+"' class='text-link quiz__answer' data-navigation-option='"+data.navigation+"' data-quiz-type='valentines' data-answer-target='"+answer.target+"'><span>"+answer.title+"</span></button>");
      });
    }

    $question.append($answers);
    cache.$container.html($question);
  }

  function generateQuizData(type) {
    if(type == "valentines") {
      cache.quiz_data = {
        "navigation": ["step 1", "step 2", "step 3", "step 4"],
        "init": {
          "title": "What is your relationship status?",
          navigation: "step 1",
          "answers": [
            { "title": "Single", "target": "2a" },
            { "title": "Talking", "target": "2b" },
            { "title": "Cuffed", "target": "2c" },
            { "title": "Don't Ask", "target": "2d" }
          ]
        },
        "2a": {
          title: "What is your favorite Rom Com?",
          navigation: "step 2",
          answers: [
            { title: "Crazy Rich Asians", target: "3a" },
            { title: "To All The Boys I've Loved Before", target: "3a" },
            { title: "Bridesmaids", target: "3a" },
            { title: "Eat, Pray, Love", target: "3a" }
          ]
        },
        "2b": {
          title: "What's your most used emoji?",
          navigation: "step 2",
          answers: [
            { title: "fire", target: "3b" },
            { title: "heart eyes", target: "3b" },
            { title: "woman tipping hand", target: "3b" },
            { title: "monkey covering eyes", target: "3b" }
          ]
        },
        "2c": {
          title: "What's your outfit?",
          navigation: "step 2",
          answers: [
            { title: "LBD & stilettos", target: "3b" },
            { title: "Cute flirty dress", target: "3b" },
            { title: "jeans & a cute top", target: "3b" },
            { title: "sweatpants, hair tied", target: "3b" }
          ]
        },
        "2d": {
          title: "What's your V-Day anthem?",
          navigation: "step 2",
          answers: [
            { title: "Shake That - Megan thee Stallion", target: "3a" },
            { title: "Who Run The World - Beyonce", target: "3a" },
            { title: "Good as Hell - Lizzo", target: "3a" },
            { title: "NASA - Ariana Grande", target: "3a" }
          ]
        },
        "3a": {
          title: "What's your love language?",
          "navigation": "step 3",
          answers: [
            { title: "Physical Touch: <span>Nothing better than cuddles</span>", target: "/collections/full-beat-mama" },
            { title: "Quality Time: <span>A weekend getaway for just you two</span>", target: "/collections/galentines-party" },
            { title: 'Words of Affirmation: <span>"Wow, that lip color looks amazing on you!"</span>', target: "/collections/galentines-party" },
            { title: 'Acts of Service: <span>"Do you need anything from Whole Foods?"</span>', target: "/collections/self-care-night-in" }
          ]
        },
        "3b": {
          title: "What's your Favorite V-Day Treat?",
          "navigation": "step 3",
          answers: [
            { title: "Champagne & Strawberries", target: "/collections/full-beat-mama" },
            { title: "Box of Chocolates", target: "/collections/hopeless-romantic" },
            { title: "Coversation Hearts", target: "/collections/galentines-party" },
            { title: "Home-cooked Meal", target: "/collections/takeout-makeout" }
          ]
        }
      }
    }
  }


  return {
    Quiz: Quiz
  }
})();





/**
 *
 *
 *
 *
 */
window.theme = window.theme || {};
theme.FourthrayNavigation = (function() {
  var cache = {
    $container: $(".fourthray__navigation")
  };
  var selectors = {
    
  };

  function FourthrayNavigation() {
    if(theme.settings.parameters.has("fr")) {
      $('html, body').animate({
        scrollTop: cache.$container.offset().top - 90
      }, 500);
    }
  }

  return {
    FourthrayNavigation: FourthrayNavigation
  }
})();






/**
 *
 *
 *
 *
 */
if($(window).scrollTop() > 0) { $("body").addClass("scrolled"); }
$(document).ready(function() {
  var sections = new theme.Sections();

  sections.register("Global", theme.Global);

  sections.register("Header", theme.Header);
  sections.register("Navigation", theme.Navigation);
  sections.register("SideCart", theme.SideCart);
  sections.register("Footer", theme.Footer);

  sections.register("HomepageTakeover", theme.HomepageTakeover);
  sections.register("HomepageCollection", theme.HomepageCollection);

  sections.register("Login", theme.Login);

  sections.register("Search", theme.Search);

  sections.register("Collection", theme.Collection);

  sections.register("Product", theme.Product);

  sections.register("Cart", theme.Cart);

  sections.register("Account", theme.Account);
  sections.register("Addresses", theme.Addresses);
  sections.register("Wishlist", theme.Wishlist);

  sections.register("Solbody", theme.Solbody);
  sections.register("DisneyQuiz", theme.DisneyQuiz);
  sections.register("Quiz", theme.Quiz);
  sections.register("FindYourMatch", theme.FindYourMatch);
  sections.register("BrowsByEndLook", theme.BrowsByEndLook);
  sections.register("BrowsByShade", theme.BrowsByShade);
  sections.register("FindYourShade", theme.FindYourShade);
  sections.register("ZodiacQuiz", theme.ZodiacQuiz);
  sections.register("EmailSignup", theme.EmailSignup);
  sections.register("Looks", theme.Looks);
  sections.register("BYOP", theme.BYOP);
  sections.register("Category", theme.Category);
  sections.register("Policy", theme.Policy);

  sections.register("FourthrayNavigation", theme.FourthrayNavigation);

  theme.Wishlist.init();
  theme.SlideSignup.init();
  theme.DynamicYield.syncCart();
});

$(theme.init);