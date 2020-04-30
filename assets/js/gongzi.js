/**
 * @author 邢可卿
 * @description 计算器
 */


function sumSalary(){

    var month = $("#month").val();
    var salary = $("#salary").val();

    $("#sum_salary").val(Number(month)*Number(salary));   
}

function sumSalary1(){

    var month = $("#month").val();
    var insur = $("#insur").val();

    $("#sum_insur").val(Number(insur)*Number(month));   
}

function sumSalary2(){

    var other = $("#other").val();
    var month = $("#month").val();

    $("#sum_other").val(Number(month)*Number(other));   
}




$('.ui-btn__reset').click(function() {
    $(":input").val('');
});
const newLocal = 0;
$('.ui-btn__calculator').click(function() {
    function isNull() {
        var flag = true;
        if ($('#month').val() == ''||$('#salary').val() == ''||$('#sum_salary'||$('#insur').val() == ''||$('#other').val() == ''||$('#sum_other').val() == '').val() == '')flag = false;
        return flag;
    }
    if (!isNull()) {
        alert('请将数据填写完整');
        return false;
    }
    var m = Number($('#month').val());
    var s1= Number($('#salary').val());
    var s = Number($('#sum_salary').val());
    var i1= Number($('#insur').val());
    var i = Number($('#sum_insur').val());
    var o1 = Number($('#other').val());
    var o = Number($('#sum_other').val());
    var x,x0,s0,i0,o0,rate,tax,tax0,income;
    s0=s-s1;
    i0=i-i1;
    o0=o-o1;
 
    if(s<=5000){
        alert('工资5000以内无须纳税');
    }
    else{
    x=s-5000*m-i-o;
    if(s0<=5000){
        tax0=0;
    }
    else{
        x0=s0-5000*(m-1)-i0-o0;
    switch(true){
        case x0<=36000:
            rate=0.03;
            tax0=x0*rate;
            break;
        case x0>36000&&x0<=144000:
            rate=0.1;
            tax0=36000*0.03+(x0-36000)*rate;
            break;
        case x0>144000&&x0<=300000:
            rate=0.2;
            tax0=36000*0.03+(144000-36000)*0.1+(x0-144000)*rate;
            break;
        case x0>300000&&x0<=420000:
            rate=0.25;
            tax0=36000*0.03+(144000-36000)*0.1+(300000-144000)*0.2+(x0-300000)*rate;
            break;
        case x0>420000&&x0<=660000:
            rate=0.3;
            tax0=36000*0.03+(144000-36000)*0.1+(300000-144000)*0.2+(420000-300000)*0.25+(x0-420000)*rate;
            break;
        case x0>660000&&x0<=960000:
            rate=0.35;
            tax0=36000*0.03+(144000-36000)*0.1+(300000-144000)*0.2+(420000-300000)*0.25+(660000-420000)*0.3+(x0-660000)*rate;
            break;
        case x0>960000:
            rate=0.45;
            tax0=36000*0.03+(144000-36000)*0.1+(300000-144000)*0.2+(420000-300000)*0.25+(660000-420000)*0.3+(960000-660000)*0.35+(x0-960000)*rate;
            break;
    }
    }
    
    switch(true){
        case x<=36000:
            rate=0.03;
            tax=x*rate;
            break;
        case x>36000&&x<=144000:
            rate=0.1;
            tax=36000*0.03+(x-36000)*rate;
            break;
        case x>144000&&x<=300000:
            rate=0.2;
            tax=36000*0.03+(144000-36000)*0.1+(x-144000)*rate;
            break;
        case x>300000&&x<=420000:
            rate=0.25;
            tax=36000*0.03+(144000-36000)*0.1+(300000-144000)*0.2+(x-300000)*rate;
            break;
        case x>420000&&x<=660000:
            rate=0.3;
            tax=36000*0.03+(144000-36000)*0.1+(300000-144000)*0.2+(420000-300000)*0.25+(x-420000)*rate;
            break;
        case x>660000&&x<=960000:
            rate=0.35;
            tax=36000*0.03+(144000-36000)*0.1+(300000-144000)*0.2+(420000-300000)*0.25+(660000-420000)*0.3+(x-660000)*rate;
            break;
        case x>960000:
            rate=0.45;
            tax=36000*0.03+(144000-36000)*0.1+(300000-144000)*0.2+(420000-300000)*0.25+(660000-420000)*0.3+(960000-660000)*0.35+(x-960000)*rate;
            break;
    }
  
    tax1=tax-tax0;
    income=s1-tax1-i1;


    var ctx = document.getElementById( "pieChart" );
ctx.height = 120;
var myChart = new Chart( ctx, {
    type: 'pie',
    data: {
        datasets: [ {
            data: [income,tax1,i1 ],
            backgroundColor: [
                                "rgba(0, 194, 146,0.9)",
                                "rgba(0,0,0,0.07)",
                                "rgba(0, 194, 146,0.5)",
                            ],
            hoverBackgroundColor: [
                                "rgba(0, 194, 146,0.9)",
                                "rgba(0,0,0,0.07)",
                                "rgba(0, 194, 146,0.5)"
                            ]

                        } ],
        labels: [
                        "税后收入",
                        "应缴税款",
                        "五险一金"
                    ]
    },
    options: {
        responsive: true
    }
} );
    var output = "&nbsp&nbsp应纳税所得额：" + x + "元</br>&nbsp&nbsp适用税率：" + rate*100+ "%</br>&nbsp&nbsp累计应缴税款：" + tax.toFixed(2)+ "元</br>&nbsp&nbsp已缴税款："+tax0.toFixed(2)+"元</br>&nbsp&nbsp应补税款:"+tax1.toFixed(2)+"元</br>&nbsp&nbsp本月税后收入："+income.toFixed(2)+"元";
    var isResult = document.getElementById("isResult");
    isResult.innerHTML = output;
    var notResult = document.getElementById("notResult");
    notResult.innerHTML = "";
    }
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
