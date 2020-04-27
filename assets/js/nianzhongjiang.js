/**
 * @author 李阳
 * @description 计算器
 */
$('.ui-btn__reset').click(function() {
    $(":input").val('');
});
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
    var T1 = Number($('#cc-payment').val());
    var tax=0,minus=0;
    switch(true){
        case T1/12<=3000:
            tax=0.03;
            minus=0;
            break;
        case T1/12<=12000&&T1/12>3000:
            tax=0.1;
            minus=210;
            break;
        case T1/12>12000&&T1/12<=25000:
            tax=0.2;
            minus=1410;
            break;
        case T1/12>25000&&T1/12<=35000:
            tax=0.25;
            minus=2660;
            break;
        case T1/12>35000&&T1/12<=55000:
            tax=0.3;
            minus=4410;
            break;
        case T1/12>55000&&T1/12<=80000:
            tax=0.35;
            minus=7160;
            break;
        case T1/12>80000:
            tax=0.45;
            minus=15160;
            break;


    }
    var T = T1*(1-tax)-minus;
    tax1=minus+T1*tax;
    var output = "&nbsp&nbsp适用税率" + tax*100 + "%</br>&nbsp&nbsp应缴税款" + tax1+ "元</br>&nbsp&nbsp税后收入" + T+ "元。";
    var isResult = document.getElementById("isResult");
    isResult.innerHTML = output;
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
