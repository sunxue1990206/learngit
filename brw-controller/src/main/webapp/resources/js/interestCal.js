// JavaScript Document
var interestCal=function(operation) {
	setReturnDable(true);
	var my={
		investment:"#investment",//投资金额
		yearRate:"#year_rate",//预期年化利率
		inveTime:"#inve_time",//投资期限
		ways:"#ways",//还款方式
		totalMoney:"#total_money", //计算结果
		tableMoney:"#table_money" //回款期次表
		}
	my=jQuery.extend(my,operation);
	
	//投资金额
	var investment=parseFloat(jQuery(my.investment).val()); 
	
	//预期年化利率
	var yearRate=parseFloat(jQuery(my.yearRate).val()); 
	
	//投资期限
	var inveTime=parseInt(jQuery(my.inveTime).val()); 
	
	//还款方式
	var ways=jQuery.trim(jQuery(my.ways).val());
	
	//每月利率
	var interest = yearRate / 100 / 12; 

	var monthly = (investment + investment * inveTime * interest) / inveTime; //每月还款本息

	var newdiv = jQuery(my.tableMoney);
	var newp = jQuery(my.totalMoney);
	//自定义创建一个表格
	var str ='<tr class="bg">'
			+'<th class="wc wb13 pn"><span>期次</span></th>'	
			+'<th class="wr wb21"><span>月收本息</span></th>'	
			+'<th class="wr wb20 pln"><span>月收本金</span></th>'
			+'<th class="wr wb23"><span>月收利息</span></th>'	
			+'<th class="wr pr10"><span>剩余本息</span></th>'	
			/*+'<th class="wr wb10"><span>剩余本金</span></th>'	
			+'<th class="wr "><span>剩余利息</span></th>'	*/
			+'</tr>';
	if (ways == "等额本息") {
		jQuery.interCalFun.matchService(str,inveTime,investment,interest,newdiv,newp);
		return;
		}
	
	if (ways == "等本等息") {
		jQuery.interCalFun.otherInfor(str,inveTime,investment,interest,newdiv,newp);
	return;
	}
	
	if (ways == "按月付息，到期还本") {
		jQuery.interCalFun.invesMon(str,inveTime,investment,yearRate,newdiv,newp);
		return;
		}
	
	if (ways == "到期一次还本付息") {
	jQuery.interCalFun.oneAll(str,inveTime,investment,interest,newdiv,newp);
	return;
	}
	
}
/**
*参数：
*str:表格头部html
*inveTime:投资期限
*investment:投资金额
*interest:月利率
*newdiv：表格
*newp：显示总的还款金额与利息的标签
*/
jQuery.interCalFun={
	otherInfor:function(str,inveTime,investment,interest,newdiv,newp){
		var preMoney=investment;
		//每个期次的还款利息 = 借款本金×月利率
		var	interestMoney=Round2(accMul(investment,interest));
			//当不是最后一期时的还款本金
			//每个期次的还款本金（除最后一期） = 借款本金÷还款期限
		var	notLastprincipalMoney=Round2(accDiv(investment,inveTime));
		//还款利息总和赋值
		var preInterest=Round2(accMul(interestMoney,inveTime));
		for (var j = 1; j < parseInt(inveTime) + 1; j++){

			if(j!==inveTime){
				//当不是最后一期时的还款本金
				principalMoney=notLastprincipalMoney;
				}else{
					//最后一期还款本金
					principalMoney=preMoney;
					}
			//	每个期次的还款金额 = 每个期次的还款本金+还款利息
			amountMoney=Round2(accAdd(principalMoney,interestMoney));
			
		  //	每个期次的剩余本金 = 上期的剩余本金-当期的还款本金
		  preMoney=accSub(preMoney,principalMoney);

			//每个期次的剩余利息 = 上期的剩余利息-当期的还款利息
			preInterest=accSub(preInterest,interestMoney);
			//	每个期次的剩余金额 = 每个期次的剩余本金+剩余利息
			remAmount=accAdd(preMoney,preInterest);
			if(j%2==0)
			{
				str += "<tr class=\"tool_bai bg\">";
			str += "<td class='wc pn'><span>" + (j) + "</span></ td>"//期数
			
			
			str += "<td class='wr'><span>"  + Round2(amountMoney)+ "</span></ td>"; //每期还款本息
			str += "<td class='wr pln'><span>"  + Round2(principalMoney) + "</span></ td>"; //每期还款本金
			str += "<td class='wr'><span>"  + Round2(interestMoney) + "</span></ td>"; //利息
			str += "<td class='wr pr10'><span>"  + Round2(remAmount)+ "</span></ td>"; //余额
			str += "</tr>";
				}
				else
				{
			str += "<tr >";
			str += "<td class='wc pn'><span>" + (j) + "</span></ td>"//期数
			str += "<td class='wr'><span>"  + Round2(amountMoney) + "</span></ td>"; //每期还款本息
			str += "<td class='wr pln'><span>"  + Round2(principalMoney) + "</span></ td>"; //每期还款本金
			str += "<td class='wr'><span>"  + Round2(interestMoney) + "</span></ td>"; //利息
			str += "<td class='wr pr10'><span>"  + Round2(remAmount) + "</span></ td>"; //余额
			str += "</tr>";
					}
			
		}
		newdiv.html(str); //将表格的内容填充到div中
		totalInterest =  Round2(accMul(interestMoney,inveTime)); //利息
		totalMoney= Round2(accAdd(totalInterest,investment)); //还款本息总额        
		
		var html=' <span>到期本息合计：</span>&nbsp;<b class="fpurple">'+totalMoney+'</b>&nbsp;元<br />'
                 +'<span>利息总额：</span>&nbsp;<b class="fpurple">'+totalInterest+'</b>&nbsp;元'
		newp.html(html);
	
		
		},
	totalCount:function(inveTime,investment,interest){
		var data={
			  interestMoney:[],//每个期次的还款利息
			  amountMoney:[],//每个期次的还款金额
			  principalMoney:[],//每期还款本金	
			  preMoney:[],//每个期次的剩余本金
			  notLastMoney:0,//当不是最后一期的时候每月还款金额
			  LastMoney:0,//最后一期的时候每月还款金额
			  totalMoney:0,//还款总额
			  totalInterest:0//总利息相加
			}
		//第一期次剩余本金
		data.preMoney[0]=investment;
		
		//当不是最后一期的时候每月还款金额
		//每个期次的还款金额（除最后一期）= [借款本金×月利率×（1+月利率）^还款月数]÷[（1+月利率）^还款月数－1]
		data.notLastMoney=Round2(accDiv(accMul(accMul(investment,interest),Math.pow(1 + interest, inveTime)),(Math.pow(1 + interest, inveTime)-1)));
		for (var j = 1; j < parseInt(inveTime) + 1; j++){
			//利息
			//每个期次的还款利息 = 上期的剩余本金×月利率
			if(j==1){
				data.interestMoney[j-1]=Round2(investment*interest);
				}else{
				data.interestMoney[j-1]=Round2(data.preMoney[j-2]*interest);
				}
			
			//interestMoney=Round2(preMoney*interest);
			if(j!=inveTime){
					
				//	每个期次的还款金额
				data.amountMoney[j-1]=data.notLastMoney;
				//amountMoney =notLastMoney
				
				//每期还款本金	
				//每个期次的还款本金（除最后一期）= 每个期次的还款金额-还款利息
				data.principalMoney[j-1]=accSub(data.amountMoney[j-1],data.interestMoney[j-1]);
				//principalMoney=accSub(amountMoney,interestMoney);
				
				}else{	
				  //最后一期的还款本金 = 上期的剩余本金
				  if(j==1){data.principalMoney[j-1]=investment;}else{data.principalMoney[j-1]=data.preMoney[j-2];}
				//  principalMoney=preMoney;
				  //最后一期的还款金额 = 最后一期的还款本金+还款利息
				  data.amountMoney[j-1]=accAdd(data.principalMoney[j-1],data.interestMoney[j-1]);
				 // amountMoney =accAdd(principalMoney,interestMoney);
				}
				
		    //每个期次的剩余本金 = 上期的剩余本金-当期的还款本金
			  if(j==1){data.preMoney[j-1]=accSub(investment,data.principalMoney[j-1]);}else{
				  data.preMoney[j-1]=accSub(data.preMoney[j-2],data.principalMoney[j-1]);
				  }
			  //preMoney=accSub(preMoney,principalMoney);
				
			data.totalMoney=accAdd(data.totalMoney,data.amountMoney[j-1]);
			//总利息相加
			data.totalInterest=accAdd(data.totalInterest,data.interestMoney[j-1]);
		}
		return data;
		},
	matchService:function(str,inveTime,investment,interest,newdiv,newp){
		//返回每个期次数据
	     data=jQuery.interCalFun.totalCount(inveTime,investment,interest);
		 //每个期次的剩余利息
		 data.preInterest=[];
		 //每个期次的剩余金额
		 data.remAmount=[];
		for (var j = 1; j < parseInt(inveTime) + 1; j++){
			//每个期次的剩余利息 = 上期的剩余利息-当期的还款利息
			if(j==1){
				data.preInterest[j-1]=accSub(data.totalInterest,data.interestMoney[j-1]);
				}else{
				data.preInterest[j-1]=accSub(data.preInterest[j-2],data.interestMoney[j-1]);
				}
			//每个期次的剩余金额 = 每个期次的剩余本金+剩余利息
			data.remAmount[j-1]=accAdd(data.preMoney[j-1],data.preInterest[j-1]);
		
			if(j%2==0)
			{
				str += "<tr class=\"tool_bai bg\">";
			str += "<td class='wc pn'><span>" + (j) + "</span></ td>"//期数
			
			
			str += "<td class='wr'><span>"  + Round2(data.amountMoney[j-1]) + "</span></ td>"; //每期还款本息
			str += "<td class='wr pln'><span>"  + Round2(data.principalMoney[j-1]) + "</span></ td>"; //每期还款本金
			str += "<td class='wr'><span>"  + Round2(data.interestMoney[j-1]) + "</span></ td>"; //利息
			str += "<td class='wr pr10'><span>"  + Round2(data.remAmount[j-1]) + "</span></ td>"; //余额
			str += "</tr>";
				}
				else
				{//console.log(data);
			str += "<tr >";
			str += "<td class='wc pn'><span>" + (j) + "</span></ td>"//期数
			str += "<td class='wr'><span>"  + Round2(data.amountMoney[j-1]) + "</span></ td>"; //每期还款本息
			str += "<td class='wr pln'><span>"  + Round2(data.principalMoney[j-1]) + "</span></ td>"; //每期还款本金
			str += "<td class='wr'><span>"  + Round2(data.interestMoney[j-1]) + "</span></ td>"; //利息
			str += "<td class='wr pr10'><span>"  + Round2(data.remAmount[j-1]) + "</span></ td>"; //余额
			str += "</tr>";
					}
			
		}
		newdiv.html(str); //将表格的内容填充到div中
		data.totalMoney=  Round2(data.totalMoney ); //还款本息总额        
		data.totalInterest =  Round2(data.totalInterest); //利息
		var html=' <span>到期本息合计：</span>&nbsp;<b class="fpurple">'+data.totalMoney+'</b>&nbsp;元<br />'
                 +'<span>利息总额：</span>&nbsp;<b class="fpurple">'+data.totalInterest+'</b>&nbsp;元'
		newp.html(html);
	
		
		},
	oneAll:function(str,inveTime,investment,interest,newdiv,newp){
		var totalMoney = 0, totalInterest = 0;
		var vesaccMul=accMul(accMul(investment,interest),inveTime);
		str += "<tr  class=\"tool_bai\">";
		str += "<td class='wc pn'><span>" + 1 + "</span></ td>"//期数	
		str += "<td class='wr'><span>"  + Round2(vesaccMul + investment) + "</span></ td>"; //	每期还款本息
		str += "<td class='wr pln'><span>"  + Round2(investment) + "</span></ td>"; //每期还款本金
		str += "<td class='wr'><span>"  + Round2(vesaccMul) + "</span></ td>"; //利息
		str += "<td class='wr pr10'><span>" + "0.00</span></ td>"; //余额
		str += "</tr>";
		newdiv.html(str); //将表格的内容填充到div中
		totalMoney =  Round2(vesaccMul + investment); //还款本息总额        
		totalInterest =  Round2(vesaccMul); //利息
		var html=' <span>到期本息合计：</span>&nbsp;<b class="fpurple">'+totalMoney+'</b>&nbsp;元<br />'
                 +'<span>利息总额：</span>&nbsp;<b class="fpurple">'+totalInterest+'</b>&nbsp;元'
		newp.html(html);
		
		
		},
	invesMon:function(str,inveTime,investment,yearRate,newdiv,newp){
		var mon = 0,totalMoney = 0, totalInterest = 0,interestMoney=[],lastInterest=0,preInterest=[],remAmount=0;
		//总利息=借款金额*年化利率*借款期限/12
		totalInterest =  Round2(accDiv(accMul(accMul(investment,yearRate),inveTime),2)); //利息
		//每月利率
		var interest = yearRate / 100 / 12;
		//最开始剩余利息
		preInterest[0]=totalInterest;
		lastInterest=totalInterest;
		for (var j = 1; j < parseInt(inveTime) + 1; j++) {
			
			
			if (j == parseInt(inveTime)) {
				mon = investment; //每期还款本金
				
				//最后一期还款利息=总利息-除最后一期所有利息之和
				interestMoney[j]=lastInterest;
			}else{
			//每个期次的还款利息（除最后一期） = 借款本金×月利率
			interestMoney[j]=Round2(accMul(investment,interest));
			
			}
			//每个期次的剩余利息 = 上期的剩余利息-当期的还款利息
			preInterest[j]=accSub(preInterest[j-1],interestMoney[j]);
			//最后一期还款利息=总利息-除最后一期所有利息之和
			lastInterest=accSub(lastInterest,interestMoney[j]);
			if(j%2==0)
			{   
				str += "<tr class=\"tool_bai bg\">";
			str += "<td class='wc pn'><span>" + (j) + "</span></ td>"//期数
			str += "<td class='wr'><span>"  + Round2(accAdd(interestMoney[j], mon)) + "</span></ td>"; //每期还款本息
			str += "<td class='wr pln'><span>"  + Round2(mon) + "</span></ td>"; //每期还款本金
			str += "<td class='wr'><span>"  + Round2(interestMoney[j]) + "</span></ td>"; //利息
			str += "<td class='wr pr10'><span>"  + Round2(accAdd(accSub(investment,mon),preInterest[j]))+ "</span></ td>"; //余额
			str += "</tr>";
				}
				else
				{
			str += "<tr >";
			str += "<td class='wc pn'><span>" + (j) + "</span></ td>"//期数
			str += "<td class='wr'><span>"  + Round2(accAdd(interestMoney[j], mon)) + "</span></ td>"; //每期还款本息
			str += "<td class='wr pln'><span>"  + Round2(mon) + "</span></ td>"; //每期还款本金
			str += "<td class='wr'><span>"  + Round2(interestMoney[j]) + "</span></ td>"; //利息
			str += "<td class='wr pr10'><span>"  + Round2(accAdd(accSub(investment,mon),preInterest[j])) + "</span></ td>"; //余额
			str += "</tr>";
					} 
		
		}
		newdiv.html(str); //将表格的内容填充到div中
		totalMoney=  Round2(accAdd(totalInterest,investment)); //还款本息总额        
		
		var html=' <span>到期本息合计：</span>&nbsp;<b class="fpurple">'+totalMoney+'</b>&nbsp;元<br />'
                 +'<span>利息总额：</span>&nbsp;<b class="fpurple">'+totalInterest+'</b>&nbsp;元'
		newp.html(html);
	
		
		}
}


/*******解决js浮点数加减乘除的bug*******/
// 两个浮点数求和
    function accAdd(num1,num2){
       var r1,r2,m;
       try{
           r1 = num1.toString().split('.')[1].length;
       }catch(e){
           r1 = 0;
       }
       try{
           r2=num2.toString().split(".")[1].length;
       }catch(e){
           r2=0;
       }
       m=Math.pow(10,Math.max(r1,r2));
       // return (num1*m+num2*m)/m;
       return Math.round(num1*m+num2*m)/m;
    }
    
    // 两个浮点数相减
    function accSub(num1,num2){
       var r1,r2,m;
       try{
           r1 = num1.toString().split('.')[1].length;
       }catch(e){
           r1 = 0;
       }
       try{
           r2=num2.toString().split(".")[1].length;
       }catch(e){
           r2=0;
       }
       m=Math.pow(10,Math.max(r1,r2));
       n=(r1>=r2)?r1:r2;
       return (Math.round(num1*m-num2*m)/m).toFixed(n);
    }
    // 两数相除
    function accDiv(num1,num2){
       var t1,t2,r1,r2;
       try{
           t1 = num1.toString().split('.')[1].length;
       }catch(e){
           t1 = 0;
       }
       try{
           t2=num2.toString().split(".")[1].length;
       }catch(e){
           t2=0;
       }
       r1=Number(num1.toString().replace(".",""));
       r2=Number(num2.toString().replace(".",""));
       return (r1/r2)*Math.pow(10,t2-t1);
    }
    
    function accMul(num1,num2){
       var m=0,s1=num1.toString(),s2=num2.toString(); 
    try{m+=s1.split(".")[1].length}catch(e){};
    try{m+=s2.split(".")[1].length}catch(e){};
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
    }
 