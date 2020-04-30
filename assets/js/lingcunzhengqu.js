/**
 * @author 邢可卿
 * @description 计算器
 */
$('.ui-btn__reset').click(function() {
    $("#year").val('');
    $("#rate").val('');
    $("#amount").val('');

});
$('.ui-btn__reset2').click(function() {
    $("#year1").val('');
    $("#rate1").val('');
    $("#sum1").val('');
});

const newLocal = 0;
$('.ui-btn__calculator').click(function() {
    function isNull() {
        var flag = true;
        if ($('#year').val() == ''||$('#rate').val() == ''||$('#amount').val() == '') flag = false;
        return flag;
    }
    if (!isNull()) {
        alert('请将数据填写完整');
        return false;
    }
    var year = Number($('#year').val());
    var rate = Number($('#rate').val()/100);
    var a = Number($('#amount').val());
    
    var interest,sum,b,m;
    interest=rate*a*(year*12+1)/2*year;
    sum=interest+a*12*year;
   
    var output = "&nbsp&nbsp到期本息总额：" + sum.toFixed(2) + "元";
    
    var isResult = document.getElementById("isResult");
    isResult.innerHTML = output;
    var notResult = document.getElementById("notResult");
    notResult.innerHTML = "";
});

$('.ui-btn__calculator2').click(function() {
    function isNull2() {
        var flag = true;
        if ($('#year1').val() == ''||$('#rate1').val() == ''||$('#sum1').val() == '') flag = false;
        return flag;
    }
    if (!isNull2()) {
        alert('请将数据填写完整');
        return false;
    }
    var year1 = Number($('#year1').val());
    var rate1 = Number($('#rate1').val()/100);
    var sum1 = Number($('#sum1').val());
    var m,b;
    m=rate1*(year1*12+1)*year1/2+12*year1;
    b=sum1/m;
    var output1= "&nbsp&nbsp初期存入金额：" + b.toFixed(2) + "元";


    var isResult1 = document.getElementById("isResult1");
    isResult1.innerHTML = output1;
    var notResult2 = document.getElementById("notResult2");
    notResult2.innerHTML = "";


});

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
