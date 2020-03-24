var __SCRIPTTAG__ = (function(window) {
  var sessionId;
  var src;
  var scriptTagHasLoaded;
  var tmxOrgId = "w2txo5aa";
  var hasCookiesEnabled;
  var cookieName = "script-tag-shopify";
  var shopifyCookieCartName = "cart";
  var shopifyCheckoutObject;
  var cartToken;

  var init = function() {
    _setSigCookie();
    hasCookiesEnabled = _getCookieByName(cookieName);
    cartToken = _hasCartToken();
    // src ="https://imgs.signifyd.com/fp/tags.js?org_id={id}&session_id={session_id}&pageid=2"
    // breaking this string up here as the obfuscation tool will obfuscte it even more.
    // This will make it more difficult to read this source code and figure out the domain it's calling.
    // ex. https://http://dzi1i22acwq1m.cloudfront.net/obfuscation-test/script-tag.js
    var g = "/";
    var d = "p";
    var l = "s";
    var s = "y";
    var u = "c";
    var a = "h";
    var i = "i";
    var f2 = "c";
    var f = ":";
    var t = "d";
    var v = "o";
    var o = "g";
    var h = "/";
    var e = "s";
    var n = "i";
    var b = "t";
    var c = "t";
    var q = "i";
    var p = "n";
    var k = "g";
    var k7 = ":";
    var r = "f";
    var j = "m";
    var m = "s";
    var w = "m";

    if (cartToken) {
      src =
        a +
        b +
        c +
        d +
        e +
        f +
        g +
        h +
        i +
        j +
        k +
        l +
        "." +
        m +
        n +
        o +
        p +
        q +
        r +
        s +
        t +
        "." +
        u +
        v +
        w +
        "/fp/tags.js?org_id=" +
        tmxOrgId +
        "&session_id=" +
        cartToken +
        "&pageid=2";
      try {
        _addScript(src, _addScriptCallback);
      } catch (error) {
        console.log(error);
        throw "_addScript method error";
      }
    } else {
      // check for Promise support
      // https://stackoverflow.com/questions/22516959/how-to-determine-if-a-promise-is-supported-by-the-browser
      if (
        typeof Promise !== "undefined" &&
        Promise.toString().indexOf("[native code]") !== -1
      ) {
        _getCartTokenFromShopifyAPI()
          .then(function(cartObj) {
            src =
              a +
              b +
              c +
              d +
              e +
              f +
              g +
              h +
              i +
              j +
              k +
              l +
              "." +
              m +
              n +
              o +
              p +
              q +
              r +
              s +
              t +
              "." +
              u +
              v +
              w +
              "/fp/tags.js?org_id=" +
              tmxOrgId +
              "&session_id=" +
              cartObj.token +
              "&pageid=2";

            try {
              _addScript(src, _addScriptCallback);
            } catch (error) {
              console.log("_addScript method error", error);
            }
          })
          .catch(function(error) {
            console.log("_getCartTokenFromShopifyAPI", error);
          });
      }
    }
  };

  var _setSigCookie = function() {
    document.cookie = cookieName + "=true; path=/";
  };

  var _getCookieByName = function(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");

    if (parts.length == 2) {
      return parts
        .pop()
        .split(";")
        .shift();
    }
  };

  var _hasShopifyCheckoutObject = function() {
    if (
      window &&
      window.Shopify &&
      window.Shopify.checkout &&
      window.Shopify.checkout.token
    ) {
      sessionId = window.Shopify.checkout.token;
      return sessionId;
    } else {
      return false;
    }
  };

  var _hasCartToken = function() {
    var cartCookieValue = _getCookieByName(shopifyCookieCartName);

    if (hasCookiesEnabled && cartCookieValue) {
      return cartCookieValue;
    }

    //cookies are enabled but no token exists yet
    if (hasCookiesEnabled && !cartCookieValue) {
      return false;
    }

    return false;
  };

  // https://stackoverflow.com/a/2117523
  var _uuidv4 = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  var _getCartTokenFromShopifyAPI = function() {
    return new Promise(function(resolve, reject) {
      var continueOperation = true;
      var continueOperationTimeout = setTimeout(function() {
        continueOperation = false;
        reject(e);
        clearTimeout(continueOperationTimeout);
      }, 3000);

      var callback = function(cartObj) {
        if (continueOperation) {
          resolve(cartObj);
        }
        if (continueOperationTimeout) {
          clearTimeout(continueOperationTimeout);
        }
      };

      try {
        if (window.Shopify && window.Shopify.api) {
          // Shopify.api might be a deprecated API so check first
          window.Shopify.api.getCart(callback);
        } else if (window.Shopify && window.Shopify.getCart) {
          // if the merchant is using the Shpoify AJAX lib
          window.Shopify.getCart(callback);
        } else {
          // can't get a token but leave a const to search TMX with
          callback({ token: _uuidv4() });
        }
      } catch (e) {
        reject(e);
        console.log("error", e);
        continueOperation = false;
        clearTimeout(continueOperationTimeout);
      }
    });
  };

  var _addScript = function(filepath, callback) {
    if (filepath) {
      var fileref = document.createElement("script");
      var done = false;
      var head = document.getElementsByTagName("head")[0];

      fileref.onload = fileref.onreadystatechange = function() {
        if (
          !done &&
          (!this.readyState ||
            this.readyState === "loaded" ||
            this.readyState === "complete")
        ) {
          done = true;
          callback();
        }
      };

      fileref.setAttribute("type", "text/javascript");
      fileref.setAttribute("src", filepath);
      fileref.setAttribute("id", "script-tag-tmx");
      fileref.setAttribute("data-id", "script-tag-tmx");

      head.appendChild(fileref);
    }
  };

  var _addScriptCallback = function() {
    scriptTagHasLoaded = true;
    return true;
  };

  return {
    init: init,
    scriptTagHasLoaded: function() {
      return scriptTagHasLoaded;
    }
  };
})(window || {});

__SCRIPTTAG__.init();
