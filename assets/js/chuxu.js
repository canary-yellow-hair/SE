/**
 * @author 李阳
 * @description 计算器
 */

var ctx = document.getElementById( "sales-chart" );
ctx.height = 150;
var myChart = new Chart( ctx, {
    type: 'line',
    data: {
        labels: [ "1", "2", "3", "4", "5", "6", "7","8","9","10" ],
        type: 'line',
        defaultFontFamily: 'Montserrat',
        datasets: [ {
            label: "简单利息",
            data: [ 800,1600,2400,3200,4000,4800,5600,6400,7200,8000 ],
            backgroundColor: 'transparent',
            borderColor: 'rgba(220,53,69,0.75)',
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'rgba(220,53,69,0.75)',
                }, {
            label: "每年复利",
            data: [ 800,1664,2579.12,3604.89,4693.28,5868.74,7138.24,8509.30,9990.05,11589.25],
            backgroundColor: 'transparent',
            borderColor: 'rgba(40,167,69,0.75)',
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'rgba(40,167,69,0.75)',
                } ]
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
            text: 'Normal Legend'
        }
    }
} );

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
    var type=String($('#cc-payment-type').val());
    var lixi,benli;
    switch(true){
        case type=="无":
            lixi=money*tax*year;
            benli=lixi+money;
            break;
        case type=="每年":
            benli=money*Math.pow((1+tax),year);
            lixi=benli-money;
            break;
        case type=="每月":
            tax=tax/12;
            benli=money*Math.pow((1+tax),year*12);
            lixi=benli-money;
            break;
        case type=="每周":
            tax=tax/52;
            benli=money*Math.pow((1+tax),year*52);
            lixi=benli-money;
            break;


    }
    
var ctx = document.getElementById( "pieChart" );
ctx.height = 120;
var myChart = new Chart( ctx, {
    type: 'pie',
    data: {
        datasets: [ {
            data: [ money,lixi.toFixed(2) ],
            backgroundColor: [
                                "rgba(0, 194, 146,0.9)",
                                "rgba(0,0,0,0.07)"
                            ],
            hoverBackgroundColor: [
                                "rgba(0, 194, 146,0.9)",
                                "rgba(0,0,0,0.07)"
                            ]

                        } ],
        labels: [
                        "本金",
                        "利息"
                    ]
    },
    options: {
        responsive: true
    }
} );


    var output = "&nbsp&nbsp" + year+ "年后获得的总利息"+lixi.toFixed(2)+"元</br>&nbsp&nbsp本息合计" + benli.toFixed(2)+  "元。";
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

	
