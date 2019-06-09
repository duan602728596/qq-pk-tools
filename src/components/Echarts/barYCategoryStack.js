/* 堆叠条形图 */
const name = [
  ['左嘉欣', '赖梓惜'],
  ['王诗蒙', '卢天惠'],
  ['顼凘炀', '赵天杨']
];

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
            const { dataIndex, seriesIndex } = params;

            return `【主将】${ name[dataIndex][seriesIndex] }：¥${ params.value }`;
          }
        }
      },
      data: [0, 0, 0],
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
            const { dataIndex, seriesIndex } = params;

            return `【副将】${ name[dataIndex][seriesIndex] }：¥${ params.value }`;
          }
        }
      },
      data: [0, 0, 0],
      color: '#1890ff'
    }
  ]
};

export default options;