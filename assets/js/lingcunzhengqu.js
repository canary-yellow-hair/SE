$('.ui-btn__reset').click(function() {
    $(":input").val('');
});
const newLocal = 0;
$('.ui-btn__calculator').click(function() {
    function isNull() {
        var flag = true;
        if ($('#cc-payment').val() == '') flag = false;
        return flag;
    }
    if (!isNull()) {
        alert('请将数据填写完整');
        return false;
    }
    var year = Number($('#year').val());
    var rate = Number($('#rate').val()/100);
    var a = Number($('#amount').val());
    var year1 = Number($('#year1').val());
    var rate1 = Number($('#rate1').val()/100);
    var sum1 = Number($('#sum1').val());
    var interest,sum,b,m;
    interest=rate*a*(year*12+1)/2*year;
    sum=interest+a*12*year;
    m=rate1*(year1*12+1)*year1/2+12*year1;
    b=sum1/m;
    var output = "&nbsp&nbsp到期本息总额：" + sum.toFixed(2) + "元";
    var output1= "&nbsp&nbsp初期存入金额：" + b.toFixed(2) + "元";
    var isResult = document.getElementById("isResult");
    isResult.innerHTML = output;
    var isResult1 = document.getElementById("isResult1");
    isResult1.innerHTML = output1;
    var notResult = document.getElementById("notResult");
    notResult.innerHTML = "";
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