/* 堆叠条形图 */
const options = {
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['第三家', '第二家', '第一家']
  },
  series: [
    {
      name: '主将',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight',
          formatter(params) {
            console.log('主将', params);

            return `主将：¥${ params.value }`;
          }
        }
      },
      data: [320, 302, 301],
      color: '#eb2f96'
    },
    {
      name: '副将',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight',
          formatter(params) {
            console.log('副将', params);

            return `副将：¥${ params.value }`;
          }
        }
      },
      data: [120, 132, 101],
      color: '#1890ff'
    }
  ]
};

export default options;