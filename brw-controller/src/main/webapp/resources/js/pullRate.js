// JavaScript Document
(function($) {  
	$.fn.pullRate=function(options){
		
		var optRates = $.extend({}, $.fn.pullRate.defaults,options);    
		 return this.each(function() { 
		 	var $this=$(this); 
			var op= $.extend({rate:0},optRates,{rate:$this.attr("rate")}); 
			$this.append('<div class="up pr">'
                          +'<span class="pa down"><img class="pa none" src="'+op.pull+'"></span>'
                          +'<p class="pa rate_num fred"><b class="fn">0</b>%</p>'
                          +'</div>');    
			if(op.rate==0){ return false;}
			var surplusTime;
			var time=0;
			 clearInterval(surplusTime);
			  var surplusTime=setInterval(function(){
				  if(time>=op.rate){ return false;}
				  time++;
			  	  $this.find(".rate_num b").text(time);
			  },op.animate/op.rate)
			
			if(op.rate<=25){
				var h=op.height/2*op.rate/25;
				$this.find(".down").animate({ 
					width: op.width/4,
					height: h
				  }, op.animate*op.rate/100);
				}
			if(op.rate>25&&op.rate<=50){
				$this.find(".down").animate({ 
					width: op.width*op.rate/100,
					height: op.height*op.rate/100*5
				  },op.animate*op.rate/100 
					   );
				}
			if(op.rate>50&&op.rate<=75){
				$this.find(".down").animate({ 
					width: op.width/2+op.width/2*op.rate/100,
					height: op.height*op.rate/100*5
				  },op.animate*op.rate/100 
				);
				}
			if(op.rate>75&&op.rate<=100){
				
				$this.find(".down").animate({ 
					width: op.width/2+op.width/2*0.75,
					height: op.height*op.rate/100*5
				  },op.animate*0.75,function(){
					$this.find("div").addClass("over").removeClass("up").find("img").removeClass("none");  
					$this.find(".down").width(op.width/2).height(op.height/2)
					.animate({ 
						height: op.height*2*(100-op.rate)/100
						 },op.animate-op.animate*0.75
						   );  
						   	   
				   }
				);
				
				}
		  });
		
		}
	$.fn.pullRate.defaults={
		width:112,
		height:42,
		pull:"../images/pull.jpg",
		animate:1000
		}
	})(jQuery);