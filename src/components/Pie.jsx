import React,{useEffect} from 'react'
import * as echarts from 'echarts';
export default function Pie(props) {
    // console.log(props.data)
    useEffect(() => {
    var myChart = echarts.init(document.getElementById('pieContainer'+props.index));
    myChart.setOption({
        title: {
          text: props.name,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter:'{b}:{c}<br>{d}%'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: props.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
  }, [])
  return (
    <div id={'pieContainer'+props.index} style={{height:'500px',width:'300px'}}>123</div>
  )
}
