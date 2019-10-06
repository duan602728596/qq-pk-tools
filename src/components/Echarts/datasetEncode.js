const options = {
  dataset: {
    source: []
  },
  xAxis: {
    name: '集资数',
    axisLabel: {
      formatter: '¥{value}'
    }
  },
  yAxis: {
    type: 'category'
  },
  visualMap: {
    show: false,
    min: 10,
    max: 100000,
    dimension: 0,
    inRange: {
      color: ['#eb2f96', '#1890ff']
    }
  },
  series: [
    {
      type: 'bar',
      encode: {
        x: 'amount',
        y: 'product'
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter(params) {
            return `¥${ params.value[0] }`;
          }
        }
      }
    }
  ],
  animationDuration: 0,
  animationDurationUpdate: 0
};

export default options;