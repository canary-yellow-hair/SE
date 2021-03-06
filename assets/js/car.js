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
        if ($('#cc-payment').val() == ''||$('#cc-payment-tax').val() == ''||$('#cc-payment-year').val() == '') flag = false;
        return flag;
    }
    if (!isNull()) {
        alert('请将数据填写完整');
        return false;
    }
    var money = Number($('#cc-payment').val())*10000;
    var tax=Number($('#cc-payment-tax').val())/100/12;
    var month=Number($('#cc-payment-year').val())*12;
    
    var benxi_permonth=(money*tax*Math.pow((1+tax),month)/(Math.pow((1+tax),month)-1));
    var benxi_tomonth=benxi_permonth*month-money;
    var benxi_total=benxi_tomonth+money;

    var benjin_permonth=money/month;
    var benjin_perinvs=money*tax;
    var benjin_permonth_up=benjin_permonth+benjin_perinvs;
    var benjin_minus=benjin_permonth*tax;
    var benjin_totalin=(month+1)*money*tax/2;
    var benjin_total=benjin_totalin+money;
    var benjin_lastmo=benjin_permonth_up-benjin_minus*month;

    var ctx = document.getElementById( "team-chart" );
    ctx.height = 150;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: ["第一年","最后一年" ],
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [ {
                data: [benxi_permonth.toFixed(2),benxi_permonth.toFixed(2)  ],
                label: "等额本息",
                backgroundColor: 'rgba(0,200,155,.35)',
                borderColor: 'rgba(0,200,155,0.60)',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(0,200,155,0.60)',
                    },
                    {
                data: [benjin_permonth_up.toFixed(2), benjin_lastmo.toFixed(2)],
                label: "等额本金",
                backgroundColor: 'rgba(0,194,146,.25)',
                borderColor: 'rgba(0,194,146,0.5)',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(0,194,146,0.5)',
                    }, ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },


            },
            scales: {
                xAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                        } ],
                yAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                        } ]
            },
            title: {
                display: false,
            }
        }
    } );

 
    var output = "等额本息方式：</br>&nbsp&nbsp 每月还款" + benxi_permonth.toFixed(2)+"元</br>&nbsp&nbsp  总支付利息"+benxi_tomonth.toFixed(2)+"元</br>&nbsp&nbsp 本息合计" + benxi_total.toFixed(2)+  "元 </br>等额本金方式：</br>&nbsp&nbsp 首月还款" + benjin_permonth_up.toFixed(2)+"元,每月递减"+benjin_minus.toFixed(2)+"元</br>&nbsp&nbsp 总支付利息"+benjin_totalin.toFixed(2)+"元</br>&nbsp&nbsp 本息合计" + benjin_total.toFixed(2)+  "元";
    
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
