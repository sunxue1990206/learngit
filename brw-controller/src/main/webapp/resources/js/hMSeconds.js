 // JavaScript Document   

(function($) {    
  // 插件的定义 时分秒    
  $.fn.hMSeconds = function(options) {      
    // build main options before element iteration    
    var opts = $.extend({}, $.fn.hMSeconds.defaults, options);    
    // iterate and reformat each matched element    
    return this.each(function() {    
      $this = $(this);  
	  //Get the current when the object 
	 var  daysObj=$this.find('[datetype="days"]');
	 var  hoursObj=$this.find('[datetype="hours"]');
	 var  minutesObj=$this.find('[datetype="minutes"]');
	 var  secondsObj=$this.find('[datetype="seconds"]');
	 
	  
      // build element specific options    
      var o = $.meta ? $.extend({}, opts, hoursObj.data(), minutesObj.data(), secondsObj.data()) : opts;  
	    
      // Update the classes
	  daysObj.addClass(o.days);
      hoursObj.addClass(o.hours);   
	  minutesObj.addClass(o.minutes); 
	  secondsObj.addClass(o.seconds); 
	  
	  //When the current gain
	  var days=parseInt($.trim(daysObj.length==0? 0:daysObj.text()));
	  var hours=parseInt($.trim(hoursObj.length==0? 0:hoursObj.text()));
	  var minutes=parseInt($.trim(minutesObj.length==0? 0:minutesObj.text()));
	  var seconds=parseInt($.trim(secondsObj.length==0? 0:secondsObj.text()));
	  
	  //Gets the button to change the class obj
	  var btnClass="";
	  if(o.btn){
		  var btnobj=$this.find('[datetype="datebtn"]');
		  if(btnobj.size()>0){
			  btnClass=btnobj.attr("dateclass").split("-");
			  }
	  		
		}
	  
	  //When the decline effect
	 /// console.log(days);
	   clearInterval(surplusTime);
	  if(seconds!=0||minutes!=0||hours!=0||days!=0){
		 var surplusTime=setInterval(function(){
			  regressive();
			  showTime();
			  },1000)
		  }
	  
	  
	 //To determine when the minutes and seconds.	  
	 function regressive(){
		 if(seconds==0){ 
		     if(minutes==0){
				 if(hours==0){
					 if(days==0){
						 if(o.btn){ 
						 btnobj.val(o.btnval);
						 if(o.disabled){btnobj.attr('disabled','disabled')}else{btnobj.removeAttr("disabled");}
						 if(btnClass!=""){ btnobj.removeClass($.trim(btnClass[0])).addClass($.trim(btnClass[1]));
						 
						 }}
						 if(typeof(o.callBack)!="undefined"){o.callBack(btnobj);}
						 clearInterval(surplusTime);
						 return;
					 }
					days=days-1;
					hours=23;
					seconds=minutes=59;
					return;
				 }
				 hours=hours-1;
				 seconds=minutes=59;
				return; 
				 }
		  minutes=minutes-1;
		  seconds=59;
		 return ;}
		 seconds=seconds-1;
		 return ;
		 } 
   //Display time
   function showTime(){
	   daysObj.html($.fn.hMSeconds.format(transformTime(days)));
	   hoursObj.html($.fn.hMSeconds.format(transformTime(hours)));
	   minutesObj.html($.fn.hMSeconds.format(transformTime(minutes)));
	   secondsObj.html($.fn.hMSeconds.format(transformTime(seconds)));
	   } 	   
   //The transformation of time display
   function transformTime(num){
	   var numStr=num.toString();
	   var len=numStr.length;
	   if(len>o.digit){ return numStr.substr(0,o.digit);
	   }else{
		   for(i=0;i<o.digit-len;i++){
			   	numStr="0"+numStr;
			   }
			return numStr;
		   }
	   }
    });  
  
  };    
   
  // The definition of exposure to format function  
  $.fn.hMSeconds.format = function(txt) {    
    return '<span>' + txt + '</span>';    
  };    
  // 插件的defaults    
  $.fn.hMSeconds.defaults = {  
  	days:"days",  
    hours:"hours",
	minutes:"minutes",
	seconds:"seconds",
	btnval:"已售完",
	disabled:true,
	btn:true,
	digit :2,
	callBack:function(that){//When the timer goes off the callback function
		//The return of function
		} 
  };    
})(jQuery);   