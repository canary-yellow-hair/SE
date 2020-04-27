/**
 * @author 邢可卿
 * @description 计算器
 */
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
    var T1 = Number($('#cc-payment').val());
    var T,rate;
    rate=0.2;
    T=T1*rate;
    T2=T1-T;
    
  
    var output = "&nbsp&nbsp应纳税所得额：" + T1 + "元</br>&nbsp&nbsp适用税率：" + rate*100+ "%</br>&nbsp&nbsp应缴税款：" + T+ "元</br>&nbsp&nbsp税后收入："+T2+"元";
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
