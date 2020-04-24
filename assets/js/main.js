
$.noConflict();

jQuery(document).ready(function($) {

	"use strict";

	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
		new SelectFx(el);
	});

	jQuery('.selectpicker').selectpicker;


	

	$('.search-trigger').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').addClass('open');
	});

	$('.search-close').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').removeClass('open');
	});

	$('.equal-height').matchHeight({
		property: 'max-height'
	});

	// var chartsheight = $('.flotRealtime2').height();
	// $('.traffic-chart').css('height', chartsheight-122);


	// Counter Number
	$('.count').each(function () {
		$(this).prop('Counter',0).animate({
			Counter: $(this).text()
		}, {
			duration: 3000,
			easing: 'swing',
			step: function (now) {
				$(this).text(Math.ceil(now));
			}
		});
	});


	 
	 
	// Menu Trigger
	$('#menuToggle').on('click', function(event) {
		var windowWidth = $(window).width();   		 
		if (windowWidth<1010) { 
			$('body').removeClass('open'); 
			if (windowWidth<760){ 
				$('#left-panel').slideToggle(); 
			} else {
				$('#left-panel').toggleClass('open-menu');  
			} 
		} else {
			$('body').toggleClass('open');
			$('#left-panel').removeClass('open-menu');  
		} 
			 
	}); 

	 
	$(".menu-item-has-children.dropdown").each(function() {
		$(this).on('click', function() {
			var $temp_text = $(this).children('.dropdown-toggle').html();
			$(this).children('.sub-menu').prepend('<li class="subtitle">' + $temp_text + '</li>'); 
		});
	});


	// Load Resize 
	$(window).on("load resize", function(event) { 
		var windowWidth = $(window).width();  		 
		if (windowWidth<1010) {
			$('body').addClass('small-device'); 
		} else {
			$('body').removeClass('small-device');  
		} 
		
	});
  
 
});



var inputText = "0"; //定义输入框显示的值



/**
 * 页面加载完成后的操作（设置按钮事件、键盘事件）
 * @returns {boolean} 返回错误或者正确
 */
function finishBody() {
  $(document).ready(function () {
    $("button").on('click', function () {                                       //给按钮设置点击事件
      var value = $(this).text();
      if (!checkValue(value)) {
//      $(this).blur(); //Enter会触发两次事件，enter和前一次事件。
        return false;
      }
      if (value !== "C" && value !== "Enter" && value !== "←") {
        inputText += value;
        $(".calc-disp").val(inputText);
//      $(this).blur(); //所以使用时要取消第一次点击时的元素焦点。
      }
    });
  });
  $(document).on('keypress', function (keye) {                                  //添加键盘事件
//  console.log(keye.key);
    var keyValue = keye.key;                                                    //获取键值
    var reg = /[-/*+.0-9]/;
    if (reg.test(keyValue)) {                                                   //b.test(a)：如果b中含有a返回true
      if (checkValue(keyValue)) {
        inputText += keyValue;
        $(".calc-disp").val(inputText);
        return true;
      }
    } else if (keyValue === "Enter") {
      keye.preventDefault();                                                    //取消预设事件
      enterResult();
    } else if (keyValue === "d" || keyValue === "D") {
      deleteLasttext(inputText);
    } else if (keyValue === "c" || keyValue === "C") {
      clearInput();
    } else {
      return false;
    }
  });
  $(".clear-input").on('click', function () {
    clearInput();
  });
  $(".enter-result").on('click', function () {
    enterResult();
  });
  $(".delete-text").on('click', function () {
    deleteLasttext(inputText);
  });
  if (sessionStorage.length !== 0) {
    getHistory();
  }
}



/**
 * 清空显示框与其值
 */
function clearInput() {
  $(".calc-disp").val("0");
  inputText = "0";
}



/**
 * 删除一位字符
 * @param {string} 要删除的字符
 */
function deleteLasttext(text) {
  if (text.length > 1) {
    inputText = text.substr(0, text.length - 1);
    $(".calc-disp").val(inputText);
  } else {
    $(".calc-disp").val("0");
    inputText = "0";
  }
}



/**
 * 计算结果
 */
var warning = null;
function enterResult() {
  inputText = $(".calc-disp").val();
  try {
    inputText = formatText(inputText);
    var result = eval(inputText);                                                //计算结果
    result = parseFloat(result.toFixed(9));                                     //对结果进行处理
    $(".calc-disp").val(result);
    addHistory(inputText, result);
    inputText = String(result);
    if (sessionStorage.length !== 0) {
      getHistory();
    }
  } catch (e) {
    clearTimeout(warning);
    $(".warning-text").html("表达式错误！");
    warning = setTimeout(function () {
      $(".warning-text").html("&nbsp;");
    }, 3000);
  }
}



/**
 * 检查输入的字符
 * @param {string} 要检查的字符
 * @returns {Boolean} 返回正确或者错误的处理
 */
function checkValue(text) {
  var firstText = inputText.slice(0, 1);
  var lastText = inputText.slice(-1);
  var allnum = "0123456789";
  var sear = "/*-+";
  var regnum = /[.123456789]/;
  var regtext = /[-/*+]/;
  //s输入长度不得超过
  if (inputText.length >= 23) {
    clearTimeout(warning);
    $(".warning-text").html("不得超过最大输入长度 ～");
    warning = setTimeout(function () {
      $(".warning-text").html("&nbsp;");
    }, 3000);
    return false;
  }
  /* 第一个为0时，输入如何处理。 */
  if (allnum.indexOf(text) > -1 && inputText.length === 1 && inputText === "0") {
    inputText = "";
    return true;
  }
  //连续输入小数点的问题
  if (text === "." && inputText.indexOf(text) > -1 && regtext.test(inputText.slice(inputText.lastIndexOf("."))) === false) {
    return false;
  }
  /* 第一个为运算符时，返回false。 */
  if (sear.indexOf(text) > -1 && sear.indexOf(firstText) > -1 && inputText.length === 1) {
    /* A.indexOf(b):A中是否含有b，没有返回-1 */
    clearInput();
    return false;
  }
  /* 在运算符后面直接输入小数点，返回false。 */
  if (sear.indexOf(text) > -1 && lastText === ".") {
    return false;
  }
  /* 在小数点后面直接输入运算符，返回false。 */
  if (text === "." && sear.indexOf(lastText) > -1) {
    return false;
  }
  /* 没有小数点直接输入多个零，返回false。 */
  if (allnum.indexOf(text) > -1 && lastText === "0") {
    if (!regnum.test(inputText.slice(inputText.lastIndexOf("+") + 1)) || !regnum.test(inputText.slice(inputText.lastIndexOf("-") + 1)) || !regnum.test(inputText.slice(inputText.lastIndexOf("*") + 1)) || !regnum.test(inputText.slice(inputText.lastIndexOf("/") + 1))) {
      return false;
    } else {
      return true;
    }
  }
  /* 用户输入的运算符和最后一个运算符相等时，返回false。 */
  if (sear.indexOf(text) > -1 && sear.indexOf(lastText) === sear.indexOf(text)) {
    return false;
  } else if (sear.indexOf(text) > -1 && sear.indexOf(lastText) > -1 && sear.indexOf(lastText) !== sear.indexOf(text)) {
    /* 用户输入的运算符和最后一个运算符不相等时，返回true，并删掉原来的运算符。 */
    inputText = inputText.slice(0, -1);
    $(".calc-disp").val(inputText);
    return true;
  } else {
    return true;
  }
}



/**
 * 格式化表达式
 * @param {String} 待格式化的表达式。
 * @returns {String} 格式化后的表达式。
 */
function formatText(text) {
  var reg = /[.0-9]/;
  var tempText = "";
  var numTemp = [];
  var charTemp = [];
  for (var i = 0, j = 0; i < text.length; i++) {
    if (i === 0 && !reg.test(text[0])) {
      numTemp[0] = "";
      charTemp[0] = text[0];
      j++;
    } else if (i === 0 && reg.test(text[0]) && text.length === 1) {
      numTemp[0] = text[i];
      charTemp[0] = "";
    } else if (i !== text.length - 1 && reg.test(text[i])) {
      tempText += text[i];
    } else if (i !== text.length - 1 && !reg.test(text[i])) {
      numTemp[j] = parseFloat(tempText);
      tempText = "";
      charTemp[j] = text[i];
      j++;
    } else if (i === text.length - 1 && reg.test(text[text.length - 1]) && text.length > 1) {
      tempText += text[i];
      numTemp[j] = parseFloat(tempText);
      numTemp[j + 1] = "";
      tempText = "";
      charTemp[j] = "";
    } else if (i === text.length - 1 && !reg.test(text[text.length - 1]) && text.length > 1) {
      numTemp[j] = parseFloat(tempText);
      numTemp[j + 1] = "";
      tempText = "";
      charTemp[j] = text[i];
    }
  }
  text = "";
  for (var i = 0; i < charTemp.length; i++) {
    if (charTemp.length > 1 && i === charTemp.length - 1) {
      text += numTemp[i] + charTemp[i] + numTemp[i + 1];
    } else {
      text += numTemp[i] + charTemp[i];
    }
  }
  text = String(text);
  return  text;
}


historyNum = 1;//历史记录数目记录
/**
 * 存取历史记录
 * @param {String} string 表达式
 * @param {String} result 结果
 */
function addHistory(string, result) {
  if (typeof (sessionStorage) !== "undefined") {
    if (historyNum <= 3) {
      sessionStorage.setItem("history" + historyNum, string + "=" + result);
      historyNum++;
    } else {
      historyNum = 1;
      sessionStorage.setItem("history" + historyNum, string + "=" + result);
      historyNum++;
    }
  } else {
    alert("此浏览器不支持 WebStorage");
  }
}



/**
 * 获取历史记录
 */
function getHistory() {
  $(".history-memory tbody").empty();
  for (i = 1; i <= 3; i++) {
    historyValue = sessionStorage.getItem("history" + i);
    if (historyValue !== null) {
      var newTr = $("<tr></tr>");
      var newTd = $("<td></td>");
      newTd.html(historyValue);
      newTd.appendTo(newTr);
      $(".history-memory tbody").append(newTr);
    }
  }
} 

//改进： 定义一个变量记录“=”的输入与否而不必每输入数字时都要检索一遍文本框内容
 
 
var status=0;	//标记所输入的是数字还是运算符号
var calcu=0;	//标记所要执行的方法是哪一个
 
 
/*数字、括号及PI的输入*/
function num(x){
	var str0=document.getElementById('result0').value;
	var str=document.getElementById('result').value;
	if(str0.indexOf("=")>0){
		document.getElementById('result0').value='';
		document.getElementById('result').value='0';
		str=document.getElementById('result').value;
	}
	if(str=="0")
		str='';
 	str+=String(x);
 	document.getElementById('result').value=str;
 	status=0;
}
//输入. （未做是否包含“.”的判断）
function dot(){
	var str0=document.getElementById('result0').value;
	var str=document.getElementById('result').value;
	if(str0.indexOf("=")>0){
		document.getElementById('result0').value='';
		document.getElementById('result').value='0';
		str=document.getElementById('result').value;
	}
	str=str+'.';
 	document.getElementById('result').value=str;
}
 
 
/*三角函数以及'1/'计算*/
function sin(){
	calcu=1;
	cal();
}
function cos(){
	calcu=2;
	cal();
}
function tan(){
	calcu=3;
	cal();
}
function divide1(){
	calcu=4;
	cal();
}
function ln(){
	calcu=5;
	cal();
}
function log(){
	calcu=6;
	cal();
}
function cal(){
	var str0=document.getElementById('result0').value;
	var str=document.getElementById('result').value;
	if(str0.indexOf("=")>0){
		document.getElementById('result0').value='';
		document.getElementById('result').value='0';
		str=document.getElementById('result').value;
	}
	if(str=="0")
		str='';
	switch(calcu){                                   
        case 1: str+=String("sin(");break;               
        case 2: str+=String("cos(");break;               
        case 3: str+=String("tan(");break; 
        case 4: str+=String("1/");break;
        case 5: str+=String("ln(");break;
        case 6: str+=String("log(");break;
    }   
 	document.getElementById('result').value=str;
 	status=1;
}
 
 
/*   ^、√以及%的输入   */
function pow1(){
	calcu=1;
	powS();
}
function pow2(){
	calcu=2;
	powS();
}
function quyu(){
	calcu=3;
	powS();
}
function powS(){
	if(status == 1)
		return;
	var strpow0=document.getElementById('result0').value;
	var strpow=document.getElementById('result').value;
	if(strpow0.indexOf("=")>0){
		document.getElementById('result0').value='';
		/*document.getElementById('result').value='0';*/
		strpow=document.getElementById('result').value;
	}
	switch(calcu){
		case 1: strpow+=String('^');
 			    break;
		case 2: if(strpow=='0')
			  		strpow="√";
			  	else{
			  		strpow+=String('√');
			  	}
			    break;
		case 3: strpow+=String("%");
				break;
	}
	document.getElementById('result').value=strpow;
	status=1;
}
 
 
 
 
/*   +-×÷ 运算   */
function plus(){
	calcu=1;
	calculate();
}
function times(){
	calcu=2;
	calculate();
}
function divide(){
	calcu=3;
	calculate();		
}
function calculate(){
	if(status==1)
		return;
	var str0=document.getElementById('result0').value;
	var str=document.getElementById('result').value;
	if(str0.indexOf("=")>0 ){
		document.getElementById('result0').value='';
		/*document.getElementById('result').value='0';*/
		str=document.getElementById('result').value;
	}
	if(str=='')
		str='0';
	switch(calcu){
		case 1: str+='+';break;
		case 2: str+='×';break;
		case 3: str+='÷';break;
	}
 	document.getElementById('result').value=str;
 	status=1;
}
function minus(){
	var str0=document.getElementById('result0').value;
	var str=document.getElementById('result').value;
	if(str0.indexOf("=")>0){
		document.getElementById('result0').value='';
		/*document.getElementById('result').value='-';*/
		str=document.getElementById('result').value+'-';
	}
 	else
 		str+='-';
 	document.getElementById('result').value=str;
}
 
 
//显示屏字符串为空
function zero(){
	document.getElementById('result0').value="";
 	document.getElementById('result').value="0";
}
 
 
//显示屏字符串减去最后一个字符
function back(){
	var str0=document.getElementById('result0').value;
	var str=document.getElementById('result').value;
	if(str0.indexOf("=")>0 || str=='')
		return;
	var str1=str.substr(0,(str.length)-1)
 	document.getElementById('result').value=str1;
}
 
 
//获取当前显示屏字符，判断所包含运算符，并做相关运算。
function equal(){
	var str0=document.getElementById('result').value;
	if(str0=="")
		return;
	var str=str0.replace(/×/g,'*');		//用正则表达式进行全部替换
	str=str.replace(/÷/g,'/');
	str=str.replace(/π/g,'Math.PI');
	if(str.indexOf("sin")>=0){
		str=str.replace(/sin/g,'Math.round(Math.sin');
		str+='*1000000)/1000000';
 
 
		document.getElementById('result0').value=str0.concat("=");
		document.getElementById('result').value=eval(str);
		
	}
	else if(str.indexOf("cos")>=0){
		str=str.replace(/cos/g,'Math.round(Math.cos');
		str+='*1000000)/1000000';
		document.getElementById('result0').value=str0.concat("=");
		document.getElementById('result').value=eval(str);
	}
	else if(str.indexOf("tan")>=0){
		str=str.replace(/tan/g,'Math.round(Math.tan');
		str+='*1000000)/1000000';
		document.getElementById('result0').value=str0.concat("=");
		document.getElementById('result').value=eval(str);
	}
	else if(str.indexOf("^")>=0){
		var pos=str0.indexOf('^');
		var pow1=str0.substring(0,pos);
		var pow2=str0.substring(pos+1,str0.length+1);
		result=Math.pow(pow1, pow2);
		document.getElementById('result0').value=str0.concat("=");
		document.getElementById('result').value=eval(result);
	}
	else if(str.indexOf("√")>=0){
		var pos=str0.indexOf('√');
		var pow1=str0.substring(0,pos);
		var pow2=str0.substring(pos+1,str0.length+1);
		if(pow1==''){
			result=Math.pow(pow2,0.5);
			document.getElementById('result0').value=str0.concat("=");
			document.getElementById('result').value=eval(result);
		}
		else{
			result=Math.pow(pow2, 1/pow1);
			document.getElementById('result0').value=str0.concat("=");
			document.getElementById('result').value=eval(result);
		}
	}
	else if(str.indexOf("ln")>=0){
		var str=str0.replace(/ln/g,'Math.round(Math.log');
		str+='*1000000)/1000000';
		document.getElementById('result0').value=str0.concat("=");
		document.getElementById('result').value=eval(str);
	}
	else if(str.indexOf("log")>=0){
		var str=str0.replace(/log/g,'Math.log');
		str+= '/Math.log(10)';
		document.getElementById('result0').value=str0.concat("=");
		document.getElementById('result').value=eval(str);
	}
	else{
		result=(eval(str));
		document.getElementById('result0').value=str0.concat("=");
		document.getElementById('result').value=result;
	}
	var a=document.getElementById('result').value;
	if(a=="Infinity")
		document.getElementById('result').value='∞';
	else if(a=="-Infinity")
		document.getElementById('result').value='-∞';
}
function styleChange(){
	if(document.getElementById('rows').style.display=='inline'){
		document.getElementById('rows').style.display='none';
		document.getElementById('sci').style.display='inline';
	}
	else if(document.getElementById('rows').style.display=='none'){
		document.getElementById('rows').style.display='inline';
		document.getElementById('sci').style.display='none';
	}
}