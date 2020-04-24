
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



var inputText = "0"; //定义输入框显示的值

function finishBody() {

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
function clearInput() {
  $(".calc-disp").val("0");
  inputText = "0";
}
function deleteLasttext(text) {
  if (text.length > 1) {
    inputText = text.substr(0, text.length - 1);
    $(".calc-disp").val(inputText);
  } else {
    $(".calc-disp").val("0");
    inputText = "0";
  }
}

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
 * 页面加载完成后的操作（设置按钮事件、键盘事件）
 * @returns {boolean} 返回错误或者正确
 */
