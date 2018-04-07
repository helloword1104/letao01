/**
 * Created by Administrator on 2018/4/7.
 */


$(function(){
//  初始化echarts插件
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".echarts_1"));

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    // 图例 要与series中的name对应一致
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["一月","二月","三月","四月","五月","六月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1500, 1800, 2600, 2000, 1800, 800]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option1);






  var myChart1 = echarts.init(document.querySelector(".echarts_2"));
  option2 = {
    title : {
      text: '热门品牌销售',
      subtext: '2017年6月份',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','乔丹','李宁']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '65%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'新百伦'},
          {value:135, name:'乔丹'},
          {value:1548, name:'李宁'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart1.setOption(option2);
});