$(function(){

    // collapsible-toggle text--strong


    $("button.popover-button").on("click",function(e){

        let t = $(this).attr("aria-controls");
      
        console.log('id =',t  );


      
       let toggleEle = $("#"+ $.escapeSelector(t));
       
       console.log(`toggleEle.attr("open"):`, toggleEle.attr("open"));
       if(toggleEle.attr("open")){
           toggleEle.removeAttr('open');
       }else{
             toggleEle.attr("open","");
       }
      
       
    })

    // display mobile filter 

    
// mobile filte rcss 
    let resize = function(){
        let width = ($(window).innerWidth());

        let  ele = $('div.product-facet__aside #facet-filters');
        if(width < 1000 && ele.attr("class") != "product-facet__filters drawer drawer--from-left" ){
            ele.attr("class","product-facet__filters drawer drawer--from-left")
        }else if (width >= 1000){
                ele.attr("class","product-facet__filters");
        }

    }
    resize();
    var resizeTimer;
    $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        resize();

    }, 250); // 延迟时间
    });



    
    $("button.drawer__close-button").on('click',function (e) { 

        $("#facet-filters").removeAttr("open");
        e.preventDefault();
     })

     $("button.mobile-toolbar__item").click(function (e) { 
        if($("#facet-filters").attr("open")){
                $("#facet-filters").removeAttr("open");
        }else{
            $("#facet-filters").attr("open","")
        }
        
        e.preventDefault();
        
    });
   


})

