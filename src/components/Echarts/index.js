import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/visualMap';

class ECharts extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    width: 600,
    height: 600
  };

  dom = createRef();
  state = {
    chart: null
  };

  componentDidMount() {
    this.initCharts();
  }

  componentWillUnmount() {
    this.state.chart.dispose(this.dom.current);
  }

  // 初始化图表
  initCharts() {
    const chart = echarts.init(this.dom.current);

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
          }
        }
      ],
      animationDuration: 0,
      animationDurationUpdate: 0
    };

    chart.setOption(options);
    this.setState({ chart });
  }

  render() {
    const { width, height } = this.props;
    const style = { width, height };

    return (
      <div style={ style }>
        <canvas ref={ this.dom } style={ style } width={ width } height={ height } />
      </div>
    );
  }
}

export default ECharts;