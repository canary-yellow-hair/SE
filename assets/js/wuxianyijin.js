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
        if ($('#income').val() == ''||$('#city').val() == ''||$('#sbdown').val() == ''||$('#sbup').val() == ''||$('gjdown').val() == ''||$('#gjup').val() == '') flag = false;
        return flag;
    }
    if (!isNull()) {
        alert('请将数据填写完整');
        return false;
    }
    var city = String($('#city').val());
    
    var i=Number($('#income').val());
    var d5=Number($('#sbdown').val());//五险-社保基数上下限
    var u5=Number($('#sbup').val());
    var d1=Number($('#gjdown').val());//一金-公积金基数上下限
    var u1=Number($('#gjup').val());
    var personal_yanglao_rate,personal_yiliao_rate,personal_shiye_rate,personal_gongshang_rate,personal_shengyu_rate,personal_gongjijin_rate;
    var company_yanglao_rate,company_yiliao_rate,company_shiye_rate,company_gongshang_rate,company_shengyu_rate,company_gongjijin_rate;
    var personal_yanglao,personal_yiliao,personal_shiye,personal_gongshang,personal_shengyu,personal_gongjijin;
    var company_yanglao,company_yiliao,company_shiye,company_gongshang,company_shengyu,company_gongjijin;
    switch(true){
        case city=="北京":
            personal_yanglao_rate=0.08;
            personal_yiliao_rate=0.02;
            personal_shiye_rate=0.002;
            personal_gongshang_rate=0;
            personal_shengyu_rate=0;
            personal_gongjijin_rate=0.12;
            company_yanglao_rate=0.2;
            company_yiliao_rate=0.1;
            company_shiye_rate=0.01;
            company_gongshang_rate=0.003;
            company_shengyu_rate=0.008;
            company_gongjijin_rate=0.12;
            
            break;
        case city=="上海":
            personal_yanglao_rate=0.08;
            personal_yiliao_rate=0.02;
            personal_shiye_rate=0.01;
            personal_gongshang_rate=0;
            personal_shengyu_rate=0;
            personal_gongjijin_rate=0.07;
            company_yanglao_rate=0.22;
            company_yiliao_rate=0.12;
            company_shiye_rate=0.017;
            company_gongshang_rate=0.005;
            company_shengyu_rate=0.008;
            company_gongjijin_rate=0.07;
            break;
        case city=="广州":
            personal_yanglao_rate=0.08;
            personal_yiliao_rate=0.02;
            personal_shiye_rate=0.005;
            personal_gongshang_rate=0;
            personal_shengyu_rate=0;
            var personal_zhongji_rate=0;
            personal_gongjijin_rate=0.08;
            company_yanglao_rate=0.12;
            company_yiliao_rate=0.08;
            company_shiye_rate=0.015;
            company_gongshang_rate=0.005;
            company_shengyu_rate=0.0085;
            var company_zhongji_rate=0.0085;
            company_gongjijin_rate=0.08;
            break;
        case city=="深圳":
            personal_yanglao_rate=0.08;
            personal_yiliao_rate=0.02;
            personal_shiye_rate=0.01;
            personal_gongshang_rate=0.005;
            personal_shengyu_rate=0;
            personal_gongjijin_rate=0.13;
            company_yanglao_rate=0.11;
            company_yiliao_rate=0.045;
            company_shiye_rate=0.02;
            company_gongshang_rate=0.005;
            company_shengyu_rate=0.007;
            company_gongjijin_rate=0.13;
            break;
        
    }
    var i1,i2;
    switch(true){
        case i>=d5&&i<=u5:
            i1=i;
            break;
        case i>u5:
            i1=u5;
            break;
        case i<d5:
            i1=d5;
            break;
    }
            personal_yanglao=i1*personal_yanglao_rate;
            personal_yiliao=i1*personal_yiliao_rate;
            personal_shiye=i1*personal_shiye_rate;
            personal_gongshang=i1*personal_gongshang_rate;
            personal_shengyu=i1*personal_shengyu_rate;
            
            company_yanglao=i1*company_yanglao_rate;
            company_yiliao=i1*company_yiliao_rate;
            company_shiye=i1*company_shiye_rate;
            company_gongshang=i1*company_gongshang_rate;
            company_shengyu=i1*company_shengyu_rate;
    switch(true){
        case i>=d1&&i<=u1:
            i2=i;
            break;   
        case i>u1:
            i2=u1;
            break;
        case i<d1:
            i2=d1;
            break;
    }
    personal_gongjijin=i2*personal_gongjijin_rate;
    company_gongjijin=i2*company_gongjijin_rate;
    var personal_sum=personal_yanglao+personal_yiliao+personal_shiye+personal_gongshang+personal_shengyu+personal_gongjijin;
    var company_sum=company_yanglao+company_yiliao+company_shiye+company_gongshang+company_shengyu+company_gongjijin;
    
    var ctx = document.getElementById( "pieChart" );
ctx.height = 120;
var myChart = new Chart( ctx, {
    type: 'pie',
    data: {
        datasets: [ {
            data: [personal_yanglao,personal_yiliao,personal_shiye,personal_gongshang,personal_shengyu,personal_gongjijin],
            backgroundColor: [
                                "rgba(0, 194, 146,0.9)",
                                "rgba(0,0,0,0.07)",
                                "rgba(0, 194, 146,0.5)",
                                "rgba(0, 194, 146,0.3)",
                                "rgba(0, 194, 146,0.7)",
                                "rgba(0, 194, 146,0.1)"

                            ],
            hoverBackgroundColor: [
                                "rgba(0, 194, 146,0.9)",
                                "rgba(0,0,0,0.07)",
                                "rgba(0, 194, 146,0.5)",
                                "rgba(0, 194, 146,0.3)",
                                "rgba(0, 194, 146,0.7)",
                                "rgba(0, 194, 146,0.1)"
                            ]

                        } ],
        labels: [
                        "养老保险",
                        "医疗保险",
                        "失业保险",
                        "工伤保险",
                        "生育保险",
                        "公积金"
                    ]
    },
    options: {
        responsive: true
    }
} );

var ctx = document.getElementById( "pieChart1" );
ctx.height = 120;

var myChart = new Chart( ctx, {
    type: 'pie',
    
    data: {
        datasets: [ {
            data: [company_yanglao,company_yiliao,company_shiye,company_gongshang,company_shengyu,company_gongjijin],
            backgroundColor: [
                                "rgba(0, 194, 146,0.9)",
                                "rgba(0,0,0,0.07)",
                                "rgba(0, 194, 146,0.5)",
                                "rgba(0, 194, 146,0.3)",
                                "rgba(0, 194, 146,0.7)",
                                "rgba(0, 194, 146,0.1)"

                            ],
            hoverBackgroundColor: [
                                "rgba(0, 194, 146,0.9)",
                                "rgba(0,0,0,0.07)",
                                "rgba(0, 194, 146,0.5)",
                                "rgba(0, 194, 146,0.3)",
                                "rgba(0, 194, 146,0.7)",
                                "rgba(0, 194, 146,0.1)"
                            ]

                        } ],
        labels: [
                        "养老保险",
                        "医疗保险",
                        "失业保险",
                        "工伤保险",
                        "生育保险",
                        "公积金"
                    ]


       
    },

                        
                       
                   
                
  
    options: {
        responsive: true
    }
} );


    var output = "&nbsp&nbsp个人应缴部分：</br>&nbsp&nbsp养老保险金：" + personal_yanglao.toFixed(2) + "元</br>&nbsp&nbsp医疗保险金：" + personal_yiliao.toFixed(2)+ "元</br>&nbsp&nbsp失业保险金：" + personal_shiye.toFixed(2)+ "元</br>&nbsp&nbsp工伤保险金："+personal_gongshang.toFixed(2)+"元</br>&nbsp&nbsp生育保险金：" + personal_shengyu.toFixed(2)+"元</br>&nbsp&nbsp公积金："+ personal_gongjijin.toFixed(2)+"元";
    var output1="&nbsp&nbsp单位应缴部分：</br>&nbsp&nbsp养老保险金：" + company_yanglao.toFixed(2) + "元</br>&nbsp&nbsp医疗保险金：" + company_yiliao.toFixed(2)+ "元</br>&nbsp&nbsp失业保险金：" + company_shiye.toFixed(2)+ "元</br>&nbsp&nbsp工伤保险金："+company_gongshang.toFixed(2)+"元</br>&nbsp&nbsp生育保险金：" + company_shengyu.toFixed(2)+"元</br>&nbsp&nbsp公积金："+ company_gongjijin.toFixed(2)+"元";
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
