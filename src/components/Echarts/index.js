import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/visualMap';
import datasetEncodeOptions from './datasetEncode';

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

    const options = datasetEncodeOptions;

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