/* istanbul ignore file */
/* eslint no-var: "off" */
/* global jQuery: true, BrightTag: true, Signal: true */

if (!jQuery) {
  BrightTag.$ = BrightTag.jQuery = require("jquery");
} else {
  BrightTag.$ = BrightTag.jQuery = jQuery;
}

function Country(name, alpha2, alpha3, numeric) {
  this.name = name;
  this.alpha2 = alpha2;
  this.alpha3 = alpha3;
  this.numeric = numeric;
}

window.Signal = {
  init: function() {
    this.debug = window.bt_parameter("analytics") == "true";
    this.ERROR = 0;
    this.ERROR_DATA = [];
    this.logger("Signal Debugging ON");
    this.Data = {};
    this.Mappings = {
      Country: []
    };

    this.initEventBridge();
    this.getCustomerProfile();
    this.getBag();
    this.mapCountryData();
  },
  logger: function(message, dir) {
    this.debug ? (dir ? console.dir(message) : console.log(message)) : false;
  },
  initEventBridge: function() {
    var eventHandlers = [
      "tracking.productList.pageLoad-signal",
      "tracking.productList.saveForLater",
      "tracking.productList.pageLoad",
      "tracking.productList.paginate",
      "tracking.productList.refine.refinements",
      "tracking.asosBag.pageLoad",
      "tracking.productPage.pageLoad",
      "tracking.productPage.saveForLater",
      "tracking.asosBag.addItem"
    ];

    eventHandlers.forEach(function(e) {
      var handler = function(payload) {
        if (BrightTag.jQuery) {
          BrightTag.jQuery(window).trigger("signal." + e, [payload]);
        }
        Signal.logger("signal." + e);
        Signal.logger(arguments, true);
      };
      window.analyticsEventEmitter.addListener(e, handler);
    });
  },
  Util: {
    getCustomerID: function(id, blank) {
      return id == "-1" ? (blank ? "" : id) : id;
    },
    store: function(k, v, ls) {
      Signal.Data[k] = v;
      if (ls) {
        localStorage.setItem("SIGNAL." + k, v);
      }
      return v;
    },
    retrieve: function(k) {
      if (Signal.Data[k]) {
        return Signal.Data[k];
      } else if (localStorage.getItem(k)) {
        return localStorage.getItem(k);
      } else {
        return Signal.Data[k];
      }
    },
    getRootDomain: function() {
      var host = location.host.split(".");
      return "." + host.splice(host.length - 2).join(".");
    },
    flattenProfile: function(customerProfile) {
      for (var key in customerProfile) {
        var value = customerProfile[key];
        if (typeof value === "object") {
          for (var k in value) {
            Signal.Util.store(k, value[k]);
          }
        } else {
          if (key === "subscriptions") {
            if (value) {
              Signal.Util.store("isPremier", value);
            } else {
              Signal.Util.store("isPremier", false);
            }
          } else {
            Signal.Util.store(key, value);
          }
        }
      }
    },
    getCountryName: function(alpha2) {
      var name;
      BrightTag.each(Signal.Mappings.Country, function(country) {
        if (country.alpha2 == alpha2) {
          name = country.name;
          return false;
        }
      });
      return name;
    },
    isBagPage: function(path) {
      return !!path.match(/^(\/[a-zA-Z]{2})?\/bag(\/$|$)/);
    },
    emitDataReady: function() {
      if (window.performance && window.performance.timing && window.performance.getEntriesByType) {
        var navData = window.performance.getEntriesByType("navigation");
        if ((navData.length > 0 && navData[0].loadEventEnd > 0) || window.performance.timing.loadEventEnd > 0) {
          BrightTag.jQuery(window).trigger("signal.data-ready");
          return;
        }        
      }
      window.addEventListener("load", function() {
        BrightTag.jQuery(window).trigger("signal.data-ready");
      });
    }
    },
  getCustomerProfile: function() {
    try {
      if (window.__sdk && window.__sdk.identity) {
        window.__sdk.identity.customer
          .profile()
          .then(function(customerProfile) {
            Signal.Util.flattenProfile(customerProfile);
          })
          .then(function(){
            if(window.performance && window.performance.timing && window.performance.getEntriesByType){
              Signal.Util.emitDataReady();
            }
          });
      } else {
        window.analyticsEventEmitter.addListener("sdk-ready", function() {
          window.__sdk.identity.customer
            .profile()
            .then(function(customerProfile) {
              Signal.Util.flattenProfile(customerProfile);
            })
            .then(function(){
              if(window.performance && window.performance.timing && window.performance.getEntriesByType){
                Signal.Util.emitDataReady();
              }
            });
        });
      }
    } catch (e) {
      if (BrightTag.jQuery) {
        BrightTag.jQuery(window).trigger(
          "signal.error.identitysdk.failedtoload"
        );
      }
    }
  },
  getBag: function() {
    try {
      var attempts = 0;

      // eslint-disable-next-line no-inner-declarations
      function waitForBasket() {
        attempts += 1;
        if (!window.Basket) {
          setTimeout(waitForBasket, 250);
        } else {
          if (BrightTag.jQuery) {
            BrightTag.jQuery(window).trigger("signal.basket.ready");
          }
          Signal.Util.store("BasketReady", "Success: " + attempts);
        }
      }

      if (Signal.Util.isBagPage(window.location.pathname)) {
        setTimeout(waitForBasket, 250);
      }
    } catch (e) {
      Signal.Util.store("BasketReady", "Failed");
    }
  },
  mapCountryData: function() {
    var self = this;
    this.countryData.forEach(function(country) {
      self.Mappings.Country.push(
        new Country(
          country.name,
          country.alpha2,
          country.alpha3,
          country.numeric
        )
      );
    });
  }
};

Signal.countryData = [
  {
    name: "Afghanistan",
    alpha2: "AF",
    alpha3: "AFG",
    numeric: "4"
  },
  {
    name: "Aland Islands",
    alpha2: "AX",
    alpha3: "ALA",
    numeric: "248"
  },
  {
    name: "Albania",
    alpha2: "AL",
    alpha3: "ALB",
    numeric: "8"
  },
  {
    name: "Algeria",
    alpha2: "DZ",
    alpha3: "DZA",
    numeric: "12"
  },
  {
    name: "American Samoa",
    alpha2: "AS",
    alpha3: "ASM",
    numeric: "16"
  },
  {
    name: "Andorra",
    alpha2: "AD",
    alpha3: "AND",
    numeric: "20"
  },
  {
    name: "Angola",
    alpha2: "AO",
    alpha3: "AGO",
    numeric: "24"
  },
  {
    name: "Anguilla",
    alpha2: "AI",
    alpha3: "AIA",
    numeric: "660"
  },
  {
    name: "Antarctica",
    alpha2: "AQ",
    alpha3: "ATA",
    numeric: "10"
  },
  {
    name: "Antigua and Barbuda",
    alpha2: "AG",
    alpha3: "ATG",
    numeric: "28"
  },
  {
    name: "Argentina",
    alpha2: "AR",
    alpha3: "ARG",
    numeric: "32"
  },
  {
    name: "Armenia",
    alpha2: "AM",
    alpha3: "ARM",
    numeric: "51"
  },
  {
    name: "Aruba",
    alpha2: "AW",
    alpha3: "ABW",
    numeric: "533"
  },
  {
    name: "Australia",
    alpha2: "AU",
    alpha3: "AUS",
    numeric: "36"
  },
  {
    name: "Austria",
    alpha2: "AT",
    alpha3: "AUT",
    numeric: "40"
  },
  {
    name: "Azerbaijan",
    alpha2: "AZ",
    alpha3: "AZE",
    numeric: "31"
  },
  {
    name: "Bahamas",
    alpha2: "BS",
    alpha3: "BHS",
    numeric: "44"
  },
  {
    name: "Bahrain",
    alpha2: "BH",
    alpha3: "BHR",
    numeric: "48"
  },
  {
    name: "Bangladesh",
    alpha2: "BD",
    alpha3: "BGD",
    numeric: "50"
  },
  {
    name: "Barbados",
    alpha2: "BB",
    alpha3: "BRB",
    numeric: "52"
  },
  {
    name: "Belarus",
    alpha2: "BY",
    alpha3: "BLR",
    numeric: "112"
  },
  {
    name: "Belgium",
    alpha2: "BE",
    alpha3: "BEL",
    numeric: "56"
  },
  {
    name: "Belize",
    alpha2: "BZ",
    alpha3: "BLZ",
    numeric: "84"
  },
  {
    name: "Benin",
    alpha2: "BJ",
    alpha3: "BEN",
    numeric: "204"
  },
  {
    name: "Bermuda",
    alpha2: "BM",
    alpha3: "BMU",
    numeric: "60"
  },
  {
    name: "Bhutan",
    alpha2: "BT",
    alpha3: "BTN",
    numeric: "64"
  },
  {
    name: "Bolivia",
    alpha2: "BO",
    alpha3: "BOL",
    numeric: "68"
  },
  {
    name: "Bosnia and Herzegovina",
    alpha2: "BA",
    alpha3: "BIH",
    numeric: "70"
  },
  {
    name: "Botswana",
    alpha2: "BW",
    alpha3: "BWA",
    numeric: "72"
  },
  {
    name: "Bouvet Island",
    alpha2: "BV",
    alpha3: "BVT",
    numeric: "74"
  },
  {
    name: "Brazil",
    alpha2: "BR",
    alpha3: "BRA",
    numeric: "76"
  },
  {
    name: "British Virgin Islands",
    alpha2: "VG",
    alpha3: "VGB",
    numeric: "92"
  },
  {
    name: "British Indian Ocean Territory",
    alpha2: "IO",
    alpha3: "IOT",
    numeric: "86"
  },
  {
    name: "Brunei Darussalam",
    alpha2: "BN",
    alpha3: "BRN",
    numeric: "96"
  },
  {
    name: "Bulgaria",
    alpha2: "BG",
    alpha3: "BGR",
    numeric: "100"
  },
  {
    name: "Burkina Faso",
    alpha2: "BF",
    alpha3: "BFA",
    numeric: "854"
  },
  {
    name: "Burundi",
    alpha2: "BI",
    alpha3: "BDI",
    numeric: "108"
  },
  {
    name: "Cambodia",
    alpha2: "KH",
    alpha3: "KHM",
    numeric: "116"
  },
  {
    name: "Cameroon",
    alpha2: "CM",
    alpha3: "CMR",
    numeric: "120"
  },
  {
    name: "Canada",
    alpha2: "CA",
    alpha3: "CAN",
    numeric: "124"
  },
  {
    name: "Cape Verde",
    alpha2: "CV",
    alpha3: "CPV",
    numeric: "132"
  },
  {
    name: "Cayman Islands",
    alpha2: "KY",
    alpha3: "CYM",
    numeric: "136"
  },
  {
    name: "Central African Republic",
    alpha2: "CF",
    alpha3: "CAF",
    numeric: "140"
  },
  {
    name: "Chad",
    alpha2: "TD",
    alpha3: "TCD",
    numeric: "148"
  },
  {
    name: "Chile",
    alpha2: "CL",
    alpha3: "CHL",
    numeric: "152"
  },
  {
    name: "China",
    alpha2: "CN",
    alpha3: "CHN",
    numeric: "156"
  },
  {
    name: "Hong Kong, SAR China",
    alpha2: "HK",
    alpha3: "HKG",
    numeric: "344"
  },
  {
    name: "Macao, SAR China",
    alpha2: "MO",
    alpha3: "MAC",
    numeric: "446"
  },
  {
    name: "Christmas Island",
    alpha2: "CX",
    alpha3: "CXR",
    numeric: "162"
  },
  {
    name: "Cocos (Keeling) Islands",
    alpha2: "CC",
    alpha3: "CCK",
    numeric: "166"
  },
  {
    name: "Colombia",
    alpha2: "CO",
    alpha3: "COL",
    numeric: "170"
  },
  {
    name: "Comoros",
    alpha2: "KM",
    alpha3: "COM",
    numeric: "174"
  },
  {
    name: "Congo (Brazzaville)",
    alpha2: "CG",
    alpha3: "COG",
    numeric: "178"
  },
  {
    name: "Congo, (Kinshasa)",
    alpha2: "CD",
    alpha3: "COD",
    numeric: "180"
  },
  {
    name: "Cook Islands",
    alpha2: "CK",
    alpha3: "COK",
    numeric: "184"
  },
  {
    name: "Costa Rica",
    alpha2: "CR",
    alpha3: "CRI",
    numeric: "188"
  },
  {
    name: "CÙte d'Ivoire",
    alpha2: "CI",
    alpha3: "CIV",
    numeric: "384"
  },
  {
    name: "Croatia",
    alpha2: "HR",
    alpha3: "HRV",
    numeric: "191"
  },
  {
    name: "Cuba",
    alpha2: "CU",
    alpha3: "CUB",
    numeric: "192"
  },
  {
    name: "Cyprus",
    alpha2: "CY",
    alpha3: "CYP",
    numeric: "196"
  },
  {
    name: "Czech Republic",
    alpha2: "CZ",
    alpha3: "CZE",
    numeric: "203"
  },
  {
    name: "Denmark",
    alpha2: "DK",
    alpha3: "DNK",
    numeric: "208"
  },
  {
    name: "Djibouti",
    alpha2: "DJ",
    alpha3: "DJI",
    numeric: "262"
  },
  {
    name: "Dominica",
    alpha2: "DM",
    alpha3: "DMA",
    numeric: "212"
  },
  {
    name: "Dominican Republic",
    alpha2: "DO",
    alpha3: "DOM",
    numeric: "214"
  },
  {
    name: "Ecuador",
    alpha2: "EC",
    alpha3: "ECU",
    numeric: "218"
  },
  {
    name: "Egypt",
    alpha2: "EG",
    alpha3: "EGY",
    numeric: "818"
  },
  {
    name: "El Salvador",
    alpha2: "SV",
    alpha3: "SLV",
    numeric: "222"
  },
  {
    name: "Equatorial Guinea",
    alpha2: "GQ",
    alpha3: "GNQ",
    numeric: "226"
  },
  {
    name: "Eritrea",
    alpha2: "ER",
    alpha3: "ERI",
    numeric: "232"
  },
  {
    name: "Estonia",
    alpha2: "EE",
    alpha3: "EST",
    numeric: "233"
  },
  {
    name: "Ethiopia",
    alpha2: "ET",
    alpha3: "ETH",
    numeric: "231"
  },
  {
    name: "Falkland Islands (Malvinas)",
    alpha2: "FK",
    alpha3: "FLK",
    numeric: "238"
  },
  {
    name: "Faroe Islands",
    alpha2: "FO",
    alpha3: "FRO",
    numeric: "234"
  },
  {
    name: "Fiji",
    alpha2: "FJ",
    alpha3: "FJI",
    numeric: "242"
  },
  {
    name: "Finland",
    alpha2: "FI",
    alpha3: "FIN",
    numeric: "246"
  },
  {
    name: "France",
    alpha2: "FR",
    alpha3: "FRA",
    numeric: "250"
  },
  {
    name: "French Guiana",
    alpha2: "GF",
    alpha3: "GUF",
    numeric: "254"
  },
  {
    name: "French Polynesia",
    alpha2: "PF",
    alpha3: "PYF",
    numeric: "258"
  },
  {
    name: "French Southern Territories",
    alpha2: "TF",
    alpha3: "ATF",
    numeric: "260"
  },
  {
    name: "Gabon",
    alpha2: "GA",
    alpha3: "GAB",
    numeric: "266"
  },
  {
    name: "Gambia",
    alpha2: "GM",
    alpha3: "GMB",
    numeric: "270"
  },
  {
    name: "Georgia",
    alpha2: "GE",
    alpha3: "GEO",
    numeric: "268"
  },
  {
    name: "Germany",
    alpha2: "DE",
    alpha3: "DEU",
    numeric: "276"
  },
  {
    name: "Ghana",
    alpha2: "GH",
    alpha3: "GHA",
    numeric: "288"
  },
  {
    name: "Gibraltar",
    alpha2: "GI",
    alpha3: "GIB",
    numeric: "292"
  },
  {
    name: "Greece",
    alpha2: "GR",
    alpha3: "GRC",
    numeric: "300"
  },
  {
    name: "Greenland",
    alpha2: "GL",
    alpha3: "GRL",
    numeric: "304"
  },
  {
    name: "Grenada",
    alpha2: "GD",
    alpha3: "GRD",
    numeric: "308"
  },
  {
    name: "Guadeloupe",
    alpha2: "GP",
    alpha3: "GLP",
    numeric: "312"
  },
  {
    name: "Guam",
    alpha2: "GU",
    alpha3: "GUM",
    numeric: "316"
  },
  {
    name: "Guatemala",
    alpha2: "GT",
    alpha3: "GTM",
    numeric: "320"
  },
  {
    name: "Guernsey",
    alpha2: "GG",
    alpha3: "GGY",
    numeric: "831"
  },
  {
    name: "Guinea",
    alpha2: "GN",
    alpha3: "GIN",
    numeric: "324"
  },
  {
    name: "Guinea-Bissau",
    alpha2: "GW",
    alpha3: "GNB",
    numeric: "624"
  },
  {
    name: "Guyana",
    alpha2: "GY",
    alpha3: "GUY",
    numeric: "328"
  },
  {
    name: "Haiti",
    alpha2: "HT",
    alpha3: "HTI",
    numeric: "332"
  },
  {
    name: "Heard and Mcdonald Islands",
    alpha2: "HM",
    alpha3: "HMD",
    numeric: "334"
  },
  {
    name: "Holy See (Vatican City State)",
    alpha2: "VA",
    alpha3: "VAT",
    numeric: "336"
  },
  {
    name: "Honduras",
    alpha2: "HN",
    alpha3: "HND",
    numeric: "340"
  },
  {
    name: "Hungary",
    alpha2: "HU",
    alpha3: "HUN",
    numeric: "348"
  },
  {
    name: "Iceland",
    alpha2: "IS",
    alpha3: "ISL",
    numeric: "352"
  },
  {
    name: "India",
    alpha2: "IN",
    alpha3: "IND",
    numeric: "356"
  },
  {
    name: "Indonesia",
    alpha2: "ID",
    alpha3: "IDN",
    numeric: "360"
  },
  {
    name: "Iran, Islamic Republic of",
    alpha2: "IR",
    alpha3: "IRN",
    numeric: "364"
  },
  {
    name: "Iraq",
    alpha2: "IQ",
    alpha3: "IRQ",
    numeric: "368"
  },
  {
    name: "Ireland",
    alpha2: "IE",
    alpha3: "IRL",
    numeric: "372"
  },
  {
    name: "Isle of Man",
    alpha2: "IM",
    alpha3: "IMN",
    numeric: "833"
  },
  {
    name: "Israel",
    alpha2: "IL",
    alpha3: "ISR",
    numeric: "376"
  },
  {
    name: "Italy",
    alpha2: "IT",
    alpha3: "ITA",
    numeric: "380"
  },
  {
    name: "Jamaica",
    alpha2: "JM",
    alpha3: "JAM",
    numeric: "388"
  },
  {
    name: "Japan",
    alpha2: "JP",
    alpha3: "JPN",
    numeric: "392"
  },
  {
    name: "Jersey",
    alpha2: "JE",
    alpha3: "JEY",
    numeric: "832"
  },
  {
    name: "Jordan",
    alpha2: "JO",
    alpha3: "JOR",
    numeric: "400"
  },
  {
    name: "Kazakhstan",
    alpha2: "KZ",
    alpha3: "KAZ",
    numeric: "398"
  },
  {
    name: "Kenya",
    alpha2: "KE",
    alpha3: "KEN",
    numeric: "404"
  },
  {
    name: "Kiribati",
    alpha2: "KI",
    alpha3: "KIR",
    numeric: "296"
  },
  {
    name: "Korea (North)",
    alpha2: "KP",
    alpha3: "PRK",
    numeric: "408"
  },
  {
    name: "Korea (South)",
    alpha2: "KR",
    alpha3: "KOR",
    numeric: "410"
  },
  {
    name: "Kuwait",
    alpha2: "KW",
    alpha3: "KWT",
    numeric: "414"
  },
  {
    name: "Kyrgyzstan",
    alpha2: "KG",
    alpha3: "KGZ",
    numeric: "417"
  },
  {
    name: "Lao PDR",
    alpha2: "LA",
    alpha3: "LAO",
    numeric: "418"
  },
  {
    name: "Latvia",
    alpha2: "LV",
    alpha3: "LVA",
    numeric: "428"
  },
  {
    name: "Lebanon",
    alpha2: "LB",
    alpha3: "LBN",
    numeric: "422"
  },
  {
    name: "Lesotho",
    alpha2: "LS",
    alpha3: "LSO",
    numeric: "426"
  },
  {
    name: "Liberia",
    alpha2: "LR",
    alpha3: "LBR",
    numeric: "430"
  },
  {
    name: "Libya",
    alpha2: "LY",
    alpha3: "LBY",
    numeric: "434"
  },
  {
    name: "Liechtenstein",
    alpha2: "LI",
    alpha3: "LIE",
    numeric: "438"
  },
  {
    name: "Lithuania",
    alpha2: "LT",
    alpha3: "LTU",
    numeric: "440"
  },
  {
    name: "Luxembourg",
    alpha2: "LU",
    alpha3: "LUX",
    numeric: "442"
  },
  {
    name: "Macedonia, Republic of",
    alpha2: "MK",
    alpha3: "MKD",
    numeric: "807"
  },
  {
    name: "Madagascar",
    alpha2: "MG",
    alpha3: "MDG",
    numeric: "450"
  },
  {
    name: "Malawi",
    alpha2: "MW",
    alpha3: "MWI",
    numeric: "454"
  },
  {
    name: "Malaysia",
    alpha2: "MY",
    alpha3: "MYS",
    numeric: "458"
  },
  {
    name: "Maldives",
    alpha2: "MV",
    alpha3: "MDV",
    numeric: "462"
  },
  {
    name: "Mali",
    alpha2: "ML",
    alpha3: "MLI",
    numeric: "466"
  },
  {
    name: "Malta",
    alpha2: "MT",
    alpha3: "MLT",
    numeric: "470"
  },
  {
    name: "Marshall Islands",
    alpha2: "MH",
    alpha3: "MHL",
    numeric: "584"
  },
  {
    name: "Martinique",
    alpha2: "MQ",
    alpha3: "MTQ",
    numeric: "474"
  },
  {
    name: "Mauritania",
    alpha2: "MR",
    alpha3: "MRT",
    numeric: "478"
  },
  {
    name: "Mauritius",
    alpha2: "MU",
    alpha3: "MUS",
    numeric: "480"
  },
  {
    name: "Mayotte",
    alpha2: "YT",
    alpha3: "MYT",
    numeric: "175"
  },
  {
    name: "Mexico",
    alpha2: "MX",
    alpha3: "MEX",
    numeric: "484"
  },
  {
    name: "Micronesia, Federated States of",
    alpha2: "FM",
    alpha3: "FSM",
    numeric: "583"
  },
  {
    name: "Moldova",
    alpha2: "MD",
    alpha3: "MDA",
    numeric: "498"
  },
  {
    name: "Monaco",
    alpha2: "MC",
    alpha3: "MCO",
    numeric: "492"
  },
  {
    name: "Mongolia",
    alpha2: "MN",
    alpha3: "MNG",
    numeric: "496"
  },
  {
    name: "Montenegro",
    alpha2: "ME",
    alpha3: "MNE",
    numeric: "499"
  },
  {
    name: "Montserrat",
    alpha2: "MS",
    alpha3: "MSR",
    numeric: "500"
  },
  {
    name: "Morocco",
    alpha2: "MA",
    alpha3: "MAR",
    numeric: "504"
  },
  {
    name: "Mozambique",
    alpha2: "MZ",
    alpha3: "MOZ",
    numeric: "508"
  },
  {
    name: "Myanmar",
    alpha2: "MM",
    alpha3: "MMR",
    numeric: "104"
  },
  {
    name: "Namibia",
    alpha2: "NA",
    alpha3: "NAM",
    numeric: "516"
  },
  {
    name: "Nauru",
    alpha2: "NR",
    alpha3: "NRU",
    numeric: "520"
  },
  {
    name: "Nepal",
    alpha2: "NP",
    alpha3: "NPL",
    numeric: "524"
  },
  {
    name: "Netherlands",
    alpha2: "NL",
    alpha3: "NLD",
    numeric: "528"
  },
  {
    name: "Netherlands Antilles",
    alpha2: "AN",
    alpha3: "ANT",
    numeric: "530"
  },
  {
    name: "New Caledonia",
    alpha2: "NC",
    alpha3: "NCL",
    numeric: "540"
  },
  {
    name: "New Zealand",
    alpha2: "NZ",
    alpha3: "NZL",
    numeric: "554"
  },
  {
    name: "Nicaragua",
    alpha2: "NI",
    alpha3: "NIC",
    numeric: "558"
  },
  {
    name: "Niger",
    alpha2: "NE",
    alpha3: "NER",
    numeric: "562"
  },
  {
    name: "Nigeria",
    alpha2: "NG",
    alpha3: "NGA",
    numeric: "566"
  },
  {
    name: "Niue",
    alpha2: "NU",
    alpha3: "NIU",
    numeric: "570"
  },
  {
    name: "Norfolk Island",
    alpha2: "NF",
    alpha3: "NFK",
    numeric: "574"
  },
  {
    name: "Northern Mariana Islands",
    alpha2: "MP",
    alpha3: "MNP",
    numeric: "580"
  },
  {
    name: "Norway",
    alpha2: "NO",
    alpha3: "NOR",
    numeric: "578"
  },
  {
    name: "Oman",
    alpha2: "OM",
    alpha3: "OMN",
    numeric: "512"
  },
  {
    name: "Pakistan",
    alpha2: "PK",
    alpha3: "PAK",
    numeric: "586"
  },
  {
    name: "Palau",
    alpha2: "PW",
    alpha3: "PLW",
    numeric: "585"
  },
  {
    name: "Palestinian Territory",
    alpha2: "PS",
    alpha3: "PSE",
    numeric: "275"
  },
  {
    name: "Panama",
    alpha2: "PA",
    alpha3: "PAN",
    numeric: "591"
  },
  {
    name: "Papua New Guinea",
    alpha2: "PG",
    alpha3: "PNG",
    numeric: "598"
  },
  {
    name: "Paraguay",
    alpha2: "PY",
    alpha3: "PRY",
    numeric: "600"
  },
  {
    name: "Peru",
    alpha2: "PE",
    alpha3: "PER",
    numeric: "604"
  },
  {
    name: "Philippines",
    alpha2: "PH",
    alpha3: "PHL",
    numeric: "608"
  },
  {
    name: "Pitcairn",
    alpha2: "PN",
    alpha3: "PCN",
    numeric: "612"
  },
  {
    name: "Poland",
    alpha2: "PL",
    alpha3: "POL",
    numeric: "616"
  },
  {
    name: "Portugal",
    alpha2: "PT",
    alpha3: "PRT",
    numeric: "620"
  },
  {
    name: "Puerto Rico",
    alpha2: "PR",
    alpha3: "PRI",
    numeric: "630"
  },
  {
    name: "Qatar",
    alpha2: "QA",
    alpha3: "QAT",
    numeric: "634"
  },
  {
    name: "RÈunion",
    alpha2: "RE",
    alpha3: "REU",
    numeric: "638"
  },
  {
    name: "Romania",
    alpha2: "RO",
    alpha3: "ROU",
    numeric: "642"
  },
  {
    name: "Russian Federation",
    alpha2: "RU",
    alpha3: "RUS",
    numeric: "643"
  },
  {
    name: "Rwanda",
    alpha2: "RW",
    alpha3: "RWA",
    numeric: "646"
  },
  {
    name: "Saint-BarthÈlemy",
    alpha2: "BL",
    alpha3: "BLM",
    numeric: "652"
  },
  {
    name: "Saint Helena",
    alpha2: "SH",
    alpha3: "SHN",
    numeric: "654"
  },
  {
    name: "Saint Kitts and Nevis",
    alpha2: "KN",
    alpha3: "KNA",
    numeric: "659"
  },
  {
    name: "Saint Lucia",
    alpha2: "LC",
    alpha3: "LCA",
    numeric: "662"
  },
  {
    name: "Saint-Martin (French part)",
    alpha2: "MF",
    alpha3: "MAF",
    numeric: "663"
  },
  {
    name: "Saint Pierre and Miquelon",
    alpha2: "PM",
    alpha3: "SPM",
    numeric: "666"
  },
  {
    name: "Saint Vincent and Grenadines",
    alpha2: "VC",
    alpha3: "VCT",
    numeric: "670"
  },
  {
    name: "Samoa",
    alpha2: "WS",
    alpha3: "WSM",
    numeric: "882"
  },
  {
    name: "San Marino",
    alpha2: "SM",
    alpha3: "SMR",
    numeric: "674"
  },
  {
    name: "Sao Tome and Principe",
    alpha2: "ST",
    alpha3: "STP",
    numeric: "678"
  },
  {
    name: "Saudi Arabia",
    alpha2: "SA",
    alpha3: "SAU",
    numeric: "682"
  },
  {
    name: "Senegal",
    alpha2: "SN",
    alpha3: "SEN",
    numeric: "686"
  },
  {
    name: "Serbia",
    alpha2: "RS",
    alpha3: "SRB",
    numeric: "688"
  },
  {
    name: "Seychelles",
    alpha2: "SC",
    alpha3: "SYC",
    numeric: "690"
  },
  {
    name: "Sierra Leone",
    alpha2: "SL",
    alpha3: "SLE",
    numeric: "694"
  },
  {
    name: "Singapore",
    alpha2: "SG",
    alpha3: "SGP",
    numeric: "702"
  },
  {
    name: "Slovakia",
    alpha2: "SK",
    alpha3: "SVK",
    numeric: "703"
  },
  {
    name: "Slovenia",
    alpha2: "SI",
    alpha3: "SVN",
    numeric: "705"
  },
  {
    name: "Solomon Islands",
    alpha2: "SB",
    alpha3: "SLB",
    numeric: "90"
  },
  {
    name: "Somalia",
    alpha2: "SO",
    alpha3: "SOM",
    numeric: "706"
  },
  {
    name: "South Africa",
    alpha2: "ZA",
    alpha3: "ZAF",
    numeric: "710"
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    alpha2: "GS",
    alpha3: "SGS",
    numeric: "239"
  },
  {
    name: "South Sudan",
    alpha2: "SS",
    alpha3: "SSD",
    numeric: "728"
  },
  {
    name: "Spain",
    alpha2: "ES",
    alpha3: "ESP",
    numeric: "724"
  },
  {
    name: "Sri Lanka",
    alpha2: "LK",
    alpha3: "LKA",
    numeric: "144"
  },
  {
    name: "Sudan",
    alpha2: "SD",
    alpha3: "SDN",
    numeric: "736"
  },
  {
    name: "Suriname",
    alpha2: "SR",
    alpha3: "SUR",
    numeric: "740"
  },
  {
    name: "Svalbard and Jan Mayen Islands",
    alpha2: "SJ",
    alpha3: "SJM",
    numeric: "744"
  },
  {
    name: "Swaziland",
    alpha2: "SZ",
    alpha3: "SWZ",
    numeric: "748"
  },
  {
    name: "Sweden",
    alpha2: "SE",
    alpha3: "SWE",
    numeric: "752"
  },
  {
    name: "Switzerland",
    alpha2: "CH",
    alpha3: "CHE",
    numeric: "756"
  },
  {
    name: "Syrian Arab Republic (Syria)",
    alpha2: "SY",
    alpha3: "SYR",
    numeric: "760"
  },
  {
    name: "Taiwan, Republic of China",
    alpha2: "TW",
    alpha3: "TWN",
    numeric: "158"
  },
  {
    name: "Tajikistan",
    alpha2: "TJ",
    alpha3: "TJK",
    numeric: "762"
  },
  {
    name: "Tanzania, United Republic of",
    alpha2: "TZ",
    alpha3: "TZA",
    numeric: "834"
  },
  {
    name: "Thailand",
    alpha2: "TH",
    alpha3: "THA",
    numeric: "764"
  },
  {
    name: "Timor-Leste",
    alpha2: "TL",
    alpha3: "TLS",
    numeric: "626"
  },
  {
    name: "Togo",
    alpha2: "TG",
    alpha3: "TGO",
    numeric: "768"
  },
  {
    name: "Tokelau",
    alpha2: "TK",
    alpha3: "TKL",
    numeric: "772"
  },
  {
    name: "Tonga",
    alpha2: "TO",
    alpha3: "TON",
    numeric: "776"
  },
  {
    name: "Trinidad and Tobago",
    alpha2: "TT",
    alpha3: "TTO",
    numeric: "780"
  },
  {
    name: "Tunisia",
    alpha2: "TN",
    alpha3: "TUN",
    numeric: "788"
  },
  {
    name: "Turkey",
    alpha2: "TR",
    alpha3: "TUR",
    numeric: "792"
  },
  {
    name: "Turkmenistan",
    alpha2: "TM",
    alpha3: "TKM",
    numeric: "795"
  },
  {
    name: "Turks and Caicos Islands",
    alpha2: "TC",
    alpha3: "TCA",
    numeric: "796"
  },
  {
    name: "Tuvalu",
    alpha2: "TV",
    alpha3: "TUV",
    numeric: "798"
  },
  {
    name: "Uganda",
    alpha2: "UG",
    alpha3: "UGA",
    numeric: "800"
  },
  {
    name: "Ukraine",
    alpha2: "UA",
    alpha3: "UKR",
    numeric: "804"
  },
  {
    name: "United Arab Emirates",
    alpha2: "AE",
    alpha3: "ARE",
    numeric: "784"
  },
  {
    name: "United Kingdom",
    alpha2: "GB",
    alpha3: "GBR",
    numeric: "826"
  },
  {
    name: "United States of America",
    alpha2: "US",
    alpha3: "USA",
    numeric: "840"
  },
  {
    name: "US Minor Outlying Islands",
    alpha2: "UM",
    alpha3: "UMI",
    numeric: "581"
  },
  {
    name: "Uruguay",
    alpha2: "UY",
    alpha3: "URY",
    numeric: "858"
  },
  {
    name: "Uzbekistan",
    alpha2: "UZ",
    alpha3: "UZB",
    numeric: "860"
  },
  {
    name: "Vanuatu",
    alpha2: "VU",
    alpha3: "VUT",
    numeric: "548"
  },
  {
    name: "Venezuela (Bolivarian Republic)",
    alpha2: "VE",
    alpha3: "VEN",
    numeric: "862"
  },
  {
    name: "Viet Nam",
    alpha2: "VN",
    alpha3: "VNM",
    numeric: "704"
  },
  {
    name: "Virgin Islands, US",
    alpha2: "VI",
    alpha3: "VIR",
    numeric: "850"
  },
  {
    name: "Wallis and Futuna Islands",
    alpha2: "WF",
    alpha3: "WLF",
    numeric: "876"
  },
  {
    name: "Western Sahara",
    alpha2: "EH",
    alpha3: "ESH",
    numeric: "732"
  },
  {
    name: "Yemen",
    alpha2: "YE",
    alpha3: "YEM",
    numeric: "887"
  },
  {
    name: "Zambia",
    alpha2: "ZM",
    alpha3: "ZMB",
    numeric: "894"
  },
  {
    name: "Zimbabwe",
    alpha2: "ZW",
    alpha3: "ZWE",
    numeric: "716"
  }
];

Signal.init();