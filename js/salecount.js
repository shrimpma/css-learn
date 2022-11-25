$(function(){
    
    var v1 = $('#pm-countdown-data').data('start');
    var v2 = $('#pm-countdown-data').data('end')
    var salecount = new SaleCountdown(v1,v2,'#pm-countdown');

    salecount.initializeClock();

    $(".sale-countdown").each(function(index){

       var text =  $(this).find(".pm-countdown").html();
       console.log(text);
    })

})

class SaleCountdown{
    
    constructor(start_time,end_time,container){
        this.start_time = start_time;
        this.end_time = end_time;
        this.container = container;
    }

    getTimeRemaining() {
        var startTimeJS = Date.parse(this.start_time), 
         nowTimeJs = this.getNowTimestamp(8),
         endTimeJs = Date.parse(this.end_time);
        if(isNaN(startTimeJS) || (nowTimeJs < startTimeJS ) || nowTimeJs > endTimeJs ){
           console.log('flash sale not begin ',this.start_time,this.end_time);
           return ;
        }
        
        var t = endTimeJs - nowTimeJs;  
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        
        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
      }

      initializeClock(type) {
        
        var that = this ;
       
        function updateClock() {
          var t = that .getTimeRemaining();
         // console.log('init clock here',t);
          
          if (t == undefined  ||(typeof t === "undefined") || t.total <= 0) {
            console.log('init clock,',t);
            clearInterval(timeinterval);
            
            $(".promo_banner__content").html($('#default_notice').html());
            return;
          }
          
          var dayLeft = t.days,
              hourLeft = ('0' + t.hours).slice(-2) ,
              minuteLeft = ('0' + t.minutes).slice(-2),
              secondLeft = ('0' + t.seconds).slice(-2);   
          var template = `${dayLeft}<span>D</span>${hourLeft}<span>H</span>${minuteLeft}<span>M</span>${secondLeft}<span>S</span>`;
   
          //console.log('arguments[1]',arguments[1],type );
          if (type == 2){
               template = `End in <span>${dayLeft}</span>:<span>${hourLeft}</span>:<span>${minuteLeft}</span>:<span>${secondLeft}</span>`;
          }
          $(that.container).html(template);
       
        }
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
      }

    getNowTimestamp(timeZone) {
        // return timeStampe 
        var timezone = timeZone || 8; 
        var offset_GMT = new Date().getTimezoneOffset(); 
        var nowDate = new Date().getTime(); 
        var targetDate = nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000;
        return targetDate;
    }

}


