var klevu_current_version = '1.2.1';
var klevu_shopifyStore = true;
var klevu_enableLandingAutoScroll = true;

// full width for klevu search parent div.
var kuContainer = document.getElementById("kuMainContainer");
if(!kuContainer){
 kuContainer = document.getElementsByClassName("kuContainer") ? document.getElementsByClassName("kuContainer")[0] :null;
}
if(kuContainer){
  kuContainer.parentNode.style.width = "100%";
  kuContainer.parentNode.style.maxWidth = "100%";
}


var urlProtocol = ( "https:" === document.location.protocol ? "https://" : "http://" );
var klevu_storeLandingPageUrl =  urlProtocol + window.location.hostname + "/pages/search-results";
if('undefined' === typeof klevu_pageCategory ){
	if(document.getElementById('searchedKeyword') ){
		document.getElementById('searchedKeyword').value = klevu_getParamValue( 'q' );
	}
} else {
	document.getElementById('searchedKeyword').value = '*';
}


(function(){
	var klevu_key = "", i = 0,
      doc = document,
      scripts = doc.getElementsByTagName( 'script' ),
      searchBoxId = doc.querySelector( "input[name='q']" ) ? 
                    ( doc.querySelector( "input[name='q']" ).id ? 
                      doc.querySelector( "input[name='q']" ).id : "searchq" ) : "searchq";
  
  for( i = 0; i < scripts.length; i++ ){
    var url = scripts[i].src || "";
    var avail = url.search( "klevuScript.js" ); 
    if( avail > 0 ){
      var querystring = url.split( "?" ); 	
      querystring = querystring[1].split( "&" );
      querystring = querystring[0].split( "=" );

      var querystring_lang = url.split( "&" );
      querystring_lang = querystring_lang[1].split( "=" );
      var lang = ( querystring_lang.length > 1 && querystring_lang[1] ) ? querystring_lang[1] : 'en';

	  var querystring_disable = url.split( "&" ),
	      disable = '';
	  if( querystring_disable.length > 2 ) {
		  querystring_disable = querystring_disable[2].split( "=" );
		  disable = ( querystring_disable.length > 1 && querystring_disable[1] ) ? querystring_disable[1] : '';
	  }
	  
      klevu_apiKey = querystring[1];
      if( klevu_apiKey === "klevu-14769641208444539" ){
        lang = "sv";
      }

      if( klevu_apiKey === "klevu-158222251390511680" ){
          lang = "es";
      }

      if(disable !== '1') {
        searchTextBoxName = searchBoxId;
        klevu_lang = lang;
        klevu_result_top_margin = '';
        klevu_result_left_margin = '';
        klevu_process();
        break;
      }
    }
  }  
	if(disable !== '1') {
	  var allInputs = doc.getElementsByTagName( 'input' ),
		  i = 0, len = 0,
		  searchBoxes = new Array();
	  for( i = 0, len = allInputs.length; i < len; i++ ){
      if( allInputs[i].type === "text" || allInputs[i].type === "search" ){
        if( allInputs[i].name === "q" ||  allInputs[i].id === searchBoxId ){        
          if( allInputs[i].form ) {
            allInputs[i].form.action = "/pages/search-results";
          }
        }
      }
	  }
    }
})();

function setKuViewGrid(){ setKuView( 'grid' ); }
function setKuViewList(){ setKuView( 'list' ); };

function klevu_process(){
  if( document.getElementById('klevu-webstore-script') ){
    return;
  }
	try{
		var ws = document.createElement( 'script' ),
        kl_protocol = ( "https:" === document.location.protocol ? "https://" : "http://" );
	 	ws.type = 'text/javascript';
    ws.async = true;
    ws.src = kl_protocol + 'js.klevu.com/klevu-js-v1/js/klevu-webstore.js';
	  var s = document.getElementsByTagName( 'script' )[0];
    s.parentNode.insertBefore( ws, s );
	} catch( err ){}
}

function klevu_addtocart( id, url, qty ) {
  if( 'undefined' !== typeof klevu_customAddToCart ){
    klevu_customAddToCart( id, url, qty );
  } else{
    var urlProtocol = ( "https:" === document.location.protocol ? "https://" : "http://" );
    var url = urlProtocol + window.location.hostname +'/cart/add?id='+id+'&quantity='+qty;
    window.location.assign(url);
  }
}
