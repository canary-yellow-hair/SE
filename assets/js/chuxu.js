$('.ui-btn__reset').click(function() {
    $(":input").val('');
});
$('.ui-btn__calculator').click(function() {
    function isNull() {
        var flag = true;
        if ($('#cc-payment').val() == ''||$('#cc-payment-tax').val() == ''||$('#cc-payment-year').val() == '') flag = false;
        return flag;
    }
    if (!isNull()) {
        alert('请将数据填写完整');
        return false;
    }
    var money = Number($('#cc-payment').val());
    var tax=Number($('#cc-payment-tax').val())/100;
    var year=Number($('#cc-payment-year').val());
    
    var lixi=money*tax*year;
    var benli=lixi+money;
    
    var output = "&nbsp&nbsp" + year+ "年后获得的总利息"+lixi+"元</br>&nbsp&nbsp本息合计" + benli+  "元。";
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
