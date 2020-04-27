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
    var T;
    var tax2,tax1,tax,minus;
    switch(true){
        case T1<=800:
            tax2=T1;
            T=T1;
            tax1=0;
            tax=0;
            minus=0;
            break;
        case T1<=4000&&T1>800:
            tax2=T1-800;
            break;
        case T1>4000:
            tax2=T1*0.8;
            break;
    }
    switch(true){
        case 800<T1&&tax2<=20000:
            tax=0.2;
            minus=0;
            tax1=minus+tax2*tax;
            T = T1-tax1;
           
            break;
        case tax2<=50000&&tax2>20000:
            tax=0.3;
            minus=2000;
            tax1=minus+tax2*tax;
            T = T1-tax1;
            break;
        case tax2>50000:
            tax=0.4;
            minus=7000;
            tax1=minus+tax2*tax;
            T = T1-tax1;
            break;
      


    }
  
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
