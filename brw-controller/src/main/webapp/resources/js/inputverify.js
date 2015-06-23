// JavaScript Document
/*
input 上面参数
fill 1：必填 
sus： 1:成功的时候显示对号
ne： 1：获取焦点的时候显示提示warn提示信息
noform: 1登录不验证格式错误
nolimit: 1去掉大小限定
maxnum:最大能输入的数字位数
point:小数点最大位数
max:最大能输入的个数

短信验证码
ca :代表次数，没有的时候为0

textarea
min:最少字数
max：最大字数

其余值
checkbox  1:选中 0：未选中
radio 取得是value值，都没选就是空


数据

var myDate={
		userName:"",
		password:"",
		okpassword:"",
		oldpassword:""
		new_password:"",//包含交易密码登录密码等所有新密码
		mobilePhone:"",
		captcha:"",
		sms_captcha:"",
		contact:"",//真实姓名
		id_num:"", //身份证
		email:"",
		money_num:"",//充值金额
		cash_num:"",//提现金额
		card_num:"",//银行卡号
		branch:"",//开户支行
		loanAmount :"",//借款金额
		loanPeriod :"", //借款期限
		throw_num : "",//可投金额
		transfer_num:""//转让多少份
		deal_pw:"",//交易密码
		open_city:"",///开户城市
		cur_wealth:""//当前财富
		investment:""//投资金额
		loginUser://登录用户名
		year_rate:""预期年化利率
		inve_time:""投资期限
		auto_mdown:""//单笔投标金额
		auto_yrate:""//年化利率下限
		auto_datetop:""//标的期限上限
		keep_balance:""//账户保留余额
		};*/
(function($) { /*登录验证*/
	$.fn.loginVerify = function(operation) {
		var thz = this;
		var my = {
			//提示信息的位置
			mes: "left",
			//1:一进来就会发送验证码 0：点击才会发送验证码s
			getca: 1,
			//发送次数
			caNum: 6,
			//1:click事件, 0:submint事件
			scBtn: 1,
			//oksubmit:function(sus,that){return;},//提交的某些特殊的判断
			verImobilePhone: function(str, that) {} //更新手机短信验证码当进来的时候只有发送成功了才会显示成功区域内容
			//onSubmit:function(that,sus,myDate){}//当提交的时候调用函数
		};
		var myDate = {};
		var myDateTem = {};
		my = $.extend(my, operation);

		//判断短信是否发送
		$.otherClick.getcaptchaSMS(my, thz, thz.find("[vertype='getcaptcha']"), myDateTem,"getcaptcha");


		//选择框 输入框焦点处理验证
		thz.find(".focus_bg,.focus_select").each(function() {
			$(this).focusInput({
				verifyB: function(that) {
					var dateStatus = $.method.verInput(my, myDate, myDateTem, thz, that);

					myDate = $.extend(myDate, dateStatus.myDate);
					myDateTem = $.extend(myDateTem, dateStatus.myDateTem);
					$.method.noticeWord(my, that, dateStatus.status, thz, myDateTem);
					
					if(dateStatus.status.type==1){
						var lb_ogj = that.parent().parent().parent().find(".notice_input");
						if(!isUndefinde(my[$.trim(that.attr("vertype"))+"Fun"])){
							my[$.trim(that.attr("vertype"))+"Fun"]($.method.getValue(that),lb_ogj);
							}
						}
					return;
				},
				verifyF: function(that) {
					var name = !isUndefinde(that.attr("vertype")) ? that.attr("vertype") : "";
					
					var ne = $.trim(!isUndefinde(that.attr("ne")) ? that.attr("ne") : "");
					var message = "";
					switch (name) {
					case "userName":
						message = '4~20位的字符，可由英文、数字、"_"或"-"构成';
						break;
					case "mobilePhone":
						message = "请填写您的常用手机号码";
						break;
					case "login_password":
						message = "6~16位的字符，可由英文、数字或符号构成";
						break;
					case "password":
						message = "6~16位的字符，可由英文、数字或符号构成";
						break; /*case "okpassword": */
					default:
						message = "";
						break;
					}
					var lb_ogj=that.parent().parent().parent().find(".notice_input");
					if (message != "" && ne == "1") {
						if (my.mes == "left" || my.mes == "bottom") {
							lb_ogj.css("display", "block");
							lb_ogj.addClass("warn_n").removeClass("error_n sus_n").find("span").html(message);
							return;
						}
						if (my.mes == "top") {
							thz.find(".notice_input").css("visibility", "visible").addClass("warn_n").removeClass("error_n sus_").find("span").html(message);
							return;
						}

					} else {
						if (my.mes == "left" || my.mes == "bottom") {
							lb_ogj.css("display", "none");
							return;
						}
						if (my.mes == "top") {
							thz.find(".notice_input").css("visibility", "hidden");
							return;
						}
					}
				}

			});

		});

		//点击或者提交验证所有的数据

		var submitDate = function() {
				var sus = 1;
				if(my.mes!="top"){
					thz.find("input").each(function() {
						$(this).blur();
					});
				}
				
				
				sus = $.method.verInputAll(my, thz,myDateTem);
				return sus;
			}
			//表单提交
			
		if (!isUndefinde(my.onSubmit)) {
			thz.submit(function() {
				if (!returnDable) {
					return false;
				}
				setReturnDable(false);
				var sus = submitDate();
				if (sus == 0) {
					setReturnDable(true);
				}

				return my.onSubmit(sus, thz, myDate);

			});
		}

		//确定返回数据
		
		if (!isUndefinde(my.oksubmit)) {
			thz.find("[vertype='ok_btn']").click(function() {
				if (!returnDable) {
					return false;
				}
				setReturnDable(false);
				var sus = submitDate();
				
				if (sus == 0) {
					setReturnDable(true);
				}
				my.oksubmit(sus, thz, myDate);
			});
		}
		//获取键盘事件确定提交
		$("body").not(".noenter").keyup(function(e) {
			var key = e.which || e.keyCode;
			
			if (key == 13) {
				if (my.scBtn == 1) {
					
					thz.find("[vertype='ok_btn']").click();
					return;
				}
				if (my.scBtn == 0) {
					thz.find("[vertype='ok_btn']").submit();
					return;
				}
			}

		});

		//控制输入的内容keyup
		$.keypressVer.init(my, thz, myDateTem);
		//其余获取焦点focus
		$.focusVer.init(my, thz, myDateTem);
		//其余失去焦点blur
		$.blurVer.init(my, thz, myDateTem);
		//其余元素的点击效果
		$.otherClick.checkbox(my, thz);
		thz.find("[vertype='getcaptcha'],[vertype='getsound']").click(function() {
			if(!$.otherClick.retuStatus){ return false;};
			 $.otherClick.getcaptcha(my, thz, $(this), myDateTem,$(this).attr("vertype"));
		})

	};
	$.otherClick = { //其余元素的点击效果
		surplusTime:null,//短信验证
		time:60,//定时
		dtime: 0,//当前剩余秒数
		retuStatus:true,
		dStatus:true,//当语音和短信为同一按钮的时候当前的状态
		checkbox: function(my, that) {
			that.find('input[type="checkbox"]').bind("click", function() {
				if ($(this).attr("checked") == "checked") {
					$(this).parent().parent().find(".notice_input").css("display", "none");
				}
			});
		},
		getcaptchaSMS: function(my, thz, that, myDateTem) {
			if (my.getca == 1) {
				$.otherClick.getcaptcha(my, thz, that, myDateTem);
			}
		},
		getDateTime: function(id) {
			var oldDate = {
				status: 1
			};
			oldDate[id+"oldYear"] = parseInt($.otherClick.getCookie(id + "oldYear"));
			oldDate[id+"oldMon"] = parseInt($.otherClick.getCookie(id + "oldMon"));
			oldDate[id+"oldDay"] = parseInt($.otherClick.getCookie(id + "oldDay"));
			oldDate[id+"oldHour"] = parseInt($.otherClick.getCookie(id + "oldHour"));
			oldDate[id+"oldMinute"] = parseInt($.otherClick.getCookie(id + "oldMinute"));
			oldDate[id+"oldSecond"] = parseInt($.otherClick.getCookie(id + "oldSecond"));
			if (isNaN(oldDate[id+"oldYear"])) {
				oldDate.status = 0;
			}
			return oldDate;
		},
		checkTime: function(oldDate, id) {
			if (!oldDate.status) {
				return time;
			}
			var oleDateTem = new Date(oldDate[id+"oldYear"], oldDate[id+"oldMon"], oldDate[id+"oldDay"], oldDate[id+"oldHour"], oldDate[id+"oldMinute"], oldDate[id+"oldSecond"]);
			var newDate = new Date();
			return parseInt((newDate - oleDateTem) / 1000);
		},
		setDateTime: function(id) {
			var newDate = new Date();
			$.otherClick.setCookie(id + "oldYear", newDate.getFullYear().toString());
			$.otherClick.setCookie(id + "oldMon", newDate.getMonth().toString());
			$.otherClick.setCookie(id + "oldDay", newDate.getDate().toString());
			$.otherClick.setCookie(id + "oldHour", newDate.getHours().toString());
			$.otherClick.setCookie(id + "oldMinute", newDate.getMinutes().toString());
			$.otherClick.setCookie(id + "oldSecond", newDate.getSeconds().toString());
		},
		getcaptcha: function(my, thz, that, myDateTem,type) {
			
			var colorbtn = {
				fcolor: "fred",
				fcolordis: "fgrayl",
				bcolor: "",
				bcolordis: "",
				isSameBtn:false,
				minleftText:"",
				value: "点击获取",
				sValue:"语音验证码",
				getcaptchaText:"验证短信已成功发送至您的手机号码 ，请注意查收。<br />没收到短信？点击获取",
				getsoundText:"您的手机将在60s内收到来自021-xxxxxxxx的来电，<br />请注意接听"
			}
			
			if (my.colorbtn) {
				colorbtn = $.extend(colorbtn, my.colorbtn);
			}
			
			$.otherClick.dtime = $.otherClick.time;
			
			if ($.otherClick.checkMobile(my,thz)) {
				var ca = parseInt(that.attr("ca"));
				if (ca < my.caNum) {
					
					//得到当前发送剩余秒数，以及判断是否发送验证码
					var isSendSMS=$.otherClick.getDtime(that,colorbtn,ca);
					
					//定时效果开始的时候先清理定时
					clearInterval($.otherClick.surplusTime);
					
					that.val($.otherClick.getminleftText(colorbtn,$.otherClick.dtime));
					
					$.otherClick.surplusTime = setInterval(function() {
						
						$.otherClick.dtime = $.otherClick.dtime - 1;
						
						that.val($.otherClick.getminleftText(colorbtn,$.otherClick.dtime));
						
						if ($.otherClick.dtime == 0 || $.otherClick.dtime < 0) {
							
							$.otherClick.setColor(that, colorbtn, true);
							
							if(colorbtn.endTimeFun){
								
								colorbtn.endTimeFun();
								
								}
								
							clearInterval($.otherClick.surplusTime);
						}
					}, 1000);
				} else {
					$.otherClick.setColor(that, colorbtn, true);
					if (isUndefinde(myDateTem)) {
						var myDateTem = {};
					}
					if (!isUndefinde(that.attr("ca")) && $.method.getNone(that)) {
						$.method.noticeWord(my, that.parent().find("[vertype='sms_captcha']"), {
							message: "您点击过于频繁！",
							type: 0
						}, thz, myDateTem);
					}
				}

			}
		if(isSendSMS){
			 //记录当前时间
			$.otherClick.setDateTime(that.attr("id"));
				
			my.verImobilePhone(colorbtn,$.otherClick.getText(colorbtn,that)+"Text",$.otherClick.getText(colorbtn,that));
			
		    $.otherClick.dStatus=false;
			}
		},
		
		getText:function(colorbtn,that){//得到当前的提示语句
		
			var str = "";
			if(colorbtn.isSameBtn){
				
				str = $.otherClick.dStatus ? "getcaptcha":"getsound";
				
				}else{
					
					str = that.attr("vertype");
					
					}
			return str;	
			
			},
			
		checkMobile:function(my,thz){//判断手机号存在与否与是否格式正确信息
			var mobile = thz.find("[vertype='mobilePhone']");
			var mes = {};
			if (mobile.attr("readonly") == "readonly" || mobile.attr("readonly") == true) {
				mes.type = 1;
			} else {
				if (mobile.size() > 0) {
					mobile.blur();
				}
				mes = $.extend({
					type: 1
				}, $.method.mobilePhone(my, mobile.val(), mobile));
			}
			if(mobile.size() > 0 && mes.type == 1 || mobile.size() <= 0){
				
				 return true;
				
				}else{
					
					return false;
					
					}
			
			}, 
			
		getDtime:function(that,colorbtn,ca){//得到当前秒数以及判断是否发送验证码
		
			var isSendSMS=false;
			var id = that.attr("id");
			$.otherClick.setColor(that, colorbtn, false);
			if (ca == 0) {
				//发送短信
				isSendSMS=true;

				$.otherClick.dtime = $.otherClick.time;
				
				
			} else {
				var oldDate = $.otherClick.getDateTime(id);
				if (oldDate.status == 0) {
					$.otherClick.dtime = $.otherClick.time;
					//发送短信
					isSendSMS=true;
				} else {
					var restTime = $.otherClick.checkTime(oldDate, id);
					if (restTime > $.otherClick.time || restTime == $.otherClick.time) {
						//发送短信
						isSendSMS=true;

						$.otherClick.dtime = $.otherClick.time;
					} else {
						if(!isUndefinde(colorbtn.sendId)){$(colorbtn.sendId).show();}
						$.otherClick.dtime = $.otherClick.time - restTime;
					}

				}
			}
			
			return isSendSMS;
			},
		getminleftText:function(colorbtn, dtime){
			var str=colorbtn.minleftText;
			if(colorbtn.minleftText.indexOf("(")>0){
				str=$.trim(str.replace(")",""));
				str=str+" "+dtime + " s )"
			}else if(colorbtn.minleftText!=""){
				str=str+" "+dtime+"s";
				}else{
				str=dtime+" s";
				}
			return str;
		},
		setColor: function(that, colorbtn, status) {
			var otherobj;
			if (!status) {
				$.otherClick.retuStatus=false;
				that.removeClass(colorbtn.fcolor + " " + colorbtn.bcolor).addClass(colorbtn.fcolordis + " " + colorbtn.bcolordis);
				if(that.attr("vertype")!="getsound"){
					otherobj=$('[vertype="getsound"]');
					}else{
					otherobj=$('[vertype="getcaptcha"]');
					}
				otherobj.removeClass(colorbtn.fcolor + " " + colorbtn.bcolor).addClass(colorbtn.fcolordis + " " + colorbtn.bcolordis);
				
			} else {
				$.otherClick.retuStatus=true;
				that.addClass(colorbtn.fcolor + " " + colorbtn.bcolor).removeClass(colorbtn.fcolordis + " " + colorbtn.bcolordis);
				
				if(that.attr("vertype")!="getsound"){
					if(colorbtn.isSameBtn){
						that.val(colorbtn.sValue);
						}else{that.val(colorbtn.value);}
					
					otherobj=$('[vertype="getsound"]');
					}else{
					that.val(colorbtn.sValue);
					otherobj=$('[vertype="getcaptcha"]')
					
					}
					otherobj.addClass(colorbtn.fcolor + " " + colorbtn.bcolor).removeClass(colorbtn.fcolordis + " " + colorbtn.bcolordis);	
			}
		},
		setCookie: function(name, objValue) { //设置cookie
			var str = name + "=" + escape(objValue) + ";";
			document.cookie = str;
			
		},
		getCookie: function(name) { //取cookies函数       
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg)) return unescape(arr[2]);
			else return null;
		},
		delCookie: function(name) { //删除cookie
			var date = new Date();
			date.setTime(date.getTime() - 10000);
			document.cookie = name + "=a; expires=" + date.toGMTString();
		}
	}
	/*
	 *其余失去焦点blur
	 */
	$.blurVer = {
		init: function(my, that) {
			$.blurVer.textarea(my, that);
		},
		textarea: function(my, that) {
			//textarea 失去焦点
			that.find("textarea").blur(function() {
				if ($(this).val() == "" || $(this).val() == $(this).attr("placeholder")) {
					$(this).removeClass("fgray").addClass("fgrayll").val($(this).attr("placeholder"));;
				}
			});
		}
	}
	/*
	 *其余获取焦点focus
	 */
	$.focusVer = {
		init: function(my, that) {
			$.focusVer.textarea(my, that);
		},
		textarea: function(my, that) {
			//textarea 焦点字体颜色
			that.find("textarea").focus(function() {
				$(this).addClass("fgray").removeClass("fgrayll");
				var value = $(this).val();
				var len=$.trim(value.replace(/[\n]/ig,'')).length;
				var wmax = parseInt($(this).attr("max"));
				var objchild = $(this).parent().find("p>span");
				if ($(this).val() == $(this).attr("placeholder")) {
					$(this).val("");
					len=0;
				}
				objchild.last().html(len + "/" + wmax);
			});
		}
	}
	/*
	 *键盘按下去的时候的验证
	 */
	$.keypressVer = {
		
		init: function(my, that, myDateTem) {
			
			 $.keypressVer.keyFun=$.extend($.keypressVer.keyFun,my.keyFun);
			//input限制字符数目
			that.find("input").each(function(){ //bz01
				var $this=$(this);
				if(!isUndefinde($this.attr("maxnum"))){
					 if(isUndefinde($this.attr("point")) || parseInt($this.attr("point")) == 0){
						 
						if($this.attr("vertype")=="sms_captcha"){
							$.keypressVer.numZero($this,parseInt($this.attr("maxnum")));
							}else{ 

							$.keypressVer.noPoint($this,parseInt($this.attr("maxnum")),my, that, myDateTem);
							}
						 
						 
						 }else if(!isUndefinde($this.attr("point")) && parseInt($this.attr("point")) > 0){
							
						  $.keypressVer.hasPoint($this,parseInt($this.attr("maxnum")),parseInt($this.attr("point")),my, that, myDateTem);
						  
						 }
					 return;
					 
					 }
				if(!isUndefinde($this.attr("max"))){
					$.keypressVer.wordnum($this,parseInt($this.attr("max")));
					 return;
					 
					 }
				});
			//textarea限制字符数目
			$.keypressVer.qusdetail(that.find("textarea"));

		},
		checkSpecialKey: function(keyStr) {
			var keys = new Array(8, 9, 35, 36, 37, 38, 39, 40, 46, 27);
			//if(navigator.appName == "Microsoft Internet Explorer"){
			//  keys=new Array(8, 9, 35, 36, 37, 38, 39, 40,27);
			//  }
			for (var key in keys) {
				if (keyStr == keys[key]) {
					return true;
				}
			}
			return false;
		},
		wordnum: function(obj, maxnum) {//控制输入位数（不限字符）
			obj.keydown(function(e) {
				var key = e.which || e.keyCode;
				var s = $.method.getValue($(this));
				if (s.length > (maxnum - 1) && !$.keypressVer.checkSpecialKey(key) && $.keypressVer.sel().length == 0) {
					return false;
				}
			});
		},
		numZero:function(obj, maxnum){
			obj.bind({
				keydown:function(e){
					var key = e.which || e.keyCode;
					var s = $.method.getValue($(this));
					if(s.length > (maxnum-1)&&!$.keypressVer.PasteCopy(e)&&!$.keypressVer.checkSpecialKey(key)){
						return false;
						}
					},
				keyup:function(e){
					var key = e.which || e.keyCode;
					var s = $.method.getValue($(this));
					$(this).val(isNaN(parseInt(s))? "":parseInt(s).toString().substr(0,maxnum));
					}
				
				});

			},
		hasPoint: function(obj,maxnum,point,my, that, myDateTem) {
			obj.bind({
				keydown: function(e) {
					var key = e.which || e.keyCode;
					if (!$.keypressVer.checkedDecimal(key, $(this),maxnum,point)) {
						return false;
					}
				},
				paste: function(e) {
					e.preventDefault();
				},
				keyup: function(e) {
					var key = e.which || e.keyCode;
					var s = $.method.getValue($(this));
					s = s.replace(/[^\d.]/g, "");
					//必须保证第一个为数字而不是.
					s = s.replace(/^\./g, "");
					//保证只有出现一个.而没有多个.
					s = s.replace(/\.{2,}/g, ".");
					//保证.只出现一次，而不能出现两次以上
					s = s.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
					if (key == 229) {
						$(this).val(s);
					}
					if(!isUndefinde($.keypressVer.keyFun[$.trim($(this).attr("vertype"))+"Fun"])){
						 
					$.keypressVer.keyFun[$.trim($(this).attr("vertype"))+"Fun"]($(this),my, that, myDateTem,s);
						
						}
					}
			});
		},
		noPoint: function(obj,maxnum,my, that, myDateTem) {
			obj.bind({
				keydown: function(e) {
					e = window.event || e;
					var key = e.which || e.keyCode;
					var s = $.method.getValue($(this));
					
					if (s.length == 0 && (key == 48 || key == 96)) {
						return false;
					}
					if ((key == 48 || key == 96) && $.keypressVer.getCursorPosition($(this)) == 0) {
						return false;
					}
					if ((s.length > (maxnum-1) && !$.keypressVer.checkSpecialKey(key)) && $.keypressVer.sel().length == 0) {
						return false;
					}
					if ((key < 48 || key > 105 || (key > 57 && key < 96)) && !$.keypressVer.checkSpecialKey(key)) {
						return false;
					}
				},
				paste: function(e) {
					e.preventDefault();
				},
				keyup: function(e) {
					if(!isUndefinde($.keypressVer.keyFun[$.trim($(this).attr("vertype")+"Fun")])){
						 	
							$.keypressVer.keyFun[$.trim($(this).attr("vertype"))+"Fun"]($(this),my, that, myDateTem,$.method.getValue($(this)),e);
						
						}
				}
			});
		},
		PasteCopy:function(oEvent){
			if((oEvent.keyCode == 67||oEvent.keyCode == 86)&& oEvent.ctrlKey){ 
				return true;
				}
			return false;
			},
		sel: function() {
			var selText = "";
			if (window.getSelection) { // all browsers, except IE before version 9
				if (document.activeElement && (document.activeElement.tagName.toLowerCase() == "textarea" || document.activeElement.tagName.toLowerCase() == "input")) {
					var text = document.activeElement.value;
					selText = text.substring(document.activeElement.selectionStart, document.activeElement.selectionEnd);
				} else {
					var selRange = window.getSelection();
					selText = selRange.toString();
				}
			} else {
				if (document.selection.createRange) { // Internet Explorer
					var range = document.selection.createRange();
					selText = range.text;
				}
			}
			return selText;
		},
		
		getCursorPosition: function(that) {
			var el = that.get(0);
			var pos = 0;
			if ('selectionStart' in el) {
				pos = el.selectionStart;
			} else if ('selection' in document) {
				el.focus();
				var Sel = document.selection.createRange();
				var SelLength = document.selection.createRange().text.length;
				Sel.moveStart('character', -el.value.length);
				pos = Sel.text.length - SelLength;
			}
			return pos;
		},
		checkedDecimal: function(key, that,maxnum,point) {
			var s = $.method.getValue(that);
			
			if ((key < 48 || key > 105 || (key > 57 && key < 96)) && !$.keypressVer.checkSpecialKey(key) && key != 110 && key != 190) {
				return false;
			}
			
			if (key == 110 || key == 190) {
				if (s.split('.').length > 1) {
					return false;
				}

				if ($.keypressVer.getCursorPosition(that) == 0) {
					return false;
				}
				if ($.keypressVer.getCursorPosition(that) != s.length && $.keypressVer.getCursorPosition(that) != (s.length - point) && $.keypressVer.sel().length == 0) {
					return false;
				}
				if ($.keypressVer.sel().length != 0) {
					if ((s.length - $.keypressVer.sel().length - $.keypressVer.getCursorPosition(that)) > point) {
						return false;
					}
				}
			}
			
			if (key != 110 && key != 190) {
				if ((key == 48 || key == 96) && $.keypressVer.getCursorPosition(that) == 0) {
					if(s.length>0){ return false;}
				}
				if(s.length>0&&s[0]=="0"&&$.keypressVer.getCursorPosition(that) == 1&&key != 110 && key != 190 && !$.keypressVer.checkSpecialKey(key)){ return false;}
				if (s.split('.').length > 1) {
					if (s.split('.')[0].length == maxnum && s.split('.')[1].length == point && !$.keypressVer.checkSpecialKey(key) && $.keypressVer.sel().length == 0) {
						return false;
					}
					if ($.keypressVer.getCursorPosition(that) > s.split('.')[0].length && s.split('.')[1].length == point && $.keypressVer.sel().length == 0 && !$.keypressVer.checkSpecialKey(key)) {
						return false;
					}
					if ($.keypressVer.getCursorPosition(that) <= s.split('.')[0].length && s.split('.')[0].length == maxnum && $.keypressVer.sel().length == 0 && !$.keypressVer.checkSpecialKey(key)) {
						return false;
					}
				} else {
					if (s.length == maxnum && !$.keypressVer.checkSpecialKey(key) && $.keypressVer.sel().length == 0) {
						return false;
					}

				}


			}

			return true;
		},
		qusdetail:function(obj){
			obj.bind({
				"keydown":function(e){
					e = window.event || e;
					var key = e.which || e.keyCode;
					var wmax = parseInt($(this).attr("max"));
					var wmin = parseInt($(this).attr("min"));
					var value = $(this).val();
					var objchild = $(this).parent().find("p>span");
					var len=$.trim(value.replace(/[\n]/ig,'')).length;
					if (len >(wmax-1)&&!$.keypressVer.checkSpecialKey(key)&&$.keypressVer.sel().length==0) {
						objchild.first().html("输入字数不能大于" + wmax);
						return false;
					}
					if (len < wmin) {
						objchild.first().html("字数不能小于" + wmin);
						}
					objchild.first().html("");
					return true;
					},
				
				"keyup":function(e){
					e = window.event || e;
					var key = e.which || e.keyCode;
					var wmax = parseInt($(this).attr("max"));
					var value = $(this).val();
					var objchild = $(this).parent().find("p>span");
					var len=$.trim(value.replace(/[\n]/ig,'')).length;
					if (len >wmax&&!$.keypressVer.checkSpecialKey(key)) {
						$(this).val($.keypressVer.getStrTemp(value,wmax));
						objchild.first().html("输入字数不能大于" + wmax);
						return false;
					}
					if (len == 0) {
						objchild.first().html("字数不能为0");
						return;
					}
					objchild.last().html(len + "/" + wmax);
					}
				});
				
				},
		getStrTemp:function(str,num){
			var strTemp=str.substr(0,num);
			var enlen=strTemp.split("\n").length;
			var len=num;
			var wn=0;
			for(var i=0;i<str.length;i++){
				strTemp=str.substr(0,num+i);
				if(str[len+i]!="\n"){
					wn++;
					}
				if(wn >= enlen){ break;}
				}
			
			return strTemp;
			},
		keyFun:{
			
				
			transfer_numFun:function(obj,my,that, myDateTem,value){
					value = value.replace(/[^\d]/g, "");
					//必须保证为数字
					var ms = {
						message: "",
						type: 1
					};
					if (key == 229) {
						$(this).val(s);
					}
					var price = parseFloat(obj.attr("price")); //单价

					if (ms.type == 1 && value != "") {
						obj.parent().find("span").html('<b class="f16 fn">份</b>&nbsp;' + Round2(parseInt(value) * price) + '元');

						if (!isUndefinde(my.redEnFun)) {
							my.redEnFun(value, parseInt(value) * price);
						}
					} else {
						if (value == "") {
							obj.parent().find("span").html('<b class="f16 fn">份</b>&nbsp;' + '0.00元');

							if (!isUndefinde(my.redEnFun)) {
								my.redEnFun(value, 0);
							}
						} else {
							obj.parent().find("span").html('<b class="f16 fn">份</b>&nbsp;' + Round2(parseInt(value) * price) + '元');
							
							if (!isUndefinde(my.redEnFun)) {
								my.redEnFun(value, parseInt(value) * price);
							}
						}
					}
				
				},
			throw_numFun:function(obj,my,that, myDateTem,value){
				var ms = {
						message: "",
						type: 1
					};
				
					var price = parseFloat(obj.attr("price")); //单价
					if (parseFloat(value) % price != 0 || parseFloat(value) / price < 1) {
						ms = {
							message: "输入金额需为" + price + "元的整数倍",
							type: 0
						};
					}
					
					$.method.noticeWord(my, obj, ms, that, myDateTem);
					if (ms.type == 1 && value != "") {
						obj.parent().find("span").html("元&nbsp;" + parseFloat(value) / price + "&nbsp;份");

						if (!isUndefinde(my.invThrowNum)) {
							my.invThrowNum(value);
						}
					} else {
						if (value == "") {
							var numnull = parseFloat(!isUndefinde($(this).attr("placeholder")) ? 0 : obj.attr("placeholder"));
							obj.parent().find("span").html('元&nbsp;' + numnull / price + '&nbsp;份');
							
							if (!isUndefinde(my.invThrowNum)) {
								my.invThrowNum(numnull / price);
							}
						} else {
							obj.parent().find("span").html("元&nbsp;" + parseFloat(value) / price + "&nbsp;份");
							if (!isUndefinde(my.invThrowNum)) {
								my.invThrowNum(value);
							}
						}
					}

				
				}
			}

		
	}
	/*
	 *其余提交的时候所做的操作单
	 */
	$.otherVer = { //
		checkboxSelect: function(obj) { //checkbox点击确认时返回数据
			var str = {
				data: {},
				status: 1
			};
			obj.each(function(index, element) {
				if ($(this).attr("checked") != "checked") {
					str.data[$(this).attr("vertype")] = "0";
					if ($(this).attr("fill") == "1") {
						$(this).parent().parent().find(".notice_input").css("display", "block").addClass("error_n").removeClass("warn_n sus_n").find("span").html("必选项");
						str.status = 0;
						return;
					} else {
						$(this).parent().parent().find(".notice_input").css("display", "none")
					}
				} else {
					str.data[$(this).attr("vertype")] = "1";
				}
			});
			return str;
		},
		radioEelect: function(obj) { //radio点击确认时返回数据
			var str = {
				data: {},
				status: 1
			};
			obj.each(function() {
				if ($(this).attr("checked") == "checked") {
					str.data[$(this).attr("vertype")] = $(this).val();

				} else if (isUndefinde(str.data[$(this).attr("vertype")])) {
					str.data[$(this).attr("vertype")] = "";
				}
				if ($(this).attr("fill") == "1") {
					if ($(this).parent().find("input:checked").size() <= 0) {
						str.status = 0;
						$(this).parent().parent().find(".notice_input").css("display", "block").addClass("error_n").removeClass("warn_n sus_n").find("span").html("必选项");
						return;
					} else {
						$(this).parent().parent().find(".notice_input").css("display", "none");
					}
				}
			});
			return str;
		},
		textareaClick: function(obj) { //texterea点击确认时返回数据
			var str = {
				data: {},
				status: 1
			};
			obj.each(function(index, element) {
				var wmax = parseInt($(this).attr("max"));
				var wmin = parseInt($(this).attr("min"));
				var value = $.trim($(this).val());

				if (value == "" || value == $(this).attr("placeholder")) {
					$(this).removeClass("fgray").addClass("fgrayll").val($(this).attr("placeholder"));
					value = "";
				}
				str.data[$(this).attr("vertype")] == value;
				var obj = $(this).parent().find("p>span");
				if (value.length == 0) {
					obj.first().html("字数不能为0");
					obj.last().html(value.length + "/" + wmax);
					str.status = 0;
				}
				if (value.length < wmin) {
					obj.first().html("字数不能小于" + wmin);
					obj.last().html(value.length + "/" + wmax);
					str.status = 0;
				}

			});
			return str;
		}
	}
	/*
	 *$.metho所有验证的集合
	 */
	$.method = {
		/*
		 *验证表单中的input输入值
		 *参数：
		 *my：传入所需的变量，参照最上面
		 *thz：当前被验证的表单
		 */
		verInputAll: function(my, thz,verInputAll) {
			var myDate = {},
				myDateTem = {};
			var sus = 1;
			if(my.mes!="top"){
				 sus=$.method.checkSus(verInputAll, thz);
			}else{
			thz.find("input").each(function() {
				if ($(this).attr("readonly") == "readonly" || $(this).attr("readonly") == true || $(this).attr("disabled") == "disabled" || $(this).attr("readonly") == true) {
					return true;
				} else {
					var myDateStatus = $.method.verInput(my, myDate, myDateTem, thz, $(this));
					myDate = $.extend(myDate, myDateStatus.myDate);
					myDateTem = $.extend(myDateTem, myDateStatus.myDateTem);
					
					if (myDateStatus.status.type == 0 && $.method.getNone($(this))) {
						sus = 0;
						$.method.noticeWordDisplay(thz.find(".notice_input"), "v", myDateStatus.status, $(this), myDateTem);
						return false;
					}
				}
			});
			}
			if(sus==0){return sus;}
			sus = $.method.verNotInput(my, thz, myDate, myDateTem);

			return sus;
		},
/*
*验证表单中的非select输入值
*参数：
my：传入所需的变量，参照最上面
thz：当前被验证的表单
that：被验证的select
vertype：被验证的类型
*/
		selectVerify: function(my, thz, that, vertype) {
			var sus = 1;
			if (($.trim($(that).val()) == "" || $(that).val() == $(that).find("option").first().val()) && $(that).attr("fill") == 1) {
				sus = 0;
				switch (vertype) {
				case "borrowTypeCode":
					{
						$.method.noticeWordDisplay($(that).parent().parent().parent().find(".notice_input"), "d", {
							message: "请选择产品类型",
							type: 0
						}, that)
					}
					break;
				case "banks":
					{
						$.method.noticeWordDisplay($(that).parent().parent().parent().find(".notice_input"), "d", {
							message: "请选择银行",
							type: 0
						}, that)
					}
					break;
				default:
					{
						$.method.noticeWordDisplay($(that).parent().parent().parent().find(".notice_input"), "d", {
							message: "不能为空",
							type: 0
						}, that);
					}
					break;
				}
			}
			return sus;
		},

		/*
		 *验证表单中的城市
		 */
		cityCheck: function(my, thz, that, vertype) {
			var sus = 1;
			if (($.trim($(that).val()) == "" || $.trim($(that).val()) == $.trim($(that).attr("placeholder"))) && $(that).attr("fill") == 1) {
				sus = 0;
				$.method.noticeWordDisplay($(that).parent().parent().parent().parent().find(".notice_input"), "d", {
					message: "城市不能为空",
					type: 0
				}, that);
			} else {
				$.method.noticeWordDisplay($(that).parent().parent().parent().parent().find(".notice_input"), "d", {
					message: "",
					type: 1
				}, that);
			}
			return sus;
		},
/*
*验证表单中的非input输入值
*参数：
my：传入所需的变量，参照最上面
thz：当前被验证的表单
myDate：已经被验证的数据
myDateTem：已经被验证数据的状态
*/
		verNotInput: function(my, thz, myDate, myDateTem) {
			var sus = 1;
			thz.find("select").each(function(index, element) {
				var selecttype = $.trim($(this).attr("vertype"));
				myDate[selecttype] = $(this).val();
				myDateTem[selecttype] = $.method.selectVerify(my, thz, this, selecttype);
				if (!myDateTem[selecttype]) {
					sus = 0;
				}
			});


			//城市的检查

			sus = myDateTem["city"] = $.method.cityCheck(my, thz, thz.find('[vertype="city"]'), "city");


			
			sus = $.method.checkSus(myDateTem, thz);

			//textarea数据
			var text = $.otherVer.textareaClick(thz.find("textarea"));
			myDate = $.extend(myDate, text.data);
			if (text.status == 0) {
				sus = 0;
			}

			//判断多选
			text = $.otherVer.checkboxSelect(thz.find('input[type="checkbox"]'));
			myDate = $.extend(myDate, text.data);
			if (text.status == 0) {
				sus = 0;
			}
			//判断单选
			text = $.otherVer.radioEelect(thz.find('input[type="radio"]'));
			myDate = $.extend(myDate, text.data);
			if (text.status == 0) {
				sus = 0;
			}

			return sus;
		},
		/*
		 *验证表单中的单个input输入值
		 *参数：
		 *my：传入所需的变量，参照最上面
		 *thz：当前被验证的表单
		 *myDate：已经被验证的数据
		 *myDateTem：已经被验证数据的状态
		 *that：当前被的input的对象
		 */
		verInput: function(my, myDate, myDateTem, thz, that) {

			var myDate = myDate;
			var myDateTem = myDateTem;

			var name = that.attr("vertype");
			var status = {
				message: "",
				type: 1
			};

			var str = $.method.getValue(that); //得到当前输入的内容
			//var lb_ogj = that.parent().parent().parent().find(".notice_input");
			switch (name) {
			case "userName":
				{
					status = $.extend(status, $.method.userName(my, str, that));
				}
				break;
			case "password":
				{
					status = $.extend(status, $.method.passWord(my, str, that));
					if (status.type != 0) {
						//判断密码强度
						$.method.strength(str, that);
					}
				}
				break;
				//交易密码
			case "deal_password":
				{
					status = $.extend(status, $.method.deal_password(my, str, that, myDate));
					if (status.type != 0) {
						//判断密码强度
						$.method.strength(str, that);
					}
				}
				break;
			case "new_password":
				{
					status = $.extend(status, $.method.new_password(my, str, that, myDate, "新密码不能为空"));
					if (status.type != 0) {
						//判断密码强度
						$.method.strength(str, that);
					}
				}
				break;
				//注册登录密码
			case "login_password":
				{
					status = $.extend(status, $.method.new_password(my, str, that, myDate, "密码不能为空"));
					if (status.type != 0) {
						//判断密码强度
						$.method.strength(str, that);
					}
				}
				break;
			case "okpassword":
				{
					status = $.extend(status, $.method.okpassword(my, str, that, myDate));
				}
				break;
			case "oldpassword":
				{
					status = $.extend(status, $.method.oldpassword(my, str, that, myDate));
				}
				break;
			case "mobilePhone":
				{
					status = $.extend(status, $.method.mobilePhone(my, str, that));
				}
				break;
			case "captcha":
				{
					//status = $.extend(status, $.method.emptyStr(my, str, that, "请输入验证码", 1));
				}
				break;
			case "sms_captcha":
				{
					//status = $.extend(status, $.method.smsCaptcha(my, str, that));
				}
				break;
			case "preName":
				{
					status = $.extend(status, $.method.preName(my, str, that));
				}
				break;
			case "id_num":
				{
					status = $.extend(status, $.method.idNum(my, str, myDate, that, thz));
				}
				break;
			case "email":
				{
					status = $.extend(status, $.method.email(my, str, that));
				}
				break;
			case "money_num":
				//充值金额
				{
					status = $.extend(status, $.method.money_num(my, str, that));
				}
				break;
			case "cash_num":
				//提现金额
				{
					status = $.extend(status, $.method.cash_num(my, str, that));
				}
				break;
			case "card_num":
				//银行卡号
				{
					status = $.extend(status, $.method.card_num(my, str, that));
				}
				break;
			case "branch":
				//支行
				{
					status = $.extend(status, $.method.branch(my, str, that));
				}
				break;
			case "loanAmount":
				//借款金额
				{
					status = $.extend(status, $.method.loanAmount(my, str, that));
				}
				break;
			case "loanPeriod":
				//借款时间
				{
					status = $.extend(status, $.method.loanPeriod(my, str, that));
				}
				break;
			case "throw_num":
				{
					status = $.extend(status, $.method.throw_num(my, str, that));
				}
				break;
			case "transfer_num":
				{
					status = $.extend(status, $.method.transfer_num(my, str, that));
				}
				break;
			case "deal_pw":
				{
					status = $.extend(status, $.method.deal_pw(my, str, that));
				}
				break;
			case "cur_wealth":
				//当前财富
				{
					status = $.extend(status, $.method.curWealth(my, str, that));
				}
				break;
			case "investment":
				//投资金额
				{
					status = $.extend(status, $.method.investment(my, str, that));
				}
				break;
			case "year_rate":
				//预期年化利率
				{
					status = $.extend(status, $.method.year_rate(my, str, that));
				}
				break;
			case "inve_time":
				//投资期限
				{
					status = $.extend(status, $.method.inve_time(my, str, that));
				}
				break;
			case "auto_mdown":
				//投标金额下限值
				{
					status = $.extend(status, $.method.auto_money(my, str, that, thz, "auto_mdown"));
				}
				break;
			case "auto_mtop":
				//投标金额上限值
				{
					status = $.extend(status, $.method.auto_money(my, str, that, thz, "auto_mtop"));
				}
				break;
			case "auto_yrate":
				//年化利率下限
				{
					status = $.extend(status, $.method.auto_yrate(my, str, that));
				}
				break;
			case "auto_datetop":
				//标的期限上限
				{
					status = $.extend(status, $.method.auto_datetop(my, str, that));
				}
				break;
			case "keep_balance":
				//账户保留余额
				{
					status = $.extend(status, $.method.emptyStr(my, str, that, "请填写账户保留余额"));
				}
				break;
			case "loginUser":
				//登录用户名
				{
					status = $.extend(status, $.method.emptyStr(my, str, that, "用户名不能为空", 1));
				}
				break;
			default:
				{
					if (that.attr("fill") == 1 && (that.val() == "" || that.val() == that.attr("placeholder"))) {
						status.type = 0;
						status.message = "必填项";
					}
				}
				break;
			}
			if (status.type == 0 && $.method.getNone(that)) {
				myDate[name] = "";
				myDateTem[name] = 0;

			} else if (($.method.pass($.trim(that.attr("vertype"))) && $.trim(that.attr("type")) == "password") || !$.method.pass($.trim(that.attr("vertype")))) {
				if (status.type == 1 && $.method.getNone(that)) {
					myDateTem[name] = 1;
					myDate[name] = str;
				}
			}
			return {
				"myDate": myDate,
				"myDateTem": myDateTem,
				"status": status
			};
		},
		getNone: function(that) {
			if ((that.css("display") != "none"||($.method.pass($.trim(that.attr("vertype"))) && $.trim(that.attr("type")) == "password"))&& that.parent().css("display") != "none" && that.parent().parent().css("display") != "none" && that.parent().parent().parent().css("display") != "none") {
				return true;
			} else {
				return false;
			}
		},

		pass: function(strPass) {
			var pass = ["password", "deal_password", "okpassword", "new_password", "oldpassword", "login_password", "deal_pw"];
			for (var key in pass) {
				if (strPass == pass[key]) {
					n = 1;
					return true;
				}
			}
			return false;
		},
		
		/*
		 *处理表单中验证提示信息显示
		 *参数：
		 *my：传入所需的变量，参照最上面
		 *thz：当前被验证的表单
		 *status：传过来的状态与需要显示的提示语句
		 *that：当前被的input的对象
		 */
		noticeWord: function(my, that, status, thz, myStatusTop) {
			var obj = that.parent().parent().parent();
			if (obj.css("display") != "none") {
				if (my.mes == "left" || my.mes == "bottom") {
					var lb_ogj = obj.find(".notice_input");
					
					$.method.noticeWordDisplay(lb_ogj, "d", status, that);
					return;
				}
				if (my.mes == "top") {
					if ($.method.getNone(that)) {
						$.method.noticeWordDisplay(thz.find(".notice_input"), "v", status, that, myStatusTop);
					}
					return;
				}
			}
		},
		/*
		 *处理表单中验证提示信息显示
		 *参数：
		 *noticeObj:当前noticeinput元素;
		 * type： d:display
		 *v:visibility;
		 *status:1 状态
		 */

		noticeWordDisplay: function(noticeObj, type, status, that, myDateTem) {
			var dStatus = {};
			dStatus = $.extend(dStatus, myDateTem);
			if (type == "d") {
				if (status.type == 0) {
					
					noticeObj.css("display", "block").addClass("error_n").removeClass("warn_n sus_n").find("span").html(status.message);
					
		
				} else if(!noticeObj.hasClass("sus_n")){
					if (that.attr("sus") == "1") {
						noticeObj.css("display", "block").removeClass("error_n warn_n").addClass("sus_n").find("span").html("");
					} else {
						noticeObj.css("display", "none");
					}

				}
			} else if (type = "v") {
				if (status.type == 0) {
					noticeObj.css("visibility", "visible").addClass("error_n").removeClass("warn_n sus_n").find("span").html(status.message);
				} else if(!noticeObj.hasClass("sus_n")){
					if (that.attr("sus") == "1") {
						noticeObj.css("visibility", "visible").removeClass("error_n").addClass("sus_n").find("span").html("");
					} else if ($.method.checkSus(dStatus)) {
						noticeObj.css("visibility", "hidden");
					}
				}

			}

		},
		/*
		 *以下都是对各种input等的验证
		 *参数：
		 *myStr：传入所需的变量，参照最上面
		 *str：当前被验证的的值
		 *that：当前被的input的对象
		 */
		strength: function(str, that) {
			var obj_s = that.parent().parent().parent().find(".strength");
			obj_s.show();
			//总字符串长度
			var allNum = str.length;
			// 数字个数
			var numCnt = str.replace(/\D/g, '').length;
			// 大小写字母个数
			var alphaNum = str.replace(/[^a-zA-Z]/g, '').length;
			//其余符号个数
			var otherNum = allNum - alphaNum - numCnt;
			//强中弱
			if (numCnt == allNum || alphaNum == allNum || otherNum == allNum) {
				obj_s.find("li").first().addClass("on").siblings("li").removeClass("on");
				return;
			} //弱
			if (numCnt == 0 || alphaNum == 0 || otherNum == 0) {
				obj_s.find("li").eq(1).addClass("on").siblings("li").removeClass("on");
				return;
			} //中
			obj_s.find("li").last().addClass("on").siblings("li").removeClass("on"); //强
			return;
		},
		checkSus: function(arry, thz) {
			var s = 1;
			for (var key in arry) {
				if (arry[key] == 0) {
					s = 0;
					break;
				}
			}
			return s;
		},
		getValue: function(that) {
			return that.val();
		},
		emptyStr: function(myStr, str, that, emstr, pl) {
			if (pl == 1 && (str == "" || that.attr("placeholder") == str)) {
				return {
					message: emstr,
					type: 0
				};
			}
			
			if (str == "" && (isUndefinde(pl) || pl == 0)) {
				return {
					message: emstr,
					type: 0
				};
			}
		},
		auto_yrate: function(myStr, str, that) {
			if (str == "") {
				return {
					message: "请填写年利率下限",
					type: 0
				};
			}
			var reg = /^\d+(\.\d+)?$/;
			var reg2 = /^-?\d+$/;
			if (parseFloat(str) < 7 || parseFloat(str) > 14 || (!reg.test(str) && !reg2.test(str))) {
				return {
					message: "年利率范围为7%-14%",
					type: 0
				};
			}
		},
		auto_datetop: function(myStr, str, that) {
			if (str == "") {
				return {
					message: "请填写标的期限上限",
					type: 0
				};
			}
			if (parseInt(str) > 36) {
				return {
					message: "标的期限不得高于36",
					type: 0
				};
			}
		},
		auto_money: function(myStr, str, that, thz, type) {
			var dstr = $.trim(thz.find("[vertype='auto_mdown']").val());
			var tstr = $.trim(thz.find("[vertype='auto_mtop']").val());
			var d = 1,
				t = 1;
			var reg = /^\d+(\.\d+)?$/;
			var reg2 = /^-?\d+$/;
			if (!reg.test(dstr) && !reg2.test(dstr)) {
				d = 0;
			}
			if (!reg.test(tstr) && !reg2.test(tstr)) {
				t = 0;
			}
			if (type == "auto_mdown") {
				if (dstr == "") {
					return {
						message: "请填写投标金额",
						type: 0
					};
				}
				if (d != 1) {
					return {
						message: "投资金额不符合规则",
						type: 0
					};
				}
				if (tstr != "" && t == 0) {
					return {
						message: "投资金额不符合规则",
						type: 0
					};
				}
				if (tstr != "" && parseFloat(dstr) > parseFloat(tstr)) {
					return {
						message: "投标金额下限值不允许高于上限值",
						type: 0
					};
				}
			}
			if (type == "auto_mtop") {
				if (dstr == "") {
					return {
						message: "请填写投标金额",
						type: 0
					};
				}
				if (d == 0) {
					return {
						message: "投资金额不符合规则",
						type: 0
					};
				}
				if (tstr == "") {
					return {
						message: "请填写投标金额",
						type: 0
					};
				}
				if (t == 0) {
					return {
						message: "投资金额不符合规则",
						type: 0
					};
				}
				if (parseFloat(dstr) > parseFloat(tstr)) {
					return {
						message: "投标金额下限值不允许高于上限值",
						type: 0
					};
				}
			}
		},
		inve_time: function(myStr, str, that) {
			if (str == "") {
				return {
					message: "请输入投资期限",
					type: 0
				};
			}
			var reg = /^-?\d+$/;
			if (!reg.test(str)) {
				return {
					message: "请输入正确的投资期限",
					type: 0
				};
			}
			if (parseInt(str) > 99) {
				return {
					message: "投资期限范围为1~99个月",
					type: 0
				};
			}
			if ($.trim(that.attr("nolimit")) != "1") {
				if (parseInt(str) < 1 || parseInt(str) > 36) {
					return {
						message: "投资期限范围为1~36个月",
						type: 0
					};
				}
			} else {
				if (parseInt(str) < 0) {
					return {
						message: "请输入正确的投资期限",
						type: 0
					};
				}
			}

		},
		year_rate: function(myStr, str, that) {
			if (str == "") {
				return {
					message: "请输入预期年化利率",
					type: 0
				};
			}
			var reg = /^\d+(\.\d+)?$/;
			var reg2 = /^-?\d+$/;
			if ((!reg.test(str) && !reg2.test(str))) {
				return {
					message: "请输入正确的利率值",
					type: 0
				};
			}
			if (parseFloat(str) <= 0) {
				return {
					message: "投资金额必须为大于0的正数",
					type: 0
				};
			}
			if (parseFloat(str) > 24 || parseFloat(str) < 0) {
				return {
					message: "借款利率范围为0%~24%",
					type: 0
				};
			}

		},
		investment: function(myStr, str, that) {
			if (str == "") {
				return {
					message: "请输入投资金额",
					type: 0
				};
			}
			var reg = /^\d+(\.\d+)?$/;
			var reg2 = /^-?\d+$/;
			if (!reg.test(str) && !reg2.test(str)) {
				return {
					message: "请输入正确的投资金额",
					type: 0
				};
			}
			if (parseFloat(str) <= 0) {
				return {
					message: "投资金额必须为正数",
					type: 0
				};
			}
		},
		curWealth: function(myStr, str, that) {
			if (str == "") {
				return {
					message: "请输入当前财富值",
					type: 0
				};
			}
			var reg = /^\+?[1-9][0-9]*$/;
			if (!reg.test(str)) {
				return {
					message: "请输入正确的数值",
					type: 0
				};
			}
			if ($.trim(that.attr("nolimit")) != "1") {
				if (!reg.test(str) || parseInt(str) < 200) {
					return {
						message: "请输入正确的数值",
						type: 0
					};
				}
			}

		},
		branch: function(myStr, str, that) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: "开户支行不能为空",
					type: 0
				};
			}
			var reg = /[\u4E00-\u9FA5]$/;
			if (!reg.test(str) || $.method.checkChinese(str) == 0) {
				return {
					message: "开户支行必须为汉字",
					type: 0
				};
			}
			if (str.length > 16) {
				return {
					message: "开户支行必须小于16个字",
					type: 0
				};
			}
		},
		card_num: function(myStr, str, that) {
			if (str == "") {
				return {
					message: "银行卡号不能为空",
					type: 0
				};
			}
			if (!$.method.luhmCheck(str)) {
				return {
					message: "卡号输入不正确，请检查",
					type: 0
				};
			}
		},
		luhmCheck: function(bankno) {
			var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）

			var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
			var newArr = new Array();
			for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
				newArr.push(first15Num.substr(i, 1));
			}
			var arrJiShu = new Array(); //奇数位*2的积 <9
			var arrJiShu2 = new Array(); //奇数位*2的积 >9

			var arrOuShu = new Array(); //偶数位数组
			for (var j = 0; j < newArr.length; j++) {
				if ((j + 1) % 2 == 1) { //奇数位
					if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
					else arrJiShu2.push(parseInt(newArr[j]) * 2);
				} else //偶数位
				arrOuShu.push(newArr[j]);
			}

			var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
			var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
			for (var h = 0; h < arrJiShu2.length; h++) {
				jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
				jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
			}

			var sumJiShu = 0; //奇数位*2 < 9 的数组之和
			var sumOuShu = 0; //偶数位数组之和
			var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
			var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
			var sumTotal = 0;
			for (var m = 0; m < arrJiShu.length; m++) {
				sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
			}

			for (var n = 0; n < arrOuShu.length; n++) {
				sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
			}

			for (var p = 0; p < jishu_child1.length; p++) {
				sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
				sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
			}
			//计算总和
			sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

			//计算Luhm值
			var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
			var luhm = 10 - k;

			if (lastNum == luhm) {
				return true;
			} else {

				return false;
			}
		},
		throw_num: function(myStr, str, that) {
			if (str == "" || str == "0") {
				return {
					message: "可投金额不能为空",
					type: 0
				};
			}
			
			var price = parseInt(that.attr("price")); //单价
			if (parseInt(str) % price != 0 || parseInt(str) / price < 1) {
				return {
					message: "输入金额需为" + price + "元的整数倍",
					type: 0
				};
			}
			
		},
		transfer_num: function(myStr, str, that) {
			if (str == "" || str == "0") {
				return {
					message: "可投份数不能为空",
					type: 0
				};
			}
			var reg = /^[0-9]*[1-9][0-9]*$/;
			if (!reg.test(str)) {
				return {
					message: "可投份数为正整数",
					type: 0
				};
			}
			
		},
		loanPeriod: function(myStr, str, that) {
			if (str == "") {
				return {
					message: "借款期限不能为空",
					type: 0
				};
			}
			var reg = /^[0-9]*[1-9][0-9]*$/;
			if (!reg.test(str)) {
				return {
					message: "借款期限为正整数",
					type: 0
				};
			}
			if (parseInt(str) < 1 || parseInt(str) > 60) {
				return {
					message: " 借款期限 在1-60之间",
					type: 0
				};
			}
		},
		loanAmount: function(myStr, str, that) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: "借款金额不能为空",
					type: 0
				};
			}
			var reg = /^[1-9]*[1-9][0-9]*$/;;
			if (!reg.test(str)) {
				return {
					message: "借款金额为正整数",
					type: 0
				};
			}
			if (parseFloat(str) > 10000) {
				return {
					message: "借款金额不能超过10000万元",
					type: 0
				};
			}
		},
		cash_num: function(myStr, str, that) {
			
			if (str == "" || $(that).attr("placeholder") == str) {
				return {
					message: "提现金额不能为空",
					type: 0
				};
			}
			var reg = /^[0-9]+(.[0-9]{1,2})?$/;
			if (!reg.test(str)) {
				return {
					message: "只能输入数字，且小数点后不超过两位",
					type: 0
				};
			}
		},
		money_num: function(myStr, str, that) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: "充值金额不能为空",
					type: 0
				};
			}
			var reg = /^[0-9]+(.[0-9]{1,2})?$/;
			if (!reg.test(str) || parseFloat(str) == 0) {
				return {
					message: "充值金额只能输入数字，且小数点后不超过两位",
					type: 0
				};
			}
		},
		email: function(myStr, str, that) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: "邮箱不能为空",
					type: 0
				};
			}
			var reg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
			if (!reg.test(str)) {
				return {
					message: "邮箱格式有误，请输入正确的邮箱地址",
					type: 0
				};
			}
			if (str.length > 70) {
				return {
					message: "邮箱地址不能超过70个字符",
					type: 0
				};
			}
		},
		userName: function(myStr, str, that) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: "请填写用户名",
					type: 0
				};
			}
			if (that.attr("noform") != "1") {
				if (str.length < 4 || str.length > 20) {
					return {
						message: "用户名长度为4~20位字符",
						type: 0
					};
				}
				var reg = /^[a-zA-Z0-9_\-]+$/;
				var reg2 = /^[0-9]*$/;
				if (!reg.test(str) || reg2.test(str)) {
					return {
						message: "用户名只能包含英文、数字、“-”、“_”",
						type: 0
					};
				}
				reg = /^[_\-][a-zA-Z0-9_\-]+$/;
				if (reg.test(str)) {
					return {
						message: "用户名不能以符号开头",
						type: 0
					};
				}
			}

		},
		deal_pw: function(myStr, str, that) {
			if (str == "") {
				return {
					message: "请输入交易密码",
					type: 0
				};
			}
			
		},
		passWord: function(myStr, str, that) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: "密码不能为空",
					type: 0
				};
			}
			if (that.attr("noform") != "1") {
				if (str.length < 6 || str.length > 16) {
					return {
						message: "密码长度为6~16位字符",
						type: 0
					};
				}
				var reg = /\s/;
				if (reg.test(str)) {
					return {
						message: "密码不能包含空格",
						type: 0
					};
				}
			}
		},
		okpassword: function(myStr, str, that, myDate) {
			if (str == "" | that.attr("placeholder") == str) {
				return {
					message: "请再次输入密码",
					type: 0
				};
			}
			var pass = $.method.getPassword();
			
			var n = 0;
			for (var key in pass) {
				if (myDate[pass[key]] == str) {
					n = 1; break;
				}
			}
			if (n == 0) {
				return {
					message: "两次密码输入不一致",
					type: 0
				};
			}
		},
		getPassword: function() {
			return ["new_password", "passWord", "deal_password", "login_password"];
		},
		deal_password: function(myStr, str, that, myDate, noticeword) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: "请输入交易密码",
					type: 0
				};
			}
			var reg = /\s/;
			if (str.length < 6 || str.length > 16 || reg.test(str)) {
				return {
					message: "请填写6~16位的字符，可由英文、数字或符号构成",
					type: 0
				};
			}

		},
		new_password: function(myStr, str, that, myDate, noticeword) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: noticeword,
					type: 0
				};
			}
			var reg = /\s/;
			if (str.length < 6 || str.length > 16 || reg.test(str)) {
				if(myStr.ePassShort){
					return {
						message: myStr.ePassShort,/**/
						type: 0
						};
					}else{
						
						return {
							message: "请填写6~16位的字符，可由英文、数字或符号构成",/*6~16位字符，由英文、数字或符号构成*/
							type: 0
						};
						
						}
				
			}

		},
		oldpassword: function(myStr, str, that, myDate) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: "请输入原密码",
					type: 0
				};
			}
			var reg = /\s/;
			if (str.length < 6 || str.length > 16 || reg.test(str)) {
				return {
					message: "原密码输入错误",
					type: 0
				};
			}

		},
		mobilePhone: function(myStr, str, that) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: "请输入手机号码",
					type: 0
				};
			}
			var reg = /^(1[3|5|8|4])[\d]{9}$/;
			if (str.length != 11) {
				return {
					message: "手机号码为11位数字",
					type: 0
				};
			}
			if (!reg.test(str)) {
				return {
					message: "请输入正确的手机号码",
					type: 0
				};
			}
		},
		smsCaptcha: function(myStr, str, that) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: "请输入验证码",
					type: 0
				};
			}
			var reg = /^\d{6}$/;
			if (!reg.test(str)) {
				return {
					message: "验证码输入有误，请重新输入",
					type: 0
				};
			}
			//从数据口对比验证码

		},

		preName: function(myStr, str, that) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: "请填写您的真实姓名",
					type: 0
				};
			}
			var reg = /[\u4E00-\u9FA5]$/;
			if (!reg.test(str) || $.method.checkChinese(str) == 0) {
				return {
					message: "真实姓名必须为汉字",
					type: 0
				};
			}
			if (str.length > 16) {
				return {
					message: "真实姓名必须小于16个字",
					type: 0
				};
			}
		},
		checkChinese: function(str) {
			for (var i = 0; i < str.length; i++) {
				code = str.charCodeAt(i);
				if ((code >= 65281 && code <= 65373) || code == 12305 || code == 12304 || code == 12303 || code == 12302 || code == 12299 || code == 12298 || code == 12290 || code == 12289 || code == 12288 || code == 65509 || code == 8230 || code == 8221 || code == 8220 || code == 8217 || code == 8216 || code <= 255) {
					return 0;
				}
			}
			return 1;
		},
		idNum: function(myStr, str, myDate, that, thz) {
			if (str == "" || that.attr("placeholder") == str) {
				return {
					message: "请填写您的身份证号码",
					type: 0
				};
			}
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			if (!reg.test(str)) {
				return {
					message: "身份证号码有误",
					type: 0
				};
			}

		}
	}
//判断是否为undefined
function isUndefinde(obj){
	if(typeof(obj) == "undefined"){ 
	
		return true;
		
		}else{ 
		
		return false;
		}
	}
})(jQuery);